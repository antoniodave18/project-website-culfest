import Image from "next/image";

export default function HeroAsrama() {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center py-30 "
      style={{
        background:
          "linear-gradient(90deg, rgba(222, 132, 2, 0.9) -4.43%, rgba(255, 210, 134, 0.9) 17.65%, rgba(255, 210, 134, 0.9) 81.76%, rgba(222, 132, 2, 0.9) 104.89%)",
      }}
    >
      <div className="relative w-full h-screen">
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
                fontSize: "21px",
                lineHeight: "30.12px",
                letterSpacing: "0.04em",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              Asrama Mahasiswa Universitas Gadjah Mada (UGM Residence) merupakan fasilitas hunian strategis yang dirancang untuk mendukung iklim akademik kondusif bagi mahasiswa tahun pertama maupun jenjang sarjana dan diploma. Terbagi menjadi dua kategori utama, yakni Ratnaningsih untuk asrama putri dan Darmaputera untuk asrama putra, kompleks hunian ini tersebar di beberapa lokasi baik di dalam maupun di sekitar lingkungan kampus dengan aksesibilitas yang baik.
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
          className="absolute -bottom-40 w-full h-auto object-contain "
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
        className="absolute left-0 top-0 w-screen h-auto object-contain pointer-events-none"
      />
      <Image
        src="/images/jelajah/asrama/outer-ombak.png"
        width={2560}
        alt="ombak"
        height={640}
        sizes="100vw"
        quality={100}
        priority
        className="absolute left-0 -bottom-40 z-0 w-full h-auto object-contain pointer-events-none"
      />
    </div>
  );
}
