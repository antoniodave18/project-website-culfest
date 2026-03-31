'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  
  // State untuk menyimpan lokasi sebelum login
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const handleGetLocation = () => {
    setErrorMsg('');
    setLocationStatus('Meminta akses lokasi dari browser...');

    if (!navigator.geolocation) {
      setErrorMsg('Geolocation tidak didukung oleh browser Anda.');
      setLocationStatus('');
      return;
    }

    // Meminta akurasi tinggi jika tersedia
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLocationStatus(`Lokasi diamankan: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorDet = 'Pastikan izin lokasi (location) diberikan pada browser Anda.';
        if (error.code === error.PERMISSION_DENIED) errorDet = 'Akses lokasi ditolak pengguna.';
        else if (error.code === error.POSITION_UNAVAILABLE) errorDet = 'Informasi lokasi tidak tersedia.';
        else if (error.code === error.TIMEOUT) errorDet = 'Waktu permintaan lokasi habis (timeout).';
        
        setErrorMsg(`Gagal mendapatkan lokasi. ${errorDet}`);
        setLocationStatus('');
      },
      options
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userLocation) {
       setErrorMsg('Harap ambil lokasi terlebih dahulu sebelum login.');
       return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Simpan token untuk dipakai di halaman QR
        localStorage.setItem('adminToken', data.token);
        // Pindah halaman
        router.push('/test-qr');
      } else {
        setErrorMsg(data.message || 'Login gagal. Periksa kembali username/password.');
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan saat mencoba login.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-[#5c0a00] p-4 font-montserrat">
      <div className="z-10 bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login Admin Khusus</h1>
        
        {errorMsg && (
          <div className="bg-red-500/80 text-white p-3 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <div className="mb-6 border-b border-white/20 pb-6">
          <p className="text-white/80 text-sm mb-3 text-center">
            Langkah 1: Tetapkan Titik Pusat Acara (Lokasi Saat Ini)
          </p>
          <button 
            type="button"
            onClick={handleGetLocation}
            className={`w-full py-3 rounded-lg font-bold shadow-lg transition-colors ${userLocation ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-black'}`}
          >
            {userLocation ? 'Lokasi Sudah Didapat ✓' : '📍 Ambil Lokasi Saya'}
          </button>
          
          <div className="min-h-[24px] mt-2">
            {locationStatus && (
              <p className={`text-xs italic text-center ${userLocation ? 'text-green-300' : 'text-yellow-300 animate-pulse'}`}>
                {locationStatus}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <p className="text-white/80 text-sm text-center mb-2">
            Langkah 2: Autentikasi Admin
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-semibold">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/40 border border-white/30 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="Masukkan username"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-semibold">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/40 border border-white/30 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !userLocation}
            className="mt-4 bg-gradient-to-r from-[#d91f11] to-[#9e160c] hover:from-[#e83223] hover:to-[#b81d11] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Memproses...' : !userLocation ? 'Harap Ambil Lokasi Dulu' : 'Login'}
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
