'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ActionForm from './ActionForm';
import Login from './Login';

export default function Recipient({ signedIn, verification }: { signedIn: boolean; verification: boolean }) {
  const token = useRef('');
  const [authenticated, setAuthenticated] = useState(signedIn);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (location.hash) {
      token.current = location.hash.slice(1);
      history.replaceState(history.state, '', location.pathname);
    }
  }, []);
  if (complete) return <><p role="status">{verification ? 'Email berhasil diverifikasi.' : 'Undangan diterima.'}</p><Link href="/Community">Buka portal komunitas</Link></>;
  return <><p>Gunakan akun dengan alamat email yang menerima tautan ini.</p>
    {authenticated ? <><ActionForm endpoint={verification ? '/api/community/verify' : '/api/community/invitations'}
      label={verification ? 'Verifikasi email saya' : 'Terima undangan'} fragment={token}
      onSuccess={() => { token.current = ''; setComplete(true); }} />
      <ActionForm endpoint="/api/auth/sign-out" label="Ganti akun" onSuccess={() => setAuthenticated(false)} /></>
      : <Login onSuccess={() => setAuthenticated(true)} />}</>;
}
