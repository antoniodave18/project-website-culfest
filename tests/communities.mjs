import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { seedCommunities } from '../scripts/seed-communities.mjs';

const api = '/api/admin/communities';
const adminPage = '/Admin/manajemen/komunitas';
const directory = '/home/jelajah/ormada';
const profiles = JSON.parse(readFileSync(new URL('../prisma/ormada-seed.json', import.meta.url), 'utf8'));
const statuses = { publicationStatus: 'PUBLISHED', claimStatus: 'CLAIMED', verificationStatus: 'VERIFIED' };

function markup(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

function escapeHtml(value) {
  return value.replace(/[&'"<>]/g, char => ({
    '&': '&amp;', "'": '&#x27;', '"': '&quot;', '<': '&lt;', '>': '&gt;',
  })[char]);
}

export async function verifyCommunities({ db, status, request, cookie, userCookie }) {
  assert.equal(profiles.length, 25);
  const slugs = profiles.map(profile => profile.slug);
  assert.equal(new Set(slugs).size, 25);
  const seed = await seedCommunities(db);
  assert.deepEqual(seed.missingLogos, []);
  const stored = await db.community.findMany({ where: { slug: { in: slugs } }, orderBy: { sortOrder: 'asc' } });
  assert.equal(stored.length, 25);
  for (const [index, original] of profiles.entries()) {
    const row = stored[index];
    for (const [key, value] of Object.entries(original)) assert.equal(row[key], value, original.slug + ' ' + key);
    assert.equal(row.publicationStatus, 'PUBLISHED');
    assert.equal(row.claimStatus, 'UNCLAIMED');
    assert.equal(row.verificationStatus, 'UNVERIFIED');
    assert.equal(row.slugLocked, true);
  }

  const row = stored[0];
  try {
    const edited = await db.community.update({ where: { id: row.id }, data: { name: 'Seed edit fixture' } });
    assert.deepEqual(await seedCommunities(db), { inserted: 0, skipped: 25, missingLogos: [] });
    assert.deepEqual(await db.community.findUnique({ where: { id: row.id } }), edited);
  } finally {
    await db.community.update({ where: { id: row.id }, data: { name: row.name, updatedAt: row.updatedAt } });
  }

  const html = markup(await (await status(directory, 200)).text());
  const links = [...html.matchAll(/href="\/home\/jelajah\/ormada\/([a-z0-9-]+)"/g)].map(match => match[1]);
  assert.deepEqual(links.filter(slug => slugs.includes(slug)), [...slugs, ...slugs]);
  for (const original of profiles) {
    const profile = markup(await (await status(directory + '/' + original.slug, 200)).text());
    for (const text of [original.name, original.description, original.established, original.locationUrl, original.instagramUrl]) {
      if (text) assert.ok(profile.includes(escapeHtml(text)), original.slug + ' original profile content');
    }
    assert.ok(profile.includes(encodeURIComponent(original.logoUrl)));
    assert.ok(!/claimStatus|verificationStatus|slugLocked/.test(profile));
  }
  await status(directory + '/does-not-exist', 404);
  await status(directory + '/KEMPGAMA', 404);

  const seededRecordPath = api + '/' + row.id;
  const operations = [['GET', api], ['GET', seededRecordPath], ['POST', api],
    ['PATCH', seededRecordPath], ['PATCH', seededRecordPath + '/archive']];
  for (const [active, code] of [[undefined, 401], [userCookie, 403]]) {
    for (const [method, path] of operations) {
      const response = await status(path, code, { method, cookie: active });
      assert.match(response.headers.get('cache-control'), /private, no-store/);
    }
    for (const path of [adminPage, adminPage + '/new', adminPage + '/' + row.id + '/edit']) {
      assert.equal((await status(path, 307, { cookie: active })).headers.get('location'), '/Admin');
    }
  }
  for (const [method, path] of operations.filter(([method]) => method !== 'GET')) {
    await status(path, 403, { method, cookie, site: 'https://example.test' });
  }
  for (const path of [adminPage, adminPage + '/new', adminPage + '/' + row.id + '/edit']) {
    await status(path, 200, { cookie });
  }
  const listing = await status(api + '?publication=PUBLISHED&claim=UNCLAIMED&verification=UNVERIFIED', 200, { cookie });
  const { data: list } = await listing.json();
  assert.ok(list.total >= 25);
  assert.equal(list.items.length, 20);
  assert.match(listing.headers.get('cache-control'), /private, no-store/);
  await status(api + '?claim=unknown', 400, { cookie });
  await status(api + '?page=0', 400, { cookie });
  await status(api + '/invalid-id', 400, { cookie });
  await status(api + '/' + randomUUID(), 404, { cookie });

  const slug = 'fixture-' + randomUUID();
  const draft = { slug: slug.toUpperCase(), name: slug, summary: 'Synthetic summary', description: 'Synthetic description' };
  const post = (body, code) => status(api, code, { method: 'POST', cookie, body });
  try {
    for (const [body, code] of [
      [{ ...draft, slug: '../bad' }, 400], [{ ...draft, name: '  ' }, 400],
      [{ ...draft, summary: 'x'.repeat(501) }, 400], [{ ...draft, description: '' }, 400],
      [{ ...draft, logoUrl: '/images/../private.png' }, 400],
      [{ ...draft, logoUrl: '/images/nonexistent.png' }, 400],
      [{ ...draft, websiteUrl: 'javascript:alert(1)' }, 400],
      [{ ...draft, instagramUrl: 'https://example.test/ig' }, 400],
      [{ ...draft, locationUrl: 'https://www.google.com.example.test/maps' }, 400],
      ['{', 400], [[], 400], [{ ...draft, description: 'x'.repeat(140000) }, 413],
    ]) await post(body, code);

    const bodies = await Promise.all([1, 2].map(() => request(api, { method: 'POST', cookie, body: draft })));
    assert.deepEqual(bodies.map(response => response.status).sort(), [201, 409]);
    const created = (await bodies.find(response => response.status === 201).json()).data;
    assert.equal(created.slug, slug);
    assert.equal(created.publicationStatus, 'DRAFT');
    assert.equal(created.claimStatus, 'UNCLAIMED');
    assert.equal(created.verificationStatus, 'UNVERIFIED');
    await status(directory + '/' + slug, 404);
    assert.ok(!(await (await status(directory, 200)).text()).includes(directory + '/' + slug));

    const record = api + '/' + created.id;
    await status(record, 200, { cookie });
    const patch = (body, code) => status(record, code, { method: 'PATCH', cookie, body });
    await patch({ ...draft, ...statuses, publicationStatus: 'ARCHIVED' }, 400);
    const newSlug = slug + '-new';
    const editing = { ...draft, ...statuses, slug: newSlug, name: 'Published synthetic community',
      description: 'Published synthetic description', websiteUrl: 'https://example.test' };
    const published = (await (await patch(editing, 200)).json()).data;
    assert.equal(published.slug, newSlug);
    assert.equal(published.slugLocked, true);
    assert.equal(published.claimStatus, 'CLAIMED');
    assert.equal(published.verificationStatus, 'VERIFIED');
    const path = directory + '/' + newSlug;
    assert.match(await (await status(path, 200)).text(), /Published synthetic description/);
    await patch({ ...editing, description: 'Updated public text' }, 200);
    assert.match(await (await status(path, 200)).text(), /Updated public text/);
    await patch({ ...editing, slug }, 409);
    await patch({ ...editing, publicationStatus: 'DRAFT' }, 200);
    await status(path, 404);
    await patch({ ...editing, publicationStatus: 'DRAFT', slug }, 409);
    await patch(editing, 200);
    const competing = await Promise.all([
      request(record, { method: 'PATCH', cookie, body: editing }),
      request(record + '/archive', { method: 'PATCH', cookie }),
    ]);
    assert.ok([200, 409].includes(competing[0].status));
    assert.equal(competing[1].status, 200);
    await status(record + '/archive', 200, { method: 'PATCH', cookie });
    await patch(editing, 409);
    await post({ ...draft, slug: newSlug }, 409);
    assert.equal((await db.community.findUnique({ where: { id: created.id } })).publicationStatus, 'ARCHIVED');
    assert.match(await (await status(path, 200)).text(), /Profil komunitas diarsipkan/);
    assert.ok(!(await (await status(directory, 200)).text()).includes(path));
    console.log('M2.1 seed, 25 public profiles, CRUD, validation, authorization and publication: passed.');
  } finally {
    await db.community.deleteMany({ where: { slug: { in: [slug, slug + '-new'] } } });
  }
}
