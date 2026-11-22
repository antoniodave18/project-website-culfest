import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'better-auth/crypto';
import next from 'next';
import { localDatabase, safeFailure, verifyHistory } from '../scripts/local-database.mjs';
import { verifyCommunities } from './communities.mjs';
import { verifyCommunityBrowser } from './community-browser.mjs';

const require = createRequire(import.meta.url);
const hostname = '127.0.0.1';
const dashboard = '/Admin/manajemen';
const fixtures = [];
const pages = [
  dashboard,
  '/Admin/manajemen/candidates',
  '/Admin/manajemen/leaderboard',
  '/Admin/manajemen/voting',
  '/Admin/manajemen/voting/qr',
];
const adminRead = '/api/leaderboard-sessions';
const writes = [
  ['POST', '/api/candidates'],
  ['DELETE', '/api/candidates/test'],
  ['POST', '/api/voting-tokens'],
  ['PUT', adminRead],
  ['DELETE', '/api/vote'],
];
const protectedApis = [['GET', adminRead], ...writes];
const ingressHeader = 'x-culfest-test-ingress-ip';
const signIn = '/api/auth/sign-in/email';
const signOut = '/api/auth/sign-out';
const blockedVoting = 'Voting sedang dinonaktifkan.';
let db, app, server, origin;

function prismaCommand(label, args) {
  const result = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), ...args], {
    env: process.env, stdio: 'ignore', windowsHide: true,
  });
  if (result.status !== 0) throw new Error(label);
  console.log(label + ': passed.');
}

async function fixture(role) {
  const id = randomUUID();
  const email = `${id}@example.test`;
  const password = randomBytes(24).toString('base64url');
  await db.user.create({ data: {
    id, name: role, email, role,
    accounts: { create: {
      id: randomUUID(), providerId: 'credential', accountId: id,
      password: await hashPassword(password),
    } },
  } });
  fixtures.push(id);
  return { id, email, password };
}

function randomIp() {
  return '198.' + [18 + (randomBytes(1)[0] & 1), ...randomBytes(2)].join('.');
}

async function request(path, { method = 'GET', cookie, body, site = origin, ip = randomIp() } = {}) {
  const headers = { [ingressHeader]: ip };
  if (method !== 'GET') headers.origin = site;
  if (cookie) headers.cookie = cookie;
  if (body !== undefined) headers['content-type'] = 'application/json';
  return fetch(origin + path, {
    method, headers, redirect: 'manual', signal: AbortSignal.timeout(30000),
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

async function status(path, expected, options) {
  const response = await request(path, options);
  assert.equal(response.status, expected, `${options?.method ?? 'GET'} ${path}`);
  return response;
}

async function denied(cookie, expectedStatus) {
  for (const page of pages) {
    const response = await status(page, 307, { cookie });
    assert.equal(response.headers.get('location'), '/Admin');
  }
  for (const [method, path] of protectedApis) await status(path, expectedStatus, { method, cookie });
}

async function login({ email, password }) {
  const response = await status(signIn, 200, { method: 'POST', body: { email, password } });
  assert.deepEqual(Object.keys(await response.json()), ['success']);
  const session = response.headers.getSetCookie().find(cookie => cookie.startsWith('better-auth.session_token='));
  assert.ok(session && /;\s*httponly\b/i.test(session) && /;\s*samesite=lax\b/i.test(session));
  assert.ok(/;\s*max-age=28800\b/i.test(session));
  return session.split(';', 1)[0];
}

async function run() {
  process.env.DATABASE_URL = localDatabase('TEST_DATABASE_URL', 'culfest_test');
  localDatabase('SHADOW_DATABASE_URL', 'culfest_shadow');
  db = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const [row] = await db.$queryRaw`
    SELECT DATABASE() AS schema_name,
      (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()) AS table_count
  `;
  assert.equal(row.schema_name, 'culfest_test');
  if (Number(row.table_count) > 0) await verifyHistory(db, { allowPending: true });
  prismaCommand('Disposable MySQL migration deploy', ['migrate', 'deploy']);
  await verifyHistory(db);
  prismaCommand('Deployed schema comparison', [
    'migrate', 'diff', '--from-schema-datasource', 'prisma/schema.prisma',
    '--to-schema-datamodel', 'prisma/schema.prisma', '--exit-code',
  ]);

  server = createServer((req, res) => {
    if (req.url === signIn && !req.headers[ingressHeader]) req.headers[ingressHeader] = randomIp();
    return app.getRequestHandler()(req, res);
  });
  await new Promise((resolve, reject) => server.once('error', reject).listen(0, hostname, resolve));
  const { port } = server.address();
  origin = `http://${hostname}:${port}`;
  process.env.BETTER_AUTH_URL = origin;
  process.env.BETTER_AUTH_SECRET = randomBytes(32).toString('hex');
  process.env.AUTH_CLIENT_IP_HEADER = ingressHeader;
  app = next({ dev: false, dir: process.cwd(), hostname, port, httpServer: server });
  await app.prepare();

  const admin = await fixture('PLATFORM_ADMIN');
  const user = await fixture('USER');

  await status('/Admin', 200);
  await denied(undefined, 401);
  await status('/api/login', 410, { method: 'POST', body: {} });
  await status('/api/auth/sign-up/email', 404, { method: 'POST', body: {} });
  await status(signIn, 400, { method: 'POST', body: '{' });
  await status(signIn, 401, { method: 'POST', body: { email: admin.email, password: 'incorrect' } });
  await status(signIn, 403, { method: 'POST', body: admin, site: 'https://example.test' });
  console.log('Anonymous guards, retired login, and invalid credentials: passed.');

  const userCookie = await login(user);
  await denied(userCookie, 403);
  assert.ok((await (await status('/Admin', 200, { cookie: userCookie })).text()).includes('Akses admin ditolak'));
  const cookie = await login(admin);
  assert.equal(await db.session.count({ where: { userId: admin.id } }), 1);
  assert.equal((await status('/Admin', 307, { cookie })).headers.get('location'), dashboard);
  const overview = await status(dashboard, 200, { cookie });
  assert.match(overview.headers.get('cache-control') ?? '', /no-store/);
  const overviewHtml = (await overview.text()).replace(/<!--[\s\S]*?-->/g, '');
  assert.match(overviewHtml, /<h1\b[^>]*>Selamat datang, PLATFORM_ADMIN<\/h1>/);
  assert.ok(overviewHtml.includes('Dinonaktifkan'));
  assert.ok(overviewHtml.includes('Dalam rencana'));
  for (const page of pages) await status(page, 200, { cookie });
  assert.ok((await (await status(adminRead, 200, { cookie })).json()).data.length > 0);
  console.log('Non-admin denial and administrator session persistence: passed.');

  for (const [method, path] of writes) {
    const same = await status(path, 403, { method, cookie });
    assert.equal((await same.json()).message, blockedVoting);
    const cross = await status(path, 403, { method, cookie, site: 'https://example.test' });
    assert.equal((await cross.json()).message, 'Asal permintaan tidak diizinkan.');
  }
  for (const [method, path] of [['POST', '/api/vote'], ['GET', '/api/voting-tokens']]) {
    assert.equal((await (await status(path, 403, { method })).json()).message, blockedVoting);
  }
  await status('/', 200);
  const candidates = await (await status('/api/candidates', 200)).json();
  const leaderboard = await (await status('/api/leaderboard', 200)).json();
  assert.deepEqual(leaderboard.data, candidates.data);
  console.log('Disabled voting, origin controls, and public routes: passed.');

  await verifyCommunities({ db, status, request, cookie, userCookie });

  await db.user.update({ where: { id: admin.id }, data: { role: 'USER' } });
  await denied(cookie, 403);
  await db.user.update({ where: { id: admin.id }, data: { role: 'PLATFORM_ADMIN' } });
  await status(signOut, 403, { method: 'POST', cookie, site: 'https://example.test' });
  await status(signOut, 200, { method: 'POST', cookie });
  assert.equal(await db.session.count({ where: { userId: admin.id } }), 0);
  await denied(cookie, 401);

  const expired = await login(admin);
  await db.session.updateMany({ where: { userId: admin.id }, data: { expiresAt: new Date(0) } });
  await denied(expired, 401);
  const revoked = await login(admin);
  await db.session.deleteMany({ where: { userId: admin.id } });
  await denied(revoked, 401);
  console.log('Role removal, expiry, manual revocation, and logout: passed.');

  const ip = randomIp();
  for (let attempt = 0; attempt < 5; attempt++) {
    await status(signIn, 401, { method: 'POST', ip, body: { email: admin.email, password: 'incorrect' } });
  }
  const throttled = await status(signIn, 429, { method: 'POST', ip, body: { email: admin.email, password: 'incorrect' } });
  assert.ok(Number(throttled.headers.get('retry-after')) > 0);
  console.log('Database sign-in throttling: passed.');

  if (process.argv.includes('--browser')) await verifyCommunityBrowser({ db, origin, admin, user });
}

try {
  await run();
} catch (error) {
  const safeCheck = error instanceof assert.AssertionError || error instanceof TypeError ? '' :
    /^(Disposable MySQL migration deploy|Deployed schema comparison)$/.test(error?.message) ? error.message + ': ' : '';
  const routeCheck = error instanceof assert.AssertionError && /^(GET|POST|PUT|DELETE) \/[\w/-]+$/.test(error.message)
    ? ` (${error.message}, HTTP ${error.actual} expected ${error.expected})` : '';
  const testLocation = error?.stack?.match(/(?:admin-auth|communities|community-browser)\.mjs:\d+:\d+/)?.[0];
  const location = testLocation ? ` at ${testLocation}` : '';
  console.error(`Auth integration failed: ${safeCheck}${safeFailure(error)}${routeCheck}${location}.`);
  process.exitCode = 1;
} finally {
  if (server?.listening) await new Promise(resolve => server.close(resolve));
  await app?.close();
  if (db && fixtures.length) {
    try {
      await db.user.deleteMany({ where: { id: { in: fixtures } } });
    } catch {
      console.error('Could not clean up test accounts.');
      process.exitCode = 1;
    }
  }
  await db?.$disconnect();
}
