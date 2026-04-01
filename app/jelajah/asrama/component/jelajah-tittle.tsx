import Image from "next/image";

type JelajahTitleProps = {
  title: string;
};

export default function JelajahTitle({ title }: JelajahTitleProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[60%] flex justify-center items-center z-20 mt-30">
      <div className="relative w-full aspect-[4.5/1] drop-shadow-2xl flex items-center justify-center">
        <Image
          src="/images/tentang/pita.png"
          alt="Ribbon Background"
          fill
          className="object-contain"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center mx-auto w-[75%] h-[80%] mt-[-1%]">
          <Image
            src="/images/tentang/inner-pita.png"
            alt="Inner Ribbon Background"
            fill
            className="object-contain"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1
              className="text-[#ffd700] leading-none tracking-widest text-center font-bold"
              style={{
                fontFamily: "var(--font-efco-brookshire), serif",
                fontSize: "70px",
                letterSpacing: "0.05em",
                textShadow: "2px 2px 5px rgba(0,0,0,0.8)",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
