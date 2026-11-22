'use client';

import { useState } from 'react';

export default function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/auth/sign-in/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (res.ok) {
                window.location.assign('/Admin');
                return;
            }
            setErrorMsg(res.status === 429
                ? 'Terlalu banyak percobaan. Coba lagi sebentar.'
                : 'Gagal masuk. Periksa email dan kata sandi.');
        } catch {
            setErrorMsg('Gagal masuk. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-[#5c0a00] p-4 font-montserrat">
            <div className="z-10 bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Login Admin Khusus</h1>

                {errorMsg && (
                    <div role="alert" className="bg-red-500/80 text-white p-3 rounded-lg mb-6 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="admin-email" className="text-white/80 text-sm font-semibold">Email</label>
                        <input
                            id="admin-email"
                            type="email"
                            autoComplete="username"
                            maxLength={191}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black/40 border border-white/30 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="admin-password" className="text-white/80 text-sm font-semibold">Kata sandi</label>
                        <input
                            id="admin-password"
                            type="password"
                            autoComplete="current-password"
                            maxLength={128}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/40 border border-white/30 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="Masukkan kata sandi"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-gradient-to-r from-[#d91f11] to-[#9e160c] hover:from-[#e83223] hover:to-[#b81d11] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {loading ? 'Memproses...' : 'Login'}
                    </button>
                </form>

            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>
        </main>
    );
}
