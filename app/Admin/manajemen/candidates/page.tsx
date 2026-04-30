'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Candidate = {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: string;
};

export default function CandidatesListPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/candidates');
            const data = await res.json();
            if (data.success) {
                setCandidates(data.data);
            } else {
                setErrorMsg(data.message);
            }
        } catch (error) {
            setErrorMsg('Gagal mengambil data kandidat dari server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus kandidat "${name}"? Gambar akan dihapus secara permanen.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/candidates/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                setCandidates(candidates.filter(c => c.id !== id));
            } else {
                alert('Gagal menghapus: ' + data.message);
            }
        } catch (error) {
            alert('Terjadi kesalahan saat menghapus.');
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center bg-[#5c0a00] p-6 lg:p-12 font-montserrat">
            <div className="z-10 w-full max-w-5xl space-y-8">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Daftar Kandidat</h1>
                        <p className="text-white/70 text-sm mt-1">Kelola data kandidat yang ada pada database.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/Admin/manajemen/voting">
                            <button className="text-sm bg-green-600/80 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors border border-green-400/50 shadow-md">
                                ➕ Tambah Kandidat
                            </button>
                        </Link>
                        <Link href="/Admin/manajemen/voting/qr">
                            <button className="text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors border border-white/20">
                                Tampilkan Qr
                            </button>
                        </Link>
                        <Link href="/Admin/manajemen/leaderboard">
                            <button className="text-sm bg-yellow-600/80 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors border border-yellow-400/50 shadow-md">
                                Kontrol Leaderboard
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
                    {loading ? (
                        <div className="text-center text-white/50 py-10">Memuat data kandidat...</div>
                    ) : errorMsg ? (
                        <div className="bg-red-500/80 text-white p-4 rounded-lg text-center">{errorMsg}</div>
                    ) : candidates.length === 0 ? (
                        <div className="text-center text-white/50 py-10 italic">
                            Belum ada kandidat di database. Silakan klik "Tambah Kandidat".
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {candidates.map((c) => (
                                <div key={c.id} className="bg-gradient-to-br from-black/60 to-black/40 rounded-xl p-4 border border-white/20 flex flex-col gap-4 shadow-lg hover:border-white/40 transition-colors">
                                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-white/10 relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/fallback.png')} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg line-clamp-1" title={c.name}>{c.name}</h3>
                                        <p className="text-white/40 text-xs mt-1">Ditambahkan: {new Date(c.createdAt).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(c.id, c.name)}
                                        className="mt-auto w-full py-2 bg-red-600/30 hover:bg-red-600/80 text-white rounded-lg border border-red-500/50 transition-colors text-sm font-semibold"
                                    >
                                        Hapus Kandidat
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>
        </main>
    );
}
