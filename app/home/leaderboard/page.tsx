'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard', { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setRankings(data.data);
                setLastUpdated(new Date());
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
        // Initial Fetch
        fetchLeaderboard();

        // Auto Refresh tiap 10 detik
        const interval = setInterval(() => {
            fetchLeaderboard();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Podium warna highlight
    const getBadgeColor = (index: number) => {
        if (index === 0) return 'from-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(250,204,21,0.6)] border-yellow-300';
        if (index === 1) return 'from-slate-300 to-slate-400 shadow-[0_0_20px_rgba(203,213,225,0.4)] border-slate-200';
        if (index === 2) return 'from-amber-600 to-amber-700 shadow-[0_0_20px_rgba(217,119,6,0.4)] border-amber-500';
        return 'from-black/60 to-black/40 border-white/20 opacity-80'; // Sisa ranking standard
    };

    const getRankIcon = (index: number) => {
        if (index === 0) return '👑';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}`;
    };

    return (
        <main className="min-h-screen bg-[#5c0a00] p-6 pt-24 md:p-12 md:pt-32 font-montserrat relative overflow-hidden flex flex-col items-center">
            
            <div className="z-10 w-full max-w-4xl space-y-8 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Leaderboard Voting
                    </h1>
                    <p className="text-white/80 mt-4 max-w-xl mx-auto font-medium">
                        Hasil langsung perolehan suara audiens. Data diperbarui secara otomatis setiap 10 detik!
                    </p>
                    
                    <div className="mt-4 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-xs text-white/60">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        LIVE UPDATE
                        {lastUpdated && ` • Terakhir di-refresh: ${lastUpdated.toLocaleTimeString('id-ID')}`}
                    </div>
                </div>

                {loading && rankings.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                        <p className="text-white/60 text-sm animate-pulse">Sedang merekap perolehan suara...</p>
                    </div>
                ) : errorMsg && rankings.length === 0 ? (
                    <div className="bg-red-500/80 text-white px-6 py-4 rounded-xl border border-red-400">{errorMsg}</div>
                ) : (
                    <div className="w-full flex flex-col gap-4 animate-fadeIn">
                        {rankings.map((candidate, index) => {
                            const isTop3 = index < 3;

                            return (
                                <div 
                                    key={candidate.id} 
                                    className={`relative flex items-center bg-gradient-to-r ${getBadgeColor(index)} border rounded-2xl p-4 transition-transform hover:scale-[1.02]`}
                                >
                                    {/* Podium Rank Label */}
                                    <div className={`absolute -left-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-2 z-10 
                                        ${isTop3 ? 'bg-black text-white border-yellow-400' : 'bg-black/80 text-white/70 border-white/20'}`}
                                    >
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Profile Image */}
                                    <div className={`shrink-0 rounded-xl overflow-hidden bg-white/10 ${isTop3 ? 'w-24 h-24 md:w-32 md:h-32 shadow-xl' : 'w-16 h-16 shadow-md'} ml-4`}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info Block */}
                                    <div className="flex-1 ml-6 flex flex-col justify-center">
                                        <h2 className={`${isTop3 ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-white drop-shadow-md line-clamp-1`}>
                                            {candidate.name}
                                        </h2>
                                        {isTop3 && index === 0 && <span className="text-yellow-300 text-sm font-semibold tracking-wider italic">🥇 MEMIMPIN KLASEMEN</span>}
                                    </div>

                                    {/* Vote Count Block */}
                                    <div className="shrink-0 flex flex-col items-end justify-center pr-4">
                                        <span className={`font-black ${isTop3 ? 'text-4xl md:text-5xl text-white' : 'text-2xl text-white/80'} drop-shadow-md`}>
                                            {candidate.voteCount}
                                        </span>
                                        <span className={`text-xs md:text-sm font-semibold uppercase tracking-widest ${isTop3 ? 'text-white/80' : 'text-white/40'}`}>
                                            SUARA
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {rankings.length === 0 && (
                            <div className="text-center py-20 text-white/50 italic">
                                Belum ada kandidat atau belum ada suara yang masuk.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15] overflow-hidden">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </main>
    );
}
