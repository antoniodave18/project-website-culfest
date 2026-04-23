import InteractiveMapComponent from "./InteractiveMapComponent";

export default function MapPage() {
  return (
    <main className="bg-[#5c0a00] min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background motif pattern - reusing standard theme */}
      <div className="absolute inset-0 z-0 top-0 left-0 w-full h-full bg-[url('/images/home/bg-motif.png')] bg-repeat-y bg-contain bg-top" />

      <div className="w-[95%] max-w-339 relative z-10 pb-10 sm:pb-16 md:pb-20 pt-6 sm:pt-8 md:pt-10 flex flex-col items-center">

        <div className="relative z-20 w-full max-w-6xl mt-10">
          {/* Custom Header Frame */}
          <div className="flex h-auto w-full items-center justify-center bg-[#03005E] px-4 py-4 rounded-t-2xl border-t-4 border-x-4 border-[#D4AF37]">
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-efco-brookshire), serif",
                fontSize: "clamp(32px, 6vw, 64px)",
                color: "#F5A623",
                letterSpacing: "0.05em",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Peta Interaktif Culfest
            </h2>
          </div>

          {/* Main Content Area */}
          <div className="relative flex w-full min-h-75 flex-col items-center justify-center rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] bg-[url('/images/tentang/bg.png')] bg-cover bg-center bg-no-repeat sm:min-h-100 md:min-h-125">
            <div className="relative z-10 h-full w-full px-4 sm:px-8 md:px-12 py-8">
              
              <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2 p-2 items-center gap-8 lg:gap-12">
                
                {/* Descriptive Text Section */}
                <div className="order-2 lg:order-1 flex flex-col justify-center h-full space-y-6">
                  <h3 className="text-2xl sm:text-3xl text-[#F5A623] font-bold drop-shadow-md">
                    Jelajahi Dunia Culfest
                  </h3>
                  <p className="w-full text-base sm:text-lg text-white leading-relaxed tracking-[0.5px] text-justify font-[Merriweather,serif] drop-shadow-sm">
                    Peta 3D ini memberikan Anda pandangan menyeluruh mengenai area 
                    dan berbagai keajaiban di acara Culfest.
                    <br /><br />
                    Saksikan miniatur ikonik kami yang berputar secara interaktif. 
                    Klik tombol <strong>"View Full"</strong> untuk memperbesar tampilan, 
                    memutar objek, dan mengamati setiap detail dari dekat.
                  </p>
                </div>

                {/* 3D Map Component Section */}
                <div className="order-1 lg:order-2 flex h-full w-full items-center justify-center">
                  <div className="w-full aspect-square max-w-[400px] md:max-w-[500px] rounded-xl bg-linear-to-b from-[#e1bf61] via-[#fcf9c4] to-[#e1bf61] p-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.5)]">
                    {/* The 3D Component sits inside this golden frame */}
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                       <InteractiveMapComponent />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
