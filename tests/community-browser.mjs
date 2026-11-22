import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';

const directory = '/home/jelajah/ormada';
const adminPage = '/Admin/manajemen/komunitas';
const output = '.playwright-cli/m21';

export async function verifyCommunityBrowser({ db, origin, admin, user }) {
  assert.ok(process.env.CULFEST_PLAYWRIGHT_MODULE, 'Set CULFEST_PLAYWRIGHT_MODULE to an installed playwright module.');
  const { chromium } = createRequire(import.meta.url)(process.env.CULFEST_PLAYWRIGHT_MODULE);
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });

  try {
    for (const [device, width, height] of [['desktop', 1440, 960], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
      const context = await browser.newContext({
        viewport: { width, height }, isMobile: device !== 'desktop', hasTouch: device !== 'desktop',
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const pageErrors = [];
      const appFailures = [];
      page.on('pageerror', error => pageErrors.push(error.name));
      page.on('response', response => {
        const url = new URL(response.url());
        if (url.origin === origin && response.status() >= 500) appFailures.push(url.pathname);
      });
      await page.route('https://www.google.com/**', route => route.abort());
      const open = path => page.goto(origin + path);
      const capture = name => page.screenshot({ path: output + '/' + device + '-' + name + '.png' });
      const token = randomUUID().slice(0, 8);
      const name = 'Komunitas Uji ' + device + ' ' + token;
      const slug = 'komunitas-uji-' + device + '-' + token;
      const accountLogin = async account => {
        // The server-rendered form is visible before React attaches its submit handler.
        await page.waitForLoadState('networkidle');
        await page.locator('#admin-email').fill(account.email);
        await page.locator('#admin-password').fill(account.password);
        const [response] = await Promise.all([
          page.waitForResponse(origin + '/api/auth/sign-in/email'),
          page.getByRole('button', { name: 'Login', exact: true }).click(),
        ]);
        assert.equal(response.status(), 200, device + ' browser sign-in');
      };

      try {
        await open(adminPage);
        await page.waitForURL(origin + '/Admin');
        await accountLogin(user);
        await page.getByText('Akses admin ditolak', { exact: false }).first().waitFor();
        await open(adminPage + '/new');
        await page.waitForURL(origin + '/Admin');
        await page.getByRole('button', { name: 'Keluar' }).click();
        await page.locator('#admin-email').waitFor();
        await accountLogin(admin);
        await page.waitForURL(origin + '/Admin/manajemen');
        if (device !== 'desktop') await page.locator('.admin-mobile-nav summary').tap();
        await page.getByRole('navigation', { name: 'Navigasi administrasi' })
          .getByRole('link', { name: 'Komunitas', exact: true }).click();
        await page.getByRole('heading', { name: 'Komunitas', exact: true }).waitFor();
        assert.equal(await page.locator('.community-list > li').count(), 20);
        await capture('list');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
        await page.getByRole('link', { name: 'Berikutnya' }).click();
        await page.waitForURL(/page=2$/);
        await page.locator('.community-list > li').first().waitFor();
        await page.getByLabel('Cari nama').fill('Kempgama');
        await page.getByLabel('Publikasi').selectOption('PUBLISHED');
        await page.getByLabel('Klaim').selectOption('UNCLAIMED');
        await page.getByLabel('Verifikasi').selectOption('UNVERIFIED');
        await page.getByRole('button', { name: 'Terapkan filter' }).click();
        await page.waitForURL(/q=Kempgama/);
        await page.getByRole('heading', { name: 'Kempgama', exact: true }).waitFor();
        assert.equal(await page.locator('.community-list > li').count(), 1);
        await page.getByRole('link', { name: 'Tambah komunitas' }).click();
        await page.getByRole('heading', { name: 'Tambah komunitas', exact: true }).waitFor();
        await capture('create');
        const nameInput = page.getByLabel('Nama komunitas');
        const slugInput = page.locator('#community-slug');
        await nameInput.focus();
        await page.keyboard.press('Tab');
        assert.ok(await slugInput.evaluate(input => input === document.activeElement));
        await page.getByRole('button', { name: 'Simpan draf' }).click();
        assert.equal(await nameInput.evaluate(input => input.validity.valueMissing), true);
        await nameInput.fill(name);
        assert.equal(await slugInput.inputValue(), slug);
        page.once('dialog', dialog => dialog.dismiss());
        await page.getByRole('link', { name: 'Kembali ke daftar komunitas' }).click();
        assert.equal(new URL(page.url()).pathname, adminPage + '/new');
        await slugInput.fill('kempgama');
        await page.getByLabel('Ringkasan').fill('Ringkasan untuk pengujian.');
        await page.getByLabel('Deskripsi').fill('Deskripsi untuk pengujian.');
        await page.getByRole('button', { name: 'Simpan draf' }).click();
        await page.getByText('Slug sudah digunakan. Pilih slug lain.').waitFor();
        assert.ok(await slugInput.evaluate(input => input === document.activeElement));
        await slugInput.fill(slug);
        await page.getByRole('button', { name: 'Simpan draf' }).click();
        await page.waitForURL(/\/edit$/);
        await page.getByRole('heading', { name: 'Edit komunitas' }).waitFor();
        assert.equal(await page.getByLabel('Publikasi').inputValue(), 'DRAFT');
        await page.getByLabel('Publikasi').selectOption('PUBLISHED');
        await page.getByLabel('Klaim').selectOption('CLAIMED');
        await page.getByLabel('Verifikasi').selectOption('VERIFIED');
        await page.getByRole('button', { name: 'Simpan perubahan' }).click();
        await page.getByText('Perubahan disimpan.', { exact: true }).waitFor();
        assert.equal(await slugInput.getAttribute('readonly'), '');
        await capture('edit');
        await page.getByRole('link', { name: 'Lihat profil publik' }).click();
        await page.getByRole('heading', { name, exact: true }).waitFor();
        await page.getByRole('link', { name: /Kembali/ }).click();
        await page.getByRole('heading', { name: 'Jelajah Ormada' }).waitFor();
        await capture('directory');
        const kempgama = page.locator('a[href="' + directory + '/kempgama"]:visible');
        await kempgama.click();
        await page.getByRole('heading', { name: 'Kempgama', exact: true }).waitFor();
        assert.ok(await page.locator('iframe[title="Lokasi Kempgama"]').getAttribute('src'));
        await capture('profile');

        const row = await db.community.findUniqueOrThrow({ where: { slug } });
        const edit = adminPage + '/' + row.id + '/edit';
        await open(edit);
        await page.getByLabel('Publikasi').selectOption('DRAFT');
        await page.getByRole('button', { name: 'Simpan perubahan' }).click();
        await page.getByText('Perubahan disimpan.', { exact: true }).waitFor();
        assert.equal(await page.getByRole('link', { name: 'Lihat profil publik' }).count(), 0);
        const archive = page.getByRole('button', { name: 'Arsipkan profil', exact: true });
        await archive.click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor();
        await capture('archive');
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'hidden' });
        assert.ok(await archive.evaluate(button => button === document.activeElement));
        await archive.click();
        await dialog.getByRole('button', { name: 'Ya, arsipkan profil' }).click();
        await page.waitForURL(origin + adminPage);
        await open(directory + '/' + slug);
        await page.getByRole('heading', { name: 'Profil komunitas diarsipkan' }).waitFor();
        assert.deepEqual(pageErrors, []);
        assert.deepEqual(appFailures, []);
        console.log('M2.1 browser ' + device + ': passed.');
      } finally {
        await context.close();
        await db.community.deleteMany({ where: { slug } });
      }
    }
  } finally {
    await browser.close();
  }
}
