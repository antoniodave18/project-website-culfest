import Image from "next/image";

type PitaJudulProps = {
  judul: string;
};

export default function PitaJudul({ judul }: PitaJudulProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] flex justify-center items-center z-20 mt-16 sm:mt-16 md:mt-10 lg:mt-14">
      <div className="relative w-full aspect-[4.5/1] drop-shadow-lg sm:drop-shadow-xl md:drop-shadow-2xl flex items-center justify-center">
        <Image
          src="/images/tentang/pita.png"
          alt="Ribbon Background"
          fill
          className="object-contain"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center mx-auto w-[70%] sm:w-[72%] md:w-[74%] lg:w-[75%] h-[75%] sm:h-[78%] md:h-[80%] mt-[-1%]">
          <Image
            src="/images/tentang/inner-pita.png"
            alt="Inner Ribbon Background"
            fill
            className="object-contain"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-2 md:px-4">
            <h1
              className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-[#ffd700] leading-none tracking-[0.05em] text-center font-bold [font-family:var(--font-efco-brookshire),serif] [text-shadow:2px_2px_5px_rgba(0,0,0,0.8)]"
            >
              {judul}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
