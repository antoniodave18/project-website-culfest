import { getSessionCookie } from 'better-auth/cookies';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { authOrigin, getAuth } from './auth';

export const adminHome = '/Admin/manajemen';

export async function adminSession(requestHeaders: Headers) {
  if (!getSessionCookie(requestHeaders)) return null;
  try {
    return await getAuth().api.getSession({ headers: requestHeaders });
  } catch {
    throw new Error('Could not verify admin session.');
  }
}

export const requireAdminPage = cache(async () => {
  const session = await adminSession(await headers());
  if (session?.user.role !== 'PLATFORM_ADMIN') redirect('/Admin');
  return session.user.name.trim() || 'Administrator';
});

export function adminJson(body: object, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
}

export function guardAdmin(request: Request): Promise<Response | null>;
export function guardAdmin(request: Request, withActor: true): Promise<Response | string>;
export async function guardAdmin(request: Request, withActor = false) {
  try {
    const session = await adminSession(request.headers);
    if (!session) return adminJson({ success: false, message: 'Silakan masuk.' }, 401);
    if (session.user.role !== 'PLATFORM_ADMIN') {
      return adminJson({ success: false, message: 'Akses ditolak.' }, 403);
    }
    if (!['GET', 'HEAD'].includes(request.method) && request.headers.get('origin') !== authOrigin()) {
      return adminJson({ success: false, message: 'Asal permintaan tidak diizinkan.' }, 403);
    }
    return withActor ? session.user.id : null;
  } catch {
    return adminJson({ success: false, message: 'Layanan autentikasi tidak tersedia.' }, 503);
  }
}

export function votingDisabled() {
  return adminJson({ success: false, message: 'Voting sedang dinonaktifkan.' }, 403);
}

export async function guardedVotingMutation(request: Request) {
  return await guardAdmin(request) ?? votingDisabled();
}
