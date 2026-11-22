const base = '/Admin/manajemen';

export const adminRoutes = {
  dashboard: { label: 'Dasbor', href: base },
  communities: { label: 'Komunitas', href: `${base}/komunitas` },
  voting: { label: 'Manajemen voting', href: `${base}/voting` },
  candidates: { label: 'Daftar kandidat', href: `${base}/candidates` },
  qr: { label: 'QR voting', href: `${base}/voting/qr` },
  leaderboard: { label: 'Kontrol leaderboard', href: `${base}/leaderboard` },
};

type NavigationItem = { label: string; href?: string };

export const adminNavigation: { label: string; items: NavigationItem[] }[] = [
  {
    label: 'Ruang kerja',
    items: [adminRoutes.dashboard, adminRoutes.communities, { label: 'Acara' }, { label: 'Galeri' }],
  },
  {
    label: 'Layanan budaya',
    items: [{ label: 'Pemesanan budaya' }, { label: 'Sponsorship' }, { label: 'Marketplace' }],
  },
  {
    label: 'Voting & leaderboard',
    items: [adminRoutes.voting, adminRoutes.candidates, adminRoutes.qr, adminRoutes.leaderboard],
  },
  {
    label: 'Administrasi',
    items: [{ label: 'Verifikasi email', href: base + '/verifikasi-email' },
      { label: 'Portal komunitas', href: '/Community' }, { label: 'Analitik' }, { label: 'Pengaturan' }],
  },
];
