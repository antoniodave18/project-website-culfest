import Header from "../components/Header";
import TentangSection from "./components/TentangSection";
import TransisiAwan from "./components/TransisiAwan";
import SejarahSection from "./components/SejarahSection";
import MaskotSection from "./components/MaskotSection";
import Image from "next/image";

export default function AboutEventPage() {
  return (
    <main className="bg-[#5c0a00] min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background motif pattern */}
      <div
        className="absolute inset-0 z-0 top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/bg-section-1.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "auto",
          backgroundPosition: "top",
        }}
      />

      {/* 1356px / 1566.1px = 86.58% */}
      <div className="w-[86.58%] max-w-[1356px] relative z-10 pb-20 pt-10">
        <TentangSection />
        <TransisiAwan />
        <SejarahSection />
        <MaskotSection />
        <div className="w-full px-4 relative z-20 -mt-20">
          <div className="bg-[#03005E] h-50 w-full flex items-center justify-center">
            <h2
              style={{
                fontFamily: "var(--font-efco-brookshire), serif",
                fontSize: "80px",
                color: "#F5A623",
                letterSpacing: "0.05em",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Pesona Culfest
            </h2>
          </div>
        </div>
        <div className="w-full px-4 relative z-20 -mt-3">
          <div className="relative w-full min-h-[500px] flex items-center justify-center ">
            {/* Background image (tidak terdistorsi) */}
            <Image
              src="/images/tentang/Background-desc.png"
              alt="background"
              fill
              className="object-contain -z-10"
              priority
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1100px] px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <p
                  className="w-full md:w-1/2"
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#fff",
                    lineHeight: "1",
                    letterSpacing: "1",
                    textAlign: "justify",
                  }}
                >
                  Anthem Culfest mencerminkan Indonesia sebagai tempat tinggal
                  yang indah dengan sifat mulia dalam lingkup penuhnya
                  toleransi. Menyoroti rakyat Indonesia memiliki dengan satu
                  raga dan satu jiwa, serta mengajak setiap orang untuk
                  merealisasikan kebersamaan, termasuk dalam semangat UGM
                  Residence yang bersatu di festival budaya. Anthem CULFEST
                  mengajak semua untuk hidup harmonis dalam Bhinneka, saling
                  melindungi tanpa saling mencaci, memperkuat rasa dengan
                  sesama, dan tetap teguh dalam kesatuan
                </p>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="bg-gradient-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] h-50 w-120 flex items-center justify-center rounded-xl">
                    <div className="p-[5px] rounded-xl bg-gradient-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61]">
                      <div className="relative h-60 w-100 rounded-xl overflow-hidden">
                        <Image
                          src="/images/tentang/penari.png"
                          alt="Penari Culfest"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
