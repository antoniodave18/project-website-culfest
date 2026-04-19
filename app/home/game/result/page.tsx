"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RESULT_MAPPING: Record<string, { title: string; desc: string; image?: string }> = {
  A: {
    title: "Ikan Belida",
    desc: "Resilien, Gelisat, Cerdik, Pembudaya",
    image: "/images/tentang/chileko.png"
  },
  B: {
    title: "Sungai Musi",
    desc: "Pemberdaya, Tenang, Berpengaruh, Adaptif",
    image: "/images/game/sungai.png"
  },
  C: {
    title: "Pempek",
    desc: "Konstan, Andal, Kenyamanan, Keamanan"
  }
};

export default function GameResult() {
  const [resultType, setResultType] = useState<string>("Menghitung...");
  const [description, setDescription] = useState<string>("Mohon tunggu sebentar...");
  const [resultImage, setResultImage] = useState<string | undefined>(undefined);
  const [percentages, setPercentages] = useState<{ A: number, B: number, C: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('culfest_quiz_answers');
    if (saved) {
      try {
        const answers: Record<number, string> = JSON.parse(saved);
        let scores = { A: 0, B: 0, C: 0 };

        // Hitung total nilai skor untuk 10 pertanyaan (indeks 0 - 9)
        for (let i = 0; i < 10; i++) {
          const ans = answers[i];
          if (ans === "A" || ans === "B" || ans === "C") {
            // Soal 3 (indeks 2) dan Soal 7 (indeks 6) bernilai 2 poin (+1 base +1 tambahan)
            const weight = (i === 2 || i === 6) ? 2 : 1;
            scores[ans] += weight;
          }
        }

        const totalPoints = 12; // Total keseluruhan poin berdasarkan perhitungan

        setPercentages({
          A: Math.round((scores.A / totalPoints) * 100),
          B: Math.round((scores.B / totalPoints) * 100),
          C: Math.round((scores.C / totalPoints) * 100)
        });

        // Tentukan jawaban dominan 
        let dominant: "A" | "B" | "C" = "A";
        let max = -1;
        for (const [key, val] of Object.entries(scores)) {
          if (val > max) {
            max = val;
            dominant = key as "A" | "B" | "C";
          }
        }

        setResultType(RESULT_MAPPING[dominant].title);
        setDescription(RESULT_MAPPING[dominant].desc);
        setResultImage(RESULT_MAPPING[dominant].image);

      } catch (e) {
        console.error("Error parsing answers", e);
      }
    } else {
      setResultType("Data Tidak Ditemukan");
      setDescription("Silakan selesaikan kuis terlebih dahulu.");
    }
  }, []);

  return (
    <main className="relative w-full h-screen min-h-screen overflow-hidden bg-[#091255]">
      {/* Background Image */}
      <Image
        src="/images/game/background.png"
        alt="Background Game"
        fill
        className="object-cover z-0"
        quality={100}
        priority
      />

      {/* Ombak / Waves at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-10 animate-waveFloat pointer-events-none">
        <Image
          src="/images/game/ombak.png"
          alt="Ombak"
          width={1920}
          height={300}
          className="w-full h-auto object-cover md:object-fill origin-bottom scale-105"
          priority
        />
      </div>

      {/* Awan Kiri / Left Cloud */}
      <div className="absolute top-32 md:top-40 -left-10 md:-left-20 z-10 animate-cloudLeft pointer-events-none">
        <Image
          src="/images/game/awan kiri.png"
          alt="Awan Kiri"
          width={400}
          height={200}
          className="w-[200px] md:w-[400px] h-auto object-contain opacity-90"
        />
      </div>

      {/* Awan Kanan / Right Cloud */}
      <div className="absolute top-48 md:top-56 -right-10 md:-right-20 z-10 animate-cloudRight pointer-events-none">
        <Image
          src="/images/game/awan kanan.png"
          alt="Awan Kanan"
          width={400}
          height={200}
          className="w-[250px] md:w-[450px] h-auto object-contain opacity-90"
        />
      </div>

      {/* Peta / Map Background */}
      <div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-unroll
                   w-[160vw] h-[75vh] min-h-[550px]
                   md:w-[90vw] md:h-[75vh] 
                   lg:w-[75vw] lg:h-[80vh] 
                   max-w-[1000px] flex justify-center"
      >
        {/* Title Holder */}
        <div className="absolute -top-[8%] sm:-top-[10%] md:-top-[8%] left-1/2 -translate-x-1/2 z-40 animate-fadeInUp pointer-events-none">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/game/tittle holder.png"
              alt="Title Holder"
              width={400}
              height={150}
              className="w-[200px] sm:w-[250px] md:w-[320px] lg:w-[380px] h-auto object-contain drop-shadow-lg"
            />
            <h1 className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#d9a05b] font-bold tracking-widest drop-shadow-md pb-1 uppercase" style={{ fontFamily: "var(--font-efco-brookshire), serif" }}>
              HASIL KUIS
            </h1>
          </div>
        </div>

        <div
          className="relative w-full h-full flex flex-col items-center justify-center mt-0 drop-shadow-2xl"
          style={{
            backgroundImage: "url('/images/game/peta.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Result Content Container */}
          <div className="absolute top-[16%] bottom-[18%] left-0 right-0 flex flex-col items-center justify-center z-30">

            <div className="w-[85vw] sm:w-[75vw] md:w-[80%] lg:w-[75%] h-auto flex flex-col items-center justify-center gap-2 md:gap-4 pt-6 pb-2 px-4 md:pt-8 md:pb-4 md:px-10 border-[3px] md:border-[4px] border-[#5e300b] rounded-lg md:rounded-xl relative">

              {/* Optional tiny icon element at top right of border like in screenshot */}
              <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-6 md:w-10 md:h-7 bg-[#091255] border-[1.5px] border-[#d9a05b] rounded-[3px] opacity-90 shadow-sm flex items-center justify-center">
                <div className="w-[60%] h-[50%] border border-[#d9a05b]/60 rounded-[1px]"></div>
              </div>

              {/* Sub-Title / Intro */}
              <div className="text-center w-full px-2 mt-0">
                <h2 className="text-[clamp(12px,2vw,18px)] sm:text-sm md:text-base font-semibold text-amber-800 uppercase tracking-widest" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                  Kepribadian Kamu:
                </h2>
              </div>

              {/* The Result Title */}
              <div className="text-center w-full px-2 flex flex-col items-center gap-4">
                {resultImage && (
                  <div className="relative w-[220px] h-[110px] md:w-[400px] md:h-[180px] mb-2 animate-fadeIn">
                    <Image
                      src={resultImage}
                      alt={resultType}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h1 className="text-[clamp(22px,5vw,32px)] sm:text-2xl md:text-4xl font-bold text-[#3B170B] leading-tight drop-shadow-sm uppercase" style={{ fontFamily: "var(--font-efco-brookshire), serif" }}>
                  {resultType}
                </h1>
              </div>

              {/* Graphical Result Divider */}
              <div className="w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#5e300b] to-transparent opacity-40"></div>

              {/* The Result Description */}
              <div className="text-center w-full px-2 md:px-8">
                <p className="text-[clamp(13px,2.5vw,18px)] sm:text-sm md:text-base lg:text-lg text-[#4B2100] font-bold leading-relaxed" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                  "{description}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 md:mt-8">
                <Link href="/home/game">
                  <button
                    className="px-[clamp(16px,4vw,24px)] py-[clamp(8px,1vh,14px)] rounded-md md:rounded-lg font-bold text-[clamp(12px,2vw,16px)] tracking-wider uppercase transition-all duration-300 bg-amber-100/90 text-[#5e2b07] border-2 border-[#5e2b07] shadow-sm hover:bg-[#5e2b07] hover:text-yellow-100"
                  >
                    Main Lagi
                  </button>
                </Link>

                <Link href="/home">
                  <button
                    className="px-[clamp(16px,4vw,24px)] py-[clamp(8px,1vh,14px)] rounded-md md:rounded-lg font-bold text-[clamp(12px,2vw,16px)] tracking-wider uppercase transition-all duration-300 bg-[#5e2b07] text-[#f4d499] border-2 border-[#3d1902] shadow-md hover:scale-105"
                  >
                    Kembali Ke Beranda
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
