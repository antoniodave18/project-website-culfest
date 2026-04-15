import Image from "next/image";

export default function TransisiAwan() {
  return (
    <div className="relative w-full h-0 z-30 pointer-events-none">
      {/* Container is placed exactly at the border between Tentang and Sejarah */}

      {/* Sun/Matahari (Left) */}
      <div className="absolute left-[5%] md:left-[-3%] -top-20 w-32 h-32 md:w-100 md:h-60 z-10 transition-transform hover:scale-105 duration-500 drop-shadow-xl">
        <Image
          src="/images/tentang/matahari.png"
          alt="Matahari"
          fill sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Cloud 1 (Left, overlapping sun) */}
      <div className="absolute left-[10%] md:left-[-28%] -top-62 md:w-140 md:h-80 z-20 transition-transform hover:scale-105 duration-500 animate-cloudLeft">
        <Image
          src="/images/tentang/awan.png"
          alt="Awan Atas"
          fill sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Cloud 2 (Left, below sun) */}
      <div className="absolute left-[10%] md:left-[-10%] -top-10 w-40 h-24 md:w-80 md:h-60 z-20 transition-transform hover:scale-105 duration-500 animate-cloudRight">
        <Image
          src="/images/tentang/awan.png"
          alt="Awan Bawah"
          fill sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Cloud 3 (Right) */}
      <div className="absolute right-[0%] md:left-[80%] -top-60 w-40 h-24 md:w-80 md:h-60 z-20 transition-transform hover:scale-105 duration-500 animate-cloudLeft">
        <Image
          src="/images/tentang/awan.png"
          alt="Awan Kanan"
          fill sizes="100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
