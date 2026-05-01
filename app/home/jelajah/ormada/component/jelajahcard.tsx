import NavActionButton from "@/app/home/components/NavActionButton";
import Image from "next/image";

export interface JelajahCardProps {
  title: string;
  slug: string;
  imageSrc: string;
  summary: string;
}

export default function JelajahCard({ title, slug, imageSrc, summary }: JelajahCardProps) {
  return (
    <article className="relative mx-auto flex w-full max-w-225 items-center justify-center px-2 font-serif sm:px-4 hover:scale-102 duration-500">
      <div
        className="relative z-10 w-full rounded-3xl backdrop-blur-xs px-4 pt-10 pb-10 sm:px-8 md:rounded-4xl md:px-12
          bg-linear-to-r from-[#461500]/20 from-10% via-white/10 via-50% to-[#461500]/20 to-90%"
      >
        <div className="pointer-events-none absolute top-0 left-1/2 z-30 flex aspect-486/72 w-[92%] max-w-125 -translate-x-1/2 -translate-y-1/2 items-center justify-center drop-shadow-xl overflow-hidden sm:w-[78%]">
          <Image
            src="/images/jelajah/asrama/pita.png"
            alt="Pita"
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 768px) 78vw, 500px"
            className="object-contain"
          />
          <h2
            className="relative z-40 flex items-center justify-center px-4 text-center text-amber-300 uppercase line-clamp-2 
              text-xs md:text-sm lg:text-xl font-bold"
          >
            {title}
          </h2>
        </div>

        <div className="flex w-full justify-center py-8 md:py-10">
          <div className="w-full max-w-120 rounded-xl bg-linear-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] p-1.25">
            <div className="relative aspect-5/3 w-full overflow-hidden rounded-xl">
              <Image
                src={imageSrc}
                alt={`Foto ${title}`}
                fill
                sizes="(max-width: 768px) 92vw, 480px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-120 flex-col gap-4">
          {summary ? (
            <p className="text-center text-xs leading-5 text-[#2f1a07] md:text-sm">
              {summary}
            </p>
          ) : null}

          <div className="flex justify-center sm:justify-end">
            <NavActionButton
              href={`/home/jelajah/ormada/${slug}`}
              label="Lihat Detail"
              icon="→"
              iconPosition="right"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
