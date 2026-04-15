"use client";

import Image from "next/image";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a1a3a]">
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Red Background Card */}
        <div className="relative w-full aspect-4/3 max-h-[80vh] flex items-center justify-center animate-fadeInUp">
          {/* Golden Scroll */}
          <div className="relative z-20 w-[80%] md:w-[60%] flex flex-col items-center scale-90 md:scale-110 animate-sway">
            {/* Scroll Top */}
            <div className="w-full relative h-8 md:h-12 -mb-1">
              <Image
                src="/images/home/scroll-top-bottom.png"
                alt="Scroll Top"
                fill
                className="object-contain"
              />
            </div>

            {/* Scroll Body */}
            <div className="relative w-[92%] bg-[#f4d08b] py-12 md:py-16 px-4 flex flex-col items-center shadow-xl border-x-2 border-[#b8860b]/30">
              {/* Paper Texture Overlay */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage: "url('/images/home/paper.png')",
                  backgroundSize: "cover",
                }}
              />

              <h1 className="text-4xl md:text-7xl text-[#4a2c0f] font-efco text-center leading-tight drop-shadow-sm select-none">
                COMING
              </h1>
              <h1 className="text-4xl md:text-7xl text-[#4a2c0f] font-efco text-center mt-2 leading-tight drop-shadow-sm select-none">
                SOON
              </h1>
            </div>

            {/* Scroll Bottom */}
            <div className="w-full relative h-8 md:h-12 -mt-1">
              <Image
                src="/images/home/scroll-top-bottom.png"
                alt="Scroll Bottom"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Flowers Scatter */}
          {[
            { top: "10%", left: "15%", scale: 0.8, rotate: 10 },
            { top: "40%", left: "10%", scale: 1.1, rotate: -20 },
            { top: "70%", left: "20%", scale: 0.9, rotate: 45 },
            { top: "15%", right: "15%", scale: 1.0, rotate: -15 },
            { top: "45%", right: "10%", scale: 0.8, rotate: 30 },
            { top: "75%", right: "20%", scale: 1.2, rotate: -10 },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute z-30 animate-sway"
              style={{
                top: style.top,
                left: style.left,
                right: style.right,
                transform: `scale(${style.scale}) rotate(${style.rotate}deg)`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Image
                src="/images/coming-soon/bunga.png"
                alt="Bunga"
                width={80}
                height={80}
                className="w-12 md:w-20 h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Overrides for specific fonts if needed */}
      <style jsx global>{`
        .font-efco {
          font-family: var(--font-efco-brookshire), serif;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
