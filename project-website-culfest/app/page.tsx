'use client';

import { useState } from 'react';
import Image from 'next/image';
import Hero from './components/Hero';
import AnimateOnView from './components/AnimateOnView';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  return (
    <main className="bg-black">

      {/* ============ HERO SECTION ============ */}
      <Hero onRevealScroll={() => setShowScroll(true)} />

      {/* ============ SCROLL SECTION ============ */}
      {showScroll && (
        <div className="mt-[-50vh] relative z-[7] flex flex-col items-center animate-fadeIn overflow-hidden">

          {/* Scroll top rod */}
          <div className="relative w-[95%] z-[2] drop-shadow-2xl animate-unroll">
            <Image
              src="/images/beranda/scroll-top-bottom.png"
              alt="scroll top"
              width={1920}
              height={60}
              className="w-full object-contain"
            />
          </div>

          {/* Section rows — each bg sits behind its own paper slice */}
          <div className="relative w-full -top-2 animate-unroll">

            {/* Row 1 — About Culfest */}
            <div className="relative w-full">
              {/* bg — full width, behind paper */}
              <div
                className="absolute inset-0 z-0"
                style={{ backgroundImage: "url('/images/beranda/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              {/* paper — centered 80% wide, slice of full 600vh image */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-full z-[1]"
                style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 0' }}
              />
              <section className="relative z-[2] h-screen">
                <div className="mx-auto w-[80%] h-full flex items-center justify-center px-15 pb-10">

                  {/* Card */}
                  <div className="
                      relative w-full rounded-2xl px-15 py-20
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                    {/* Title frame */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center">
                      <Image
                        src="/images/beranda/frame-title.png"
                        alt="frame title"
                        width={320}
                        height={50}
                        className="w-full object-contain"
                      />
                    </div>

                    <div className="grid w-full grid-cols-1 items-stretch gap-8 md:grid-cols-2">
                      <div className="flex flex-col gap-10">
                        <p className="text-sm text-justify text-amber-900 md:text-base">
                          Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk
                          mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum,
                          peta khusus (tematik), dan peta kartometrik, yang masing-masing memiliki fungsi dan
                          karakteristik berbeda. Peta umum menggambarkan permukaan bumi secara menyeluruh dan berfungsi
                          memberikan informasi dasar tentang kenampakan alam maupun buatan.
                        </p>
                        <button
                          className="w-fit rounded-[8px] bg-gradient-to-r from-amber-800 to-[#4d1101]
                                     px-7 py-4 text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-amber-900"
                        >
                          Baca Selengkapnya
                        </button>
                      </div>
                      <div className="flex items-center justify-center md:justify-end">
                        <div className="relative">
                          <Image
                            src="/images/beranda/frame-photo.png"
                            alt="photo frame"
                            height={440}
                            width={312}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clouds — absolute relative to section */}
                <div className="absolute -left-10 top-20 animate-cloudLeft transition-opacity duration-500">
                  <Image src="/images/beranda/awan.png" alt="cloud left" width={260} height={95} className="object-fill" />
                </div>
                <div className="absolute -right-50 top-80 animate-cloudRight transition-opacity duration-500">
                  <Image src="/images/beranda/awan.png" alt="cloud right" width={430} height={180} className="object-fill" />
                </div>

                {/* Mountain at bottom */}
                <AnimateOnView animation="animate-slideInLeft" className="absolute -bottom-10 -left-10 w-screen">
                  <Image src="/images/beranda/mountain.png" alt="mountain" width={1920} height={500} className="h-auto object-cover" priority />
                </AnimateOnView>
              </section>
            </div>

            {/* Row 2 — Linimasa */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/beranda/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -100vh' }} />
              <section className="relative z-[2] h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Linimasa</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

            {/* Row 3 — Jelajah Bareng */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/beranda/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -200vh' }} />
              <section className="relative z-[2] h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Jelajah Bareng</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

            {/* Row 4 — Kompetisi */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/beranda/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -300vh' }} />
              <section className="relative z-[2] h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Kompetisi</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

            {/* Row 5 — Game */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/beranda/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -400vh' }} />
              <section className="relative z-[2] h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Game</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

            {/* Row 6 — Sponsor & Media Partner */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/beranda/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/beranda/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -500vh' }} />
              <section className="relative z-[2] h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Sponsor & Media Partner</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

          </div>

        </div>
      )}

    </main>
  );
}