import { notFound } from "next/navigation";
import { ORMADA_DETAILS } from "../data";
import ComingSoon from "@/app/components/ComingSoon";
import Image from "next/image";
import Link from "next/link";
import NavActionButton from "@/app/home/components/NavActionButton";
import DescriptionScrollable from "../components/DescriptionScrollable";

type DetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DetailOrmadaPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const detail = ORMADA_DETAILS.find((item) => item.slug === slug);

  if (!detail) {
    console.error(`Detail ormada dengan slug "${slug}" tidak ditemukan.`);
    notFound();
  }
  const igHandle = detail["ig-link"].replace(/https?:\/\/w{0,3}\.?instagram\.com\//, "").replace(/\/$/, "");
  const gmapQuery = (() => {
    try {
      const url = new URL(detail["gmap-link"]);
      return url.searchParams.get("query") || "";
    } catch (e) {
      return "";
    }
  })();
  const gmapEmbed = gmapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(gmapQuery)}&output=embed`
    : detail["gmap-link"];
  // return <ComingSoon />;
  return (
    <main className="relative isolate overflow-hidden pt-30 lg:pt-50 bg-[url('/images/home/bg-motif.png')] bg-repeat bg-contain bg-[#6e0f04]">
      <div className="relative w-[80vw] mx-auto pt-10 md:pt-20 mb-20 bg-amber-300
        bg-linear-to-b from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E] to-95% ">
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[20vw] w-[125%] max-h-44 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/home/scroll-top-bottom.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            preload
            className="object-contain"
          />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[20vw] w-[125%] max-h-44 -translate-x-1/2 translate-y-1/2">
          <Image
            src="/images/home/scroll-top-bottom.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            preload
            className="object-contain -scale-y-100"
          />
        </div>

        <div className="relative mt-0 lg:mt-5 ml-5 lg:ml-5 z-30">
          <NavActionButton
            href="/home/jelajah/ormada"
            label="Kembali"
            icon="←"
            iconPosition="left"
          />
        </div>

        <div className="relative w-full h-30 md:h-50 mb-0 md:mb-10 mx-auto">
          <Image
            src="/images/jelajah/title-banner.png"
            alt="Title Banner"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain"
          />
          <h1 className="absolute left-1/2 top-[40%] md:top-[35%] z-10 w-full -translate-x-1/2 -translate-y-1/2 px-6
           text-center text-lg font-bold text-[#ffd700] md:text-5xl">
            {detail.title}
          </h1>
        </div>

        <div
          className="
              relative w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] rounded-2xl mx-auto mt-[5%] px-5 md:px-8 lg:px-15 pt-7 md:pt-25 pb-30 md:pb-70 
              border-4 border-[#4d1101]
              shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
              flex flex-col items-center gap-6
            "
        >
          {/* Title frame */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-13 md:h-25 flex items-center justify-center">
            <Image
              src="/images/jelajah/asrama/slug/deskripsi-title.png"
              alt="frame title"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <div className="order-1 md:order-2 flex items-center justify-center mt-10 mx-auto md:mx-0">
              <div className="relative w-full h-50 lg:h-100">
                <Image
                  src={detail["image-main"]}
                  alt="photo frame"
                  height={440}
                  width={312}
                  preload
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            <div className="order-2 md:order-1">
              <DescriptionScrollable description={detail.description} />
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-full z-20">
            <Image
              src="/images/jelajah/asrama/slug/gunung-asrama.png"
              alt="title fasilitas"
              width={1920}
              height={420}
              className="w-full h-auto"
            />
          </div>

          <div className="relative z-10 w-full bg-[#03005e] py-5 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ef9e1e]">Detail</h1>
          </div>
        </div>

        <div className="relative w-[calc(100%-2rem)] lg:w-[calc(100%-20rem)] mx-auto my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div
              className="
      relative w-full rounded-xl px-1 md:px-2 py-5 md:py-8 h-fit
      bg-[#253378] border-4 border-black/25
      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
    "
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#ef9e1e] text-center">
                Tanggal Berdiri
              </h1>

              <p className="text-base md:text-xl lg:text-2xl font-bold text-white text-center mt-5 md:mt-10">
                6/22/2011</p>
            </div>

            <div
              className="
      relative w-full h-fit rounded-xl px-2 md:px-6 py-2 md:py-4
      bg-[#253378] border-4 border-black/25
      shadow-[10px_10px_20px_rgba(0,0,0,0.5)]
    "
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#ef9e1e] text-center">
                Kenal Lebih Dekat
              </h1>

              <Link
                href={detail["gmap-link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="group block mt-4"
                aria-label={`Buka lokasi ${detail.title} di Google Maps`}
              >
                <div className="relative h-40 md:h-52 w-full overflow-hidden rounded-lg border-2 border-[#ef9e1e]">
                  <iframe
                    title={`Lokasi ${detail.title}`}
                    src={gmapEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
                {gmapQuery ? (
                  <p className="mt-2 text-center text-ms md:text-lg font-semibold text-white">{gmapQuery}</p>
                ) : null}
              </Link>

              <Link
                href={detail["ig-link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 mx-auto flex w-fit items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E] to-95% px-4 py-2 font-semibold text-[#461500] shadow-md transition hover:brightness-95"
                aria-label={`Buka Instagram ${igHandle}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.12a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                </svg>
                <span className="text-sm md:text-base font-semibold">{igHandle}</span>
              </Link>

            </div>
          </div>
        </div>

        <div className="w-full">
          <Image
            src="/images/jelajah/asrama/slug/wave.png"
            alt="title fasilitas"
            width={1920}
            height={420}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

      </div>
    </main>
    );
}
