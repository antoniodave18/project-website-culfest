import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { Prisma } from '@prisma/client';
import prisma from './prisma';
import { provision } from './provision-workspace.mjs';
import {
  claimLabels, isCommunitySlug, profileFields, publicationLabels, verificationLabels,
} from './community-fields';

export class CommunityError extends Error {
  constructor(message: string, readonly status = 400, readonly field?: string) {
    super(message);
  }
}

export function isCommunityId(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
}

function readChoice<T extends string>(value: unknown, labels: Record<T, string>, field: string): T {
  if (typeof value !== 'string' || !Object.hasOwn(labels, value)) {
    throw new CommunityError('Pilih status yang tersedia.', 400, field);
  }
  return value as T;
}

function readText(input: Record<string, unknown>, key: keyof typeof profileFields) {
  const field = profileFields[key];
  const value = input[key];
  const required = 'required' in field;
  if ((!required && value == null) || (!required && typeof value === 'string' && !value.trim())) return null;
  if (typeof value !== 'string' || !value.trim() || value.length > field.limit || value.includes('\0')) {
    throw new CommunityError(
      (required ? 'Wajib diisi. ' : '') + 'Maksimal ' + field.limit + ' karakter.',
      400, key,
    );
  }
  return value.trim();
}

function readUrl(value: string | null, field: 'locationUrl' | 'instagramUrl' | 'websiteUrl') {
  if (!value) return null;
  const url = URL.canParse(value) ? new URL(value) : null;
  const valid = /^https:\/\//i.test(value) && !/[\s\\]/u.test(value)
    && url?.protocol === 'https:' && !url.username && !url.password && !url.port;
  if (valid) {
    if (field === 'websiteUrl') return value;
    if (field === 'instagramUrl' && ['instagram.com', 'www.instagram.com'].includes(url.hostname)
      && /^\/[a-z0-9._]+\/?$/i.test(url.pathname)) return value;
    if (field === 'locationUrl' && (
      (['google.com', 'www.google.com', 'maps.google.com'].includes(url.hostname)
        && /^\/maps(?:\/|$)/.test(url.pathname))
      || (url.hostname === 'maps.app.goo.gl' && /^\/[a-z0-9]+\/?$/i.test(url.pathname))
    )) return value;
  }
  throw new CommunityError('Masukkan URL HTTPS yang valid untuk kolom ini.', 400, field);
}

export async function readProfile(input: Record<string, unknown>) {
  const slug = readText(input, 'slug')!.toLowerCase();
  if (!isCommunitySlug(slug)) {
    throw new CommunityError('Gunakan huruf a–z, angka, dan tanda hubung di antara kata.', 400, 'slug');
  }
  const logoUrl = readText(input, 'logoUrl');
  if (logoUrl) {
    const validPath = /^\/images\/(?:[a-z0-9_-]+\/)*[a-z0-9_-]+\.(?:png|jpe?g|webp|avif|gif)$/i.test(logoUrl);
    const file = validPath && await stat(join(process.cwd(), 'public', logoUrl.slice(1))).catch(() => null);
    if (!file || !file.isFile()) {
      throw new CommunityError('Pilih file gambar yang tersedia di /images/.', 400, 'logoUrl');
    }
  }
  return {
    slug,
    name: readText(input, 'name')!,
    summary: readText(input, 'summary')!,
    description: readText(input, 'description')!,
    established: readText(input, 'established'),
    logoUrl,
    locationUrl: readUrl(readText(input, 'locationUrl'), 'locationUrl'),
    instagramUrl: readUrl(readText(input, 'instagramUrl'), 'instagramUrl'),
    websiteUrl: readUrl(readText(input, 'websiteUrl'), 'websiteUrl'),
  };
}

export async function createCommunity(input: Record<string, unknown>) {
  const profile = await readProfile(input);
  return prisma.$transaction(async tx => {
    const community = await tx.community.create({ data: profile });
    await provision(tx, community);
    return community;
  });
}

export async function updateCommunity(id: string, input: Record<string, unknown>, actorId: string) {
  const profile = await readProfile(input);
  const publicationStatus = readChoice(input.publicationStatus, { DRAFT: '', PUBLISHED: '' }, 'publicationStatus');
  const claimStatus = readChoice(input.claimStatus, claimLabels, 'claimStatus');
  const verificationStatus = readChoice(input.verificationStatus, verificationLabels, 'verificationStatus');
  try {
    return await prisma.$transaction(async tx => {
      const community = await tx.community.update({
        // Evaluate the slug and archive rules at write time, including during concurrent edits.
        where: {
          id, publicationStatus: { not: 'ARCHIVED' },
          OR: [{ slugLocked: false }, { slug: profile.slug }],
        },
        data: {
          ...profile, publicationStatus, claimStatus, verificationStatus,
          ...(publicationStatus === 'PUBLISHED' && { slugLocked: true }),
        },
      });
      const synced = await tx.organization.updateMany({ where: { communityId: id }, data: { slug: community.slug, name: community.name } });
      if (!synced.count) throw new CommunityError('Ruang komunitas belum disiapkan.', 409);
      await tx.workspaceAudit.create({ data: { actorId, communityId: id, action: 'profile.updated', targetId: id } });
      return community;
    });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2025') throw error;
    const current = await prisma.community.findUnique({ where: { id }, select: { publicationStatus: true } });
    if (!current) throw new CommunityError('Komunitas tidak ditemukan.', 404);
    if (current.publicationStatus === 'ARCHIVED') {
      throw new CommunityError('Komunitas sudah diarsipkan. Muat ulang halaman.', 409);
    }
    throw new CommunityError('Slug tetap setelah profil diterbitkan. Muat ulang halaman.', 409, 'slug');
  }
}

export async function archiveCommunity(id: string, actorId: string) {
  await prisma.$transaction(async tx => {
    const { count } = await tx.community.updateMany({
      where: { id, publicationStatus: { not: 'ARCHIVED' } },
      data: { publicationStatus: 'ARCHIVED', slugLocked: true },
    });
    if (count) {
      await tx.workspaceAudit.create({ data: { actorId, communityId: id, action: 'profile.archived', targetId: id } });
    } else if (!await tx.community.findUnique({ where: { id }, select: { id: true } })) {
      throw new CommunityError('Komunitas tidak ditemukan.', 404);
    }
  });
}

export function communityFilters(params: URLSearchParams) {
  const q = (params.get('q') ?? '').trim();
  const number = params.get('page') ?? '1';
  if (q.length > 160 || !/^[1-9]\d{0,5}$/.test(number)) {
    throw new CommunityError('Periksa kata pencarian atau nomor halaman.');
  }
  const publication = params.get('publication');
  const claim = params.get('claim');
  const verification = params.get('verification');
  return {
    q, page: Number(number),
    publication: publication ? readChoice(publication, publicationLabels, 'publication') : '' as const,
    claim: claim ? readChoice(claim, claimLabels, 'claim') : '' as const,
    verification: verification ? readChoice(verification, verificationLabels, 'verification') : '' as const,
  };
}

export const communityPageSize = 20;

export async function listCommunities(filters: ReturnType<typeof communityFilters>) {
  const where: Prisma.CommunityWhereInput = {
    name: filters.q ? { contains: filters.q.replace(/[\\%_]/g, '\\$&') } : undefined,
    publicationStatus: filters.publication || undefined,
    claimStatus: filters.claim || undefined,
    verificationStatus: filters.verification || undefined,
  };
  const [items, total] = await prisma.$transaction([
    prisma.community.findMany({
      where,
      orderBy: [{ updatedAt: 'desc' }, { id: 'asc' }],
      skip: (filters.page - 1) * communityPageSize,
      take: communityPageSize,
      select: {
        id: true, slug: true, name: true, publicationStatus: true,
        claimStatus: true, verificationStatus: true, updatedAt: true,
      },
    }),
    prisma.community.count({ where }),
  ]);
  return { items, total, page: filters.page, pageSize: communityPageSize };
}

export function listPublishedCommunities() {
  return prisma.community.findMany({
    where: { publicationStatus: 'PUBLISHED' },
    orderBy: [{ sortOrder: 'asc' }, { slug: 'asc' }],
    select: { slug: true, name: true, summary: true, logoUrl: true },
  });
}

export async function publicCommunity(slug: string) {
  if (!isCommunitySlug(slug)) return null;
  const profile = await prisma.community.findUnique({
    where: { slug, publicationStatus: 'PUBLISHED' },
    select: {
      name: true, description: true, logoUrl: true, established: true,
      locationUrl: true, instagramUrl: true, websiteUrl: true,
    },
  });
  if (profile) return { profile };
  const archived = await prisma.community.findUnique({
    where: { slug, publicationStatus: 'ARCHIVED' },
    select: { id: true },
  });
  return archived ? { archived: true } : null;
}
