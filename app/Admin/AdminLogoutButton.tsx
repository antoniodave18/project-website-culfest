'use client';

import { useState } from 'react';

export default function AdminLogoutButton() {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function logout() {
    setBusy(true);
    setFailed(false);
    try {
      const result = await fetch('/api/auth/sign-out', { method: 'POST' });
      if (result.ok) {
        window.location.replace('/Admin');
        return;
      }
      setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={logout} disabled={busy} className="rounded-lg bg-[#9e160c] px-4 py-2 text-white">
        {busy ? 'Memproses…' : 'Keluar'}
      </button>
      {failed && <p role="alert">Gagal keluar. Silakan coba lagi.</p>}
    </div>
  );
}
