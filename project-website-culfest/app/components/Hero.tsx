export default function Hero() {
  return (
    // Section dengan tinggi full-screen (h-screen) dan warna background Navy
    <section className="relative w-full h-screen bg-[#03005E] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Konten Teks di Tengah */}
      <div className="z-10 text-center flex flex-col items-center px-4">
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
          CULFEST <span className="text-[#FFB33A]">2026</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Gemilang Nusantara: Temu Ragam Budaya Menuju Indonesia Bergelora
        </p>
        
        <button className="px-8 py-3 bg-[#FFB33A] text-[#03005E] font-bold rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(255,179,58,0.5)]">
          Jelajahi Festival
        </button>

      </div>

      {/* Ornamen Gelombang Bawah Sementara (Menggunakan CSS) */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#010028] to-transparent z-0"></div>
    </section>
  );
}