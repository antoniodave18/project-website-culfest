'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type LeaderboardSession = {
    sessionCode: string;
    enabled: boolean;
    voteCount: number;
    createdAt: string | null;
};

export default function LeaderboardControlPage() {
    const [sessions, setSessions] = useState<LeaderboardSession[]>([]);
    const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const selectedCount = useMemo(() => selectedCodes.size, [selectedCodes]);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/leaderboard-sessions', { cache: 'no-store' });
            const data = await res.json();

            if (data.success) {
                setSessions(data.data);
                setSelectedCodes(new Set(data.data.filter((session: LeaderboardSession) => session.enabled).map((session: LeaderboardSession) => session.sessionCode)));
            } else {
                setMessage(data.message || 'Gagal mengambil sesi leaderboard.');
            }
        } catch {
            setMessage('Terjadi kesalahan jaringan.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchSessions();
        }, 0);

        return () => window.clearTimeout(timeout);
    }, [fetchSessions]);

    const toggleSession = (sessionCode: string) => {
        setSelectedCodes((current) => {
            const next = new Set(current);
            if (next.has(sessionCode)) next.delete(sessionCode);
            else next.add(sessionCode);
            return next;
        });
    };

    const saveSettings = async () => {
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/leaderboard-sessions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabledSessionCodes: Array.from(selectedCodes) })
            });
            const data = await res.json();

            if (data.success) {
                setMessage('Pengaturan leaderboard berhasil disimpan.');
                await fetchSessions();
            } else {
                setMessage(data.message || 'Gagal menyimpan pengaturan.');
            }
        } catch {
            setMessage('Terjadi kesalahan jaringan saat menyimpan.');
        } finally {
            setSaving(false);
        }
    };

    const resetSession = async (sessionCode: string) => {
        if (!confirm(`Reset semua vote untuk sesi "${sessionCode}"?`)) return;

        setSaving(true);
        setMessage('');

        try {
            const res = await fetch(`/api/vote?sessionCode=${encodeURIComponent(sessionCode)}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (data.success) {
                setMessage(`Sesi ${sessionCode} direset. ${data.deletedCount} vote dihapus.`);
                await fetchSessions();
            } else {
                setMessage(data.message || 'Gagal mereset sesi.');
            }
        } catch {
            setMessage('Terjadi kesalahan jaringan saat reset sesi.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center bg-[#5c0a00] p-6 lg:p-12 font-montserrat">
            <div className="z-10 w-full max-w-5xl space-y-8">
                <div className="flex flex-col gap-4 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Kontrol Leaderboard</h1>
                        <p className="text-white/70 text-sm mt-1">Pilih sesi vote yang dihitung masuk ke leaderboard publik.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/Admin/manajemen/voting">
                            <button className="text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors border border-white/20">
                                Kembali
                            </button>
                        </Link>
                        <Link href="/home/leaderboard">
                            <button className="text-sm bg-blue-600/80 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors border border-blue-400/50">
                                Lihat Leaderboard
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-white font-bold">{selectedCount} sesi aktif</p>
                            <p className="text-white/50 text-sm">Sesi yang tidak dicentang tetap tersimpan, tapi tidak dihitung di leaderboard.</p>
                        </div>
                        <button
                            onClick={saveSettings}
                            disabled={saving || loading}
                            className="bg-gradient-to-r from-[#d91f11] to-[#9e160c] hover:from-[#e83223] hover:to-[#b81d11] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>

                    {message && (
                        <div className="mb-6 rounded-lg bg-white/10 border border-white/20 p-3 text-center text-sm font-semibold text-white">
                            {message}
                        </div>
                    )}

                    {loading ? (
                        <div className="py-12 text-center text-white/60">Memuat sesi vote...</div>
                    ) : sessions.length === 0 ? (
                        <div className="py-12 text-center text-white/60">Belum ada sesi vote. Buat QR dengan kode sesi terlebih dahulu.</div>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session) => (
                                <div key={session.sessionCode} className="flex flex-col gap-4 rounded-xl border border-white/15 bg-black/30 p-4 md:flex-row md:items-center md:justify-between">
                                    <label className="flex cursor-pointer items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedCodes.has(session.sessionCode)}
                                            onChange={() => toggleSession(session.sessionCode)}
                                            className="h-5 w-5 accent-yellow-500"
                                        />
                                        <span>
                                            <span className="block text-lg font-bold text-white">{session.sessionCode}</span>
                                            <span className="text-sm text-white/50">
                                                {session.voteCount} vote
                                                {session.createdAt ? ` • dibuat ${new Date(session.createdAt).toLocaleString('id-ID')}` : ''}
                                            </span>
                                        </span>
                                    </label>
                                    <button
                                        onClick={() => resetSession(session.sessionCode)}
                                        disabled={saving}
                                        className="rounded-lg border border-red-500/50 bg-red-600/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600/80 disabled:opacity-50"
                                    >
                                        Reset Vote Sesi
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>
        </main>
    );
}
