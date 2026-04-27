'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

type Candidate = {
    id: string;
    name: string;
    imageUrl: string;
};

export default function VotePage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const router = useRouter();

    const [hasVotedError, setHasVotedError] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        // Cek Local Storage (Anti-Spam per HP)
        const voted = localStorage.getItem('hasVoted');
        if (voted === 'true') {
            setHasVotedError(true);
            setLoading(false);
            return;
        }

        // Fetch candidates untuk ditampilkan jika belum vote
        const fetchCandidates = async () => {
            try {
                const res = await fetch('/api/candidates');
                const data = await res.json();
                if (data.success) {
                    setCandidates(data.data);
                } else {
                    setErrorMsg('Gagal memuat daftar kandidat.');
                }
            } catch (err) {
                setErrorMsg('Terjadi kesalahan jaringan.');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId: string, candidateName: string) => {
        if (!confirm(`Tentukan pilihan Anda pada "${candidateName}"? Pilihan tidak dapat diubah.`)) {
            return;
        }

        setSubmitting(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateId, token })
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMsg(`Berhasil! Anda telah mem-voting ${candidateName}.`);
                localStorage.setItem('hasVoted', 'true');
            } else {
                setErrorMsg(data.message || 'Voting gagal.');
            }
        } catch (err) {
            setErrorMsg('Kesalahan jaringan / server.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#5c0a00] flex items-center justify-center font-montserrat">
                <div className="text-white text-xl animate-pulse">Memuat platform voting...</div>
            </main>
        );
    }

    if (hasVotedError) {
        return (
            <main className="min-h-[100dvh] bg-[#5c0a00] flex items-center justify-center font-montserrat p-6">
                <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-center max-w-sm">
                    <div className="text-5xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Terima Kasih!</h1>
                    <p className="text-white/70 text-sm">
                        Anda sudah memberikan suara Anda. Satu perangkat hanya dapat digunakan untuk satu kali voting guna menjaga sportivitas.
                    </p>
                </div>
            </main>
        );
    }

    if (successMsg) {
        return (
            <main className="min-h-[100dvh] bg-[#5c0a00] flex items-center justify-center font-montserrat p-6 relative overflow-hidden">
                <div className="z-10 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-center max-w-sm">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Vote Terkirim</h1>
                    <p className="text-white/80 text-sm">{successMsg}</p>
                </div>
                {/* Confetti / background effects */}
                <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-green-500 rounded-full blur-[120px] mix-blend-screen opacity-30"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[150px] mix-blend-screen opacity-30"></div>
            </main>
        );
    }

    return (
        <main className="min-h-[100dvh] bg-[#5c0a00] p-4 font-montserrat relative pb-20">
            <div className="text-center mb-8 mt-6">
                <h1 className="text-2xl font-bold text-white">Live Voting</h1>
                <p className="text-white/60 text-xs mt-2 px-4">
                    Pilih kandidat jagoan Anda. Waktu Anda terbatas sesuai ketersediaan sesi QR.
                </p>
            </div>

            {errorMsg && (
                <div className="mx-auto max-w-md bg-red-500/80 text-white p-4 rounded-lg text-sm text-center font-semibold mb-6 shadow-lg">
                    {errorMsg}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {candidates.length === 0 && !errorMsg ? (
                    <div className="text-white/50 text-center italic mt-10">Belum ada kandidat pendaftaran.</div>
                ) : (
                    candidates.map((c) => (
                        <div key={c.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex items-center gap-4 active:scale-95 transition-transform">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">{c.name}</h3>
                            </div>
                            <button
                                onClick={() => handleVote(c.id, c.name)}
                                disabled={submitting}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-4 py-3 rounded-lg shadow-md disabled:opacity-50 h-full"
                            >
                                VOTE
                            </button>
                        </div>
                    ))
                )}
            </div>

            {submitting && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center text-white flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                        <span>Memproses Vote...</span>
                    </div>
                </div>
            )}
        </main>
    );
}
