'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';

export default function TestQrPage() {
  const router = useRouter();
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    async function generateQR() {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setErrorMsg('Sesi login tidak ditemukan. Silakan login kembali.');
          setTimeout(() => router.push('/test'), 3000);
          return;
        }

        const res = await fetch('/api/generate-qr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setQrCode(data.code);
          // Ganti dengan URL scanner yang mengarah ke sistem kita
          setQrUrl(`${window.location.origin}/scan?code=${data.code}`);
        } else {
          setErrorMsg(data.message || 'Gagal membuat QR Code.');
          if (res.status === 401) {
            setTimeout(() => router.push('/test'), 3000);
          }
        }
      } catch (err) {
        setErrorMsg('Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    }

    // Panggil saat pertama kali load
    generateQR();

    // Jalankan penyegaran (auto refresh) setiap 60 detik
    const intervalId = setInterval(() => {
      generateQR();
    }, 60000);

    // Membersihkan interval saat navigasi pergi
    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#5c0a00] p-4 font-montserrat relative overflow-hidden">
      <div className="z-10 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full border-4 border-orange-500/30">
        <h1 className="text-3xl font-bold text-[#5c0a00] mb-2 text-center">Scan Kehadiran</h1>
        <p className="text-gray-500 text-sm mb-8 text-center flex flex-col items-center">
          <span>Otomatis refresh setiap 1 menit.</span>
          <span className="text-xs text-orange-600 font-semibold">(Masa aktif dibatasi 1 menit 15 detik)</span>
        </p>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-600 font-medium animate-pulse">Membuat QR Code...</p>
          </div>
        ) : errorMsg ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl text-center font-medium my-8 border border-red-300">
            {errorMsg}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full transform transition-all animate-fade-in">
            <div className="bg-white p-4 rounded-xl shadow-inner border-2 border-gray-100 w-full flex justify-center mb-6">
              <QRCode
                value={qrUrl}
                size={250}
                bgColor={"#ffffff"}
                fgColor={"#5c0a00"}
                level={"H"}
              />
            </div>
            
            <div className="bg-orange-50 w-full p-4 rounded-lg border border-orange-200 text-center mb-6 flex flex-col gap-2">
              <p className="text-sm text-gray-700 font-semibold">Tautan untuk Testing / Pengecekan:</p>
              <a 
                href={qrUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[13px] bg-white border border-gray-300 rounded px-2 py-4 font-mono text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors underline break-all max-h-32 overflow-hidden block"
              >
                {qrUrl}
              </a>
              <p className="text-[10px] text-gray-500 mt-1">*Klik tautan di atas untuk mencoba scanning secara instan</p>
            </div>
            
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                router.push('/test');
              }}
              className="mt-6 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Logout Admin
            </button>
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>
    </main>
  );
}
