"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export interface MaskotCardProps {
  title: string;
  desc: string;
}

export default function MaskotCard({ title, desc }: MaskotCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBelowMd, setIsBelowMd] = useState(false);

  useEffect(() => {
    const updateScreen = () => setIsBelowMd(window.innerWidth < 768);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const words = useMemo(() => desc.trim().split(/\s+/), [desc]);
  const shouldTruncate = (isBelowMd && words.length > 30) || words.length > 35;
  const shortDesc = useMemo(() => {
    const limit = isBelowMd ? 30 : 35;
    return words.slice(0, limit).join(" ");
  }, [isBelowMd, words]);

  return (
    <div className="relative flex items-center justify-center w-3/4 lg:w-full max-w-[900px] mx-auto font-serif px-2">
      <div
        className="relative w-full rounded-[1.5rem] md:rounded-[2rem] pt-10 pb-10 px-8 sm:px-12 md:pt-10 md:pb-10 z-10 border border-white/20"
        style={{
          background:
            "linear-gradient(89.97deg, rgba(94, 94, 94, 0.6) 0.03%, rgba(255, 255, 255, 0.4) 20.58%, rgba(255, 255, 255, 0.4) 80.71%, rgba(94, 94, 94, 0.6) 99.97%)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[250px] sm:w-[270px] md:w-[330px] lg:w-[370px] xl:w-[420px] aspect-[486/72] z-30 flex items-center justify-center drop-shadow-xl pointer-events-none">
          <Image src="/images/tentang/pita-2.svg" alt="Pita" fill />
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
            {isExpanded || !shouldTruncate ? desc : `${shortDesc}...`}
          </p>

          {shouldTruncate && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="rounded bg-[#ef9e1e] px-4 py-2 text-sm font-semibold text-[#4a1602] transition-colors hover:bg-[#df8e0e]"
              >
                {isExpanded ? "Tutup" : "Lihat Selengkapnya"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
