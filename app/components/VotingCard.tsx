'use client';

import Image from 'next/image';

export type VotingCardProps = {
    rank?: number | string;
    name: string;
    imageUrl: string;
    onClick?: () => void;
    voteCount?: number;
    showVoteDecoration?: boolean;
};

export function VotingCard({ rank = 1, name, imageUrl, onClick, voteCount, showVoteDecoration = true }: VotingCardProps) {
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

            {showVoteDecoration && (
                <div className="relative shrink-0 w-[110px] md:w-[130px] lg:w-[160px] h-full flex items-center justify-end pr-3 md:pr-5">

                    <div className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-[65px] md:w-[90px] lg:w-[110px] h-[22px] md:h-[28px] lg:h-[35px] border-[1.5px] md:border-[2px] border-yellow-500/90 rounded-r-full rounded-l-md bg-gradient-to-r from-transparent to-yellow-900/40 group-hover:bg-yellow-900/60 transition-colors z-0 flex items-center justify-end pr-3 lg:pr-4">
                        {voteCount !== undefined && (
                            <span className="text-white text-[10px] md:text-xs lg:text-sm font-bold opacity-90 drop-shadow-md">
                                {voteCount} Suara
                            </span>
                        )}
                    </div>

                    <div className="absolute right-[55px] md:right-[75px] lg:right-[95px] top-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-xl flex items-center">
                        <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] group-hover:scale-110 transition-transform origin-center">
                            <Image
                                src="/images/voting/teratai.png"
                                alt="Teratai"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
