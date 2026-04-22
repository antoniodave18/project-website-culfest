"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavActionButton from "../components/NavActionButton";

const quizData = [
  {
    id: 1,
    question: "Saat memulai sesuatu yang baru, kamu biasanya tipe yang mana?",
    options: [
      { id: "A", text: "Tipe yang nyari ritme yang terasa nyaman dulu, baru lanjut" },
      { id: "B", text: "Tipe yang harus nyusun gambaran besarnya, bikin mind map!" },
      { id: "C", text: "Tipe yang mulai dari kecil-kecil dulu, lalu lihat ke mana arahnya" },
    ],
  },
  {
    id: 2,
    question: "Pagi hari yang cerah, kamu sedang berjalan ke gedung kelas. Oh NO! Jadwal kelasmu diganti! Kalau jadwalmu tiba-tiba berubah, kamu akan melakukan apa?",
    options: [
      { id: "A", text: "Memproses informasinya pelan-pelan" },
      { id: "B", text: "Reorganisasi seluruh rencana hari ini" },
      { id: "C", text: "Langsung ubah arah tanpa banyak pikir" },
    ],
  },
  {
    id: 3,
    question: "Kamu sedang berargumen dalam percakapan yang serius nih! Kira-kira kamu lebih sering melakukan apa saat sedang begitu?",
    options: [
      { id: "A", text: "Memperhatikan suasana kelas selama argumen berlangsung" },
      { id: "B", text: "Memperjelas inti pembahasan yang kamu argumenkan" },
      { id: "C", text: "Menggerakkan diskusi menuju keputusan yang kamu mau" },
    ],
  },
  {
    id: 4,
    question: "Hidup tentu bukan jalan raya yang lurus. Nah, saat kamu menghadapi tantangan dalam hidupmu, kamu akan melakukan apa?",
    options: [
      { id: "A", text: "Menguatkan diri dari dalam" },
      { id: "B", text: "Menganalisis titik masalahnya" },
      { id: "C", text: "Mencari solusi secara langsung" },
    ],
  },
  {
    id: 5,
    question: "In this economy, kita jangan malas-malasan! Nah, biar produktif, kamu kira-kira paling butuh apa saja?",
    options: [
      { id: "A", text: "Suasana tenang dan fokus" },
      { id: "B", text: "Struktur kerja yang jelas" },
      { id: "C", text: "Dinamika dan tekanan positif" },
    ],
  },
  {
    id: 6,
    question: "Teman kamu lagi curhat nih, dia minta saran kamu. Kalau diminta memberi saran, kamu cenderung",
    options: [
      { id: "A", text: "Mempertimbangkan kondisi personal orangnya" },
      { id: "B", text: "Menimbang pro dan kontra dari solusi yang ingin diberikan" },
      { id: "C", text: "Memberikan langkah penyelesaian masalah yang bisa langsung dicoba" },
    ],
  },
  {
    id: 7,
    question: "Manusia ‘kan makhluk sosial yah, nah kira-kira kalau sedang berkelompok nih, peran yang paling nyaman buatmu apa?",
    options: [
      { id: "A", text: "Tim yang menjaga kestabilan kelompok" },
      { id: "B", text: "Tim yang jadi penyusun arah diskusi dan kerja kelompok" },
      { id: "C", text: "Tim yang ngasih inisiatif menggerakkan kelompok" },
    ],
  },
  {
    id: 8,
    question: "Untuk tumbuh, kita perlu menerima saran dan kritik agar bisa berkembang lebih baik. Saat mendapat kritik, apa respons yang paling menggambarkan dirimu?",
    options: [
      { id: "A", text: "Merenungkan dan menimbang dulu sebelum merespon" },
      { id: "B", text: "Mengevaluasi logika dibalik kritik yang diberikan" },
      { id: "C", text: "Menjadikannya bahan pertimbangan secara langsung" },
    ],
  },
  {
    id: 9,
    question: "Bicara soal ketertarikan nih, kalau diminta memilih, Kamu lebih tertarik pada sesuatu yang mana?",
    options: [
      { id: "A", text: "Bermakna secara pribadi" },
      { id: "B", text: "Masuk akal dan terstruktur" },
      { id: "C", text: "Punya potensi menguntungkan" },
    ],
  },
  {
    id: 10,
    question: "Kamu tim yang mana nih kalau lagi kerja?",
    options: [
      { id: "A", text: "Konsisten dan mendalam" },
      { id: "B", text: "Sistematis dan terukur" },
      { id: "C", text: "Adaptif dan responsif" },
    ],
  }
];

export default function Game() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Simpan jawaban dominan ke local storage
      localStorage.setItem('culfest_quiz_answers', JSON.stringify(answers));
      // Pindah ke halaman hasil ketika pertanyaan terakhir disubmit
      router.push('/home/game/result');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionId,
    }));
  };

  const currentQuiz = quizData[currentIndex];

  return (
    <main className="relative w-full h-fit min-h-screen overflow-hidden bg-[url('/images/bg-motif.png')] bg-repeat bg-contain bg-[#9f0505]">

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

      <div className="absolute left-4 top-4 z-2 md:left-8 md:top-8">
        <NavActionButton href="/home" label="Kembali" icon="←" iconPosition="left" />
      </div>
      
      <div className="relative w-fit h-fit mx-auto px-6 md:px-10 py-10 md:py-20 my-20 z-20
        bg-amber-300 bg-linear-to-b from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E] to-95%">
        {/* Title holder anchored to the parent container border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 animate-fadeInUp pointer-events-none">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/game/tittle holder.png"
              alt="Title Holder"
              width={400}
              height={150}
              className="w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] h-auto object-contain drop-shadow-lg"
            />
            {/* Teks di dalam Title Holder untuk menampilkan nomor saat ini */}
            <h1 className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#d9a05b] font-bold tracking-widest drop-shadow-md pb-1" style={{ fontFamily: "var(--font-efco-brookshire), serif" }}>
              {currentIndex + 1}
            </h1>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-1/2 h-full w-[25vw] scale-115 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/faq/paper-scroll.png"
            alt=""
            fill
            sizes="(max-width: 768px) 25vw, 30vw"
            preload
            className="object-contain"
          />
        </div>

        <div className="pointer-events-none absolute right-0 top-1/2 h-full w-[25vw] scale-115 translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/faq/paper-scroll.png"
            alt=""
            fill
            sizes="(max-width: 768px) 25vw, 30vw"
            preload
            className="object-contain"
          />
        </div>
        {/* Quiz Content Container - Formatted strictly inside the writable area of the scroll */}
        {/* top 16% and bottom 18% strictly match the parchment visual limits */}
        <div className="relative w-full flex flex-col items-center justify-center z-30">
          
          {/* Constraint Text to Viewport on Mobile so it doesn't bleed off with the map! */}
          {/* Py adjusted: massive pt to clear empty space for the absolute corner button! */}
          <div className="w-[82vw] max-w-[860px] h-auto flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 pt-9 pb-3 px-3 md:pt-12 md:pb-4 md:px-8 border-[3px] md:border-[4px] border-[#5e300b] rounded-lg md:rounded-xl relative">
            
            {/* Tombol pemicu Modal Navigasi (ikon di pojok kanan atas) */}
            <button 
              onClick={() => setIsNavOpen(true)}
              title="Buka Navigasi Soal"
              className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-6 md:w-10 md:h-7 bg-[#091255] border-[1.5px] border-[#d9a05b] rounded-[3px] opacity-90 shadow-sm hover:scale-110 hover:opacity-100 transition-all flex items-center justify-center group z-40"
            >
              <div className="w-[60%] h-[50%] border border-[#d9a05b]/60 rounded-[1px] group-hover:border-[#d9a05b] transition-colors"></div>
            </button>

            {/* Question Text */}
            <div className="text-center w-full px-2 mt-0">
              <h2 className="text-[clamp(14px,3vw,24px)] sm:text-base md:text-xl lg:text-2xl font-bold text-[#3B170B] leading-snug drop-shadow-sm" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                {currentQuiz.question}
              </h2>
            </div>

            {/* Options */}
            <div className="w-[95%] md:w-[90%] flex flex-col gap-[clamp(6px,1vh,14px)] md:gap-4 lg:gap-5">
              {currentQuiz.options.map((option) => {
                const isSelected = answers[currentIndex] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`
                      w-full text-left px-[clamp(10px,3vw,16px)] py-[clamp(8px,1.5vh,18px)] sm:px-6 sm:py-4 rounded-md md:rounded-lg font-bold text-[clamp(11px,2.5vw,16px)] sm:text-sm md:text-base lg:text-lg transition-all duration-300
                      ${isSelected
                        ? 'bg-[#8b4d24]/60 text-amber-950 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] border-2 border-[#5e300b] scale-[1.01]'
                        : 'bg-[#c38c4b]/30 text-[#4c2409] hover:bg-[#c38c4b]/50 border-2 border-[#c38c4b]/40 shadow-sm hover:border-[#8b4d24]/50'
                      }
                    `}
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    <div className="flex items-start justify-start w-full gap-2 md:gap-[3%]">
                      <span className="shrink-0">{option.id}.</span>
                      <span>{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Back/Forward */}
            <div className="w-[95%] md:w-[90%] flex items-end justify-between mt-0 md:mt-2 mb-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`
                  px-[clamp(12px,4vw,20px)] py-[clamp(6px,1vh,12px)] sm:px-5 sm:py-2 md:px-6 md:py-3 rounded md:rounded-md font-bold text-[clamp(10px,2vw,14px)] sm:text-xs md:text-sm tracking-wide transition-all duration-300
                  ${currentIndex === 0
                    ? 'opacity-0 cursor-not-allowed pointer-events-none'
                    : 'bg-[#5e2b07] text-[#f4d499] hover:bg-[#3d1902] shadow-md border border-[#3d1902]'
                  }
                `}
              >
                &larr; Kembali
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[currentIndex] && currentIndex !== quizData.length - 1} // if required to answer
                className={`
                  px-[clamp(12px,4vw,20px)] py-[clamp(6px,1vh,12px)] sm:px-5 sm:py-2 md:px-6 md:py-3 rounded md:rounded-md font-bold text-[clamp(10px,2vw,14px)] sm:text-xs md:text-sm tracking-wide transition-all duration-300
                  ${!answers[currentIndex]
                    ? 'opacity-40 cursor-not-allowed bg-[#5e2b07]/80 text-[#f4d499]/50'
                    : 'bg-[#5e2b07] text-[#f4d499] hover:bg-[#3d1902] shadow-md border border-[#3d1902]'
                  }
                `}
              >
                {currentIndex === quizData.length - 1 ? 'Selesai' : 'Selanjutnya'} &rarr;
              </button>
            </div>

          </div>

        </div>
      </div>
      

      {/* Modal Navigasi Soal */}
      {isNavOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop klik untuk menutup */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsNavOpen(false)}></div>
          
          <div className="relative z-10 w-[90vw] max-w-[500px] bg-[#091255] rounded-xl overflow-hidden drop-shadow-2xl border-2 sm:border-4 border-[#091255] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Background Pattern */}
            <Image 
              src="/images/game/bg-navigasi.png" 
              alt="Navigasi Background" 
              fill 
              className="object-cover z-0 opacity-90"
            />
            
            {/* Tutup Button X */}
            <button 
              onClick={() => setIsNavOpen(false)}
              className="absolute top-2 right-4 z-30 text-[#d9a05b] text-2xl md:text-3xl font-bold hover:scale-110 hover:text-yellow-400 transition-transform"
            >
              &times;
            </button>

            {/* Grid of numbers */}
            <div className="relative z-10 w-full p-6 py-8 sm:p-10 flex flex-col items-center">
              <h3 className="text-[#d9a05b] text-lg md:text-xl font-bold mb-6 drop-shadow-sm uppercase tracking-wide" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                Navigasi Soal
              </h3>
              <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full place-items-center">
                {quizData.map((_, i) => {
                  const isCurrent = i === currentIndex;
                  const isAnswered = !!answers[i];
                  const isLocked = !isAnswered && !isCurrent;
                  return (
                    <button
                      key={i}
                      disabled={isLocked}
                      onClick={() => {
                        if (isLocked) return;
                        setCurrentIndex(i);
                        setIsNavOpen(false);
                      }}
                      className={`
                        w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 rounded-md border-[2px] sm:border-[3px] 
                        flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-all duration-300
                        ${isCurrent 
                          ? 'bg-[#d9a05b]/30 border-yellow-200 text-yellow-200 scale-110 shadow-[0_0_12px_rgba(217,160,91,0.5)]' 
                          : isLocked
                            ? 'border-[#d9a05b]/30 text-[#d9a05b]/40 bg-[#091255]/30 cursor-not-allowed'
                            : 'border-[#d9a05b] text-[#d9a05b] hover:bg-[#d9a05b]/10 hover:scale-[1.05]'
                        }
                        ${isAnswered && !isCurrent ? 'bg-[#091255]/60 opacity-80 border-[#d9a05b]/70 shadow-inner' : 'shadow-md'}
                      `}
                      style={{ fontFamily: "var(--font-efco-brookshire), serif" }}
                      title={isLocked ? "Jawab soal ini dulu untuk membuka" : `Pergi ke soal ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
