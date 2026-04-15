"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const fullText =
  "Cultural Festival yang dikenal sebagai Culfest merupakan sebuah kegiatan yang diselenggarakan setiap tahunnya oleh UGM Residence dengan nuansa Nusantara. Dimulai dari Culfest 7 hingga kini, tema dan nuansa yang dipilih selalu mengusung kebudayaan daerah tertentu yang berbeda setiap tahunnya. Culfest diselenggarakan dalam bentuk kegiatan kebudayaan yang meliputi pameran, penampilan putra-putri, pagelaran seni, dan esai budaya yang kemudian dikemas dalam bentuk kompetisi. Selama beberapa tahun terakhir, Culfest telah berkolaborasi dengan berbagai tokoh, seperti akademisi, budayawan, penggiat seni, duta budaya, dan lain sebagainya dalam rangkaian acara ini sebagai pembicara, juri, dan pemateri. Pada tahun ini, Cultural Festival dalam penyelenggaraannya yang ke-15 kembali mengajak setiap pihak di antaranya civitas akademika UGM, masyarakat umum, penggiat budaya, dan lain sebagainya untuk kembali turut serta mengapresiasi kekayaan budaya Nusantara yang akan tertuang dalam satu rangkaian penuh Cultural Festival 15.";

export default function SejarahSection() {
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
  const truncatedText = words.slice(0, 50).join(" ");
  const isTruncated = words.length > 50;

  // Only truncate on small devices
  const displayText = isSmallDevice
    ? isExpanded
      ? fullText
      : truncatedText
    : fullText;
  return (
    <section className="relative w-full z-10 font-(family-name:--font-montserrat) text-white">
      {/* Background Container - matching wrapper width from top section */}
      <div className="relative w-full">
        {/* Pagoda layer outside clipped container so only this element can overflow */}
        <div className="absolute bottom-0 sm:bottom-10 md:bottom-20 lg:bottom-28 -left-[8%] sm:-left-[6%] md:-left-[4%] lg:-left-[3%] w-37.5 h-80 sm:w-55 sm:h-115 md:w-75 md:h-150 lg:w-87.5 lg:h-175 z-40 pointer-events-none">
          <Image
            src="/images/tentang/pulau karo.png"
            alt="Pulau Karo Pagoda"
            fill sizes="100vw"
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Inner Content Border Container - Dark Blue with stars */}
        <div
          className="relative z-10 min-h-180 sm:min-h-212.5 md:min-h-235 lg:min-h-255 overflow-hidden"
          style={{
            background:
              "radial-gradient(50.05% 50.05% at 49.95% 34.21%, rgba(71, 108, 233, 0.95) 36.05%, rgba(26, 45, 124, 0.95) 100%)",
          }}
        >
          {/* Stars Assets */}
          <div className="absolute top-6 sm:top-8 md:top-10 left-[10%] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 animate-pulse">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-20 sm:top-28 md:top-34 lg:top-40 left-[5%] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 animate-pulse delay-75">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-16 sm:top-22 md:top-26 lg:top-28 left-[35%] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 animate-pulse delay-150">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-6 sm:top-8 md:top-10 right-[28%] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 animate-pulse">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-3 sm:top-4 md:top-5 lg:top-6 right-[5%] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 animate-pulse delay-300">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-[36%] sm:top-[38%] md:top-[39%] lg:top-[40%] right-[3%] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 animate-pulse">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute top-[24%] sm:top-[26%] md:top-[28%] lg:top-[30%] right-[77%] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 animate-pulse">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="relative z-20 flex flex-col md:flex-row items-center md:items-start md:justify-end pt-12 sm:pt-14 md:pt-16 lg:pt-20 px-3 sm:px-4 md:px-10 lg:px-10">
            <div className="w-full md:w-[65%] flex flex-col items-center">
              {/* Title */}
              <div className="relative w-full pb-5 sm:pb-6 md:pb-7 lg:pb-8 flex justify-center items-center gap-2">
                <h2
                  className="text-[#a8321a] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-center font-bold"
                  style={{
                    fontFamily: "var(--font-efco-brookshire)",
                    fontSize: "clamp(24px, 5vw, 60px)",
                    lineHeight: "1.2",
                  }}
                >
                  SEJARAH CULTURAL FESTIVAL
                </h2>
              </div>

              {/* Text Box */}
              <div
                className="relative z-20 w-full max-w-207.5 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-[#b8860b]/40 sm:border-2 sm:border-[#b8860b]/50 p-4 sm:p-6 md:p-8 lg:p-10 mb-45 md:mb-72 lg:mb-102 md:mr-10 lg:mr-25"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(222, 132, 2, 0.8) -4.43%, rgba(255, 210, 134, 0.8) 17.65%, rgba(255, 210, 134, 0.8) 81.76%, rgba(222, 132, 2, 0.8) 104.89%)",
                }}
              >
                <p
                  className="text-[#3a1d04] text-sm sm:text-base md:text-lg lg:text-xl"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 500,
                    fontSize: "clamp(14px, 1.5vw, 20px)",
                    lineHeight: "1.8",
                    textAlign: "center",
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
            </div>
          </div>

          {/* Bottom Illustration Layer */}
          <div className="absolute inset-x-0 bottom-0 h-full z-10 pointer-events-none ">
            <div className="absolute -right-[28%] sm:-right-[25%] md:-right-[22%] lg:-right-[18%] bottom-2 sm:bottom-4 md:bottom-5 w-[135%] sm:w-[128%] md:w-[120%] lg:w-[112%] h-32.5 sm:h-45 md:h-65 lg:h-80 z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>
            {/* Mountains Background */}
            <div className="absolute -right-[38%] sm:-right-[35%] md:-right-[32%] lg:-right-[28%] -bottom-4 sm:-bottom-6 md:-bottom-7 w-[135%] sm:w-[128%] md:w-[120%] lg:w-[112%] h-32.5 sm:h-45 md:h-65 lg:h-80 z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute left-[-16%] sm:left-[-14%] md:left-[-12%] lg:left-[-10%] -bottom-4 sm:-bottom-6 md:-bottom-7 w-[135%] sm:w-[128%] md:w-[120%] lg:w-[112%] h-32.5 sm:h-45 md:h-65 lg:h-80 z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>

            <div className="absolute left-[-48%] sm:left-[-45%] md:left-[-42%] lg:left-[-38%] -bottom-4 sm:-bottom-6 md:-bottom-7 w-[135%] sm:w-[128%] md:w-[120%] lg:w-[112%] h-32.5 sm:h-45 md:h-65 lg:h-80 z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute left-[-6%] sm:left-[-4%] md:left-[-2%] lg:left-0 -bottom-18 sm:-bottom-24 md:-bottom-30 w-[135%] sm:w-[128%] md:w-[120%] lg:w-[112%] h-32.5 sm:h-45 md:h-65 lg:h-80 z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>

            {/* Divider / Ground Foreground */}
            <div
              className="absolute bottom-0 left-2 sm:left-4 md:left-7 lg:left-10 w-full h-20 sm:h-24 md:h-40 lg:h-68 z-40 scale-105 sm:scale-105 md:scale-110 lg:scale-110"
              style={{
                animation: "floatHorizontal 10s ease-in-out infinite",
              }}
            >
              <style>{`
                @keyframes floatHorizontal {
                  0%, 100% { transform: translateX(0) scale(1.1); }
                  50% { transform: translateX(30px) translateY(10px) scale(1.1); }
                }
              `}</style>
              <Image
                src="/images/tentang/devider.png"
                alt="Divider Tanah"
                fill sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
