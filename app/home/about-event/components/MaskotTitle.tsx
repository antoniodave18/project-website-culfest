import Image from "next/image";

export default function MaskotTitle() {
  return (
    <div className="relative w-[92%] sm:w-[88%] md:w-[84%] lg:w-[80%] max-w-2xl mx-auto lg:translate-y-10 flex flex-col items-center justify-center z-20">
      {/* The Scroll Container (Yellow/Gold) */}
      <div className="relative w-full aspect-4.5/1 drop-shadow-xl sm:drop-shadow-2xl flex items-center justify-center z-20">
        <Image
          src="/images/tentang/PETA.png"
          alt="Ribbon Background"
          fill sizes="100vw"
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1
            className="leading-none tracking-[0.08em] sm:tracking-widest text-center pb-1 sm:pb-2"
            style={{
              fontFamily: "var(--font-efco-brookshire), serif",
              fontSize: "clamp(30px, 8vw, 68px)",
              fontWeight: 900,
              background:
                "radial-gradient(41.99% 41.99% at 50% 50%, #942D01 0%, #461500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 0px #942D01",
            }}
          >
            Maskot
          </h1>
        </div>
      </div>

      {/* The Red Banner Container (CULTURAL FESTIVAL 15) */}
      <div
        className="relative w-[90%] sm:w-[88%] md:w-[86%] lg:w-[85%] rounded-b-xl -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-15 z-10 pt-5 sm:pt-7 md:pt-9 lg:pt-10 pb-4 sm:pb-5 md:pb-6 px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(0deg, #8C0E0F 0%, #461500 100%)",
        }}
      >
        <h2
          className="text-[#fbbd23] text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.2em] montserrat text-center mt-1 sm:mt-2"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          CULTURAL FESTIVAL 15
        </h2>
      </div>
    </div>
  );
}
