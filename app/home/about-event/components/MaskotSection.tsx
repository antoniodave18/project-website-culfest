"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MaskotTitle from "./MaskotTitle";
import MaskotCard from "./MaskotCard";

const cardItems = [
  {
    title: "SONGKET",
    desc: "CHILEKO dan CHITALA mengenakan kain motif songket sebagai kain kebanggaan Sumatera Selatan. Songket merupakan warisan kebudayaan yang melambangkan kemewahan, kemakmuran, dan kejayaan Sriwijaya. Kain songket digunakan dalam acara adat, pernikahan, dan tarian tradisional sebagai suatu simbol kemuliaan. Songket yang digunakan berwarna biru tua, menyimbolkan ketenangan dan kewibawaan serta kehormatan. Motif berwarna emas dikombinasikan dan menyimbolkan kemakmuran dan kejayaan.",
  },
  {
    title: "AESAN GEDE",
    desc: "CHILEKO dan CHITALA menggunakan pakaian adat khas Sumatera Selatan, yaitu Aesan Gede. Pakaian adat ini merupakan pakaian kebesaran yang menyimbolkan keagungan, kemewahan, dan kesabaran. Seperti pada pakaian Chitala, Aesan Gede identik dengan warna keemasan yang dikombinasikan dengan merah muda.",
  },
  {
    title: "TANJAK",
    desc: "Ikat kepala pria Sumatera Selatan berbentuk runcing yang diikat dari kain songket. Chileko menggunakan tanjak sebagai lambang kehormatan, wibawa, dan jati diri masyarakat Sumatera Selatan sejak zaman Sriwijaya.",
  },
  {
    title: "MAHKOTA KARSUHUN",
    desc: "Hiasan kepala tradisional yang dikenakan Chitala adalah mahkota khas pengantin wanita Palembang, Sumatera Selatan, yang merupakan bagian dari busana adat Aesan Gede. Didominasi oleh warna emas, melambangkan kejayaan Kerajaan Sriwijaya, keanggunan, dan kelembutan perempuan Palembang.",
  },
];

export default function MaskotSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isBelowOrEqual2xl, setIsBelowOrEqual2xl] = useState(true);

  useEffect(() => {
    const updateViewport = () =>
      setIsBelowOrEqual2xl(window.innerWidth <= 1536);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.clientWidth * 0.9;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const introMaskotContent = (
    <>
      <>
        <div className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[660px] xl:max-w-[730px] mx-auto mt-10 sm:mt-28 md:mt-40 lg:mt-52 xl:mt-60">
          <MaskotCard
            title="CHILEKO dan CHITALA"
            desc="Desain maskot diambil dari wujud ikan belida. Nama ikan ini diambil dari nama salah satu sungai di Sumatera Selatan yang menjadi habitatnya, yakni Sungai Belida. Ikan ini ditetapkan sebagai maskot fauna Sumatera Selatan. Ikan belida dijadikan sebagai bahan baku makanan khas di wilayah Sumatera Selatan yang juga digemari oleh masyarakat luas, yaitu pempek dan kerupuk Palembang."
          />
        </div>
        <div className="flex items-end justify-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[900px] mx-auto gap-1 sm:gap-2 md:gap-3">
          <div className="relative w-1/2 aspect-[0.62] sm:aspect-[0.66] md:aspect-[0.7] max-w-[230px] sm:max-w-[340px] md:max-w-[200px] lg:max-w-[460px]">
            <Image
              src="/images/tentang/chileko.png"
              alt="Chileko"
              fill
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative w-1/2 aspect-[0.66] sm:aspect-[0.7] md:aspect-[0.75] max-w-[230px] sm:max-w-[240px] md:max-w-[200px] lg:max-w-[460px]">
            <Image
              src="/images/tentang/chitala.png"
              alt="Chitala"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </>
    </>
  );

  return (
    <section className="relative w-full z-10 flex flex-col items-center">
      <div className="relative w-full px-4 -mt-1">
        {/* Container dengan tinggi dari bluebg, kedua bg ditumpuk */}
        <div className="relative w-full">
          {/* Bluebg sebagai penentu tinggi container (flow normal) */}
          <Image
            src="/images/tentang/bluebg.png"
            alt="Blue Background"
            width={1920}
            height={1080}
            className=" lg:block w-full h-auto"
          />

          {/* Yellowbg ditumpuk di atas, anchor top */}
          <Image
            src="/images/tentang/yellowbg.png"
            alt="Yellow Background"
            width={1920}
            height={1080}
            className=" lg:block absolute top-0 left-0 w-full h-auto"
          />
        </div>

        {/* Overlay: Card + Maskot di atas bluebg */}
        <div className="absolute inset-0 flex flex-col  pb-0">
          <MaskotTitle />

          {isBelowOrEqual2xl ? (
            <div className="w-full max-w-[1600px] mx-auto mt-5 sm:mt-20 md:mt-30 lg:mt-40 xl:mt-121 2xl:mt-100">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-8 lg:px-12">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#ef9e1e] text-[#4a1602] text-xl font-bold shadow hover:bg-[#df8e0e]"
                  aria-label="Geser ke kiri"
                >
                  {"<"}
                </button>

                <div
                  ref={carouselRef}
                  className="flex-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible py-1"
                >
                  <div className="min-w-[calc(100%-0.25rem)] sm:min-w-[calc(100%-0.5rem)] md:min-w-[calc(100%-0.75rem)] snap-center pt-8 sm:pt-10">
                    {introMaskotContent}
                  </div>
                  {cardItems.map((item) => (
                    <div
                      key={item.title}
                      className="min-w-[calc(100%-0.25rem)] sm:min-w-[calc(100%-0.5rem)] md:min-w-[calc(100%-0.75rem)] snap-center pt-8 sm:pt-10"
                    >
                      <MaskotCard title={item.title} desc={item.desc} />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#ef9e1e] text-[#4a1602] text-xl font-bold shadow hover:bg-[#df8e0e]"
                  aria-label="Geser ke kanan"
                >
                  {">"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {introMaskotContent}
              <div className="w-full max-w-[1600px] mx-auto grid grid-cols-2 items-start gap-y-8 md:gap-y-10 px-4 sm:px-8 md:px-16 lg:px-40 mt-5 sm:mt-20 md:mt-30 lg:mt-40 xl:mt-61 2xl:mt-100">
                {cardItems.map((item) => (
                  <MaskotCard
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
