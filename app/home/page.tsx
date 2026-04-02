"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateOnView from "../components/AnimateOnView";

export default function Home() {
  return (
    <main className="bg-black">
      <div
        className="absolute items-center justify-center w-full h-screen"
        style={{
          backgroundImage: "url('/images/home/bg-blue.png')",
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/images/hero/chest-open.png"
          alt="chest"
          width={800}
          height={600}
          className="object-contain w-full h-[30vh] mt-30"
        />
      </div>

      {/* PAPER SCROLL SECTION */}
      <div className="pt-[50vh] -mb-37 relative z-1 flex flex-col items-center overflow-x-hidden overflow-y-visible">
        {/* Scroll top rod */}
        <div className="relative w-[95%] z-2 drop-shadow-2xl animate-unroll">
          <Image
            src="/images/home/scroll-top-bottom.png"
            alt="scroll top"
            width={1920}
            height={60}
            className="w-full object-contain"
          />
        </div>

        {/* Paper background */}
        <div className="relative w-full -top-2">
          <div
            className="absolute inset-0 left-1/2 -translate-x-1/2 w-[80%] z-1 pointer-events-none animate-unroll"
            style={{
              backgroundImage: "url('/images/home/paper.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
            }}
          />

          {/* About Culfest */}
          <div className="relative w-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-1.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            <section className="relative z-2 h-fit">
              <div className="mx-auto w-[80%] h-full flex items-center justify-center px-5 md:px-15 pb-10">
                {/* Card */}
                <div
                  className="
                      relative w-full rounded-2xl my-[25%] md:my-[10%] px-5 md:px-15 py-7 md:py-25
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6 animate-unroll
                    "
                >
                  {/* Title frame */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-[50%] flex items-center justify-center">
                    <Image
                      src="/images/home/beranda/frame-title.png"
                      alt="frame title"
                      width={320}
                      height={50}
                      className="w-full object-contain"
                    />
                  </div>

                  <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="order-1 md:order-2 flex w-[50%] md:w-full h-auto items-center justify-center mt-10 mx-auto md:mx-0">
                      <Image
                        src="/images/home/beranda/frame-photo.png"
                        alt="photo frame"
                        height={440}
                        width={312}
                        className="object-cover"
                      />
                    </div>

                    <div className="order-2 lg:order-1 flex flex-col gap-10">
                      <p className="text-justify text-xs md:text-lg text-amber-900"></p>
                      <Link
                        href="/about-event"
                        className="w-fit rounded-lg bg-linear-to-r fr om-[#ab3400] to-[#451500]
                                     px-7 py-4 text-xs md:text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500] self-center lg:self-auto cursor-pointer"
                      >
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clouds */}
              <div className="absolute -left-40 sm:-left-30 lg:-left-10 top-20 animate-cloudLeft transition-opacity duration-500">
                <Image
                  src="/images/awan.png"
                  alt="cloud left"
                  width={260}
                  height={95}
                  className="object-fill"
                />
              </div>
              <div className="absolute -right-90 sm:-right-60 lg:-right-50 top-80 animate-cloudRight transition-opacity duration-500">
                <Image
                  src="/images/awan.png"
                  alt="cloud right"
                  width={430}
                  height={180}
                  className="object-fill"
                />
              </div>

              {/* Mountain */}
              <AnimateOnView
                animation="animate-slideInLeft"
                className="absolute -bottom-10 -left-10 w-[140%] md:w-screen"
              >
                <Image
                  src="/images/home/beranda/mountain.png"
                  alt="mountain"
                  width={1920}
                  height={500}
                  className="h-auto object-cover"
                  priority
                />
              </AnimateOnView>
            </section>
          </div>

          {/* Linimasa */}
          <div className="relative w-full overflow-visible">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-2.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[80%] z-2"
              style={{
                backgroundImage: "url('/images/home/linimasa/bg-linimasa.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute inset-0 hidden xl:block z-3"
              style={{
                backgroundImage: "url('/images/home/linimasa/ribbon.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute inset-0 xl:hidden z-3"
              style={{
                backgroundImage:
                  "url('/images/home/linimasa/ribbon-small.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            />

            <div className="relative top-0 w-full h-auto py-3 lg:py-5 bg-[#03005e] z-3 flex items-center justify-center">
              <Image
                src="/images/home/linimasa/title-linimasa.png"
                alt="title linimasa"
                width={320}
                height={65}
                className="object-contain w-[40vw] lg:w-[25vw]"
              />
            </div>

            <section className="relative z-3 w-[80%] mx-auto h-auto overflow-visible pt-20 pb-10 md:pb-12">
              {/* Ampera */}
              <AnimateOnView
                animation="animate-fadeInUp"
                className="relative w-full xl:w-[80%] mx-auto z-3"
              >
                <Image
                  src="/images/home/linimasa/ampera-small.png"
                  alt="ampera bridge"
                  width={955}
                  height={667}
                  className="w-full h-auto object-contain xl:hidden"
                />
                <Image
                  src="/images/home/linimasa/ampera-bridge.png"
                  alt="ampera bridge"
                  width={955}
                  height={667}
                  className="hidden w-full h-auto object-contain xl:block"
                />

                {/* Day 1 */}
                <AnimateOnView
                  animation="animate-fadeInUp"
                  className="absolute w-[10%] left-[35%] xl:left-[30%] top-[35%] xl:top-[60%] -translate-y-full z-4"
                >
                  <div className="animate-sway flex flex-col gap-2">
                    <div className="text-right w-max text-white drop-shadow">
                      <p className="text-xs md:text-lg font-bold">Day 1</p>
                      <p className="text-[10px] md:text-base text-white/80 mt-1">
                        Grand Opening
                        <br />
                        Art Exhibition
                        <br />
                        Traditional Dance Battle
                      </p>
                    </div>
                    <div className="w-full self-end">
                      <Image
                        src="/images/home/linimasa/chileko.png"
                        alt="character day 1"
                        width={80}
                        height={100}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </AnimateOnView>

                  {/* Day 2 */}
                  <AnimateOnView animation="animate-fadeInUp" className="absolute w-[10%] right-[35%] xl:right-[35%] top-[70%] xl:top-[85%] -translate-y-full z-4">
                    <div className="animate-sway flex flex-col gap-2">
                      <div className="text-left w-max text-white drop-shadow">
                        <p className="text-xs md:text-lg font-bold tracking-widest">
                          Day 2
                        </p>
                        <p className="text-[10px] md:text-base text-white/80 mt-1 leading-relaxed ">
                          Pagelaran Seni<br />
                          Duta Budaya<br />
                          Penghargaan
                        </p>
                      </div>
                      <div className='w-full self-end'>
                        <Image
                          src="/images/home/linimasa/chitala.png"
                          alt="character day 2"
                          width={80}
                          height={100}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </AnimateOnView>
                </AnimateOnView>

              {/* button */}
              <div className="relative w-fit mx-auto md:mr-15 z-5">
                <Link
                  href="/linimasa"
                  className="w-fit rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500]
                                      px-7 py-4 text-xs md:text-1xl uppercase tracking-widest
                                      text-yellow-100 transition-colors duration-200 hover:from-[#451500] cursor-pointer"
                >
                  Baca Selengkapnya
                </Link>
              </div>

              {/* Lotus */}
              <AnimateOnView
                animation="animate-fadeInUp"
                className="relative w-[25%] mx-auto -mb-10 md:-mb-20 item-center z-5"
              >
                <Image
                  src="/images/home/linimasa/lotus.png"
                  alt="lotus"
                  width={200}
                  height={128}
                  className="object-fill w-full h-auto"
                />
              </AnimateOnView>
            </section>
          </div>

          {/* Jelajah Bareng */}
          <div className="relative w-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-1.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            {/* Pagoda — left */}
            <AnimateOnView
              animation="animate-fadeInUp"
              className="absolute left-[-10%] md:left-0 bottom-0 w-[30%] md:w-[12%] -translate-x-[20%] md:translate-x-0 z-2"
            >
              <Image
                src="/images/home/jelajah/pagoda.png"
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
                src="/images/home/jelajah/moon.png"
                alt="moon"
                width={700}
                height={813}
                className="object-fill w-full h-auto"
              />
            </AnimateOnView>

            <section className="relative z-2 h-fit w-[80%] mx-auto flex flex-col items-center justify-start overflow-hidden pt-5">
              {/* Title frame */}
              <div className="relative self-center md:self-end mx-5 mb-2 md:mb-13 z-5 ">
                <Image
                  src="/images/home/jelajah/title-jelajah.png"
                  alt="title jelajah"
                  width={560}
                  height={105}
                  className="object-fill w-[50vw] md:w-[40vw] h-auto"
                />
              </div>

              {/* 3 Cards stacked */}
              <div className="flex flex-col justify-center gap-5 md:gap-15 w-[90%] h-full z-4 pb-5 mb-5">
                {/* Card — Asrama */}
                <AnimateOnView
                  animation="animate-fadeInUp"
                  className="w-full md:w-[80%] self-start"
                >
                  <div
                    className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-[#253378] border-4 border-black/25
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          "
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage:
                          "url('/images/home/jelajah/motif.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />

                    <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                      <Image
                        src="/images/home/jelajah/leaf.png"
                        alt="leaf"
                        width={125}
                        height={125}
                        className="object-fill w-full h-auto"
                      />
                    </div>

                    <h3
                      className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                      style={{
                        fontFamily: "var(--font-efco-brookshire), serif",
                      }}
                    >
                      Asrama
                    </h3>
                    <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                      Indonesia memiliki wilayah yang sangat luas sehingga
                      diperlukan peta sebagai media untuk mempermudah memahami
                      keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu
                      peta umum.
                    </p>
                    <div className="flex justify-center md:justify-end mt-3">
                      <Link
                        href="/jelajah/asrama"
                        className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer z-5
                
              "
                      >
                        Lihat Detail →
                      </Link>
                    </div>
                  </div>
                </AnimateOnView>

                {/* Card — Ormada */}
                <AnimateOnView
                  animation="animate-fadeInUp"
                  className="w-full md:w-[80%] self-end"
                >
                  <div
                    className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-[#253378] border-4 border-black/25
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          "
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage:
                          "url('/images/home/jelajah/motif.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    <div className="absolute w-[10%] -translate-y-1/2 -translate-x-1/2 top-0 left-0 -z-1">
                      <Image
                        src="/images/home/jelajah/leaf.png"
                        alt="leaf"
                        width={125}
                        height={125}
                        className="object-fill w-full h-auto"
                      />
                    </div>

                    <h3
                      className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                      style={{
                        fontFamily: "var(--font-efco-brookshire), serif",
                      }}
                    >
                      Ormada
                    </h3>
                    <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                      Indonesia memiliki wilayah yang sangat luas sehingga
                      diperlukan peta sebagai media untuk mempermudah memahami
                      keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu
                      peta umum.
                    </p>
                    <div className="flex justify-center md:justify-end mt-3">
                      <Link
                        href="/jelajah/ormada"
                        className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer z-5
                
              "
                      >
                        Lihat Detail →
                      </Link>
                    </div>
                  </div>
                </AnimateOnView>

                {/* Card — Fakultas */}
                <AnimateOnView
                  animation="animate-fadeInUp"
                  className="w-full md:w-[80%] self-start"
                >
                  <div
                    className="
            relative w-full rounded-xl px-2 md:px-6 py-2 md:py-4
            bg-[#253378] border-4 border-black/25 
            shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
          "
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage:
                          "url('/images/home/jelajah/motif.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    <div className="absolute w-[10%] -translate-y-1/2 translate-x-1/2 top-0 right-0 -z-1">
                      <Image
                        src="/images/home/jelajah/leaf.png"
                        alt="leaf"
                        width={125}
                        height={125}
                        className="object-fill w-full h-auto"
                      />
                    </div>

                    <h3
                      className="text-center text-xl md:text-2xl text-yellow-300 font-bold tracking-widest mb-2"
                      style={{
                        fontFamily: "var(--font-efco-brookshire), serif",
                      }}
                    >
                      Fakultas
                    </h3>
                    <p className="text-[10px] md:text-xs text-blue-100 leading-relaxed">
                      Indonesia memiliki wilayah yang sangat luas sehingga
                      diperlukan peta sebagai media untuk mempermudah memahami
                      keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu
                      peta umum.
                    </p>
                    <div className="flex justify-center md:justify-end mt-3">
                      <Link
                        href="/jelajah/fakultas"
                        className="
                px-4 py-1.5 text-[10px] tracking-widest uppercase
                bg-amber-800 text-yellow-100 rounded
                hover:bg-amber-700 transition-colors duration-200
                border border-amber-600 cursor-pointer z-5
                
              "
                      >
                        Lihat Detail →
                      </Link>
                    </div>
                  </div>
                </AnimateOnView>
              </div>
            </section>
          </div>

          {/* Kompetisi */}
          <div className="relative w-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-2.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            <section className="relative z-2 w-[80%] mx-auto h-fit flex items-center justify-center overflow-hidden">
              {/* Card */}
              <div
                className="
                      relative w-[90%] rounded-2xl mt-20 px-3 md:px-15 pt-15 md:pt-20 pb-40 md:pb-70 mb-0
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    "
              >
                {/* Title frame */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-1/2 flex items-center justify-center">
                  <Image
                    src="/images/home/kompetisi/title-kompetisi.png"
                    alt="frame title"
                    width={320}
                    height={50}
                    className="w-full object-contain"
                  />
                </div>

                <p className="text-justify text-amber-900 text-xs md:text-base">
                  Indonesia memiliki wilayah yang sangat luas sehingga
                  diperlukan peta sebagai media untuk mempermudah memahami
                  keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta
                  umum, peta khusus (tematik), dan peta kartometrik, yang
                  masing-masing memiliki fungsi dan karakteristik berbeda. Peta
                  umum menggambarkan permukaan bumi secara menyeluruh dan
                  berfungsi memberikan informasi dasar tentang kenampakan alam
                  maupun buatan.
                </p>

                <div className="flex flex-row justify-center md:justify-around gap-5 md:gap-3 w-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`
                            w-28 h-40 rounded-xl
                            bg-amber-200/60 border-2 border-amber-700/40
                            flex items-center justify-center
                            ${i > 2 ? "hidden md:flex" : ""}
                          `}
                    >
                      <span className="text-amber-700/40 text-xs">
                        Foto {i}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/kompetisi"
                  className="w-fit rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500]
                                     px-7 py-4 mt-0 md:mt-10 text-xs md:text-1xl uppercase tracking-widest
                                     text-yellow-100 transition-colors duration-200 hover:from-[#451500] cursor-pointer z-6"
                >
                  Baca Selengkapnya
                </Link>
              </div>

              <AnimateOnView
                animation="animate-slideInLeft"
                className="absolute w-[80%] h-auto left-0 bottom-0 z-5"
              >
                <Image
                  src="/images/home/kompetisi/wave-left.png"
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
                  src="/images/home/kompetisi/wave-right.png"
                  alt="wave-right"
                  width={1920}
                  height={300}
                  className="object-fill"
                />
              </AnimateOnView>
            </section>
          </div>

          {/* Game */}
          <div className="relative w-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-1.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[77%] z-1"
              style={{
                backgroundImage: "url('/images/home/game/bg-motif.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            />

            <div className="relative top-0 w-full h-auto py-3 lg:py-5 bg-[#03005e] z-3 flex items-center justify-center">
              <Image
                src="/images/home/game/title-game.png"
                alt="title game"
                width={320}
                height={65}
                className="object-contain w-[40vw] lg:w-[25vw]"
              />
            </div>

            {/* Clouds */}
            <div className="absolute -left-45 md:-left-10 bottom-80 animate-cloudLeft transition-opacity duration-500 z-3">
              <Image
                src="/images/awan.png"
                alt="cloud left"
                width={260}
                height={95}
                className="object-fill"
              />
            </div>

            <div className="absolute -right-90 md:-right-50 top-40 animate-cloudRight transition-opacity duration-500 z-3">
              <Image
                src="/images/awan.png"
                alt="cloud right"
                width={430}
                height={180}
                className="object-fill"
              />
            </div>

            <section className="relative z-2 w-[80%] mx-auto h-fit flex items-center justify-center">
              <div
                className="
          w-[90%] rounded-2xl px-5 md:px-10 mt-10 mb-[30%] py-5 md:py-20
          bg-linear-to-r from-[#de8402]/80 from-0% via-[#ffd286]/80 via-80% to-[#de8402]/80 to-100% 
          border-2 border-[#461500]
          shadow-2xl flex flex-col gap-6
        "
              >
                {/* Description */}
                <p className="text-xs text-amber-900 leading-relaxed text-justify">
                  Indonesia memiliki wilayah yang sangat luas sehingga
                  diperlukan peta sebagai media untuk mempermudah memahami
                  keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta
                  umum, peta khusus (tematik), dan peta kartometrik, yang
                  masing-masing memiliki fungsi dan karakteristik berbeda. Peta
                  umum menggambarkan permukaan bumi secara menyeluruh dan
                  berfungsi memberikan informasi dasar tentang kenampakan alam
                  maupun buatan.
                </p>

                {/* Button */}
                <div className="flex justify-center">
                  <Link
                    href="/game"
                    className="
              px-6 py-2 text-[11px] tracking-widest uppercase
              bg-amber-800 text-yellow-100 rounded
              hover:bg-amber-700 transition-colors duration-200
              border border-amber-600 cursor-pointer
            "
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            </section>

            <div className="absolute -bottom-5 right-0 w-[110%] z-2 animate-waveFloat">
              <Image
                src="/images/home/game/gold-wave.png"
                alt="wave"
                width={1920}
                height={300}
                className=" h-auto object-cover"
              />
            </div>
          </div>

          {/* Sponsor & Media Partner */}
          <div className="relative w-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/images/home/bg-section-2.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <section className="relative z-2 w-[80%] mx-auto h-fit flex flex-col items-center justify-center">
              <div
                className="
                      relative w-[90%] rounded-2xl px-15 pt-20 pb-10 mt-[10%] mb-10
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    "
              >
                {/* Title frame */}
                <div className="absolute w-[70%] md:w-[30%] top-0 left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-11/12 -translate-y-1/2">
                  <Image
                    src="/images/home/sponsor/title-sponsor.png"
                    alt="frame title"
                    width={320}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="
                      relative w-[90%] rounded-2xl px-15 pt-20 pb-10 mb-[20%]
                      border-4 border-[#4d1101]
                      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
                      flex flex-col items-center gap-6
                    "
              >
                {/* Title frame */}
                <div className="absolute w-[70%] md:w-[30%] top-0 left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-11/12 -translate-y-1/2">
                  <Image
                    src="/images/home/sponsor/title-media.png"
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
            src="/images/home/scroll-top-bottom.png"
            alt="scroll bottom"
            width={1920}
            height={60}
            className="w-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}
