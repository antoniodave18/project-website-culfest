'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  endpoint: string; label: string; children?: ReactNode; values?: Record<string, string>;
  confirmation?: string; onSuccess?: () => void; fragment?: React.RefObject<string>;
};
export default function ActionForm({ endpoint, label, children, values, confirmation, onSuccess, fragment }: Props) {
  const router = useRouter();
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || (confirmation && !window.confirm(confirmation))) return;
    const body = { ...values, ...Object.fromEntries(new FormData(event.currentTarget)), ...(fragment && { token: fragment.current }) };
    pending.current = true;
    setBusy(true);
    setUrl('');
    setMessage('');
    try {
      const response = await fetch(endpoint, { method: 'POST', cache: 'no-store', referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) { setMessage(data.message ?? 'Permintaan ditolak. Periksa akun Anda.'); return; }
      if (data.url) setUrl(data.url);
      setMessage('Berhasil.');
      if (onSuccess) onSuccess();
      else if (data.slug) router.replace('/Community/workspaces/' + encodeURIComponent(data.slug));
      else router.refresh();
    } catch { setMessage('Gagal menghubungi layanan. Silakan coba lagi.'); }
    finally { pending.current = false; setBusy(false); }
  }
  return <form method="post" className="community-form" onSubmit={submit} onChange={() => { setUrl(''); setMessage(''); }}>
    {children && <fieldset disabled={busy} className="grid min-w-0 gap-3">{children}</fieldset>}
    <button className="community-button" disabled={busy}>{busy ? 'Memproses…' : label}</button>
    <p role="status" className="community-feedback">{message}</p>
    {url && <div>
      <label>Tautan untuk dikirim melalui email secara manual
        <input readOnly value={url} onFocus={event => event.target.select()} spellCheck={false} autoComplete="off" />
      </label>
      <button type="button" className="community-outline" onClick={async () => {
        try { await navigator.clipboard.writeText(url); setMessage('Tautan disalin.'); }
        catch { setMessage('Pilih dan salin tautan secara manual.'); }
      }}>Salin tautan</button>
    </div>}
  </form>;
}
