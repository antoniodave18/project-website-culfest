import HeroAsrama from "./component/hero-asrama";
import JelajahTitle from "./component/jelajah-tittle";
import JelajahCard from "./component/jelajahcard"
import { ASRAMA_DETAILS, type AsramaDetail } from "./data";

const Page = () => {
  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col items-center bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-[#6e0f04]"
    >
      <JelajahTitle title="ASRAMA" />

      <HeroAsrama />

      <div className="w-[86.58%] max-w-339 relative z-10  px-4  mt-42 ">
        <div className="w-full relative z-20">
          <div className="bg-[#03005E] min-h-50 w-full flex items-center justify-center px-4 py-4">
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
              Jelajah asrama
            </h2>
          </div>
        </div>
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-10 py-15"
          style={{
            backgroundImage: "url('/images/jelajah/asrama/Bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {ASRAMA_DETAILS.map((item: AsramaDetail) => (
            <JelajahCard key={item.slug} title={item.title} slug={item.slug} />
          ))}
        </div>
        <div className="w-full relative z-20">
          <div className="bg-[#03005E] min-h-30 w-full flex items-center justify-center px-4 py-4"></div>
        </div>
      </div>
    </main>
  );
};

export default Page;
