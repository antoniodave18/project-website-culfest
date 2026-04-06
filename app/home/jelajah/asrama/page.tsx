"use client";

import { useEffect, useMemo, useRef } from "react";
import BackToHomeButton from "../../components/BackToHomeButton";
import HeroAsrama from "./component/hero-asrama";
import JelajahCard from "./component/jelajahcard";
import { ASRAMA_DETAILS, type AsramaDetail } from "./data";

const Page = () => {
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const mobileLoopData = useMemo(
    () => [...ASRAMA_DETAILS, ...ASRAMA_DETAILS, ...ASRAMA_DETAILS],
    []
  );

  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider) {
      return;
    }

    // Start at the middle copy so users can scroll both directions infinitely
    requestAnimationFrame(() => {
      slider.scrollLeft = slider.scrollWidth / 3;
    });
  }, []);

  const handleInfiniteMobileScroll = () => {
    const slider = mobileSliderRef.current;
    if (!slider) {
      return;
    }

    const oneSetWidth = slider.scrollWidth / 3;

    if (slider.scrollLeft <= oneSetWidth * 0.5) {
      slider.scrollLeft += oneSetWidth;
    } else if (slider.scrollLeft >= oneSetWidth * 1.5) {
      slider.scrollLeft -= oneSetWidth;
    }
  };

  return (
    <main
      className="relative overflow-hidden flex flex-col items-center bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-[#6e0f04]"
    >

      <BackToHomeButton className="absolute left-4 top-4 z-10 md:left-8 md:top-8" />
      <HeroAsrama />

      <div className="relative z-10 w-full">
        <div className="flex h-auto w-full items-center justify-center bg-[#03005E] px-4 py-4">
          <h2
            className="text-center"
            style={{
              fontFamily: "var(--font-efco-brookshire), serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              color: "#F5A623",
              letterSpacing: "0.05em",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Jelajah Asrama
          </h2>
        </div>

        <div
          className="hidden w-full grid-cols-2 gap-8 px-10 py-15 lg:gap-15 lg:grid"
          style={{
            backgroundImage: "url('/images/jelajah/asrama/Bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {ASRAMA_DETAILS.map((item: AsramaDetail) => (
            <JelajahCard
              key={item.slug}
              title={item.title}
              slug={item.slug}
              imageSrc={item.image}
              summary={item.summary}
            />
          ))}
        </div>

        <div className="relative w-full lg:hidden">
          <div
            ref={mobileSliderRef}
            onScroll={handleInfiniteMobileScroll}
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 md:gap-30 overflow-x-auto overscroll-x-contain px-3 py-10"
            style={{
              backgroundImage: "url('/images/jelajah/asrama/Bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {mobileLoopData.map((item: AsramaDetail, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="w-[86vw] shrink-0 snap-center first:ml-1 last:mr-1 md:w-[66vw]"
              >
                <JelajahCard
                  title={item.title}
                  slug={item.slug}
                  imageSrc={item.image}
                  summary={item.summary}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-2 text-white/60 text-2xl md:text-3xl font-bold drop-shadow">
            &lt;
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2 text-white/60 text-2xl md:text-3xl font-bold drop-shadow">
            &gt;
          </div>
        </div>

      </div>
    </main>
  );
};

export default Page;
