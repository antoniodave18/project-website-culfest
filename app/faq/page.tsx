"use client";

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
        className="flex w-full items-center justify-between bg-gradient-to-r from-[#e3b059] to-[#d69f45] p-4 text-left font-serif text-[#4a3219] font-bold shadow-md hover:brightness-105 transition-all rounded-sm"
      >
        <span className="text-sm md:text-base pr-4">{question}</span>
        <span className="text-xl transition-transform duration-300">
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
    <div className="min-h-screen bg-[#900c0c] pt-40 pb-28 px-4 md:px-12 lg:px-24 font-serif">
      
      {/* Container Utama */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center min-h-[75vh]">

        {/* 💡 HEADER PITA "FAQ" (SUDAH DIGANTI MENJADI GAMBAR PNG) */}
        {/* Posisi left-1/2 dan -translate-x-1/2 memastikan pitanya selalu di tengah persis */}
        {/* PERBAIKAN 1: Typo "<div div" sudah dihapus menjadi "<div" saja */}
        <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 z-10 w-[200px] md:w-[350px] flex items-center justify-center">          
          {/* PENTING: Ganti '/images/faq/pita-faq.png' dengan nama file PNG kamu yang sebenarnya! 
             Pastikan file gambarnya sudah ditaruh di dalam folder public/images/faq/
          */}
          <img 
            src="/images/faq/faqhead.png" 
            alt="Pita Judul FAQ" 
            className="w-full h-auto drop-shadow-2xl"
          />

          {/* 💡 INI DIA TULISAN FAQ-NYA */}
          {/* absolute membuat teks ini menumpuk di atas gambar pita */}
          {/* pb-2 atau pb-4 untuk menggeser teks sedikit ke atas agar pas di tengah pita */}
          <h1 className="absolute text-3xl md:text-5xl text-[#ffeb3b] tracking-widest drop-shadow-md pb-2 md:pb-4">
            FAQ
          </h1>
        </div>

        {/* 💡 LAYER 1: Background Pola Batik Emas (Alas Tengah) */}
        {/* Menggunakan -inset untuk meregangkan gambar ke luar batas, misalnya -inset-4 atau -inset-[2%] */}
        <div className="absolute -inset-10 md:-inset-20 bg-[url('/images/faq/alastengah.png')] bg-cover bg-center z-10 shadow-2xl"></div>
        
        {/* 💡 LAYER 2: Bingkai Ornamen (Union.png) */}
        {/* PERBAIKAN 2: z-40 diubah menjadi z-20 agar bingkai tidak menutupi tulisan FAQ (yang z-30) */}
        <div className="absolute -inset-10 md:-inset-60 bg-[url('/images/faq/Union.png')] bg-[length:100%_100%] bg-no-repeat z-20 pointer-events-none"></div>
        
        {/* 💡 LAYER 2.5: Gulungan Kiri-Kanan (Dekorasi Samping) */}
        {/* Gulungan Kiri */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-25 h-[600px] md:h-screen w-auto pointer-events-none">
          <img 
            src="/images/faq/Gulunganatas.png" 
            alt="Gulungan Kiri" 
            className="h-full w-auto drop-shadow-lg transform -scaleX-100"
          />
        </div>
        
        {/* Gulungan Kanan */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-25 h-[600px] md:h-screen w-auto pointer-events-none">
          <img 
            src="/images/faq/Gulunganatas.png" 
            alt="Gulungan Kanan" 
            className="h-full w-auto drop-shadow-lg"
          />
        </div>

        
        
        {/* 💡 LAYER 3: Konten Daftar Pertanyaan FAQ */}
        <div className="absolute top-28 md:top-36 left-0 right-0 bottom-0 z-30 px-[6%] md:px-[8%] pt-4 pb-[8%] overflow-y-auto scrollbar-hide flex flex-col items-center">
        <div className="w-full space-y-3 max-w-5xl">
            {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
        </div>

      </div>
    </div>
  );
}