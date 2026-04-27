// app/home/leaderboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { VotingCard } from '../../components/VotingCard';

type CandidateRanking = {
    id: string;
    name: string;
    imageUrl: string;
    voteCount: number;
};

export default function LeaderboardPage() {
    const [rankings, setRankings] = useState<CandidateRanking[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard', { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setRankings(data.data);
            } else {
                setErrorMsg('Gagal memuat papan klasemen.');
            }
        } catch (err) {
            setErrorMsg('Kesalahan jaringan, mencoba ulang...');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-[#310602] flex flex-col items-center justify-center pt-32 pb-24 px-4 bg-[url('/images/pattern-bg.png')] bg-repeat">
            <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-yellow-500 mb-16 md:mb-20 drop-shadow-lg text-center leading-tight z-10 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: "2px 2px 5px rgba(0,0,0,0.8)"}}>
                LEADERBOARD
            </h1>

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
                <div className="hide-scrollbar min-h-[50vh] max-h-[60vh] overflow-y-auto w-full flex flex-col items-center gap-4 md:gap-6 py-4">
                    {loading && rankings.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-800"></div>
                            <p className="text-yellow-900 font-bold animate-pulse">Menghitung Suara...</p>
                        </div>
                    ) : errorMsg && rankings.length === 0 ? (
                        <div className="bg-red-900/80 text-white px-6 py-4 rounded-xl border border-red-700">{errorMsg}</div>
                    ) : rankings.length === 0 ? (
                         <div className="text-center py-20 text-yellow-900 font-bold italic">
                            Belum ada perolehan suara.
                        </div>
                    ) : (
                        rankings.map((candidate, index) => (
                            <VotingCard 
                                key={candidate.id}
                                rank={index + 1}
                                name={candidate.name}
                                imageUrl={candidate.imageUrl || "/images/voting/teratai.png"}
                                voteCount={candidate.voteCount}
                            />
                        ))
                    )}
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
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
