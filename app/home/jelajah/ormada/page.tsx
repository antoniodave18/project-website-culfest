import JelajahCard from "./component/jelajahcard";
import { listPublishedCommunities } from "@/lib/communities";
import { communityLogoPlaceholder } from "@/lib/community-fields";

export const dynamic = "force-dynamic";

export default async function Page() {
  const communities = await listPublishedCommunities();
  return (
    <main
      className="relative overflow-hidden flex flex-col items-center bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-[#6e0f04]"
    >
      <div className="relative mt-30 mb-10 z-10 w-[90%]">
        <div className="flex h-auto w-full items-center justify-center bg-[#03005E] px-4 py-4 rounded-t-xl">
          <h1
            className="text-center"
            style={{
              fontFamily: "var(--font-efco-brookshire), serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              color: "#F5A623",
              letterSpacing: "0.05em",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Jelajah Ormada
          </h1>
        </div>

        {communities.length === 0 ? (
          <p className="rounded-b-xl bg-[#f7c063] p-8 text-center text-[#2f1a07]">
            Belum ada profil komunitas yang terbit.
          </p>
        ) : <>
        <div
          className="hidden w-full grid-cols-2 gap-8 px-10 py-15 md:gap-8 lg:gap-15 md:grid rounded-b-xl 
          bg-linear-to-b from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E]" 
        >
          {communities.map((item) => (
            <JelajahCard
              key={item.slug}
              title={item.name}
              slug={item.slug}
              imageSrc={item.logoUrl ?? communityLogoPlaceholder}
              summary={item.summary}
            />
          ))}
        </div>

        <div className="relative w-full md:hidden">
          <div
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 md:gap-30 overflow-x-auto overscroll-x-contain px-[7vw] md:px-[17vw] py-10
            bg-linear-to-b from-[#EF9E1E] from-10% via-[#F7C063] via-50% to-[#EF9E1E] rounded-b-xl"
          >
            {communities.map((item) => (
              <div
                key={item.slug}
                className="w-[86vw] shrink-0 snap-center md:w-[66vw]"
              >
                <JelajahCard
                  title={item.name}
                  slug={item.slug}
                  imageSrc={item.logoUrl ?? communityLogoPlaceholder}
                  summary={item.summary}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-2 text-white/60 text-2xl md:text-3xl font-bold drop-shadow">
            &lt;
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2 text-white/60 text-2xl md:text-3xl font-bold drop-shadow">
            &gt;
          </div>
        </div>
        </>}

      </div>
    </main>
  );
}
