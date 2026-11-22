import { betterAuth } from 'better-auth/minimal';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import prisma from './prisma';
import { organization } from 'better-auth/plugins/organization';
import { workspaceAccess, workspaceRoles } from './workspace-roles';

export function authOrigin() {
  const url = new URL(process.env.BETTER_AUTH_URL ?? '');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (
    (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) ||
    url.username || url.password || url.pathname !== '/' || url.search || url.hash
  ) {
    throw new Error('BETTER_AUTH_URL must be an HTTPS origin or a local HTTP origin.');
  }
  return url.origin;
}

export const clientIpHeader = 'x-culfest-auth-ip';

function createAuth() {
  const origin = authOrigin();
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error('BETTER_AUTH_SECRET is missing or too short.');

  return betterAuth({
    baseURL: origin,
    secret,
    trustedOrigins: [origin],
    database: prismaAdapter(prisma, { provider: 'mysql' }),
    plugins: [organization({
      ac: workspaceAccess, roles: workspaceRoles, allowUserToCreateOrganization: false,
      requireEmailVerificationOnInvitation: true,
      schema: {
        organization: { additionalFields: { communityId: { type: 'string', required: true, input: false } } },
        invitation: { additionalFields: { recipientId: { type: 'string', required: true, input: false } } },
      },
    })],
    emailAndPassword: { enabled: true, disableSignUp: true, minPasswordLength: 12, maxPasswordLength: 128 },
    user: {
      additionalFields: {
        role: { type: 'string', required: false, defaultValue: 'USER', input: false },
      },
    },
    session: { expiresIn: 8 * 60 * 60, disableSessionRefresh: true, cookieCache: { enabled: false } },
    rateLimit: {
      enabled: true,
      storage: 'database',
      customRules: { '/sign-in/email': { window: 60, max: 5 }, '/sign-out': false },
    },
    advanced: {
      useSecureCookies: origin.startsWith('https:'),
      defaultCookieAttributes: { httpOnly: true, sameSite: 'lax' },
      ipAddress: { ipAddressHeaders: [clientIpHeader] },
    },
    logger: { disabled: true },
    telemetry: { enabled: false },
  });
}

let auth: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  return auth ??= createAuth();
}
