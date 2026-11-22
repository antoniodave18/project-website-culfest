import Link from 'next/link';
import { requireAdminPage } from '@/lib/admin-auth';
import { CommunityError, communityFilters, listCommunities } from '@/lib/communities';
import { claimLabels, publicationLabels, verificationLabels } from '@/lib/community-fields';
import { adminRoutes } from '../navigation';
import StatusSelect from './StatusSelect';

const base = adminRoutes.communities.href;
const date = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta',
});

export default async function CommunitiesPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminPage();
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    if (typeof value === 'string') params.set(key, value);
  }
  let filters;
  try {
    filters = communityFilters(params);
  } catch (error) {
    if (!(error instanceof CommunityError)) throw error;
    return (
      <main className="admin-overview community-admin">
        <h1>Komunitas</h1>
        <p role="alert">{error.message}</p>
        <Link href={base}>Hapus filter</Link>
      </main>
    );
  }

  const { items, total, page, pageSize } = await listCommunities(filters);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  function pageHref(number: number) {
    const query = new URLSearchParams(params);
    query.set('page', String(number));
    return base + '?' + query.toString();
  }

  return (
    <main className="admin-overview community-admin">
      <header className="community-heading">
        <h1>Komunitas</h1>
        <Link href={base + '/new'} className="community-button">Tambah komunitas</Link>
      </header>

      <form action={base} className="community-filters" aria-label="Filter komunitas" autoComplete="off">
        <label>Cari nama<input type="search" name="q" maxLength={160} defaultValue={filters.q} /></label>
        <StatusSelect name="publication" label="Publikasi" labels={publicationLabels} value={filters.publication} all />
        <StatusSelect name="claim" label="Klaim" labels={claimLabels} value={filters.claim} all />
        <StatusSelect name="verification" label="Verifikasi" labels={verificationLabels} value={filters.verification} all />
        <div className="community-actions">
          <button type="submit" className="community-button">Terapkan filter</button>
          <Link href={base}>Hapus filter</Link>
        </div>
      </form>

      {items.length ? (
        <ul className="community-list" aria-label="Daftar komunitas">
          {items.map(item => (
            <li key={item.id}>
              <div className="community-identity">
                <h2>{item.name}</h2>
                <p translate="no">{item.slug}</p>
              </div>
              <dl className="community-statuses">
                <div><dt>Publikasi</dt><dd>{publicationLabels[item.publicationStatus]}</dd></div>
                <div><dt>Klaim</dt><dd>{claimLabels[item.claimStatus]}</dd></div>
                <div><dt>Verifikasi</dt><dd>{verificationLabels[item.verificationStatus]}</dd></div>
                <div><dt>Diperbarui (WIB)</dt><dd><time dateTime={item.updatedAt.toISOString()}>{date.format(item.updatedAt)}</time></dd></div>
              </dl>
              <Link href={base + '/' + item.id + '/edit'} aria-label={(item.publicationStatus === 'ARCHIVED' ? 'Lihat ' : 'Edit ') + item.name}>
                {item.publicationStatus === 'ARCHIVED' ? 'Lihat' : 'Edit'}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="community-empty">
          {total ? 'Halaman ini kosong. Kembali ke halaman pertama.'
            : filters.q || filters.publication || filters.claim || filters.verification
              ? 'Tidak ada komunitas yang cocok. Ubah pencarian atau filter.'
              : 'Belum ada komunitas. Tambahkan komunitas pertama.'}
        </p>
      )}

      {pageCount > 1 || page > 1 ? (
        <nav className="community-actions" aria-label="Halaman daftar komunitas">
          {page > 1 ? <Link href={pageHref(page > pageCount ? 1 : page - 1)}>
            {page > pageCount ? 'Halaman pertama' : 'Sebelumnya'}
          </Link> : null}
          <span>Halaman {page.toLocaleString('id-ID')} dari {pageCount.toLocaleString('id-ID')}</span>
          {page < pageCount ? <Link href={pageHref(page + 1)}>Berikutnya</Link> : null}
        </nav>
      ) : null}
    </main>
  );
}
