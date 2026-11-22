export const communityDirectory = '/home/jelajah/ormada';
export const communityLogoPlaceholder = '/images/logo-culfest.png';

export const publicationLabels = {
  DRAFT: 'Draf',
  PUBLISHED: 'Terbit',
  ARCHIVED: 'Diarsipkan',
} as const;

export const claimLabels = {
  UNCLAIMED: 'Belum diklaim',
  PENDING: 'Menunggu',
  CLAIMED: 'Diklaim',
  REJECTED: 'Ditolak',
} as const;

export const verificationLabels = {
  UNVERIFIED: 'Belum diverifikasi',
  PENDING: 'Menunggu',
  VERIFIED: 'Terverifikasi',
  REJECTED: 'Ditolak',
} as const;

export const profileFields = {
  name: { label: 'Nama komunitas', limit: 160, required: true },
  slug: { label: 'Slug', limit: 100, required: true },
  summary: { label: 'Ringkasan', limit: 500, required: true },
  description: { label: 'Deskripsi', limit: 10000, required: true },
  established: { label: 'Tanggal atau tahun berdiri', limit: 100 },
  logoUrl: { label: 'Path logo', limit: 512 },
  locationUrl: { label: 'URL Google Maps', limit: 2048 },
  instagramUrl: { label: 'URL Instagram', limit: 2048 },
  websiteUrl: { label: 'URL situs web', limit: 2048 },
} as const;

export type ProfileField = keyof typeof profileFields;

export function suggestSlug(name: string) {
  return name.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100).replace(/-+$/, '');
}

export function isCommunitySlug(slug: string) {
  return slug.length <= profileFields.slug.limit && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
