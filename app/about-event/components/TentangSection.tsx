import PitaJudul from "./PitaJudul";

export default function TentangSection() {
  return (
    <section className="relative w-full px-4 pt-10 pb-0 z-10 font-[family-name:var(--font-montserrat)]">
      <div className="relative w-full rounded-t-xl overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(222, 132, 2, 0.9) -4.43%, rgba(255, 210, 134, 0.9) 17.65%, rgba(255, 210, 134, 0.9) 81.76%, rgba(222, 132, 2, 0.9) 104.89%)",
          }}
        ></div>
        {/* Decorative Ribbon & Title */}
        <PitaJudul judul="TENTANG CULTURAL FESTIVAL 15" />

        <div className="relative z-10 px-8 py-16 flex flex-col items-center border-[8px] border-[#5e260c] border-b-0 rounded-t-xl mt-40 mx-12 bg-[#e4ab53]/10">
          <div className="mt-20 md:mt-28 mb-8 w-full">
            <p
              className="text-[#3a1d04] w-[90%] md:w-[85%] mx-auto"
              style={{
                fontFamily: "Merriweather, serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "20px",
                lineHeight: "30.12px",
                letterSpacing: "-0.01em",
                textAlign: "center",
                verticalAlign: "middle",
                textTransform: "lowercase",
              }}
            >
              gelanggang expo atau gelex 2025 akan diselenggarakan pada 21-23
              agustus di lapangan pancasila ugm dengan mengusung tema "resonansi
              harmoni gelanggang" dan konsep nostalgic universe. memperingati 50
              tahun gelanggang mahasiswa, gelex tahun ini menghadirkan remon,
              maskot penjelajah waktu yang akan menemanimu menjelajahi dunia
              gelanggang yang penuh semangat kebersamaan. selain pameran dan
              penampilan dari berbagai ukm serta komunitas, gelex 2025 juga
              menyuguhkan web series empat episode yang mengangkat kisah seru
              dari masing-masing sekber, kolaborasi antar penghuni gelanggang,
              zona interaktif, serta visual yang membangkitkan nostalgia!
            </p>
          </div>

          {/* Golden Video / Image Placeholder Box */}
          <div
            className="mt-6 mb-8 flex items-center justify-center relative shadow-inner"
            style={{
              width: "min(1135px, 90%)",
              height: "160px",
              transform: "rotate(0deg)",
              opacity: 1,
              borderRadius: "4.74px",
              borderWidth: "3.37px",
              borderStyle: "solid",
              borderColor: "#EF9E1E",
              background:
                "linear-gradient(to bottom, #ca9440 0%, #dfb062 100%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
