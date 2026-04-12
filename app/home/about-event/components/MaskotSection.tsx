"use client";

import { useRef } from "react";
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
        <div className="w-full max-w-85 sm:max-w-115 md:max-w-145 lg:max-w-165 xl:max-w-182.5 mx-auto mt-10 lg:mt-35 xl:mt-90 mb-3 xl:mb-10">
          <MaskotCard
            title="CHILEKO dan CHITALA"
            desc="Desain maskot diambil dari wujud ikan belida. Nama ikan ini diambil dari nama salah satu sungai di Sumatera Selatan yang menjadi habitatnya, yakni Sungai Belida. Ikan ini ditetapkan sebagai maskot fauna Sumatera Selatan. Ikan belida dijadikan sebagai bahan baku makanan khas di wilayah Sumatera Selatan yang juga digemari oleh masyarakat luas, yaitu pempek dan kerupuk Palembang."
          />
        </div>
        <div className="flex items-end justify-center w-full max-w-70 sm:max-w-80 md:max-w-105 lg:max-w-225 mx-auto">
          <div className="relative w-1/2 h-45 md:h-80 lg:h-150">
            <Image
              src="/images/tentang/chileko.png"
              alt="Chileko"
              fill sizes="100vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative w-1/2 h-45 md:h-80 lg:h-150">
            <Image
              src="/images/tentang/chitala.png"
              alt="Chitala"
              fill sizes="100vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </>
    </>
  );

  return (
    <section className="relative w-full z-10 flex flex-col items-center">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/images/tentang/bluebg.png"
          alt="Blue Background"
          fill sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover object-top"
        />
        <Image
          src="/images/tentang/yellowbg.png"
          alt="Yellow Background"
          fill sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover object-top"
        />

        <div className="relative z-10 flex flex-col pb-0">
          <MaskotTitle />

          <div className="w-full max-w-400 mx-auto mb-10">
            <div className="lg:hidden flex items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-8 lg:px-12">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#ef9e1e] text-[#4a1602] shadow hover:bg-[#df8e0e]"
                  aria-label="Geser ke kiri"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>

                <div
                  ref={carouselRef}
                  className="flex-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible py-1"
                >
                  <div className="min-w-[calc(100%-0.25rem)] sm:min-w-[calc(100%-0.5rem)] md:min-w-[calc(100%-0.75rem)] snap-center sm:pt-10">
                    {introMaskotContent}
                  </div>
                  {cardItems.map((item) => (
                    <div
                      key={item.title}
                      className="min-w-[calc(100%-0.25rem)] sm:min-w-[calc(100%-0.5rem)] md:min-w-[calc(100%-0.75rem)] snap-center flex justify-center pt-8 sm:pt-10"
                    >
                      <MaskotCard title={item.title} desc={item.desc} />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#ef9e1e] text-[#4a1602] shadow hover:bg-[#df8e0e]"
                  aria-label="Geser ke kanan"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
            </div>

            <div className="hidden lg:block px-4 sm:px-8 md:px-16 xl:px-35">
              {introMaskotContent}
              <div className="w-full max-w-400 mx-auto grid grid-cols-2 items-start gap-y-8 md:gap-y-10 gap-x-8 xl:pt-50">
                {cardItems.map((item) => (
                  <MaskotCard
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
