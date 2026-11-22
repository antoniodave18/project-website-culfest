import { Prisma } from '@prisma/client';
import { adminJson, adminSession } from './admin-auth';
import { authOrigin } from './auth';
import { communityBody } from './community-api';
import { CommunityError } from './communities';

export type Input = Record<string, unknown>;
export type Tx = Prisma.TransactionClient;

export function emailField(value: unknown) {
  if (typeof value !== 'string' || value.length > 191 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    throw new CommunityError('Alamat email tidak valid.');
  }
  return value.trim().toLowerCase();
}

export function fields(body: Input, keys: string[]) {
  if (Object.keys(body).some(key => !keys.includes(key))) throw new CommunityError('Kolom tidak diizinkan.');
}

export async function workspaceRequest(request: Request, action: (id: string, body: Input) => Promise<object>) {
  try {
    if (request.headers.get('origin') !== authOrigin()) throw new CommunityError('Asal permintaan ditolak.', 403);
    const session = await adminSession(request.headers);
    if (!session) throw new CommunityError('Silakan masuk.', 401);
    return adminJson(await action(session.user.id, await communityBody(request)));
  } catch (error) {
    if (error instanceof CommunityError) return adminJson({ message: error.message }, error.status);
    if (error instanceof Prisma.PrismaClientKnownRequestError && ['P2034', 'P2002'].includes(error.code)) {
      return adminJson({ message: 'Terjadi perubahan bersamaan. Muat ulang halaman.' }, 409);
    }
    return adminJson({ message: 'Permintaan gagal diproses.' }, 503);
  }
}

export function audit(tx: Tx, actorId: string, communityId: string | null, action: string, targetId: string) {
  return tx.workspaceAudit.create({ data: { actorId, communityId, action, targetId } });
}

export function lockUser(tx: Tx, id: string) {
  return tx.$queryRaw`SELECT id FROM User WHERE id = ${id} FOR UPDATE`;
}
