"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PitaJudul from "./PitaJudul";
import NavActionButton from "../../components/NavActionButton";

const fullText =
  'Cultural Festival (Culfest) merupakan acara tahunan yang diselenggarakan oleh UGM Residence  dengan mengusung semangat "Unity in Diversity" sebagai bentuk apresiasi terhadap keberagaman budaya Nusantara juga merupakan puncak lifeskills untuk penghuni UGM Residence. Kegiatan ini menghadirkan berbagai rangkaian seperti pameran budaya, pagelaran seni, hingga berbagai kompetisi yang melibatkan mahasiswa dan masyarakat umum. Pada penyelenggaraan ke-15, Culfest mengangkat budaya Sumatera Selatan dengan konsep petualangan yang mengajak pengunjung mengeksplorasi kekayaan tradisi secara lebih dekat dan interaktif. Tema "Kulukilir Berbudayo: Eksplorasi Cindonyo Nusantara" menjadi representasi ajakan untuk merasakan keindahan budaya melalui pengalaman yang menyeluruh. Dengan kolaborasi berbagai tokoh budaya dan akademisi, Culfest 15 diharapkan menjadi ruang eksplorasi sekaligus pelestarian budaya Indonesia.';

export default function TentangSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    // Check screen size on mount
    const checkSize = () => {
      setIsSmallDevice(window.innerWidth < 768); // md breakpoint is 768px
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const words = fullText.split(" ");
  const truncatedText = words.slice(0, 40).join(" ");
  const isTruncated = words.length > 40;

  // Only truncate on small devices
  const displayText = isSmallDevice
    ? isExpanded
      ? fullText
      : truncatedText
    : fullText;

  return (
    <section className="relative w-full pt-20 pb-0 z-10 font-(family-name:--font-montserrat)">
      

      <div className="relative w-full rounded-t-xl overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(222, 132, 2, 0.9) -4.43%, rgba(255, 210, 134, 0.9) 17.65%, rgba(255, 210, 134, 0.9) 81.76%, rgba(222, 132, 2, 0.9) 104.89%)",
          }}
        ></div>

        <div className="relative mt-2 lg:mt-5 ml-2 lg:ml-5 z-30">
          <NavActionButton
            href="/home"
            label="Kembali"
            icon="←"
            iconPosition="left"
          />
        </div>

        <div className="relative mt-15 md:mt-25 lg:mt-30 xl:mt-40 mx-4 sm:mx-6 md:mx-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center pointer-events-none">
            <PitaJudul judul="TENTANG CULTURAL FESTIVAL 15" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center border-4 sm:border-[6px] md:border-8 border-[#5e240c] border-b-0 rounded-t-xl bg-[#e4ab53]/10">
          <div className="mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8 w-full">
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-snug md:leading-normal text-[#3a1d04] w-full sm:w-[95%] md:w-[90%] lg:w-[85%] mx-auto"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 500,
                fontStyle: "normal",
                letterSpacing: "-0.01em",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              {displayText}
              {isTruncated && isSmallDevice && !isExpanded && "..."}
            </p>

            {isTruncated && isSmallDevice && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-4 sm:px-6 py-2 bg-[#EF9E1E] hover:bg-[#df8e0e] text-[#3a1d04] font-semibold rounded text-sm sm:text-base transition-colors duration-200"
                >
                  {isExpanded
                    ? "Tampilkan Lebih Sedikit"
                    : "Tampilkan Selengkapnya"}
                </button>
              </div>
            )}
          </div>

          {/* Golden Video / Image Placeholder Box */}
          <div
            className="mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-8 flex items-center justify-center relative shadow-inner"
            style={{
              width: "min(1135px, 90%)",
              height: "120px",
              transform: "rotate(0deg)",
              opacity: 1,
              borderRadius: "4.74px",
              borderWidth: "3.37px",
              borderStyle: "solid",
              borderColor: "#EF9E1E",
            }}
          >
            <Image
              src="/images/tentang/galerry.png"
              alt="Galeri Culfest"
              fill sizes="100vw"
              className="object-cover"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
