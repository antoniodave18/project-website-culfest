import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ASRAMA_DETAILS } from "@/app/jelajah/asrama/data";
import ComingSoon from "@/app/components/ComingSoon";

type DetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DetailAsramaPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const detail = ASRAMA_DETAILS.find((item) => item.slug === slug);

  if (!detail) {
    console.error(`Detail asrama dengan slug "${slug}" tidak ditemukan.`);
    notFound();
  }
  return <ComingSoon />;
  // return (
  //   <main
  //     className="min-h-screen px-6 py-12 md:px-12"
  //     style={{
  //       backgroundImage: "url('/images/jelajah/asrama/background.png')",
  //       backgroundSize: "cover",
  //       backgroundPosition: "center",
  //       backgroundRepeat: "no-repeat",
  //     }}
  //   >
  //     <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/20 bg-black/35 p-6 md:p-10 backdrop-blur-sm">
  //       <Link
  //         href="/home/jelajah/asrama"
  //         className="inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white"
  //         style={{
  //           background:
  //             "linear-gradient(274.43deg, #451500 8.16%, #AB3400 97.24%)",
  //         }}
  //       >
  //         kembali
  //       </Link>

  //       <h1
  //         className="mt-6 text-4xl md:text-6xl"
  //         style={{
  //           fontFamily: "var(--font-efco-brookshire), serif",
  //           color: "#F5A623",
  //           textShadow: "0 2px 8px rgba(0,0,0,0.6)",
  //         }}
  //       >
  //         {detail.title}
  //       </h1>

  //       <p className="mt-4 text-white/90 text-lg md:text-xl">
  //         {detail.summary}
  //       </p>

  //       <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
  //         <Image
  //           src={detail.image}
  //           alt={detail.title}
  //           fill
  //           className="object-cover"
  //         />
  //       </div>

  //       <p className="mt-8 text-white/95 leading-relaxed text-base md:text-lg">
  //         {detail.content}
  //       </p>
  //     </div>
  //   </main>
  // );
}
