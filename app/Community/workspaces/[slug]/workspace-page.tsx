import Link from 'next/link';
import { headers } from 'next/headers';
import { adminSession } from '@/lib/admin-auth';
import { CommunityError } from '@/lib/communities';
import { workspaceView } from '@/lib/workspaces';
import { profileFields } from '@/lib/community-fields';
import Login from '../../Login';
import ActionForm from '../../ActionForm';

export default async function Workspace({ slug, roster }: { slug: string; roster: boolean }) {
  const session = await adminSession(await headers());
  if (!session) return <><h1>Masuk ke ruang komunitas</h1><Login /></>;
  let view;
  try { view = await workspaceView(session.user.id, slug, roster); }
  catch (error) {
    if (!(error instanceof CommunityError) || error.status !== 403) throw error;
    return <><h1>Akses ditolak</h1><Link href="/Community">Kembali ke portal</Link></>;
  }
  const { community, members, invitations, roles, inviteRoles, ownMember, transfer } = view;
  const base = '/Community/workspaces/' + slug;
  const endpoint = '/api/community/workspaces/' + slug;
  return <><Link href="/Community">Kembali ke portal</Link><h1>{community.name}</h1>
    <nav className="community-actions"><Link href={base}>Profil</Link><Link href={base + '/members'}>Anggota</Link></nav>
    {!roster ? <section><h2>Profil komunitas</h2>{community.publicationStatus === 'ARCHIVED' ? <p>Komunitas diarsipkan.</p> :
      <ActionForm endpoint={endpoint} values={{ action: 'profile' }} label="Simpan profil">
        {(['summary', 'description', 'established', 'logoUrl', 'locationUrl', 'instagramUrl', 'websiteUrl'] as const).map(field =>
          <label key={field}>{profileFields[field].label}
            <textarea name={field} defaultValue={community[field] ?? ''} rows={field === 'description' ? 6 : 2}
              maxLength={profileFields[field].limit} required={field === 'summary' || field === 'description'} />
          </label>)}</ActionForm>}</section> : <>
      <section><h2>Anggota komunitas</h2>{!members.length && <p>Belum ada anggota.</p>}
        <ul>{members.map(person => <li key={person.id}><strong>{person.user.name} · {person.role.toUpperCase()}</strong>
          {ownMember !== person.id && roles.includes(person.role) && <>
            {roles.length > 1 && <ActionForm endpoint={endpoint} values={{ action: 'role', member: person.id }} label="Ubah peran">
              <label>Peran anggota<select name="role" defaultValue={person.role}>{roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}</select></label>
            </ActionForm>}
            <ActionForm endpoint={endpoint} values={{ action: 'remove', member: person.id }} label="Hapus anggota" confirmation="Hapus anggota ini?" />
          </>}
          {transfer && ownMember !== person.id && <ActionForm endpoint={endpoint} values={{ action: 'transfer', member: person.id }}
            label="Alihkan kepemilikan" confirmation="Alihkan kepemilikan kepada anggota ini? Peran Anda akan menjadi ADMIN." />}
        </li>)}</ul></section>
      {!!inviteRoles.length && <section><h2>Undangan anggota</h2>
        <p>Kirim tautan melalui email secara manual kepada penerima. Tautan berlaku 48 jam.</p>
        <ActionForm endpoint={endpoint} values={{ action: 'invite' }} label="Buat undangan">
          <label>Email penerima<input name="email" type="email" required /></label>
          <label>Peran undangan<select name="role">{inviteRoles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}</select></label>
        </ActionForm>{!invitations.length && <p>Belum ada undangan aktif.</p>}
        <ul>{invitations.map(i => <li key={i.id}>{i.email} · {i.role.toUpperCase()}
          <ActionForm endpoint={endpoint} values={{ action: 'cancel', invitation: i.id }} label="Batalkan undangan" />
        </li>)}</ul></section>}
    </>}</>;
}
