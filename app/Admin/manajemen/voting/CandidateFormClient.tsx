'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VotingFormPage() {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Cek limit 10MB
            if (file.size > 10 * 1024 * 1024) {
                alert('Ukuran file tidak boleh melebihi 10MB.');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!name || !imagePreview) {
            setMessage('Nama dan Gambar wajib diisi.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    imageBase64: imagePreview
                })
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Kandidat voting berhasil ditambahkan ke Database!');
                setName('');
                setImageFile(null);
                setImagePreview(null);
            } else {
                setMessage(result.message || 'Gagal menyimpan.');
            }
        } catch (error) {
            setMessage('Terjadi kesalahan jaringan/server.');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 4000);
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center bg-[#5c0a00] p-6 lg:p-12 font-montserrat">
            <div className="z-10 w-full max-w-4xl space-y-8">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Manajemen Tambah Voting</h1>
                        <p className="text-white/70 text-sm mt-1">Formulir penambahan kandidat acara.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/Admin/manajemen/candidates">
                            <button className="text-sm bg-blue-600/80 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors border border-blue-400/50 shadow-md">
                                📋 Lihat Daftar Kandidat
                            </button>
                        </Link>
                        <Link href="/Admin/manajemen/voting/qr">
                            <button className="text-sm bg-purple-600/80 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors border border-purple-400/50 shadow-md">
                                📷 Tampilkan QR
                            </button>
                        </Link>
                        <Link href="/Admin/manajemen/leaderboard">
                            <button className="text-sm bg-yellow-600/80 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors border border-yellow-400/50 shadow-md">
                                Kontrol Leaderboard
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* Form Tambah Kandidat */}
                    <div className="bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full">
                        <h2 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-3">Form Tambah Kandidat</h2>
                        
                        {message && (
                            <div className={`p-3 rounded-lg mb-6 text-sm text-center font-semibold animate-pulse ${message.includes('berhasil') ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/90 text-sm font-semibold">Nama Kandidat / Pilihan</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-black/40 border border-white/30 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                    placeholder="Contoh: Tim A, Grup B, dll..."
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white/90 text-sm font-semibold">Unggah Gambar / Foto (Maks 10 MB)</label>
                                <div 
                                    className="relative border-2 border-dashed border-white/30 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group" 
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden shadow-lg border border-white/20 group-hover:opacity-80 transition-opacity">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={imagePreview} alt="Preview Kandidat" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                                <span className="text-white font-semibold flex items-center gap-2">
                                                    <span>↻</span> Ganti Gambar
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <span className="text-2xl">📸</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Klik untuk memilih gambar</p>
                                                <p className="text-white/50 text-xs mt-1">Mendukung Format: JPG, PNG, WEBP</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    required={!imagePreview}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 bg-gradient-to-r from-[#d91f11] to-[#9e160c] hover:from-[#e83223] hover:to-[#b81d11] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {loading ? 'Menyimpan...' : '➕ Tambahkan ke Database'}
                            </button>
                        </form>
                    </div>
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
