'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <><p role="alert">Ruang komunitas tidak dapat dimuat.</p><button onClick={reset}>Coba lagi</button></>;
}
