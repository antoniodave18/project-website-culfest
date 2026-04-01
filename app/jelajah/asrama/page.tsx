import HeroAsrama from "./component/hero-asrama";
import JelajahTitle from "./component/jelajah-tittle";
import Image from "next/image";

const Page = () => {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
      <JelajahTitle title="ASRAMA" />

      <HeroAsrama />

      <div className="w-[86.58%] max-w-339 relative z-10 pb-20 pt-10 px-4">
        <div className="w-full px-4 relative z-20">
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
              Pesona Culfest
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
