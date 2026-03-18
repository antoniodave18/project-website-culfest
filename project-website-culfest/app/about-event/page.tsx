import Header from "../components/Header";
import TentangSection from "./components/TentangSection";
import TransisiAwan from "./components/TransisiAwan";
import SejarahSection from "./components/SejarahSection";
import MaskotSection from "./components/MaskotSection";

export default function AboutEventPage() {
  return (
    <main className="bg-[#5c0a00] min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background motif pattern */}
      <div
        className="absolute inset-0 z-0 top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/bg-section-1.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "auto",
          backgroundPosition: "top",
        }}
      />

      {/* 1356px / 1566.1px = 86.58% */}
      <div className="w-[86.58%] max-w-[1356px] relative z-10 pb-20 pt-10">
        <TentangSection />
        <TransisiAwan />
        <SejarahSection />
        <MaskotSection />
      </div>
    </main>
  );
}
