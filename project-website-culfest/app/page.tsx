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
              src="/images/scroll-top-bottom.png"
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
                style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              {/* paper — centered 80% wide, slice of full 600vh image */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-full z-[1]"
                style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 0' }}
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
                        <p className="text-justify text-amber-900 md:text-base">
                          Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk
                          mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum,
                          peta khusus (tematik), dan peta kartometrik, yang masing-masing memiliki fungsi dan
                          karakteristik berbeda. Peta umum menggambarkan permukaan bumi secara menyeluruh dan berfungsi
                          memberikan informasi dasar tentang kenampakan alam maupun buatan.
                        </p>
                        <button
                          className="w-fit rounded-[8px] bg-gradient-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500]"
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
                  <Image src="/images/awan.png" alt="cloud left" width={260} height={95} className="object-fill" />
                </div>
                <div className="absolute -right-50 top-80 animate-cloudRight transition-opacity duration-500">
                  <Image src="/images/awan.png" alt="cloud right" width={430} height={180} className="object-fill" />
                </div>

                {/* Mountain at bottom */}
                <AnimateOnView animation="animate-slideInLeft" className="absolute -bottom-10 -left-10 w-screen">
                  <Image src="/images/beranda/mountain.png" alt="mountain" width={1920} height={500} className="h-auto object-cover" priority />
                </AnimateOnView>
              </section>
            </div>

            {/* Row 2 — Linimasa */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -100vh' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[2]" style={{ backgroundImage: "url('/images/linimasa/bg-linimasa.png')", backgroundSize: '100% 100%', backgroundPosition: 'center' }} />

              <section className="relative z-[2] h-screen flex items-center justify-center overflow-hidden">

                <div className='absolute top-0 w-full h-28 bg-[#03005e] z-1 flex items-center justify-center'>
                  <Image
                    src="/images/linimasa/title-linimasa.png"
                    alt="title linimasa"
                    width={320}
                    height={65}
                    className="object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>

                {/* Golden ribbon */}
                <div className="absolute w-screen bottom-0 -right-20 z-[0]">
                  <Image
                    src="/images/linimasa/ribbon.png"
                    alt="ribbon"
                    width={1920}
                    height={1200}
                    className="object-contain w-full h-auto"
                  />
                </div>

                {/* Winding path */}
                <AnimateOnView animation="animate-fadeIn" className="absolute bottom-[18%] left-1/2 -translate-x-1/2 z-[2] w-[55%]">
                  <Image
                    src="/images/linimasa/path.png"
                    alt="path"
                    width={900}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </AnimateOnView>

                {/* Gate left */}
                <AnimateOnView animation="animate-fadeInUp" className="absolute w-[7%] left-[25%] top-[15%] z-[3]">
                  <Image
                    src="/images/linimasa/ampera.png"
                    alt="gate left"
                    width={120}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </AnimateOnView>

                {/* Gate right */}
                <AnimateOnView animation="animate-fadeInUp" className="absolute w-[8%] right-[25%] top-[30%] z-[3] scale-150">
                  <Image
                    src="/images/linimasa/ampera.png"
                    alt="gate right"
                    width={120}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </AnimateOnView>

                {/* Day 1 */}
                <AnimateOnView animation="animate-fadeInUp" className="absolute w-[7%] left-[35%] top-[30%] z-[4] flex flex-col gap-2">
                  <div className="text-right text-white drop-shadow">
                    <p className="text-xs text-right font-bold tracking-widest">
                      Day 1
                    </p>
                    <p className="!text-[12px] text-white/80 mt-1 leading-relaxed ">
                      Grand Opening<br />
                      Art Exhibition<br />
                      Traditional Dance Battle
                    </p>
                  </div>
                  <div className='w-[70%] self-end'>
                    <Image
                      src="/images/linimasa/chileko.png"
                      alt="character day 1"
                      width={80}
                      height={100}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                </AnimateOnView>

                {/* Day 2 */}
                <AnimateOnView animation="animate-fadeInUp" className="absolute w-[6%] right-[38%] top-[50%] z-[4] flex flex-col gap-2">
                  <div className="text-right text-white drop-shadow">
                    <p className="text-xs font-bold tracking-widest">
                      Day 2
                    </p>
                    <p className="!text-[12px] text-white/80 mt-1 leading-relaxed max-w-[120px]">
                      Grand Opening<br />
                      Art Exhibition<br />
                      Traditional Dance Battle
                    </p>
                  </div>
                  <div className='w-[80%] self-end'>
                    <Image
                      src="/images/linimasa/chitala.png"
                      alt="character day 2"
                      width={80}
                      height={100}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                </AnimateOnView>

                {/* Lotus */}
                <AnimateOnView animation="animate-fadeInUp" className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[4]">
                  <Image
                    src="/images/linimasa/lotus.png"
                    alt="lotus"
                    width={200}
                    height={128}
                    className="object-cover w-full h-auto"
                  />
                </AnimateOnView>

                {/* Lihat Detail button */}
                <div className="absolute bottom-[6%] right-[15%] z-[5]">
                  <button
                    className="w-fit rounded-[8px] bg-gradient-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500]"
                  >
                    Baca Selengkapnya
                  </button>
                </div>

              </section>
            </div>

            {/* Row 3 — Jelajah Bareng */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -200vh' }} />

              {/* Pagoda — left */}
              <AnimateOnView
                animation="animate-fadeInUp"
                className="absolute left-0 bottom-0 w-[12%] z-[2]"
              >
                <Image
                  src="/images/jelajah/pagoda.png"
                  alt="pagoda"
                  width={260}
                  height={580}
                  className="object-fill w-full h-auto"
                />
              </AnimateOnView>

              {/* Moon — right */}
              <AnimateOnView
                animation="animate-slideInRight"
                className="absolute w-[40%] -right-110 top-1/2 -translate-y-1/2 z-[2]"
              >
                <Image
                  src="/images/jelajah/moon.png"
                  alt="moon"
                  width={700}
                  height={813}
                  className="object-fill w-full h-auto"
                />
              </AnimateOnView>

              <section className="relative z-[2] h-screen w-[80%] mx-auto flex flex-col items-center justify-start overflow-hidden pt-5 mb-0 pb-0">

                {/* Title frame — top right (relative flow) */}
                <div className="relative self-end mx-5 mb-13 z-[5] ">
                  <Image
                    src="/images/jelajah/title-jelajah.png"
                    alt="title jelajah"
                    width={560}
                    height={105}
                    className="object-fill w-full h-auto"
                  />
                </div>



                {/* 3 Cards stacked */}
                <div className="flex flex-col justify-between w-[90%] h-full z-[4] pb-5">

                  {/* Card — Asrama */}
                  <AnimateOnView animation="animate-fadeInUp" className="w-[80%] self-start">
                    <div className="
            relative w-full rounded-xl px-6 py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">

                      {/* Leaf right */}
                      <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Asrama
                      </h3>
                      <p className="text-[11px] text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-end mt-3">
                        <button className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer
              ">
                          Lihat Detail →
                        </button>
                      </div>
                    </div>
                  </AnimateOnView>

                  {/* Card — Ormada */}
                  <AnimateOnView animation="animate-fadeInUp" className="w-[80%] self-end">
                    <div className="
            relative w-full rounded-xl px-6 py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">
                      <div className="absolute w-[10%] -translate-y-1/2 -translate-x-1/2 top-0 left-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Ormada
                      </h3>
                      <p className="text-[11px] text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-end mt-3">
                        <button className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer
              ">
                          Lihat Detail →
                        </button>
                      </div>
                    </div>
                  </AnimateOnView>

                  {/* Card — Fakultas */}
                  <AnimateOnView animation="animate-fadeInUp" className="w-[80%] self-start">
                    <div className="
            relative w-full rounded-xl px-6 py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">

                      <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Fakultas
                      </h3>
                      <p className="text-xm text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-end mt-3">
                        <button className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer
              ">
                          Lihat Detail →
                        </button>
                      </div>
                    </div>
                  </AnimateOnView>

                </div>

              </section>
            </div>

            {/* Row 4 — Kompetisi */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -300vh' }} />

              <section className="relative z-[2] w-[80%] mx-auto h-screen flex items-center justify-center overflow-hidden">
                {/* Card */}
                <div className="
                      relative w-[90%] rounded-2xl px-15 pt-20 pb-10 mb-30
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                  {/* Title frame */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center">
                    <Image
                      src="/images/kompetisi/title-kompetisi.png"
                      alt="frame title"
                      width={320}
                      height={50}
                      className="w-full object-contain"
                    />
                  </div>

                  <p className="text-justify text-amber-900 md:text-base">
                    Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk
                    mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum,
                    peta khusus (tematik), dan peta kartometrik, yang masing-masing memiliki fungsi dan
                    karakteristik berbeda. Peta umum menggambarkan permukaan bumi secara menyeluruh dan berfungsi
                    memberikan informasi dasar tentang kenampakan alam maupun buatan.
                  </p>


                  <div className="flex flex-row justify-around gap-3 w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="
                            w-[112px] h-[160px] rounded-xl
                            bg-amber-200/60 border-2 border-amber-700/40
                            flex items-center justify-center
                          "
                      >
                        <span className="text-amber-700/40 text-xs">Foto {i}</span>
                      </div>
                    ))}
                  </div>


                  <button
                    className="w-fit rounded-[8px] bg-gradient-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 mt-10 text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500]"
                  >
                    Baca Selengkapnya
                  </button>
                </div>

                <AnimateOnView
                  animation="animate-slideInLeft"
                  className="absolute left-4 bottom-0 z-5"
                >
                  <Image
                    src="/images/kompetisi/wave-left.png"
                    alt="wave-left"
                    width={1920}
                    height={300}
                    className="object-cover w-full h-auto"
                  />
                </AnimateOnView>

                <AnimateOnView
                  animation="animate-slideInRight"
                  className="absolute right-4 bottom-0 z-5"
                >
                  <Image
                    src="/images/kompetisi/wave-right.png"
                    alt="wave-right"
                    width={1920}
                    height={300}
                    className="object-cover w-full h-auto"
                  />
                </AnimateOnView>

              </section>
            </div>

            {/* Row 5 — Game */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -400vh' }} />
              <section className="relative z-[2] w-[80%] mx-auto h-screen flex items-center justify-center">
                <div className="text-center text-amber-900">
                  <h2 className="text-3xl font-bold">Game</h2>
                  <p className="mt-2 text-sm">Konten akan ditambahkan</p>
                </div>
              </section>
            </div>

            {/* Row 6 — Sponsor & Media Partner */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-[1]" style={{ backgroundImage: "url('/images/paper.png')", backgroundSize: '100% 600vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center -500vh' }} />
              <section className="relative z-[2] w-[80%] mx-auto h-screen flex items-center justify-center">
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