'use client';

export default function AdminPageError({ reset }: { reset: () => void }) {
  return (
    <main className="admin-route-message">
      <h1>Halaman gagal dimuat</h1>
      <p>Coba muat ulang halaman administrasi ini.</p>
      <button type="button" onClick={reset}>Coba lagi</button>
    </main>
  );
}
