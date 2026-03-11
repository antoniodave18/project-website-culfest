'use client';

import { useState } from 'react';
import Image from 'next/image';


export default function Home() {
  const [chestOpen, setChestOpen] = useState(false);

  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">

        {/* Base background*/}
        <Image
          src="/images/beranda/bg.png"
          alt="background"
          fill
          className="object-cover z-0"
          priority
        />

        {/* Linear gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-linear-to-b from-black/40" />

        {/* tirai atas */}
        <div className="absolute top-0 w-full z-[3]">
          <Image
            src="/images/beranda/tirai-atas.png"
            alt="wave"
            width={1920}
            height={300}
            className="w-full object-cover"
          />
        </div>

        {/* Wave — bottom, full width */}
        <div className="absolute -bottom-1 right-0 w-[110%] z-[2] animate-waveLeft">
          <Image
            src="/images/beranda/wave.png"
            alt="wave"
            width={1920}
            height={300}
            className="w-full object-cover"
          />
        </div>

        {/* Scarf left — left side, vertical */}
        <div className="absolute w-1/3 h-3/5 z-[3] animate-sway">
          <Image
            src="/images/beranda/songket-kiri.png"
            alt="scarf left"
            fill
            className="object-fill"
          />
        </div>

        {/* Scarf right — right side, vertical */}
        <div className="absolute top-0 right-0 w-1/3 h-3/5 z-[3] animate-swayReverse">
          <Image
            src="/images/beranda/songket-kanan.png"
            alt="scarf right"
            fill
            className="object-fill"
          />
        </div>

        {/* Cloud left — top left corner */}
        <div className="absolute w-50 h-24 left-0 top-40 z-[4] animate-cloudLeft">
          <Image
            src="/images/beranda/awan-kiri.png"
            alt="cloud left"
            fill
            className="object-fill"
          />
        </div>

        {/* Cloud right — top right corner */}
        <div className="absolute top-30 right-0 h-30 w-50 z-[4] animate-cloudRight">
          <Image
            src="/images/beranda/awan-kanan.png"
            alt="cloud right"
            fill
            className="object-fill"
          />
        </div>

        {/* Title — Cultural Festival */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-[5] text-center">
          <h1
            className="text-5xl text-yellow-400 drop-shadow-lg tracking-wide"
          >
            Cultural Festival
          </h1>
        </div>

        {/* Chest — center */}
        <div
          onClick={() => setChestOpen(true)}
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            z-[6] w-2/3 h-2/3
            transition-transform duration-200
            ${!chestOpen ? 'cursor-pointer hover:scale-105' : ''}
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

      {/* Animations */}
      <style>{`
        @keyframes waveLeft {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(18px); }
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
        .animate-waveLeft { animation: waveLeft 5s ease-in-out infinite; }
        .animate-cloudLeft { animation: cloudLeft 8s ease-in-out infinite; }
        .animate-cloudRight { animation: cloudRight 8s ease-in-out infinite; }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
        .animate-swayReverse { animation: swayReverse 6s ease-in-out infinite; }
      `}</style>

    </main>
  );
}