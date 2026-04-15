"use client";

import Image from "next/image";

export interface MaskotCardProps {
  title: string;
  desc: string;
}

export default function MaskotCard({ title, desc }: MaskotCardProps) {
  return (
    <div className="relative flex items-center justify-center w-full lg:w-full max-w-225 mx-auto font-serif">
      <div
        className="relative w-full rounded-3xl md:rounded-4xl pt-10 pb-10 px-8 sm:px-12 md:pt-10 md:pb-10 z-10 border border-white/20"
        style={{
          background:
            "linear-gradient(89.97deg, rgba(94, 94, 94, 0.6) 0.03%, rgba(255, 255, 255, 0.4) 20.58%, rgba(255, 255, 255, 0.4) 80.71%, rgba(94, 94, 94, 0.6) 99.97%)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-50 sm:w-67.5 md:w-82.5 lg:w-92.5 xl:w-105 aspect-486/72 z-30 flex items-center justify-center drop-shadow-xl pointer-events-none">
          <Image src="/images/tentang/pita-2.svg" alt="Pita" fill sizes="100vw" />
          <h2
            className="relative z-40 text-[#4a1602] uppercase text-center -mt-2 md:-mt-4 font-extrabold text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] xl:text-[22.85px] leading-none tracking-normal"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="relative z-20">
          <p
            className="text-white text-justify text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px]"
            style={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 700,
              letterSpacing: "0%",
              textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
