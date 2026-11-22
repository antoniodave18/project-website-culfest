import Link from 'next/link';
import { requireAdminPage } from '@/lib/admin-auth';
import { adminNavigation, adminRoutes } from './navigation';

export const metadata = { title: 'Dasbor Administrasi | CulFest' };

const quickActions = [
  { ...adminRoutes.candidates, description: 'Lihat data kandidat yang tersedia.' },
  { ...adminRoutes.leaderboard, description: 'Tinjau sesi yang tampil di papan peringkat.' },
  { ...adminRoutes.voting, description: 'Buka halaman pengelolaan voting.' },
];

export default async function AdminDashboard() {
  const administrator = await requireAdminPage();

  return (
    <main className="admin-overview">
      <section className="admin-welcome" aria-labelledby="admin-welcome-title">
        <h1 id="admin-welcome-title">Selamat datang, {administrator}</h1>
        <p>Kelola kegiatan dan layanan CulFest dari ruang kerja ini.</p>
      </section>

      <div className="admin-overview-columns">
        <section className="admin-panel" aria-labelledby="admin-quick-title">
          <h2 id="admin-quick-title">Akses cepat</h2>
          <ul className="admin-action-list">
            {quickActions.map(action => (
              <li key={action.href}>
                <Link href={action.href}>
                  <span><strong>{action.label}</strong><small>{action.description}</small></span>
                  <span className="admin-action-arrow" aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="admin-panel" aria-labelledby="admin-activity-title">
          <h2 id="admin-activity-title">Aktivitas dan status</h2>
          <dl className="admin-activity-list">
            <div>
              <dt>Pemungutan suara</dt>
              <dd><span className="admin-status">Dinonaktifkan</span></dd>
            </div>
            <div>
              <dt>Aktivitas terbaru</dt>
              <dd>Riwayat aktivitas belum tersedia.</dd>
            </div>
            <div>
              <dt>Permintaan dan acara mendatang</dt>
              <dd>Data akan tampil saat modul terkait tersedia.</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="admin-roadmap" aria-labelledby="admin-modules-title">
        <h2 id="admin-modules-title">Modul CulFest</h2>
        <ul>
          <li><strong>Voting & leaderboard</strong><span>Halaman pengelolaan tersedia</span></li>
          {adminNavigation.flatMap(group => group.items.filter(item => !item.href)).map(item => (
            <li key={item.label}><strong>{item.label}</strong><span>Dalam rencana</span></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
