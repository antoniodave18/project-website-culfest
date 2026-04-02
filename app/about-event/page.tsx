import TentangSection from "./components/TentangSection";
import TransisiAwan from "./components/TransisiAwan";
import SejarahSection from "./components/SejarahSection";
import MaskotSection from "./components/MaskotSection";
import Image from "next/image";

export default function AboutEventPage() {
  return (
    <main className="bg-[#5c0a00] min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background motif pattern */}
      <div className="absolute inset-0 z-0 top-0 left-0 w-full h-full bg-[url('/images/bg-section-1.png')] bg-repeat-y bg-auto bg-top" />

      {/* 1356px / 1566.1px = 86.58% */}
      <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[86.58%] max-w-[1356px] relative z-10 pb-10 sm:pb-16 md:pb-20 pt-6 sm:pt-8 md:pt-10">
        <TentangSection />
        <TransisiAwan />
        <SejarahSection />
        <MaskotSection />
        <div className="w-full px-2 sm:px-4 relative z-20 -mt-12 sm:-mt-16 md:-mt-20">
          <div className="bg-[#03005E] h-28 sm:h-36 md:h-44 lg:h-52 w-full flex items-center justify-center px-2">
            <h2 className="text-center text-[24px] sm:text-[36px] md:text-[52px] lg:text-[68px] xl:text-[80px] text-[#F5A623] tracking-[0.05em] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] [font-family:var(--font-efco-brookshire),serif]">
              Pesona Culfest
            </h2>
          </div>
        </div>
        <div className="relative z-20 -mt-2 w-full px-2 sm:px-4">
          <div className="relative flex w-full min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[400px] md:min-h-[500px]">
            {/* Background image (tidak terdistorsi) */}
            <Image
              src="/images/tentang/Background-desc.png"
              alt="background"
              fill
              className="object-contain -z-10"
              priority
            />

            {/* Content */}
            <div className="relative z-10 h-full w-full max-w-[1100px] max-h-full px-2 sm:px-4 md:px-8">
              <div className="grid h-full w-full grid-cols-2 items-start gap-4 overflow-hidden sm:gap-6 md:gap-8 lg:gap-12">
                <p className="w-full max-h-full overflow-hidden text-sm text-white leading-relaxed tracking-[0.5px] text-justify sm:text-base md:text-lg lg:text-xl [font-family:Merriweather,serif]">
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
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
                  <div className="w-full max-w-[360px] rounded-lg bg-gradient-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] p-[3px] shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:max-w-[520px] sm:rounded-xl sm:p-[5px] md:max-w-[640px]">
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
