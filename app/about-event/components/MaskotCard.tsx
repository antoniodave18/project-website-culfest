import Image from "next/image";

export interface MaskotCardProps {
  title: string;
  desc: string;
}

export default function MaskotCard({ title, desc }: MaskotCardProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[900px] mx-auto font-serif px-2">
      <div
        className="relative w-full rounded-[1.5rem] md:rounded-[2rem] pt-10 pb-10 px-8 sm:px-12 md:pt-10 md:pb-10 z-10 border border-white/20"
        style={{
          background:
            "linear-gradient(89.97deg, rgba(94, 94, 94, 0.6) 0.03%, rgba(255, 255, 255, 0.4) 20.58%, rgba(255, 255, 255, 0.4) 80.71%, rgba(94, 94, 94, 0.6) 99.97%)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[85%] sm:w-[75%] max-w-[500px] aspect-[486/72] z-30 flex items-center justify-center drop-shadow-xl pointer-events-none ">
          <Image src="/images/tentang/pita-2.svg" alt="Pita" fill />
          <h2
            className="relative z-40 text-[#4a1602] uppercase text-center -mt-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(12px, 3.5vw, 24.85px)",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Deskripsi Teks */}
        <p
          className="text-white text-justify relative z-20"
          style={{
            fontFamily: "'Merriweather', serif",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "27.6px",
            letterSpacing: "0%",
            textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
