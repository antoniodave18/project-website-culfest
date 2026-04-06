import Image from "next/image";

export default function HeroAsrama() {
  return (
    <div
      className="relative isolate w-full h-auto flex flex-col items-center justify-start bg-[linear-gradient(90deg,rgba(222,132,2,0.9)_-4.43%,rgba(255,210,134,0.9)_17.65%,rgba(255,210,134,0.9)_81.76%,rgba(222,132,2,0.9)_104.89%)]"
    >
      <div className="pointer-events-none hidden md:block absolute inset-0 z-1">
        <Image
        src="/images/jelajah/asrama/Gerbang.png"
        fill
        alt=""
        sizes="65vw"
        preload
        className="object-cover object-top"
      />
      </div>

      <div className="relative z-20 top-20 mb-30 md:mb-50 md:top-30 xl:top-0 w-full max-w-4xl h-25 md:h-40 lg:h-65">
        <Image
          src="/images/jelajah/asrama/title-asrama.png"
          alt="Asrama title banner"
          fill
          sizes="(max-width: 768px) 90vw, 70vw"
          preload
          className="object-contain"
        />
      </div>

        <div className="hidden pointer-events-none absolute inset-y-0 left-0 z-0 lg:block w-[18vw] max-w-[320px] min-w-45">
          <div className="relative h-full w-full">
            <Image
              src="/images/jelajah/asrama/Gerbang-kiri.png"
              fill
              alt="window-pillar"
              sizes="60vw"
              className="object-contain object-left"
            />
          </div>
        </div>

        <div className="hidden pointer-events-none absolute inset-y-0 right-0 z-0 lg:block w-[18vw] max-w-[320px] min-w-45">
          <div className="relative h-full w-full">
            <Image
              src="/images/jelajah/asrama/Gerbang-kanan.png"
              fill
              alt="window-pillar"
              sizes="60vw"
              className="object-contain object-right"
            />
          </div>
        </div>

        <div className="relative z-5 flex h-auto items-center justify-center px-4 sm:px-6 md:px-10">
          <p
            className="mx-auto w-full max-w-3xl text-center text-sm md:text-[21px] leading-7 md:leading-[30.12px] tracking-[0.04em] text-[#4d1101] mb-40 md:mb-60 lg:mb-90"
            style={{
              fontFamily: "Merriweather, serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Asrama Mahasiswa Universitas Gadjah Mada (UGM Residence) merupakan fasilitas hunian strategis yang dirancang untuk mendukung iklim akademik kondusif bagi mahasiswa tahun pertama maupun jenjang sarjana dan diploma. Terbagi menjadi dua kategori utama, yakni Ratnaningsih untuk asrama putri dan Darmaputera untuk asrama putra, kompleks hunian ini tersebar di beberapa lokasi baik di dalam maupun di sekitar lingkungan kampus dengan aksesibilitas yang baik.
          </p>
        </div>
        
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full h-28 sm:h-32 md:h-40 lg:h-80">
          <Image
            src="/images/jelajah/asrama/inner-ombak.png"
            fill
            alt="ombak"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 w-full h-32 sm:h-36 md:h-44 lg:h-52">
          <Image
            src="/images/jelajah/asrama/outer-ombak.png"
            fill
            alt="ombak"
            sizes="100vw"
            className="object-cover"
          />
        </div>
    </div>
  );
}
