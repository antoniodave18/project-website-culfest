import TentangSection from "./components/TentangSection";
import TransisiAwan from "./components/TransisiAwan";
import SejarahSection from "./components/SejarahSection";
import MaskotSection from "./components/MaskotSection";

export default function AboutEventPage() {
  return (
    <main className="bg-[#5c0a00] min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background motif pattern */}
      <div className="absolute inset-0 z-0 top-0 left-0 w-full h-full bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-top" />

      {/* 1356px / 1566.1px = 86.58% */}
      <div className="w-[95%] max-w-339 relative z-10 pb-10 sm:pb-16 md:pb-20 pt-6 sm:pt-8 md:pt-10">
        <TentangSecJJtion />
        <TransisiAwan />
        <SejarahSection />
        <MaskotSection />

        <div className="relative z-20 w-full">
          <div className="flex h-auto w-full items-center justify-center bg-[#03005E] px-4 py-4">
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-efco-brookshire), serif",
                fontSize: "clamp(40px, 8vw, 80px)",
                color: "#F5A623",
                letterSpacing: "0.05em",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Jelajah Asrama
            </h2>
          </div>

          <div className="relative flex w-full min-h-75 items-center justify-center rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] bg-[url('/images/tentang/bg.png')] bg-cover bg-center bg-no-repeat sm:min-h-100 md:min-h-125">
            {/* Content */}
            <div className="relative z-10 h-full w-full max-w-275 max-h-full px-2 sm:px-4 md:px-8">
              <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2 p-5 items-start gap-4 overflow-hidden sm:gap-6 md:gap-8 lg:gap-12">
                <p className="order-2 w-full max-h-full overflow-hidden text-sm text-white leading-relaxed tracking-[0.5px] text-justify sm:text-base md:text-lg lg:order-1 lg:text-xl font-[Merriweather,serif]">
                  Anthem Culfest mencerminkan Indonesia sebagai tempat tinggal
                  yang indah dengan sifat mulia dalam lingkup penuhnya
                  toleransi. Menyoroti rakyat Indonesia memiliki dengan satu
                  raga dan satu jiwa, serta mengajak setiap orang untuk
                  merealisasikan kebersamaan, termasuk dalam semangat UGM
                  Residence yang bersatu di festival budaya.
                </p>
                <div className="order-1 flex h-full w-full items-center justify-center overflow-hidden lg:order-2">
                  <div className="w-full max-w-90 rounded-lg bg-linear-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] p-0.75 shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:max-w-130 sm:rounded-xl sm:p-1.25 md:max-w-160">
                    <div className="relative w-full aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-black">
                      <iframe
                        src="https://www.youtube.com/embed/7EIszoNZLe4?list=RD7EIszoNZLe4&start_radio=1&pp=ygUJY3VsZmVzdDE1oAcB"
                        title="Culfest YouTube Panel"
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
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
