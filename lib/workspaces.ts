import { randomBytes } from 'node:crypto';
import type { WorkspaceRole } from '@prisma/client';
import { authOrigin } from './auth';
import { CommunityError, readProfile } from './communities';
import prisma from './prisma';
import { allowed } from './workspace-roles';
import { audit, emailField, fields, lockUser, type Input, type Tx } from './workspace-request';

function denied(): never { throw new CommunityError('Akses ruang komunitas ditolak.', 403); }
function conflict(message: string): never { throw new CommunityError(message, 409); }
function key(value: unknown) {
  if (typeof value !== 'string' || !value || value.length > 191) throw new CommunityError('Pilihan tidak valid.');
  return value;
}

async function scope(tx: Tx, actorId: string, slug: string) {
  const community = await tx.community.findUnique({ where: { slug }, include: { organization: true } });
  if (!community?.organization) denied();
  const organizationId = community.organization.id;
  const actor = await tx.user.findUnique({ where: { id: actorId } });
  const platform = actor?.role === 'PLATFORM_ADMIN';
  const membership = await tx.member.findUnique({ where: { organizationId_userId: { organizationId, userId: actorId } } });
  const member = !membership?.platformBootstrap || platform ? membership : null;
  if (!platform && (!member || community.publicationStatus === 'ARCHIVED')) denied();
  const role = member?.role;
  const manages = (target: WorkspaceRole) => target !== 'owner' && (platform || (!!role && allowed(role, target === 'admin' ? 'admins' : 'editors')));
  return { community, organizationId, member, platform, manages };
}

export async function workspaceView(actorId: string, slug: string, roster: boolean) {
  return prisma.$transaction(async tx => {
    const { community, organizationId, platform, member, manages } = await scope(tx, actorId, slug);
    const members = roster ? await tx.member.findMany({ where: { organizationId }, orderBy: { createdAt: 'asc' },
      select: { id: true, role: true, user: { select: { name: true } } } }) : [];
    const firstOwner = platform && community.claimStatus === 'CLAIMED' && community.verificationStatus === 'VERIFIED'
      && !members.some(person => person.role === 'owner');
    const roles: WorkspaceRole[] = [];
    if (manages('editor')) roles.push('editor');
    if (manages('admin')) roles.push('admin');
    const inviteRoles = [...roles, ...(firstOwner ? ['owner' as const] : [])];
    const invitations = roster && (platform || roles.length) ? await tx.invitation.findMany({
      where: { organizationId, role: platform ? undefined : { in: roles }, status: 'pending', expiresAt: { gt: new Date() } },
      select: { id: true, email: true, role: true }, orderBy: { createdAt: 'desc' },
    }) : [];
    return { community, members, invitations, roles, inviteRoles, ownMember: member?.id, transfer: member?.role === 'owner' };
  });
}

async function lockCommunity(tx: Tx, slug: string) {
  await tx.$queryRaw`SELECT id FROM Community WHERE slug = ${slug} FOR UPDATE`;
}

export function changeWorkspace(actorId: string, slug: string, body: Input) {
  return prisma.$transaction(async tx => {
    await lockCommunity(tx, slug);
    await lockUser(tx, actorId);
    const { community, organizationId, member, platform, manages } = await scope(tx, actorId, slug);
    const communityId = community.id;
    const record = (action: string, target: string) => audit(tx, actorId, communityId, action, target);
    switch (body.action) {
      case 'profile': {
        const editable = ['summary', 'description', 'logoUrl', 'locationUrl', 'instagramUrl', 'websiteUrl', 'established'];
        fields(body, ['action', ...editable]);
        if (!platform && (!member || !allowed(member.role, 'profile'))) denied();
        if (community.publicationStatus === 'ARCHIVED') conflict('Komunitas telah diarsipkan.');
        const data = await readProfile({ ...community, ...body });
        await tx.community.update({ where: { id: communityId }, data });
        await record('profile.updated', communityId);
        break;
      }
      case 'invite': {
        if (community.publicationStatus === 'ARCHIVED') conflict('Komunitas telah diarsipkan.');
        fields(body, ['action', 'email', 'role']);
        const role = body.role;
        if (role !== 'editor' && role !== 'admin' && role !== 'owner') throw new CommunityError('Peran tidak valid.');
        if (role === 'owner') {
          if (!platform || community.claimStatus !== 'CLAIMED' || community.verificationStatus !== 'VERIFIED') denied();
          if (await tx.member.count({ where: { organizationId, role } })) conflict('Komunitas sudah memiliki OWNER.');
        } else if (!manages(role)) denied();
        const email = emailField(body.email);
        const recipient = await tx.user.findUnique({ where: { email } });
        if (!recipient?.emailVerified || emailField(recipient.email) !== email) throw new CommunityError('Gunakan akun dengan email terverifikasi.');
        const existing = await tx.member.findUnique({ where: { organizationId_userId: { organizationId, userId: recipient.id } } });
        if (existing && role !== 'owner') conflict('Pengguna sudah menjadi anggota.');
        if (await tx.invitation.count({ where: { organizationId, status: 'pending', expiresAt: { gt: new Date() },
          OR: [{ recipientId: recipient.id }, ...(role === 'owner' ? [{ role: 'owner' as const }] : [])] } })) conflict('Undangan aktif sudah tersedia.');
        const id = randomBytes(32).toString('base64url');
        await tx.invitation.create({ data: { id, organizationId, inviterId: actorId, recipientId: recipient.id, email, role,
          expiresAt: new Date(Date.now() + 48 * 3600_000) } });
        await record('invitation.created.' + role, recipient.id);
        return { url: authOrigin() + '/Community/invitations#' + id };
      }
      case 'cancel': {
        fields(body, ['action', 'invitation']);
        const id = key(body.invitation);
        const invite = await tx.invitation.findFirst({ where: { organizationId, id, status: 'pending' } });
        if (!invite || invite.id !== id || !(invite.role === 'owner' ? platform : manages(invite.role))) denied();
        await tx.invitation.update({ where: { id }, data: { status: 'canceled' } });
        await record('invitation.canceled', invite.recipientId);
        break;
      }
      case 'remove':
      case 'role':
      case 'transfer': {
        fields(body, body.action === 'role' ? ['action', 'member', 'role'] : ['action', 'member']);
        const target = await tx.member.findFirst({ where: { organizationId, id: key(body.member) } });
        if (!target || target.role === 'owner' || target.id === member?.id) denied();
        if (body.action === 'transfer') {
          if (member?.role !== 'owner') denied();
          const recipient = await tx.user.findUnique({ where: { id: target.userId } });
          if (!recipient?.emailVerified) conflict('Email penerima harus terverifikasi.');
          await tx.member.update({ where: { id: member.id }, data: { role: 'admin', ownerSlot: null } });
          await tx.member.update({ where: { id: target.id }, data: { role: 'owner', ownerSlot: 1, platformBootstrap: false } });
          await record('ownership.transferred', target.userId);
        } else {
          if (!manages(target.role)) denied();
          if (body.action === 'remove') {
            await tx.member.delete({ where: { id: target.id } });
            await record('member.removed', target.userId);
          } else {
            const role = body.role;
            if ((role !== 'admin' && role !== 'editor') || !manages(role)) denied();
            await tx.member.update({ where: { id: target.id }, data: { role, platformBootstrap: false } });
            await record('member.role.' + role, target.userId);
          }
        }
        break;
      }
      default: throw new CommunityError('Tindakan tidak valid.');
    }
    return { success: true };
  }, { isolationLevel: 'ReadCommitted' });
}

export async function acceptInvitation(actorId: string, body: Input) {
  fields(body, ['token']);
  const token = key(body.token);
  const lookup = await prisma.invitation.findUnique({ where: { id: token },
    select: { organization: { select: { communityId: true } } } });
  if (!lookup) denied();
  const communityId = lookup.organization.communityId;
  return prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT id FROM Community WHERE id = ${communityId} FOR UPDATE`;
    await lockUser(tx, actorId);
    const invite = await tx.invitation.findUnique({ where: { id: token }, include: { recipient: true, organization: { include: { community: true } } } });
    if (!invite || invite.id !== token || invite.organization.communityId !== communityId || invite.status !== 'pending'
      || invite.expiresAt.getTime() <= Date.now() || invite.recipientId !== actorId || !invite.recipient.emailVerified
      || emailField(invite.recipient.email) !== invite.email) denied();
    const community = invite.organization.community;
    if (community.publicationStatus === 'ARCHIVED') denied();
    await lockUser(tx, invite.inviterId);
    const issuer = await scope(tx, invite.inviterId, community.slug);
    const organizationId = invite.organizationId;
    if (invite.role === 'owner') {
      if (!issuer.platform || community.claimStatus !== 'CLAIMED' || community.verificationStatus !== 'VERIFIED'
        || await tx.member.count({ where: { organizationId, role: 'owner' } })) denied();
    } else if (!issuer.manages(invite.role)) denied();
    const data = { role: invite.role, ownerSlot: invite.role === 'owner' ? 1 : null, platformBootstrap: false };
    const where = { organizationId_userId: { organizationId, userId: actorId } };
    if (invite.role !== 'owner' && await tx.member.findUnique({ where })) conflict('Pengguna sudah menjadi anggota.');
    await tx.member.upsert({ where, create: { organizationId, userId: actorId, ...data }, update: data });
    await tx.invitation.update({ where: { id: token }, data: { status: 'accepted' } });
    await audit(tx, actorId, communityId, 'invitation.accepted', actorId);
    if (invite.role === 'owner') await audit(tx, invite.inviterId, communityId, 'ownership.assigned', actorId);
    return { success: true, slug: community.slug };
  }, { isolationLevel: 'ReadCommitted' });
}
