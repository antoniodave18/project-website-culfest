import Image from "next/image";

export default function HeroAsrama() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center py-16"
      style={{
        background:
          "linear-gradient(90deg, rgba(222, 132, 2, 0.9) -4.43%, rgba(255, 210, 134, 0.9) 17.65%, rgba(255, 210, 134, 0.9) 81.76%, rgba(222, 132, 2, 0.9) 104.89%)",
      }}
    >
      <div className="w-full h-screen">
        <div className="relative flex justify-between items-center pt-43 ">
          <Image
            src="/images/jelajah/asrama/window-pillar.svg"
            width={800}
            alt="window-pillar"
            height={400}
            className="w-full h-screen object-contain"
          />
          <div className="px-30 z-10 ">
            <p
              className="text-center leading-none tracking-widest w-300 pb-35"
              style={{
                fontFamily: "Merriweather, serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "30.12px",
                letterSpacing: "0.04em",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              Gelanggang Expo atau GELEX 2025 akan diselenggarakan pada 21–23
              Agustus di Lapangan Pancasila UGM dengan mengusung tema “Resonansi
              Harmoni Gelanggang” dan konsep nostalgic universe. Memperingati 50
              tahun Gelanggang Mahasiswa, GELEX tahun ini menghadirkan Remon,
              maskot penjelajah waktu yang akan menemanimu menjelajahi dunia
              Gelanggang yang penuh semangat kebersamaan. Selain pameran dan
              penampilan dari berbagai UKM serta komunitas, GELEX 2025 juga
              menyuguhkan web series empat episode yang mengangkat kisah seru
              dari masing-masing sekber, kolaborasi antar penghuni Gelanggang,
              zona interaktif, serta visual yang membangkitkan nostalgia!
            </p>
          </div>
          <Image
            src="/images/jelajah/asrama/window-pillar.svg"
            width={800}
            alt="window-pillar"
            height={400}
            className="w-full h-screen object-contain -scale-x-100"
          />
        </div>
        <Image
          src="/images/jelajah/asrama/inner-ombak.png"
          width={2560}
          alt="ombak"
          height={640}
          sizes="100vw"
          quality={100}
          priority
          className="absolute bottom-30 w-full h-auto object-contain mb-10"
        />
      </div>
      <Image
        src="/images/jelajah/asrama/Gerbang.png"
        width={2560}
        alt="door"
        height={960}
        sizes="100vw"
        quality={100}
        priority
        className="absolute w-screen top-0 h-auto object-contain"
      />
      <Image
        src="/images/jelajah/asrama/outer-ombak.png"
        width={2560}
        alt="ombak"
        height={640}
        sizes="100vw"
        quality={100}
        priority
        className="absolute left-0 bottom-35 z-0 w-full h-auto object-contain pointer-events-none"
      />
    </div>
  );
}
