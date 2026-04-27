'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { VotingCard } from '../../components/VotingCard';

type Candidate = {
    id: string;
    name: string;
    imageUrl: string;
};

export default function VotePage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        // 1. Cek Anti Spam (Local Storage)
        const votedFlag = localStorage.getItem('culfest_voted');
        if (votedFlag === 'true') {
            setHasVoted(true);
            setLoading(false);
            setStatusMessage('Tindakan Ditolak: Perangkat ini sudah pernah digunakan untuk voting.');
            return;
        }

        if (!token) {
            setLoading(false);
            setStatusMessage('Mohon maaf, tautan ini belum lengkap. Pastikan Anda masuk dengan scan ulang QR yang benar ya.');
            return;
        }

        // 2. Fetch Daftar Kandidat
        const fetchCandidates = async () => {
            try {
                const res = await fetch('/api/candidates');
                const data = await res.json();
                if (data.success) {
                    setCandidates(data.data);
                } else {
                    setStatusMessage('Gagal mengambil data kandidat.');
                }
            } catch (err) {
                setStatusMessage('Terjadi kesalahan jaringan.');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [token]);

    const openConfirmModal = () => {
        if (!selectedCandidateId) return;
        setShowConfirmModal(true);
    };

    const executeVote = async () => {
        setShowConfirmModal(false);

        setSubmitting(true);
        setStatusMessage('');

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateId: selectedCandidateId, token })
            });

            const data = await res.json();

            if (data.success) {
                // Anti spam lock
                localStorage.setItem('culfest_voted', 'true');
                setHasVoted(true);
                setStatusMessage('Terima kasih! Suara Anda telah berhasil direkam.');
            } else {
                setStatusMessage(data.message || 'Mohon maaf, suara Anda gagal tersimpan karena sedikit kendala.');
            }
        } catch (error) {
            setStatusMessage('Mohon maaf, sedang ada sedikit kendala. Silakan coba kembali atau scan ulang ya.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#310602] flex flex-col items-center justify-center pt-32 pb-24 px-4 bg-[url('/images/pattern-bg.png')] bg-repeat relative overflow-hidden">
            
            <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-yellow-500 mb-16 md:mb-20 drop-shadow-lg text-center leading-tight z-10 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: "2px 2px 5px rgba(0,0,0,0.8)"}}>
                PILIH JAGOANMU
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
                <div className="hide-scrollbar min-h-[50vh] max-h-[60vh] overflow-y-auto w-full flex flex-col items-center gap-4 md:gap-6 py-4 px-2">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-800"></div>
                            <p className="text-yellow-900 font-bold animate-pulse">Menyiapkan surat suara...</p>
                        </div>
                    ) : (hasVoted || !token || statusMessage) ? (
                        // Final state (already voted or invalid token)
                        <div className="text-center py-20 px-4 flex flex-col items-center gap-4">
                            <div className="text-6xl">{hasVoted ? '✅' : '❌'}</div>
                            <p className="text-yellow-900 font-bold text-xl md:text-2xl mt-4">Pemberitahuan</p>
                            <p className="text-yellow-900 font-medium leading-relaxed max-w-sm">{statusMessage || 'Kelihatannya ada sesuatu yang kurang tepat. Silakan coba scan ulang kembali ya.'}</p>
                        </div>
                    ) : (
                        <>
                            {statusMessage && <div className="text-red-900 font-bold mb-4">{statusMessage}</div>}
                            
                            {candidates.map((candidate, index) => {
                                const isSelected = selectedCandidateId === candidate.id;
                                return (
                                    <div key={candidate.id} className="relative w-full max-w-2xl lg:max-w-3xl flex justify-center">
                                        <div className={`w-full rounded-xl lg:rounded-2xl transition-all duration-300 relative z-30 ${isSelected ? 'ring-[3px] md:ring-4 ring-[#ffb703] shadow-[0_0_40px_rgba(255,183,3,1)] scale-[1.04]' : ''}`}>
                                            {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-[#ffb703]/20 via-transparent to-[#ffb703]/20 pointer-events-none z-20 rounded-xl lg:rounded-2xl"></div>}
                                            <VotingCard 
                                                rank={index + 1}
                                                name={candidate.name}
                                                imageUrl={candidate.imageUrl || "/images/voting/teratai.png"}
                                                onClick={() => setSelectedCandidateId(candidate.id)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Konfirmasi Button */}
                            {candidates.length > 0 && (
                                <div className="mt-8 flex justify-center pb-2 pt-4 w-full">
                                    <button 
                                        onClick={openConfirmModal}
                                        disabled={!selectedCandidateId || submitting}
                                        className={`px-10 py-3 rounded-xl border-2 font-serif font-bold text-xl transition-all ${
                                            selectedCandidateId && !submitting
                                                ? 'bg-gradient-to-b from-[#6b1e06] to-[#3a0600] text-white border-yellow-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 cursor-pointer'
                                                : 'bg-[#5e382d] text-white/50 border-white/20 cursor-not-allowed grayscale'
                                        }`}
                                    >
                                        {submitting ? 'Mengirim Data...' : 'Konfirmasi Pilihan'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Scroll Bottom Element */}
                <div className="pointer-events-none absolute left-1/2 bottom-0 w-[125%] md:w-[122%] h-[60px] md:h-[100px] -translate-x-1/2 translate-y-1/2 z-20">
                    <Image
                        src="/images/jelajah/asrama/Gulungan atas.png"
                        alt="Scroll Bottom"
                        fill
                        className="object-fill rotate-180"
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
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Custom Confirm Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-gradient-to-br from-[#f8d998] to-[#e8b55d] border-4 border-[#5c2408] rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] p-6 md:p-8 text-center animate-fade-in-up">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-b from-[#6b1e06] to-[#3a0600] rounded-full flex items-center justify-center shadow-inner border border-yellow-500/50">
                            <span className="text-3xl md:text-4xl">🤔</span>
                        </div>
                        <h3 className="text-2xl font-serif font-black text-[#4a1c05] mb-3 drop-shadow-sm tracking-wide">Konfirmasi</h3>
                        <p className="text-[#642b0d] font-medium mb-8 leading-relaxed text-sm md:text-base">
                            Apakah kamu yakin menyalurkan suara untuk kandidat ini?<br/><span className="text-[#8c1717] font-bold text-xs">Pilihan otomatis tersimpan dan tidak dapat diubah kembali.</span>
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-[#5c2408] text-[#5c2408] font-bold hover:bg-[#5c2408]/10 active:scale-95 transition-all text-sm md:text-base"
                            >
                                Cek Lagi
                            </button>
                            <button 
                                onClick={executeVote}
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-yellow-500 bg-gradient-to-b from-[#6b1e06] to-[#3a0600] text-white font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm md:text-base"
                            >
                                Yakin!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
