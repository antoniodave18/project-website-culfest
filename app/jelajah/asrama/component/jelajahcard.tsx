import Image from "next/image";

export interface JelajahCardProps {
  title: string;
}

export default function JelajahCard({ title }: JelajahCardProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[900px] mx-auto  mt-15 font-serif px-2">
      <div
        className="relative w-full rounded-[1.5rem] md:rounded-[2rem] pt-10 pb-10 px-8 sm:px-12 md:pt-10 md:pb-10 z-10 border border-white/20"
        style={{
          background:
            "linear-gradient(89.97deg, rgba(94, 94, 94, 0.6) 0.03%, rgba(255, 255, 255, 0.4) 20.58%, rgba(255, 255, 255, 0.4) 80.71%, rgba(94, 94, 94, 0.6) 99.97%)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[85%] sm:w-[75%] max-w-[500px] aspect-[486/72] z-30 flex items-center justify-center drop-shadow-xl pointer-events-none ">
          <Image
            src="/images/jelajah/asrama/pita.svg"
            alt="Pita"
            fill
            className="object-contain"
          />
          <h2
            className="relative z-40 text-[#4a1602] uppercase text-center -mt-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(12px, 3.5vw, 24.85px)",
              lineHeight: "100%",
              letterSpacing: "0%",
              background: "linear-gradient(180deg, #E3AD6C 0%, #C5781D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#C5781D",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Deskripsi Teks */}
        <div className="w-full py-10 flex justify-center">
          <div className="bg-gradient-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] h-50 w-120 flex items-center justify-center rounded-xl">
            <div className="p-[5px] rounded-xl bg-gradient-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61]">
              <div className="relative h-60 w-100 rounded-xl overflow-hidden">
                <Image
                  src="/images/tentang/penari.png"
                  alt="Penari Culfest"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
