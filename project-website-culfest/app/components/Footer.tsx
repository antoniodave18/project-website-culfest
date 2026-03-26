import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden pt-15"
      style={{ backgroundColor: '#8e1305', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative z-2 w-full px-6 md:px-12 pt-20 md:pt-10 pb-6">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-3 max-w-[320px]">
            <div className="flex items-center gap-3">
              <Image
                src="/images/footer/logo-culfest.png"
                alt="logo"
                width={70}
                height={70}
                className="object-cover rounded-full"
              />
              <span className="text-white text-sm font-semibold">Cultural Festival 15</span>
            </div>
            <p className="text-white/70 text-xs md:text-[11px] leading-relaxed">
              Jl. Bhinneka Tunggal Ika, Bulaksumur, Caturtunggal, Depok,
              Sleman, Daerah Istimewa Yogyakarta 55281.
            </p>
          </div>

          <div className="flex gap-5 md:gap-16">
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Pages</span>
              <Link href="/home" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">Culfest</Link>
              <Link href="/about-event" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">Asrama</Link>
              <Link href="/about-event" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">Ormada</Link>
              <Link href="/game" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">FestPlay</Link>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Info</span>
              <Link href="/akun" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">Contact Us</Link>
              <Link href="/faq" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4">
          <a
            href="mailto:culturalfestival15@gmail.com"
            className="text-white/60 text-[11px] hover:text-yellow-400 transition-colors"
          >
            culturalfestival15@gmail.com
          </a>
        </div>

        <div className="w-full h-px bg-white mb-4" />

        <div className="flex justify-between items-center">
          <p className="text-white/50 text-[10px]">© 2025 Culfest 15 . All rights reserved</p>

          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/culfest15" aria-label="Instagram" className="text-white/70 hover:text-yellow-400 transition-colors">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://youtube.com/@culfest15" aria-label="YouTube" className="text-white/70 hover:text-yellow-400 transition-colors">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://tiktok.com/@culfest15" aria-label="TikTok" className="text-white/70 hover:text-yellow-400 transition-colors">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full h-auto z-2">
        <Image
          src="/images/footer/wave.png"
          alt="wave footer"
          width={1920}
          height={300}
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-[15%] z-3">
        <Image
          src="/images/footer/boat.png"
          alt="boat"
          width={500}
          height={185}
          className="object-contain"
        />
      </div>
    </footer>
  );
}