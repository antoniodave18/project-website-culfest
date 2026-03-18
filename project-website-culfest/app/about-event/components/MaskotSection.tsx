import Image from 'next/image';

export default function MaskotSection() {
  return (
    <section className="relative w-full z-10 flex flex-col items-center mt-6">
      {/* Background Container - Dark Blue with decorative border */}
      <div 
        className="relative w-full h-[800px] overflow-hidden rounded-t-[40%] rounded-b-xl shadow-2xl p-4"
        style={{ 
          background: 'radial-gradient(circle at center, #2a3b7d 0%, #172459 70%, #0d1538 100%)',
          border: '4px solid #b8860b'
        }}
      >
        
        {/* Decorative background pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: "url('/images/game/bg-motif.png')", 
          backgroundSize: '150px' 
        }}></div>

        {/* Top Clouds */}
        <div className="absolute top-10 right-10 w-48 h-32 opacity-80">
           <Image src="/images/awan.png" alt="Cloud" fill className="object-contain" />
        </div>
        <div className="absolute top-24 left-10 w-32 h-20 opacity-80">
           <Image src="/images/awan.png" alt="Cloud" fill className="object-contain" />
        </div>

        {/* Mascot 1: CHILEKO (Top Left) */}
        <div className="relative mt-32 ml-4 flex items-center w-full z-20">
          <div className="relative w-40 h-60 z-20 flex-shrink-0">
             <Image 
                src="/images/tentang/chileko.png" 
                alt="Chileko Mascot" 
                fill 
                className="object-contain"
             />
          </div>
          
          <div className="relative -ml-8 mt-10 w-[70%] max-w-[300px] z-10">
             {/* Name Banner */}
             <div className="absolute -top-4 right-4 bg-gradient-to-r from-[#d9a05b] to-[#b8860b] py-1 px-8 rounded border border-[#fbe7a1] shadow-lg z-20">
                <h3 className="text-[#3a1d04] font-bold text-sm tracking-widest" style={{ fontFamily: 'var(--font-efco-brookshire)' }}>CHILEKO</h3>
             </div>
             
             {/* Description Box */}
             <div className="bg-[#4a1c00]/80 border border-[#b8860b]/50 rounded-xl p-5 pt-6 shadow-xl backdrop-blur-sm">
                <p className="text-white/90 text-[11px] leading-relaxed text-left font-[family-name:var(--font-montserrat)]">
                  Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum.
                </p>
             </div>
          </div>
        </div>

        {/* Mascot 2: CHITALA (Bottom Right) */}
        <div className="relative mt-8 mr-4 flex items-center justify-end w-full z-20">
          <div className="relative -mr-8 mb-10 w-[70%] max-w-[300px] z-10">
             {/* Name Banner */}
             <div className="absolute -top-4 left-4 bg-gradient-to-r from-[#d9a05b] to-[#b8860b] py-1 px-8 rounded border border-[#fbe7a1] shadow-lg z-20">
                <h3 className="text-[#3a1d04] font-bold text-sm tracking-widest" style={{ fontFamily: 'var(--font-efco-brookshire)' }}>CHITALA</h3>
             </div>
             
             {/* Description Box */}
             <div className="bg-[#4a1c00]/80 border border-[#b8860b]/50 rounded-xl p-5 pt-6 shadow-xl backdrop-blur-sm">
                <p className="text-white/90 text-[11px] leading-relaxed text-right font-[family-name:var(--font-montserrat)]">
                  Indonesia memiliki wilayah yang sangat luas sehingga diperlukan peta sebagai media untuk mempermudah memahami keragaman ruangnya. Terdapat tiga jenis peta utama, yaitu peta umum.
                </p>
             </div>
          </div>

          <div className="relative w-40 h-60 z-20 flex-shrink-0">
             <Image 
                src="/images/tentang/chitala.png" 
                alt="Chitala Mascot" 
                fill 
                className="object-contain"
             />
          </div>
        </div>

        {/* Bottom Clouds Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-48 z-10 flex items-end justify-center overflow-hidden">
           <div className="relative w-[150%] h-full opacity-90">
             <Image 
                src="/images/awan.png" 
                alt="Cloud overlay" 
                fill 
                className="object-cover translate-y-10"
             />
           </div>
        </div>

      </div>
    </section>
  );
}
