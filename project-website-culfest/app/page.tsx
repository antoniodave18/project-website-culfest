'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [chestOpen, setChestOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [bgChanged, setBgChanged] = useState(false);

  const handleChestClick = () => {
    setChestOpen(true);
    setTimeout(() => setBgChanged(true), 300);
    setTimeout(() => setShowScroll(true), 700);
  };

  return (
    <main className="bg-black">

      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* Base background — fades out when chest opens */}
        <Image
          src="/images/beranda/bg.png"
          alt="background"
          fill
          className="object-cover z-0 transition-opacity duration-700"
          style={{ opacity: bgChanged ? 0 : 1 }}
          priority
        />

        {/* Linear gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-linear-to-b from-black/40" />

        {/* Dark background — fades in when chest opens */}
        <div
          className="absolute inset-0 z-[1] transition-opacity duration-700"
          style={{
            opacity: bgChanged ? 1 : 0,
            background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0a0500 100%)',
          }}
        />

        {/* Tirai atas — always visible */}
        <div className="absolute top-0 w-full z-[3]">
          <Image
            src="/images/beranda/tirai-atas.png"
            alt="tirai atas"
            width={1920}
            height={300}
            className="w-full object-cover"
          />
        </div>

        {/* Wave — fades out when chest opens */}
        <div
          className="absolute -bottom-1 right-0 w-[110%] z-[2] animate-waveFloat transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <Image
            src="/images/beranda/wave.png"
            alt="wave"
            width={1920}
            height={300}
            className="w-full object-cover"
          />
        </div>

        {/* Songket left — fades out */}
        <div
          className="absolute w-1/3 h-3/5 z-[3] animate-sway transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <Image
            src="/images/beranda/songket-kiri.png"
            alt="songket kiri"
            fill
            className="object-fill"
          />
        </div>

        {/* Songket right — fades out */}
        <div
          className="absolute top-0 right-0 w-1/3 h-3/5 z-[3] animate-swayReverse transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <Image
            src="/images/beranda/songket-kanan.png"
            alt="songket kanan"
            fill
            className="object-fill"
          />
        </div>

        {/* Cloud left — fades out */}
        <div
          className="absolute w-50 h-24 left-0 top-40 z-[4] animate-cloudLeft transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <Image
            src="/images/beranda/awan-kiri.png"
            alt="cloud left"
            fill
            className="object-fill"
          />
        </div>

        {/* Cloud right — fades out */}
        <div
          className="absolute top-30 right-0 h-30 w-50 z-[4] animate-cloudRight transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <Image
            src="/images/beranda/awan-kanan.png"
            alt="cloud right"
            fill
            className="object-fill"
          />
        </div>

        {/* Title — fades out */}
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 z-[5] text-center transition-opacity duration-500"
          style={{ opacity: bgChanged ? 0 : 1 }}
        >
          <h1 className="text-5xl text-yellow-400 drop-shadow-lg tracking-wide">
            Cultural Festival
          </h1>
        </div>

        {/* Chest — moves up when opened */}
        <div
          onClick={handleChestClick}
          className={`
            absolute left-1/2 -translate-x-1/2
            z-[6] w-2/3 h-2/3
            transition-all duration-700
            ${!chestOpen ? 'cursor-pointer hover:scale-105 top-1/2 -translate-y-1/2' : 'top-[10%] -translate-y-0 w-[320px] h-[280px]'}
          `}
        >
          <Image
            src={chestOpen ? '/images/beranda/chest-open.png' : '/images/beranda/chest-close.png'}
            alt="chest"
            fill
            className="object-contain"
          />
        </div>

        {/* Click hint */}
        {!chestOpen && (
          <p className="
            absolute bottom-[8%] left-1/2 -translate-x-1/2
            text-white/70 text-sm tracking-widest uppercase
            z-[6] animate-pulse text-center
          ">
            Klik untuk membuka
          </p>
        )}

      </section>

      {/* ============ SCROLL SECTION ============ */}
      {showScroll && (
        <div className="mt-[-50vh] relative z-[7] flex flex-col items-center animate-fadeIn overflow-hidden">

          {/* Alternating backgrounds — behind everything */}
          <div className="absolute inset-0 z-[0] top-[135px]">
            {['bg-section-1', 'bg-section-2', 'bg-section-1', 'bg-section-2', 'bg-section-1', 'bg-section-2'].map((bg, i) => (
              <div
                key={i}
                className="w-full"
                style={{
                  height: '100vh',
                  backgroundImage: `url('/images/beranda/${bg}.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>

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

          {/* Long paper — divided into 6 full sections */}
          <div
            className="relative -top-2 w-[80%] animate-unroll overflow-hidden"
            style={{
              backgroundImage: "url('/images/beranda/paper.png')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              height: '600vh', // 6 sections x 100vh
            }}
          >

            {/* Section 1 — About Culfest */}
            <section
              className="h-screen flex items-center justify-center"
              style={{ backgroundPositionY: '0vh' }}
            >
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">About Culfest</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

            {/* Section 2 — Linimasa */}
            <section className="h-screen flex items-center justify-center">
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">Linimasa</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

            {/* Section 3 — Jelajah Bareng */}
            <section className="h-screen flex items-center justify-center">
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">Jelajah Bareng</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

            {/* Section 4 — Kompetisi */}
            <section className="h-screen flex items-center justify-center">
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">Kompetisi</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

            {/* Section 5 — Game */}
            <section className="h-screen flex items-center justify-center">
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">Game</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

            {/* Section 6 — Sponsor & Media Partner */}
            <section className="h-screen flex items-center justify-center">
              <div className="text-center text-amber-900">
                <h2 className="text-3xl font-bold">Sponsor & Media Partner</h2>
                <p className="mt-2 text-sm">Konten akan ditambahkan</p>
              </div>
            </section>

          </div>

        </div>
      )}

      {/* ============ ANIMATIONS ============ */}
      <style>{`
        @keyframes waveFloat {
          0%, 100% { transform: translateX(2px); }
          50% { transform: translateX(8px); }
        }
        @keyframes cloudLeft {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-10px); }
        }
        @keyframes cloudRight {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }
        @keyframes sway {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes swayReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
        @keyframes unroll {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .animate-waveFloat { animation: waveFloat 4s ease-in-out infinite; }
        .animate-cloudLeft { animation: cloudLeft 8s ease-in-out infinite; }
        .animate-cloudRight { animation: cloudRight 8s ease-in-out infinite; }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
        .animate-swayReverse { animation: swayReverse 6s ease-in-out infinite; }
        .animate-unroll { animation: unroll 0.8s ease-out forwards; }
      `}</style>

    </main>
  );
}