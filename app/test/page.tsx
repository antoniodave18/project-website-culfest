'use client';

import Image from 'next/image';

type VotingCardProps = {
    rank?: number | string;
    name: string;
    imageUrl: string;
    onClick?: () => void;
};

export function VotingCard({ rank = 1, name, imageUrl, onClick }: VotingCardProps) {
    return (
        <div
            onClick={onClick}
            className="w-full max-w-2xl lg:max-w-3xl relative h-[70px] md:h-[85px] lg:h-[100px] rounded-xl lg:rounded-2xl cursor-pointer group flex items-center bg-gradient-to-r from-[#2c0402] via-[#4c0502] to-[#2c0402] overflow-hidden border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02]"
        >
            {/* 1. Rank Number */}
            <div className="w-[40px] md:w-[50px] lg:w-[60px] h-full shrink-0 flex justify-center items-center">
                <span className="text-white text-xl md:text-2xl lg:text-3xl font-serif font-bold italic drop-shadow-md leading-none mt-1 lg:mt-2">
                    {rank}
                </span>
            </div>

            {/* 2. Portrait Frame */}
            <div className="relative shrink-0 w-[45px] h-[55px] md:w-[60px] md:h-[70px] lg:w-[70px] lg:h-[80px] bg-[#3d130d] border-[1px] md:border-[2px] border-yellow-500/80 rounded-sm overflow-hidden z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {imageUrl && (
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                )}
            </div>

            {/* 3. Candidate Name */}
            <div className="flex-1 px-3 md:px-5 lg:px-6 z-10 flex items-center">
                <h3
                    className="text-white font-serif uppercase text-sm md:text-base lg:text-xl font-bold tracking-wider line-clamp-2 md:line-clamp-1"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                    {name}
                </h3>
            </div>

            {/* 4. Right Custom Button / Decorative lotus */}
            <div className="relative shrink-0 w-[90px] md:w-[120px] lg:w-[140px] h-full flex items-center justify-end pr-3 md:pr-5">

                {/* The Golden outline shape */}
                <div className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-[55px] md:w-[80px] lg:w-[100px] h-[22px] md:h-[28px] lg:h-[35px] border-[1.5px] md:border-[2px] border-yellow-500/90 rounded-r-full rounded-l-md bg-gradient-to-r from-transparent to-yellow-900/40 group-hover:bg-yellow-900/60 transition-colors z-0"></div>

                {/* The Lotus Flower */}
                <div className="absolute right-[60px] md:right-[85px] lg:right-[105px] top-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-xl flex items-center">
                    <div className="relative w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px] group-hover:scale-110 transition-transform origin-center">
                        <Image
                            src="/images/voting/teratai.png"
                            alt="Teratai"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Halaman testing
export default function TestPage() {
    return (
        <main className="min-h-screen bg-[#310602] flex flex-col items-center justify-center p-4 pt-40 md:pt-48 pb-24 bg-[url('/images/pattern-bg.png')] bg-repeat">

            {/* Scroll Container */}
            <div className="relative w-[90vw] md:w-[70vw] max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-16 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#EF9E1E] via-[#F7C063] to-[#EF9E1E]">

                {/* Scroll Top Element */}
                <div className="pointer-events-none absolute left-1/2 top-0 w-[125%] md:w-[122%] h-[60px] md:h-[100px] -translate-x-1/2 -translate-y-1/2 z-20">
                    <Image
                        src="/images/jelajah/asrama/Gulungan atas.png"
                        alt="Scroll Top"
                        fill
                        className="object-fill"
                    />
                </div>
                {/* Content Area */}
                <div className="hide-scrollbar max-h-[60vh] overflow-y-auto w-full flex flex-col items-center gap-6 py-4 px-2">
                    <VotingCard
                        rank={1}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png" // fallback image yg pasti ada
                        onClick={() => alert('Voted!')}
                    />
                    <VotingCard
                        rank={2}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png"
                        onClick={() => alert('Voted!')}
                    />
                    <VotingCard
                        rank={3}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png"
                        onClick={() => alert('Voted!')}
                    />
                    <VotingCard
                        rank={4}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png"
                        onClick={() => alert('Voted!')}
                    />
                    <VotingCard
                        rank={5}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png"
                        onClick={() => alert('Voted!')}
                    />
                    <VotingCard
                        rank={6}
                        name="SASKIA SALSABILA"
                        imageUrl="/images/voting/teratai.png"
                        onClick={() => alert('Voted!')}
                    />
                </div>

                {/* Konfirmasi Button (MOCKED) */}
                <div className="mt-10 flex justify-center pb-2">
                    <button className="bg-gradient-to-b from-[#6b1e06] to-[#3a0600] text-white px-10 py-3 rounded-xl border-2 border-yellow-600 shadow-[0_4px_10px_rgba(0,0,0,0.5)] font-serif font-bold text-xl hover:scale-105 active:scale-95 transition-transform">
                        Konfirmasi
                    </button>
                </div>

                {/* Scroll Bottom Element */}
                <div className="pointer-events-none absolute left-1/2 bottom-0 w-[125%] md:w-[122%] h-[60px] md:h-[100px] -translate-x-1/2 translate-y-1/2 z-20">
                    <Image
                        src="/images/jelajah/asrama/Gulungan atas.png"
                        alt="Scroll Bottom"
                        fill
                        className="object-fill rotate-180" // Rotate for the bottom
                    />
                </div>

            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </main>
    );
}
