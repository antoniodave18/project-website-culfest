import { isIP } from 'node:net';
import { adminJson, adminSession } from '@/lib/admin-auth';
import { authOrigin, clientIpHeader, getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const signIn = '/api/auth/sign-in/email';
const signOut = '/api/auth/sign-out';

async function credentials(request: Request) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json' || !request.body) {
    return null;
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  try {
    let size = 0;
    let body = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) {
        void reader.cancel().catch(() => {});
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    const { email, password } = JSON.parse(body + decoder.decode());
    if (
      typeof email !== 'string' || !email.trim() || email.trim().length > 191 ||
      typeof password !== 'string' || !password || password.length > 128
    ) return null;
    return { email: email.trim().toLowerCase(), password };
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  if (pathname !== signIn && pathname !== signOut) return adminJson({ success: false }, 404);

  try {
    const origin = authOrigin();
    if (request.headers.get('origin') !== origin) return adminJson({ success: false }, 403);
    const forwarded = new Headers({ origin, 'content-type': 'application/json' });
    let body = {};

    if (pathname === signIn) {
      const proxyHeader = process.env.AUTH_CLIENT_IP_HEADER?.trim();
      const ip = proxyHeader && request.headers.get(proxyHeader);
      if ((proxyHeader && (!ip || !isIP(ip))) || (!proxyHeader && origin.startsWith('https:'))) {
        return adminJson({ success: false, message: 'Layanan autentikasi tidak tersedia.' }, 503);
      }
      // Use one bucket for direct loopback. Only a trusted ingress may supply per-client IPs.
      forwarded.set(clientIpHeader, ip || '127.0.0.1');
      const input = await credentials(request);
      if (!input) return adminJson({ success: false, message: 'Data masuk tidak valid.' }, 400);
      body = input;
    } else {
      const session = await adminSession(request.headers);
      // Better Auth sign-out clears cookies even when deletion fails. Revoke first.
      if (session) await prisma.session.deleteMany({ where: { id: session.session.id } });
    }

    const response = await getAuth().handler(new Request(new URL(pathname, origin), {
      method: 'POST',
      headers: forwarded,
      body: JSON.stringify(body),
    }));
    if (!response.ok) {
      const result = adminJson({ success: false, message: 'Permintaan autentikasi gagal.' }, response.status);
      const retryAfter = response.headers.get('x-retry-after');
      if (retryAfter) result.headers.set('Retry-After', retryAfter);
      return result;
    }

    // Only the HttpOnly cookie may carry the session token back to the browser.
    const result = adminJson({ success: true });
    for (const cookie of response.headers.getSetCookie()) result.headers.append('Set-Cookie', cookie);
    return result;
  } catch {
    return adminJson({ success: false, message: 'Layanan autentikasi tidak tersedia.' }, 503);
  }
}
