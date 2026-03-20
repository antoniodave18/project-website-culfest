'use client';

import { useState } from 'react';
import Image from 'next/image';
import Hero from './components/Hero';
import AnimateOnView from './components/AnimateOnView';
import Link from 'next/link';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  return (
    <main className="bg-black">

      {/* ============ HERO SECTION ============ */}
      <Hero onRevealScroll={() => setShowScroll(true)} />

      {/* ============ SCROLL SECTION ============ */}
      {showScroll && (
        <div className="mt-[-50vh] -mb-37 relative z-7 flex flex-col items-center animate-fadeIn overflow-x-hidden overflow-y-visible">

          {/* Scroll top rod */}
          <div className="relative w-[95%] z-2 drop-shadow-2xl animate-unroll">
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
            {/* Continuous paper backdrop that follows dynamic total content height */}
            <div
              className="absolute inset-0 left-1/2 -translate-x-1/2 w-[80%] z-1 pointer-events-none"
              style={{
                backgroundImage: "url('/images/paper.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
              }}
            />

            {/* Row 1 — About Culfest */}
            <div className="relative w-full">
              {/* bg — full width, behind paper */}
              <div
                className="absolute inset-0 z-0"
                style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <section className="relative z-2 h-fit">
                <div className="mx-auto w-[80%] h-full flex items-center justify-center px-5 md:px-15 pb-10">

                  {/* Card */}
                  <div className="
                      relative w-full rounded-2xl my-[25%] md:my-[10%] px-5 md:px-15 py-7 md:py-25
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                    {/* Title frame */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-[50%] flex items-center justify-center">
                      <Image
                        src="/images/beranda/frame-title.png"
                        alt="frame title"
                        width={320}
                        height={50}
                        className="w-full object-contain"
                      />
                    </div>

                    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                      <div className="order-1 md:order-2 flex w-[50%] md:w-full h-auto items-center justify-center mt-10 mx-auto md:mx-0">
                        <Image
                          src="/images/beranda/frame-photo.png"
                          alt="photo frame"
                          height={440}
                          width={312}
                          className="object-cover"
                        />
                      </div>

                      <div className="order-2 lg:order-1 flex flex-col gap-10">
                        <p className="text-xs md:text-lg text-amber-900">
                          Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk
                          mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum,
                          peta khusus (tematik), dan peta kartometrik, yang masing-masing memiliki fungsi dan
                          karakteristik berbeda. Peta umum menggambarkan permukaan bumi secara menyeluruh dan berfungsi
                          memberikan informasi dasar tentang kenampakan alam maupun buatan.
                        </p>
                        <button
                          className="w-fit rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 text-xs md:text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500] self-center lg:self-auto"
                        >
                          Baca Selengkapnya
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clouds — absolute relative to section */}
                <div className="absolute -left-40 sm:-left-30 lg:-left-10 top-20 animate-cloudLeft transition-opacity duration-500">
                  <Image src="/images/awan.png" alt="cloud left" width={260} height={95} className="object-fill" />
                </div>
                <div className="absolute -right-90 sm:-right-60 lg:-right-50 top-80 animate-cloudRight transition-opacity duration-500">
                  <Image src="/images/awan.png" alt="cloud right" width={430} height={180} className="object-fill" />
                </div>

                {/* Mountain at bottom */}
                <AnimateOnView animation="animate-slideInLeft" className="absolute -bottom-10 -left-10 w-[140%] md:w-screen">
                  <Image src="/images/beranda/mountain.png" alt="mountain" width={1920} height={500} className="h-auto object-cover" priority />
                </AnimateOnView>
              </section>
            </div>

            {/* Row 2 — Linimasa */}
            <div className="relative w-full overflow-visible">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-2" style={{ backgroundImage: "url('/images/linimasa/bg-linimasa.png')", backgroundSize: '100% 100%', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full z-3" style={{ backgroundImage: "url('/images/linimasa/ribbon.png')", backgroundSize: '100% 100%', backgroundPosition: 'center' }} />

              <div className='relative top-0 w-full h-28 bg-[#03005e] z-3 flex items-center justify-center'>
                <Image
                  src="/images/linimasa/title-linimasa.png"
                  alt="title linimasa"
                  width={320}
                  height={65}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>

              <section className="relative z-3 w-[80%] mx-auto h-auto overflow-visible pt-20 pb-10 md:pb-12">
                {/* Ampera */}
                <AnimateOnView animation="animate-fadeInUp" className="relative w-[80%] mx-auto z-3">
                  <Image
                    src="/images/linimasa/ampera-bridge.png"
                    alt="ampera bridge"
                    width={955}
                    height={667}
                    className="w-full h-auto object-contain"
                  />

                  {/* Day 1 */}
                  <AnimateOnView animation="animate-fadeInUp" className="absolute w-[10%] left-[30%] top-[60%] -translate-y-full z-4 flex flex-col gap-2">
                    <div className="text-right text-white drop-shadow">
                      <p className="text-xs text-right font-bold tracking-widest">
                        Day 1
                      </p>
                      <p className="text-[12px] text-white/80 mt-1 leading-relaxed ">
                        Grand Opening<br />
                        Art Exhibition<br />
                        Traditional Dance Battle
                      </p>
                    </div>
                    <div className='w-full self-end'>
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
                  <AnimateOnView animation="animate-fadeInUp" className="absolute w-[10%] right-[35%] top-[85%] -translate-y-full z-4 flex flex-col gap-2">
                    <div className="text-right text-white drop-shadow">
                      <p className="text-xs text-right font-bold tracking-widest">
                        Day 2
                      </p>
                      <p className="text-[12px] text-white/80 mt-1 leading-relaxed ">
                        Grand Opening<br />
                        Art Exhibition<br />
                        Traditional Dance Battle
                      </p>
                    </div>
                    <div className='w-full self-end'>
                      <Image
                        src="/images/linimasa/chitala.png"
                        alt="character day 1"
                        width={80}
                        height={100}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </AnimateOnView>
                </AnimateOnView>

                {/* Lihat Detail button */}
                <div className="relative w-fit mx-auto md:mr-15 z-5">
                  <button
                    className="w-fit rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500]
                                      px-7 py-4 text-xs md:text-1xl uppercase tracking-widest
                                      text-yellow-100 transition-colors duration-200 hover:from-[#451500]"
                  >
                    Baca Selengkapnya
                  </button>
                </div>

                {/* Lotus */}
              <AnimateOnView animation="animate-fadeInUp" className="relative w-[25%] mx-auto -mb-10 md:-mb-20 item-center z-5">
                <Image
                  src="/images/linimasa/lotus.png"
                  alt="lotus"
                  width={200}
                  height={128}
                  className="object-fill w-full h-auto"
                />
              </AnimateOnView>
              </section>

              
            </div>

            {/* Row 3 — Jelajah Bareng */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

              {/* Pagoda — left */}
              <AnimateOnView
                animation="animate-fadeInUp"
                className="absolute left-[-10%] md:left-0 bottom-0 w-[30%] md:w-[12%] -translate-x-[20%] md:translate-x-0 z-2"
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
                className="absolute w-[40%] -right-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-2"
              >
                <Image
                  src="/images/jelajah/moon.png"
                  alt="moon"
                  width={700}
                  height={813}
                  className="object-fill w-full h-auto"
                />
              </AnimateOnView>

              <section className="relative z-2 h-fit w-[80%] mx-auto flex flex-col items-center justify-start overflow-hidden pt-5">

                {/* Title frame — top right (relative flow) */}
                <div className="relative self-end mx-5 mb-2 md:mb-13 z-5 ">
                  <Image
                    src="/images/jelajah/title-jelajah.png"
                    alt="title jelajah"
                    width={560}
                    height={105}
                    className="object-fill w-full h-auto"
                  />
                </div>



                {/* 3 Cards stacked */}
                <div className="flex flex-col justify-center gap-5 md:gap-15 w-[90%] h-full z-4 pb-5 mb-5">

                  {/* Card — Asrama */}
                  <AnimateOnView animation="animate-fadeInUp" className="w-full md:w-[80%] self-start">
                    <div className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">

                      {/* Leaf right */}
                      <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Asrama
                      </h3>
                      <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-center md:justify-end mt-3">
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
                  <AnimateOnView animation="animate-fadeInUp" className="w-full md:w-[80%] self-end">
                    <div className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">
                      <div className="absolute w-[10%] -translate-y-1/2 -translate-x-1/2 top-0 left-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Ormada
                      </h3>
                      <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-center md:justify-end mt-3">
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
                  <AnimateOnView animation="animate-fadeInUp" className="w-full md:w-[80%] self-start">
                    <div className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-blue-900/90 border border-blue-700
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          ">

                      <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                        <Image src="/images/jelajah/leaf.png" alt="leaf" width={125} height={125} className="object-fill w-full h-auto" />
                      </div>

                      <h3
                        className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      >
                        Fakultas
                      </h3>
                      <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                        Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta
                        sebagai media untuk mempermudah memahami keragaman ruangnya.
                        Terdapat tiga jenis peta utama, yaitu peta umum.
                      </p>
                      <div className="flex justify-center md:justify-end mt-3">
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

              <section className="relative z-2 w-[80%] mx-auto h-fit flex items-center justify-center overflow-hidden">
                {/* Card */}
                <div className="
                      relative w-[90%] rounded-2xl mt-20 px-3 md:px-15 pt-8 md:pt-20 pb-40 md:pb-70 mb-0
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                  {/* Title frame */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-1/2 flex items-center justify-center">
                    <Image
                      src="/images/kompetisi/title-kompetisi.png"
                      alt="frame title"
                      width={320}
                      height={50}
                      className="w-full object-contain"
                    />
                  </div>

                  <p className="text-justify text-amber-900 text-xs md:text-base">
                    Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk
                    mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum,
                    peta khusus (tematik), dan peta kartometrik, yang masing-masing memiliki fungsi dan
                    karakteristik berbeda. Peta umum menggambarkan permukaan bumi secara menyeluruh dan berfungsi
                    memberikan informasi dasar tentang kenampakan alam maupun buatan.
                  </p>


                  <div className="flex flex-row justify-center md:justify-around gap-5 md:gap-3 w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`
                            w-28 h-40 rounded-xl
                            bg-amber-200/60 border-2 border-amber-700/40
                            flex items-center justify-center
                            ${i > 2 ? 'hidden md:flex' : ''}
                          `}
                      >
                        <span className="text-amber-700/40 text-xs">Foto {i}</span>
                      </div>
                    ))}
                  </div>


                  <button
                    className="w-fit rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 mt-0 md:mt-10 text-xs md:text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500]"
                  >
                    Baca Selengkapnya
                  </button>
                </div>

                <AnimateOnView
                  animation="animate-slideInLeft"
                  className="absolute w-[80%] h-auto left-0 bottom-0 z-5"
                >
                  <Image
                    src="/images/kompetisi/wave-left.png"
                    alt="wave-left"
                    width={1920}
                    height={300}
                    className="object-cover "
                  />
                </AnimateOnView>

                <AnimateOnView
                  animation="animate-slideInRight"
                  className="absolute  w-[80%] h-auto right-0 bottom-0 z-5"
                >
                  <Image
                    src="/images/kompetisi/wave-right.png"
                    alt="wave-right"
                    width={1920}
                    height={300}
                    className="object-fill"
                  />
                </AnimateOnView>

              </section>
            </div>

            {/* Row 5 — Game */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[77%] z-1" style={{ backgroundImage: "url('/images/game/bg-motif.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }} />

              <div className='relative top-0 w-full h-28 bg-[#03005e] z-1 flex items-center justify-center'>
                <Image
                  src="/images/game/title-game.png"
                  alt="title game"
                  width={320}
                  height={65}
                  className=" object-contain"
                />
              </div>

              {/* Clouds — absolute relative to section */}
              <div className="absolute -left-45 md:-left-10 bottom-80 animate-cloudLeft transition-opacity duration-500 z-3">
                <Image src="/images/awan.png" alt="cloud left" width={260} height={95} className="object-fill" />
              </div>

              <div className="absolute -right-90 md:-right-50 top-40 animate-cloudRight transition-opacity duration-500 z-3">
                <Image src="/images/awan.png" alt="cloud right" width={430} height={180} className="object-fill" />
              </div>

              <section className="relative z-2 w-[80%] mx-auto h-fit flex items-center justify-center">

                <div className="
          w-[90%] rounded-2xl px-5 md:px-10 mt-10 mb-[30%] py-5 md:py-20
          bg-linear-to-r from-[#de8402]/80 from-0% via-[#ffd286]/80 via-80% to-[#de8402]/80 to-100% 
          border-2 border-[#461500]
          shadow-2xl flex flex-col gap-6
        ">
                  {/* Description */}
                  <p className="text-xs text-amber-900 leading-relaxed text-justify">
                    Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai
                    media untuk mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta
                    utama, yaitu peta umum, peta khusus (tematik), dan peta kartometrik, yang
                    masing-masing memiliki fungsi dan karakteristik berbeda. Peta umum
                    menggambarkan permukaan bumi secara menyeluruh dan berfungsi memberikan
                    informasi dasar tentang kenampakan alam maupun buatan.
                  </p>

                  {/* Button */}
                  <div className="flex justify-center">
                    <button className="
              px-6 py-2 text-[11px] tracking-widest uppercase
              bg-amber-800 text-yellow-100 rounded
              hover:bg-amber-700 transition-colors duration-200
              border border-amber-600 cursor-pointer
            ">
                      Lihat Detail →
                    </button>
                  </div>
                </div>

              </section>

              <AnimateOnView
                animation='animate-waveFloat'
                className="absolute -bottom-5 right-0 w-[110%] z-2 ">
                <Image
                  src="/images/game/gold-wave.png"
                  alt="wave"
                  width={1920}
                  height={300}
                  className=" h-auto object-cover"
                />
              </AnimateOnView>

            </div>

            {/* Row 6 — Sponsor & Media Partner */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-section-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <section className="relative z-2 w-[80%] mx-auto h-fit flex flex-col items-center justify-center">

                <div className="
                      relative w-[90%] rounded-2xl px-15 pt-20 pb-10 mt-[10%] mb-10
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                  {/* Title frame */}
                  <div className="absolute w-[70%] md:w-[30%] top-0 left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-11/12 -translate-y-1/2">
                    <Image
                      src="/images/sponsor/title-sponsor.png"
                      alt="frame title"
                      width={320}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="
                      relative w-[90%] rounded-2xl px-15 pt-20 pb-10 mb-[20%]
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    ">

                  {/* Title frame */}
                  <div className="absolute w-[70%] md:w-[30%] top-0 left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-11/12 -translate-y-1/2">
                    <Image
                      src="/images/sponsor/title-media.png"
                      alt="frame title"
                      width={320}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>

              </section>
            </div>
          </div>

          {/* Scroll bottom rod */}
          <div className="relative z-10 bottom-10 md:bottom-20 w-[95%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.7)] animate-unroll">
                <Image
              src="/images/scroll-top-bottom.png"
              alt="scroll bottom"
              width={1920}
              height={60}
              className="w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* ============ FOOTER ============ */}
      {showScroll && (
        <footer
          className="relative w-full overflow-hidden pt-15"
          style={{ backgroundColor: "#8e1305", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >

          {/* Main footer content */}
          <div className="relative z-2 w-full px-6 md:px-12 pt-20 md:pt-10 pb-6">

            {/* Top row */}
            <div className="flex justify-between items-start w-full">

              {/* Left — Logo + name + address */}
              <div className="flex flex-col gap-3 max-w-[320px]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/footer/logo-culfest.png"
                    alt="logo"
                    width={70}
                    height={70}
                    className="object-cover rounded-full"
                  />
                  <span className="text-white text-sm font-semibold">
                    Cultural Festival 15
                  </span>
                </div>
                <p className="text-white/70 text-xs md:text-[11px] leading-relaxed">
                  Jl. Bhinneka Tunggal Ika, Bulaksumur, Caturtunggal, Depok,
                  Sleman, Daerah Istimewa Yogyakarta 55281.
                </p>
              </div>

              
              {/* Right — Links */}
              <div className="flex gap-5 md:gap-16">
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Pages</span>
                  <Link href="/" className="text-white/80 text-[11px] hover:text-yellow-400 transition-colors">Culfest</Link>
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

            {/* Email */}
            <div className="mt-8 mb-4">
              <a
                href="mailto:culturalfestival15@gmail.com"
                className="text-white/60 text-[11px] hover:text-yellow-400 transition-colors"
              >
                culturalfestival15@gmail.com
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white mb-4" />

            {/* Bottom row — copyright + social */}
            <div className="flex justify-between items-center">
              <p className="text-white/50 text-[10px]">
                © 2025 Culfest 15 . All rights reserved
              </p>

              {/* Social media icons */}
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

          {/* Wave + boat decoration */}
          <div className="relative w-full h-auto z-2">
            <Image
              src="/images/footer/wave.png"
              alt="wave footer"
              width={1920}
              height={300}
              className="object-cover"
            />
          </div>
          {/* Boat */}
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
      )}

    </main>
  );
}
