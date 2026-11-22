'use client';

import type { Community } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  claimLabels, communityDirectory, profileFields, publicationLabels, suggestSlug, verificationLabels,
  type ProfileField,
} from '@/lib/community-fields';
import { adminRoutes } from '../navigation';
import StatusSelect from './StatusSelect';

const base = adminRoutes.communities.href;
const api = '/api/admin/communities';
const editablePublication = { DRAFT: publicationLabels.DRAFT, PUBLISHED: publicationLabels.PUBLISHED };
const fields = Object.entries(profileFields) as [ProfileField, typeof profileFields[ProfileField]][];
type Feedback = { message: string; field?: string };
type Profile = Pick<Community, ProfileField | 'id' | 'slugLocked' | 'publicationStatus' | 'claimStatus' | 'verificationStatus'>;

export default function CommunityForm({ community }: { community?: Profile }) {
  const router = useRouter();
  const archived = community?.publicationStatus === 'ARCHIVED';
  const formRef = useRef<HTMLFormElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const editedSlug = useRef(false);
  const [locked, setLocked] = useState(community?.slugLocked ?? false);
  const [published, setPublished] = useState(community?.publicationStatus === 'PUBLISHED');
  const [slug, setSlug] = useState(community?.slug ?? '');
  const [dirty, setDirty] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Feedback | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!dirty) return;
    function warn(event: BeforeUnloadEvent) { event.preventDefault(); }
    function warnOnLink(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.origin !== location.origin
        || (link.target && link.target !== '_self') || link.hasAttribute('download')
        || (link.pathname === location.pathname && link.search === location.search)) return;
      if (!window.confirm('Tinggalkan perubahan yang belum disimpan?')) event.preventDefault();
    }
    window.addEventListener('beforeunload', warn);
    document.addEventListener('click', warnOnLink, true);
    return () => {
      window.removeEventListener('beforeunload', warn);
      document.removeEventListener('click', warnOnLink, true);
    };
  }, [dirty]);

  useEffect(() => {
    if (!error?.field || pending) return;
    const control = formRef.current?.elements.namedItem(error.field);
    if (control instanceof HTMLElement) control.focus();
  }, [error, pending]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setPending(true);
    setError(null);
    setNotice('');
    try {
      const response = await fetch(community ? api + '/' + community.id : api, {
        method: community ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        setError({ message: result.message, field: result.field });
        return;
      }
      setDirty(false);
      setSlug(result.data.slug);
      setLocked(result.data.slugLocked);
      setPublished(result.data.publicationStatus === 'PUBLISHED');
      if (community) {
        setNotice('Perubahan disimpan.');
      } else {
        router.replace(base + '/' + result.data.id + '/edit');
      }
      router.refresh();
    } catch {
      setError({ message: 'Perubahan gagal disimpan. Coba lagi.' });
    } finally {
      setPending(false);
    }
  }

  async function archive() {
    if (!community) return;
    setPending(true);
    setError(null);
    setNotice('');
    try {
      const response = await fetch(api + '/' + community.id + '/archive', { method: 'PATCH' });
      if (!response.ok) {
        setError({ message: (await response.json()).message });
        return;
      }
      setDirty(false);
      router.push(base);
      router.refresh();
    } catch {
      setError({ message: 'Profil gagal diarsipkan. Coba lagi.' });
    } finally {
      dialog.current?.close();
      setPending(false);
    }
  }

  return (
    <main className="admin-overview community-admin">
      <Link href={base}>Kembali ke daftar komunitas</Link>
      <header className="community-heading">
        <h1>{archived ? 'Komunitas diarsipkan' : community ? 'Edit komunitas' : 'Tambah komunitas'}</h1>
        {published ? <Link href={communityDirectory + '/' + slug}>Lihat profil publik</Link> : null}
      </header>
      {archived ? <p>Profil diarsipkan dan tidak tampil di Jelajah Ormada.</p> : null}
      <form ref={formRef} className="community-form" onSubmit={save} onChange={() => setDirty(true)} autoComplete="off">
        <fieldset disabled={archived || pending} className="community-fields">
          <legend>Informasi profil</legend>
          {fields.map(([name, field]) => {
            const message = error?.field === name ? error.message : undefined;
            const props = {
              name, id: 'community-' + name, maxLength: field.limit, required: 'required' in field,
              'aria-invalid': message ? true : undefined,
              'aria-describedby': message ? name + '-error' : name === 'slug' && locked ? 'slug-help' : undefined,
            };
            return (
              <label key={name} htmlFor={props.id} className={name === 'summary' || name === 'description' ? 'community-wide' : undefined}>
                {field.label}
                {name === 'slug' ? (
                  <input {...props} spellCheck={false} value={slug} readOnly={locked}
                    onChange={event => { editedSlug.current = true; setSlug(event.target.value); }} />
                ) : name === 'summary' || name === 'description' ? (
                  <textarea {...props} rows={name === 'description' ? 8 : 3} defaultValue={community?.[name] ?? ''} />
                ) : (
                  <input {...props} type={name.endsWith('Url') && name !== 'logoUrl' ? 'url' : 'text'}
                    spellCheck={name.endsWith('Url') ? false : undefined}
                    defaultValue={community?.[name] ?? ''}
                    onChange={name === 'name' && !community ? event => {
                      if (!editedSlug.current) setSlug(suggestSlug(event.target.value));
                    } : undefined} />
                )}
                {name === 'slug' && locked ? <small id="slug-help">Slug terkunci untuk menjaga alamat profil.</small> : null}
                {message ? <small id={name + '-error'}>{message}</small> : null}
              </label>
            );
          })}
        </fieldset>

        {community ? (
          <fieldset disabled={archived || pending} className="community-fields">
            <legend>Status komunitas</legend>
            <StatusSelect name="publicationStatus" label="Publikasi" labels={archived ? publicationLabels : editablePublication}
              value={community.publicationStatus} error={error?.field === 'publicationStatus' ? error.message : undefined} />
            <StatusSelect name="claimStatus" label="Klaim" labels={claimLabels} value={community.claimStatus}
              error={error?.field === 'claimStatus' ? error.message : undefined} />
            <StatusSelect name="verificationStatus" label="Verifikasi" labels={verificationLabels} value={community.verificationStatus}
              error={error?.field === 'verificationStatus' ? error.message : undefined} />
          </fieldset>
        ) : null}

        <div role="status" className="community-feedback">
          {error ? <p className="community-error">{error.field ? 'Periksa kolom yang ditandai.' : error.message}</p> : notice}
        </div>
        {!archived ? (
          <div className="community-actions">
            <button type="submit" className="community-button" disabled={pending}>
              {pending ? 'Memproses…' : community ? 'Simpan perubahan' : 'Simpan draf'}
            </button>
            {community ? <button type="button" className="community-outline" disabled={pending}
              onClick={() => dialog.current?.showModal()}>Arsipkan profil</button> : null}
          </div>
        ) : null}
      </form>

      {community && !archived ? (
        <dialog ref={dialog} className="community-dialog" aria-labelledby="archive-title"
          onCancel={event => { if (pending) event.preventDefault(); }}>
          <h2 id="archive-title">Arsipkan profil?</h2>
          <p>Profil akan hilang dari Jelajah Ormada. Alamat profil tetap menampilkan pemberitahuan arsip.</p>
          {dirty ? <p>Perubahan pada formulir belum disimpan.</p> : null}
          <div className="community-actions">
            <button type="button" className="community-outline" disabled={pending} onClick={() => dialog.current?.close()}>Batal</button>
            <button type="button" className="community-button" disabled={pending} onClick={archive}>
              {pending ? 'Memproses…' : 'Ya, arsipkan profil'}
            </button>
          </div>
        </dialog>
      ) : null}
    </main>
  );
}
