import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const output = '.playwright-cli/m22';
export async function verifyMembershipBrowser({ db, fixture, login, admin, origin, status }) {
  const { chromium } = createRequire(import.meta.url)(process.env.CULFEST_PLAYWRIGHT_MODULE);
  const browser = await chromium.launch({channel:'chrome'});
  await mkdir(output,{recursive:true});
  try {
    for (const [device,width,height] of [['desktop',1440,960],['tablet',768,1024],['mobile',390,844]]) {
      const contexts = [];
      const errors = [];
      const pageFor = async () => {
        const context = await browser.newContext({viewport:{width,height},hasTouch:device!=='desktop',isMobile:device!=='desktop'});
        contexts.push(context);
        const page = await context.newPage();
        page.setDefaultTimeout(8000);
        page.on('pageerror',error=>errors.push(error.name));
        page.on('response',response=>{ if(response.status()>=500 && response.url().startsWith(origin+'/')) errors.push('HTTP '+response.status()); });
        return page;
      };
      const operator = await pageFor(), owner = await pageFor(), editor = await pageFor();
      const account = await fixture('USER'), recipient = await fixture('USER');
      const slug = 'portal-'+randomUUID();
      const name = 'Komunitas Uji '+device;
      const draft = {name,slug,summary:'Ringkasan komunitas uji',description:'Profil komunitas uji'};
      const cookie = await login(admin);
      const row = (await (await status('/api/admin/communities',201,{cookie,method:'POST',body:draft})).json()).data;
      const base = origin+'/Community/workspaces/'+slug;
      const click = (page,label)=>page.getByRole('button',{name:label,exact:true}).click();
      const loginUi = async (page,person) => {
        await page.getByLabel('Email',{exact:true}).fill(person.email);
        await page.getByLabel('Kata sandi',{exact:true}).fill(person.password);
        await click(page,'Masuk');
      };
      try {
        await status('/api/admin/communities/'+row.id,200,{method:'PATCH',cookie,body:{...draft,publicationStatus:'PUBLISHED',claimStatus:'CLAIMED',verificationStatus:'VERIFIED'}});
        await operator.goto(origin+'/Community');
        await loginUi(operator,admin);
        await operator.getByRole('link',{name,exact:true}).waitFor();
        for(const [page,person] of [[owner,account],[editor,recipient]]) {
          await operator.goto(origin+'/Admin/manajemen/verifikasi-email');
          await operator.getByLabel('Email akun').fill(person.email);
          await click(operator,'Buat tautan verifikasi');
          const url = await operator.locator('input[readonly]').inputValue();
          const response = await page.goto(url);
          assert.equal(response.headers()['referrer-policy'],'no-referrer');
          await loginUi(page,person);
          await click(page,'Verifikasi email saya');
          await page.getByText('Email berhasil diverifikasi.',{exact:true}).waitFor();
          assert.ok(!page.url().includes('#'));
          if (page === owner) await page.screenshot({path:output+'/'+device+'-verification.png'});
        }
        await editor.goto(base);
        await editor.getByRole('heading',{name:'Akses ditolak'}).waitFor();
        await operator.goto(base+'/members');
        const invite = async (page,email,role) => {
          await page.getByLabel('Email penerima').fill(email);
          await page.getByLabel('Peran undangan').selectOption(role);
          await click(page,'Buat undangan');
          return page.locator('input[readonly]').inputValue();
        };
        const accept = async (page,url) => {
          await page.goto(url);
          await click(page,'Terima undangan');
          await page.getByText('Undangan diterima.',{exact:true}).waitFor();
          await page.getByRole('link',{name:'Buka portal komunitas'}).click();
          await page.getByRole('link',{name,exact:true}).click();
          await page.getByRole('heading',{name,exact:true}).waitFor();
        };
        await accept(owner,await invite(operator,account.email,'owner'));
        await owner.getByRole('link',{name:'Anggota',exact:true}).click();
        await invite(owner,recipient.email,'editor');
        await click(owner,'Batalkan undangan');
        await owner.getByText('Belum ada undangan aktif.',{exact:true}).waitFor();
        await accept(editor,await invite(owner,recipient.email,'editor'));
        await editor.getByLabel('Ringkasan').fill('Diperbarui oleh editor.');
        await click(editor,'Simpan profil');
        await editor.getByRole('status').filter({hasText:'Berhasil.'}).waitFor();
        await editor.reload();
        assert.equal(await editor.getByLabel('Ringkasan').inputValue(),'Diperbarui oleh editor.');
        await editor.getByRole('link',{name:'Anggota',exact:true}).click();
        await editor.getByRole('heading',{name:'Anggota komunitas'}).waitFor();
        assert.equal(await editor.getByRole('button',{name:'Buat undangan'}).count(),0);
        await owner.reload();
        const target = owner.getByRole('listitem').filter({has:owner.getByText('USER · EDITOR',{exact:true})});
        await target.getByLabel('Peran anggota').selectOption('admin');
        await target.getByRole('button',{name:'Ubah peran'}).click();
        const promoted = owner.getByRole('listitem').filter({has:owner.getByText('USER · ADMIN',{exact:true})});
        owner.once('dialog',dialog=>dialog.accept());
        await promoted.getByRole('button',{name:'Alihkan kepemilikan'}).click();
        await owner.getByRole('button',{name:'Alihkan kepemilikan'}).first().waitFor({state:'hidden'});
        await editor.reload();
        await editor.getByRole('button',{name:'Alihkan kepemilikan'}).first().waitFor();
        assert.equal(await editor.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
        await editor.screenshot({path:output+'/'+device+'-members.png'});
        assert.deepEqual(errors,[]);
        console.log('M2.2 browser '+device+': verification, invitation, role change, transfer, profile and denial passed.');
      } finally {
        await Promise.all(contexts.map(context=>context.close()));
        await db.community.deleteMany({where:{id:row.id}});
      }
    }
  } finally { await browser.close(); }
}
