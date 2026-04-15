"use client";

import NavActionButton from "../../components/NavActionButton";
import HeroAsrama from "./component/hero-asrama";
import JelajahCard from "./component/jelajahcard";
import { ASRAMA_DETAILS, type AsramaDetail } from "./data";

const Page = () => {
  return (
    <main
      className="relative overflow-hidden flex flex-col items-center bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-[#6e0f04]"
    >

      <NavActionButton
        href="/home"
        label="Kembali"
        icon="←"
        iconPosition="left"
        className="absolute left-4 top-4 z-10 md:left-8 md:top-8"
      />
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
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 md:gap-30 overflow-x-auto overscroll-x-contain px-[7vw] md:px-[17vw] py-10"
            style={{
              backgroundImage: "url('/images/jelajah/asrama/Bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {ASRAMA_DETAILS.map((item: AsramaDetail) => (
              <div
                key={item.slug}
                className="w-[86vw] shrink-0 snap-center md:w-[66vw]"
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
