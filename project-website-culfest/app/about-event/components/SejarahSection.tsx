import Image from "next/image";

export default function SejarahSection() {
  return (
    <section className="relative w-full px-4 z-10 font-[family-name:var(--font-montserrat)] text-white">
      {/* Background Container - matching wrapper width from top section */}
      <div className="relative w-full rounded-b-xl pb-8">
        {/* Pagoda layer outside clipped container so only this element can overflow */}
        <div className="absolute bottom-28 -left-[3%]  w-[180px] h-[450px] md:w-[400px] md:h-[800px] z-40 pointer-events-none">
          <Image
            src="/images/tentang/pulau karo.png"
            alt="Pulau Karo Pagoda"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Inner Content Border Container - Dark Blue with stars */}
        <div
          className="relative z-10 rounded-b-xl min-h-[850px] overflow-hidden"
          style={{
            background:
              "radial-gradient(50.05% 50.05% at 49.95% 34.21%, rgba(71, 108, 233, 0.95) 36.05%, rgba(26, 45, 124, 0.95) 100%)",
          }}
        >
          {/* Stars Assets */}
          <div className="absolute top-10 left-[10%] w-6 h-6 animate-pulse scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-40 left-[5%] w-8 h-8 animate-pulse delay-75 scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-28 left-[35%] w-10 h-10 animate-pulse delay-150 scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-10 right-[28%] w-8 h-8 animate-pulse scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-6 right-[5%] w-12 h-12 animate-pulse delay-300 scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[40%] right-[3%] w-10 h-10 animate-pulse scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[30%] right-[77%] w-10 h-10 animate-pulse scale-[2]">
            <Image
              src="/images/tentang/Star.png"
              alt="Star"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative z-20 flex flex-col md:flex-row items-start justify-end pt-20 px-10">
            <div className="w-full md:w-[65%] flex flex-col items-center">
              {/* Title */}
              <div className="relative w-full pb-8 flex justify-center items-center gap-2">
                <h2
                  className="text-[#a8321a] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-center font-bold"
                  style={{
                    fontFamily: "var(--font-efco-brookshire)",
                    fontSize: "clamp(30px, 5vw, 60px)",
                    lineHeight: "1.2",
                  }}
                >
                  SEJARAH CULTURAL FESTIVAL
                </h2>
              </div>

              {/* Text Box */}
              <div
                className="relative z-20 w-full max-w-[830px] rounded-2xl shadow-2xl border-2 border-[#b8860b]/50 p-8 md:p-10 mb-102 mr-25"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(222, 132, 2, 0.8) -4.43%, rgba(255, 210, 134, 0.8) 17.65%, rgba(255, 210, 134, 0.8) 81.76%, rgba(222, 132, 2, 0.8) 104.89%)",
                }}
              >
                <p
                  className="text-[#3a1d04]"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 500,
                    fontSize: "clamp(14px, 1.5vw, 20px)",
                    lineHeight: "1.8",
                    textAlign: "center",
                    textTransform: "lowercase",
                  }}
                >
                  gelanggang mahasiswa telah menjadi bagian penting dari
                  perjalanan sejarah kehidupan kampus di ugm. berdiri sejak
                  1975, gelanggang pada masa itu dikenal sebagai pusat aktivitas
                  mahasiswa, terutama dalam gerakan sosial, budaya, dan politik.
                  seiring berjalannya waktu, gelanggang bertransformasi menjadi
                  ruang tumbuh dan berkreasi bagi ukm dan komunitas, menjadi
                  rumah kedua bagi mahasiswa yang ingin mengembangkan diri di
                  luar kegiatan akademik. meskipun saat ini bangunan fisik
                  gelanggang telah tiada dan akan digantikan oleh gelanggang
                  inovasi dan kreativitas (gik), nilai-nilai dan semangatnya
                  tetap hidup. gelanggang bukan sekadar ruang, tetapi simbol
                  dari kebersamaan, keberagaman, dan semangat kolektif
                  mahasiswa. ia menjadi tempat belajar, berkarya, dan berbagi
                  pengalaman tempat di mana mahasiswa ugm menempa diri dalam
                  suasana inklusif dan penuh inspirasi.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Illustration Layer */}
          <div className="absolute inset-x-0 bottom-0 h-full z-10 pointer-events-none ">
            <div className="absolute  -right-[22%] bottom-5 w-[120%] h-[220px] md:h-[320px] z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill
                className="object-contain object-bottom"
              />
            </div>
            {/* Mountains Background */}
            <div className="absolute  -right-[32%] -bottom-7 w-[120%] h-[220px] md:h-[320px] z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute left-[-12%] -bottom-7 w-[120%] h-[220px] md:h-[320px] z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill
                className="object-contain object-bottom"
              />
            </div>

            <div className="absolute left-[-42%] -bottom-7 w-[120%] h-[220px] md:h-[320px] z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute left-[-2%] -bottom-30 w-[120%] h-[220px] md:h-[320px] z-0">
              <Image
                src="/images/tentang/gunung.png"
                alt="Gunung"
                fill
                className="object-contain object-bottom"
              />
            </div>

            {/* Divider / Ground Foreground */}
            <div className="absolute bottom-0 left-10 w-full h-32 md:h-68 z-40 scale-110">
              <Image
                src="/images/tentang/devider.png"
                alt="Divider Tanah"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
