"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 1. Data FAQ (Tetap)
const faqData = [
  {
    question: "Apa itu Cultural Festival? Apa saja kegiatan yang ditampilkan?",
    answer: "Cultural Festival atau Culfest adalah puncak kegiatan lifeskill dari UGM Residence berupa festival budaya bernuansa Nusantara dengan tema yang berbeda setiap tahunnya. Kegiatan yang dihadirkan meliputi: 1.) Ekspo Culfest, 2.) Pagelaran Apresiasi Budaya, 3.) Pemilihan Duta Budaya UGM, 4.) Bincang budaya, 5.) Cross the Culture, yaitu ajang kompetisi kebudayaan bagi siswa SMA/sederajat dan mahasiswa.",
  },
  {
    question: "Siapa saja yang dapat datang ke Culfest? Apakah ada syarat tertentu?",
    answer: "Cultural Festival terbuka untuk umum, selama mengikuti kegiatan dengan tertib dan menaati peraturan yang berlaku, Sobat Culfest sudah bisa menjadi bagian dari keseruan Culfest.",
  },
  {
    question: "Bagaimana cara masuk ke Culfest? Jika membawa kendaraan, parkir di mana?",
    answer: "Untuk informasi terkait lokasi Culfest, termasuk lokasi parkir, sobat Culfest bisa banget untuk cek Instagram Culfest secara berkala, ya!",
  },
  {
    question: "Apa tema Culfest? Apakah setiap tahunnya beda?",
    answer: "Tema yang diangkat dalam Cultural festival selalu berbeda setiap tahunnya. Pada tahun ini, Culfest mengusung tema “Kulukilir Berbudayo: Eksplorasi Cindonyo Nusantara.",
  },
  {
    question: "Siapa maskot Culfest? Apa makna di baliknya?",
    answer: "Maskot Culfest tahun ini adalah Chitala dan Chileko. Chitala dan Chileko terinspirasi dari wujud ikan belida, fauna khas Sumatera Selatan yang dikenal oleh masyarakat luas, salah satunya sebagai bahan baku makanan khas seperti pempek dan kerupuk Palembang.",
  },
  {
    question: "Apakah ada ketentuan pakaian jika ingin datang ke Culfest?",
    answer: "Pastinya ada dong! Sobat Culfest dapat memakai baju dengan ketentuan: Hari Pertama: 1.) Warna merah seperti Jembatan Ampera, 2.) Warna biru seperti Sungai Musi, 3.) Warna Krem, kuning, atau coklat seperti Pempek Hari Kedua: Berkain atau baju daerah.",
  },
  {
    question: "Apakah membawa makanan dan minuman dari luar area festival diperbolehkan?",
    answer: "Tidak ya, Sobat Culfest tidak diperkenankan membawa makanan/minuman kemasan plastik apapun",
  },
  {
    question: "Kalau ingin masuk Culfest apakah harus membawa tiket? Apakah berbayar?",
    answer: "Tidak ya, Sobat Culfest! Untuk masuk Cultural festival, Sobat Culfest hanya diminta untuk menandatangani buku tamu sebagai sarana pendataan pengunjung. Mengenai biaya, Cultural festival tidak memungut biaya apapun pada penyelenggaraannya. 💁",
  },
];

// 2. Komponen FAQ Item
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-linear-to-r from-[#e3b059] to-[#d69f45] p-4 text-left font-serif text-[#4a3219] font-bold shadow-md hover:brightness-105 transition-all rounded-sm"
      >
        <span className="text-xs md:text-base pr-4">{question}</span>
        <span className="text-xs transition-transform duration-300">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      
      {isOpen && (
        <div className="bg-[#f3d088] p-4 text-sm text-[#4a3219] shadow-inner border-t border-[#c69a47] rounded-b-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

// 3. Komponen Utama Halaman
export default function FAQ() {
  return (
    <main className="relative isolate overflow-hidden bg-[#860505] pt-20 lg:pt-30 pb-10">
      <div className="pointer-events-none absolute inset-0 z-1">
        <Image
          src="/images/faq/frame-faq.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          preload
          className="object-cover object-top"
        />
      </div>

      <div className="absolute left-4 top-4 z-2 md:left-8 md:top-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 rounded-full bg-[#f3d088] px-4 py-2 text-sm font-semibold text-[#4a3219] shadow-md transition-transform hover:-translate-y-0.5 hover:brightness-105"
        >
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>
      </div>

      <div className="relative w-full h-20 md:h-35 mb-10 lg:mb-0 mx-auto">
        <Image
          src="/images/faq/title-faq.png"
          alt="FAQ Title"
          fill
          sizes="(max-width: 768px) 90vw, 70vw"
          className="object-contain"
        />
      </div>

      <div className="relative w-[80vw] mx-auto px-10 py-12 mb-20 bg-amber-300
        bg-linear-to-b from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E] to-95% ">
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

        {/* scrollable FAQ area */}
        <div className="hide-scrollbar max-h-[70vh] overflow-y-auto">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs md:text-base font-semibold tracking-wide text-[#7a4e1f] animate-pulse">
          Scroll kebawah ↓
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-7 rotate-180">
        <Image
          src="/images/hero/tirai-atas.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw,60vw"
          className="object-cover"
        />
      </div>

    </main>
  );
}