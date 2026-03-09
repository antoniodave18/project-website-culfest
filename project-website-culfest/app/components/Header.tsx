import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '16px 32px', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Logo */}
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
        CULFEST
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '24px' }}>
        <Link href="/">Beranda</Link>
        <Link href="/about-event">About Event</Link>
        <Link href="/game">Game</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/akun">Akun</Link>
      </nav>

    </header>
  );
}