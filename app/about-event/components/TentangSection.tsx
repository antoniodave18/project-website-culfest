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
              }}
            >
              Cultural Festival (Culfest) merupakan acara tahunan yang diselenggarakan oleh UGM Residence  dengan mengusung semangat “Unity in Diversity” sebagai bentuk apresiasi terhadap keberagaman budaya Nusantara juga merupakan puncak lifeskills untuk penghuni UGM Residence. Kegiatan ini menghadirkan berbagai rangkaian seperti pameran budaya, pagelaran seni, hingga berbagai kompetisi yang melibatkan mahasiswa dan masyarakat umum. Pada penyelenggaraan ke-15, Culfest mengangkat budaya Sumatera Selatan dengan konsep petualangan yang mengajak pengunjung mengeksplorasi kekayaan tradisi secara lebih dekat dan interaktif. Tema “Kulukilir Berbudayo: Eksplorasi Cindonyo Nusantara” menjadi representasi ajakan untuk merasakan keindahan budaya melalui pengalaman yang menyeluruh. Dengan kolaborasi berbagai tokoh budaya dan akademisi, Culfest 15 diharapkan menjadi ruang eksplorasi sekaligus pelestarian budaya Indonesia.
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
