'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function QRGeneratorPage() {
    const [token, setToken] = useState<string | null>(null);
    const [expiresAt, setExpiresAt] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [originUrl, setOriginUrl] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        setOriginUrl(window.location.origin);
    }, []);

    const generateNewQR = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/voting-tokens', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                setToken(data.data.token);
                setExpiresAt(new Date(data.data.expiresAt));
                // Set sisa waktu
                const remaining = Math.max(0, Math.floor((new Date(data.data.expiresAt).getTime() - Date.now()) / 1000));
                setTimeLeft(remaining);
            } else {
                alert('Gagal menghasilkan QR: ' + data.message);
            }
        } catch (error) {
            alert('Kesalahan jaringan.');
        } finally {
            setLoading(false);
        }
    };

    // Countdown Timer logic
    useEffect(() => {
        if (!expiresAt || timeLeft <= 0) {
            // Jika expired dan ada token sebelumnya, generate ulang otomatis
            if (token && timeLeft <= 0) {
                generateNewQR();
            }
            return;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
            setTimeLeft(remaining);

            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expiresAt, timeLeft]);


    const voteUrl = token && originUrl ? `${originUrl}/vote/${token}` : '';
    const qrImageSrc = voteUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(voteUrl)}` : '';

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center bg-[#5c0a00] p-6 lg:p-12 font-montserrat">
            <div className="z-10 w-full max-w-2xl space-y-8 flex flex-col items-center">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-full">
                    <div>
                        <h1 className="text-2xl font-bold text-white">QR Code Berjalan</h1>
                        <p className="text-white/70 text-sm mt-1">Valid 1.5 Menit. Otomatis Generate Baru.</p>
                    </div>
                    <Link href="/Admin/manajemen/voting">
                        <button className="text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors border border-white/20">
                            Kembali
                        </button>
                    </Link>
                </div>

                <div className="bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/30 text-center w-full flex flex-col items-center">
                    {!token ? (
                        <div className="py-20 flex flex-col items-center justify-center">
                            <button 
                                onClick={generateNewQR}
                                disabled={loading}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Membuat QR...' : '▶ MULAI SESI VOTING QR'}
                            </button>
                            <p className="text-white/50 text-sm mt-4">Akan menganulir semua token lama tipe QR.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center animate-fadeIn w-full">
                            <h2 className="text-white text-2xl font-bold mb-8">Scan QR di Bawah Ini Untuk Voting</h2>
                            
                            <div 
                                className="bg-white p-4 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.2)] cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setIsFullscreen(true)}
                                title="Klik untuk memperbesar QR"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {qrImageSrc && <img src={qrImageSrc} alt="QR Code" className="w-[300px] h-[300px] object-contain" />}
                            </div>

                            <p className="text-white/60 text-xs mt-3 italic mb-4">Klik gambar QR untuk tampilan penuh layar</p>

                            <div className="mt-4 mb-4 border-2 border-white/20 rounded-full px-6 py-2 bg-black/40">
                                <p className="text-white text-lg font-mono flex items-center gap-2">
                                    <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}>
                                        ⏱ {timeLeft}s tersisa
                                    </span>
                                </p>
                            </div>

                            <p className="text-white/40 text-xs w-full break-all mb-8 max-w-sm">
                                {voteUrl}
                            </p>

                            <button 
                                onClick={generateNewQR}
                                className="text-sm bg-white/5 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors border border-white/10"
                            >
                                🔄 Generate Baru Sekarang (Force Refresh)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Fullscreen QR */}
            {isFullscreen && token && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-4 cursor-pointer"
                    onClick={() => setIsFullscreen(false)}
                >
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_0_100px_rgba(255,255,255,0.3)] animate-fadeIn">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrImageSrc} alt="QR Code Besar" className="w-[80vw] max-w-[600px] object-contain" />
                    </div>
                    <div className="mt-8 text-white text-2xl font-bold border-2 border-white/20 rounded-full px-8 py-3 bg-black/50 backdrop-blur-md">
                        <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}>
                            ⏱ {timeLeft}s
                        </span>
                    </div>
                    <p className="text-white/60 mt-8 text-xl text-center">Klik dimana saja untuk un-zoom kembali</p>
                </div>
            )}

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </main>
    );
}
