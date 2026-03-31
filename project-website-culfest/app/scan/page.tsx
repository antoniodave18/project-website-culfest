'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ScanContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    // Mengecek apakah pengguna ini pernah memindai dan terverifikasi sebelumnya
    const existingToken = localStorage.getItem('voteToken');
    if (existingToken) {
      setStatus('error');
      setMessage('Anda telah memiliki tiket voting atau sudah melakukan voting dari perangkat ini. Memindai ulang dilarang.');
    }
  }, []);

  const verifyQR = async () => {
    const existingToken = localStorage.getItem('voteToken');
    if (existingToken) {
      setStatus('error');
      setMessage('Perangkat ini sudah terkunci karena pernah memindai atau memiliki sesi voting sebelumnya.');
      return;
    }

    if (!code) {
      setStatus('error');
      setMessage('Kode QR tidak valid (parameter "code" hilang).');
      return;
    }

    setLoading(true);
    setStatus('verifying');
    setLocationStatus('Meminta akses lokasi...');

    if (!navigator.geolocation) {
      setStatus('error');
      setMessage('Perangkat atau browser Anda tidak mendukung Geolocation.');
      setLoading(false);
      return;
    }

    // Meminta akurasi tinggi jika tersedia
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus(`Lokasi ditemukan: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

        try {
          const res = await fetch('/api/verify-qr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code,
              latitude,
              longitude
            })
          });

          const data = await res.json();

          if (res.ok && data.success) {
            setStatus('success');
            setMessage(data.message);
            if (data.voteToken) {
              localStorage.setItem('voteToken', data.voteToken);
            }
          } else {
            setStatus('error');
            setMessage(data.message || 'Verifikasi gagal. Pastikan Anda berada dalam jangka lapangan atau kode belum kadaluwarsa.');
          }
        } catch (err) {
          setStatus('error');
          setMessage('Terjadi masalah jaringan saat memverifikasi kode.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setStatus('error');
        setMessage('Akses lokasi ditolak atau gagal ditemukan. Mohon izinkan lokasi di pengaturan browser lalu coba lagi.');
        setLoading(false);
      },
      options
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-montserrat">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 flex flex-col items-center">
        
        {/* Header Icon */}
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          C
        </div>
        
        <h1 className="text-2xl font-extrabold text-[#5c0a00] mb-2 text-center">Verifikasi Kehadiran</h1>
        <p className="text-gray-500 text-sm text-center mb-8">
          Aplikasi butuh akses lokasi untuk memastikan Anda berada di *venue* acara.
        </p>

        {status === 'idle' && (
          <div className="flex flex-col items-center w-full">
            <button 
              onClick={verifyQR}
              className="w-full py-4 rounded-xl bg-orange-600 font-bold text-white shadow-lg hover:bg-orange-700 transition-colors transform hover:scale-[1.02]"
            >
              Cek & Verifikasi Lokasi Saya
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Pastikan GPS Handphone Anda Menyala.</p>
          </div>
        )}

        {status === 'verifying' && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
            <p className="text-gray-700 font-medium">Memverifikasi kode...</p>
            {locationStatus && <p className="text-sm text-orange-600 animate-pulse">{locationStatus}</p>}
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center justify-center w-full transform animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
              ✓
            </div>
            <h2 className="text-xl font-bold text-green-600 mb-2">Terverifikasi!</h2>
            <p className="text-gray-600 text-center bg-gray-50 p-4 rounded-xl border border-gray-100 font-medium leading-relaxed mb-6">
              {message}
            </p>
            <button 
              onClick={() => window.location.href = '/vote'}
              className="py-3 px-6 rounded-lg bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition-colors w-full"
            >
              Lanjut Pilih Voting
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center w-full transform animate-fade-in-up">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
              ✕
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Verifikasi Gagal</h2>
            <p className="text-gray-600 text-center bg-red-50 p-4 rounded-xl border border-red-100 text-sm leading-relaxed mb-6">
              {message}
            </p>
            {message.includes('terkunci') || message.includes('pernah') ? (
              <button 
                onClick={() => window.location.href = '/vote'}
                className="py-3 px-6 rounded-lg bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition-colors"
              >
                Kembali ke Ruang Voting
              </button>
            ) : (
              <button 
                onClick={verifyQR}
                className="py-3 px-6 rounded-lg bg-gray-800 text-white font-semibold shadow hover:bg-gray-700 transition-colors"
              >
                Coba Ulang
              </button>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-orange-600 font-bold">Memuat Scanner...</div>}>
      <ScanContent />
    </Suspense>
  );
}
