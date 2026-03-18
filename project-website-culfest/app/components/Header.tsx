'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/about-event', label: 'About Event' },
  { href: '/game', label: 'Game' },
  { href: '/faq', label: 'FAQ' },
  { href: '/akun', label: 'Akun' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'linear-gradient(to bottom, #1a0500 0%, #2d0800 60%, #3d0a00cc 100%)',
        borderBottom: '2px solid #6b2500',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top gold ornament line */}
      <div className="w-full h-[2px]" style={{ background: 'linear-gradient(to right, transparent, #c8860a, #ffd46c, #c8860a, transparent)' }} />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#c8860a] shadow-[0_0_10px_rgba(200,134,10,0.4)]">
            <Image
              src="/images/footer/logo-culfest.png"
              alt="CulFest Logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <span
            className="text-[#ffd46c] text-lg tracking-wider font-bold transition-colors duration-200 group-hover:text-white"
            style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
          >
            CULFEST 15
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: "var(--font-merriweather), serif",
                  color: isActive ? '#ffd46c' : 'rgba(255,255,255,0.75)',
                  background: isActive ? 'rgba(200,134,10,0.15)' : 'transparent',
                  borderRadius: '6px',
                  border: isActive ? '1px solid rgba(200,134,10,0.4)' : '1px solid transparent',
                  fontSize: '0.7rem',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4"
                    style={{ background: 'linear-gradient(to right, transparent, #ffd46c, transparent)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Bottom gold ornament line */}
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #c8860a40, #ffd46c80, #c8860a40, transparent)' }} />
    </header>
  );
}