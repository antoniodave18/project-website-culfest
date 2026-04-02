import Image from "next/image";
import MaskotTitle from "./MaskotTitle";
import MaskotCard from "./MaskotCard";

export default function MaskotSection() {
  return (
    <section className="relative w-full z-10 flex flex-col items-center">
      <div className="relative w-full px-4 -mt-1">
        {/* Container dengan tinggi dari bluebg, kedua bg ditumpuk */}
        <div className="relative w-full">
          {/* Bluebg sebagai penentu tinggi container (flow normal) */}
          <Image
            src="/images/tentang/bluebg.png"
            alt="Blue Background"
            width={1920}
            height={1080}
            className="w-full h-auto block "
          />

          {/* Yellowbg ditumpuk di atas, anchor top */}
          <Image
            src="/images/tentang/yellowbg.png"
            alt="Yellow Background"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-auto block"
          />
        </div>

        {/* Overlay: Card + Maskot di atas bluebg */}
        <div className="absolute inset-0 flex flex-col mt-10 pb-0">
          <MaskotTitle />

          {/* Card di tengah atas */}
          <div className="w-full max-w-[730px] mx-auto mt-60">
            <MaskotCard
              title="CHILEKO dan CHITALA"
              desc="Desain maskot diambil dari wujud ikan belida. Nama ikan ini diambil dari nama salah satu sungai di Sumatera Selatan yang menjadi habitatnya, yakni Sungai Belida. Ikan ini ditetapkan sebagai maskot fauna Sumatera Selatan. Ikan belida dijadikan sebagai bahan baku makanan khas di wilayah Sumatera Selatan yang juga digemari oleh masyarakat luas, yaitu pempek dan kerupuk Palembang."
            />
          </div>
          {/* Mascot images berdampingan di bagian bawah */}
          <div className="flex items-end justify-center w-full max-w-[750px] mx-auto">
            <div className="relative w-1/2 aspect-[0.7] max-w-[400px]">
              <Image
                src="/images/tentang/chileko.png"
                alt="Chileko"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="relative w-1/2 aspect-[0.75] max-w-[400px]">
              <Image
                src="/images/tentang/chitala.png"
                alt="Chitala"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 px-40 mt-41">
            <MaskotCard
              title="SONGKET"
              desc="CHILEKO dan CHITALA mengenakan kain motif songket sebagai kain kebanggaan Sumatera Selatan. Songket merupakan warisan kebudayaan yang melambangkan kemewahan, kemakmuran, dan kejayaan Sriwijaya. Kain songket digunakan dalam acara adat, pernikahan, dan tarian tradisional sebagai suatu simbol kemuliaan. Songket yang digunakan berwarna biru tua, menyimbolkan ketenangan dan kewibawaan serta kehormatan. Motif berwarna emas dikombinasikan dan menyimbolkan kemakmuran dan kejayaan."
            />
            <MaskotCard
              title="AESAN GEDE"
              desc="CHILEKO dan CHITALA menggunakan pakaian adat khas Sumatera Selatan, yaitu Aesan Gede. Pakaian adat ini merupakan pakaian kebesaran yang menyimbolkan keagungan, kemewahan, dan kesabaran. Seperti pada pakaian Chitala, Aesan Gede identik dengan warna keemasan yang dikombinasikan dengan merah muda."
            />
            <MaskotCard
              title="TANJAK"
              desc="Ikat kepala pria Sumatera Selatan berbentuk runcing yang diikat dari kain songket. Chileko menggunakan tanjak sebagai lambang kehormatan, wibawa, dan jati diri masyarakat Sumatera Selatan sejak zaman Sriwijaya."
            />
            <MaskotCard
              title="MAHKOTA KARSUHUN"
              desc="Hiasan kepala tradisional yang dikenakan Chitala adalah mahkota khas pengantin wanita Palembang, Sumatera Selatan, yang merupakan bagian dari busana adat Aesan Gede. Didominasi oleh warna emas, melambangkan kejayaan Kerajaan Sriwijaya, keanggunan, dan kelembutan perempuan Palembang."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
