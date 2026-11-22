import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import prisma from './prisma';
import { authOrigin } from './auth';
import { CommunityError } from './communities';
import { audit, emailField, fields, lockUser, type Input, type Tx } from './workspace-request';

const lifetime = 15 * 60_000;
const digest = (token: string) => createHash('sha256').update(token).digest();

// The caller holds the user row lock, including when the first window is created.
async function takeAttempt(tx: Tx, userId: string, purpose: 'issue' | 'redeem', max: number) {
  const where = { userId_purpose: { userId, purpose } };
  const window = await tx.verificationWindow.findUnique({ where });
  const now = new Date();
  if (window && now.getTime() - window.startedAt.getTime() < lifetime) {
    if (window.attempts >= max) return false;
    await tx.verificationWindow.update({ where, data: { attempts: { increment: 1 } } });
  } else {
    const data = { startedAt: now, attempts: 1 };
    await tx.verificationWindow.upsert({ where, update: data, create: { userId, purpose, ...data } });
  }
  return true;
}

export async function issueEmailChallenge(actorId: string, body: Input) {
  fields(body, ['email']);
  const email = emailField(body.email);
  const result = await prisma.$transaction(async tx => {
    await lockUser(tx, actorId);
    const actor = await tx.user.findUnique({ where: { id: actorId } });
    if (actor?.role !== 'PLATFORM_ADMIN') throw new CommunityError('Akses ditolak.', 403);
    if (!await takeAttempt(tx, actorId, 'issue', 20)) return { error: 429 } as const;
    const target = await tx.user.findUnique({ where: { email }, select: { id: true } });
    if (!target || target.id === actorId) return { error: 400 } as const;
    await lockUser(tx, target.id);
    const user = await tx.user.findUnique({ where: { id: target.id } });
    if (!user || user.emailVerified || emailField(user.email) !== email) return { error: 400 } as const;
    const previous = await tx.emailChallenge.findUnique({ where: { userId: user.id } });
    const now = Date.now();
    if (previous && now - previous.issuedAt.getTime() < 60_000) return { error: 429 } as const;
    const token = randomBytes(32).toString('base64url');
    const data = { email, digest: digest(token).toString('hex'), issuedAt: new Date(now), expiresAt: new Date(now + lifetime) };
    await tx.emailChallenge.upsert({ where: { userId: user.id }, create: { userId: user.id, ...data }, update: data });
    await audit(tx, actorId, null, 'verification.issued', user.id);
    return { url: authOrigin() + '/Community/verify#' + token };
  }, { isolationLevel: 'ReadCommitted' });
  if (result.error) throw new CommunityError(result.error === 429 ? 'Terlalu banyak permintaan.' : 'Akun tidak memenuhi syarat.', result.error);
  return { url: result.url };
}

export async function redeemEmailChallenge(actorId: string, body: Input) {
  fields(body, ['token']);
  const token = body.token;
  const status = await prisma.$transaction(async tx => {
    await lockUser(tx, actorId);
    if (!await takeAttempt(tx, actorId, 'redeem', 10)) return 429;
    const challenge = await tx.emailChallenge.findUnique({ where: { userId: actorId }, include: { user: true } });
    if (!challenge || typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)
      || challenge.user.emailVerified || challenge.email !== emailField(challenge.user.email)
      || challenge.expiresAt.getTime() <= Date.now()
      || !timingSafeEqual(Buffer.from(challenge.digest, 'hex'), digest(token))) return 400;
    await tx.user.update({ where: { id: actorId }, data: { emailVerified: true } });
    await tx.emailChallenge.delete({ where: { userId: actorId } });
    await audit(tx, actorId, null, 'verification.completed', actorId);
    return 200;
  }, { isolationLevel: 'ReadCommitted' });
  if (status !== 200) throw new CommunityError(status === 429 ? 'Terlalu banyak percobaan.' : 'Tautan tidak berlaku untuk akun ini.', status);
  return { success: true };
}
