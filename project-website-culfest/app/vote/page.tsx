'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CANDIDATES = [
  { id: 'wayang', name: 'Tim Wayang', color: 'bg-red-500', hover: 'hover:bg-red-600' },
  { id: 'gatotkaca', name: 'Tim Gatotkaca', color: 'bg-orange-500', hover: 'hover:bg-orange-600' },
  { id: 'srikandi', name: 'Tim Srikandi', color: 'bg-yellow-500', hover: 'hover:bg-yellow-600' },
];

export default function VotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [voteToken, setVoteToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Memeriksa apakah perangkat ini sudah memiliki tiket masuk vote (voteToken)
    const token = localStorage.getItem('voteToken');
    if (!token) {
      setStatus('error');
      setMessage('Akses Ditolak: Anda belum melakukan scan kehadiran / QR Code atau waktu Anda sudah kedaluwarsa.');
      setLoading(false);
    } else {
      setVoteToken(token);
      setLoading(false);
    }
  }, []);

  const handleVote = async (candidateId: string) => {
    if (!voteToken) return;

    if (!confirm(`Apakah Anda yakin ingin memberikan suara untuk Tim ${candidateId.toUpperCase()}?`)) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate: candidateId,
          voteToken: voteToken
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        // Token Tetap disimpan di localStorage untuk pelacakan HP (sebagai bukti dia sudah voting)
      } else {
        setStatus('error');
        setMessage(data.message || 'Gagal mengirim pilihan Anda.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Masalah jaringan: Gagal mengirim suara Anda.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center bg-[#5c0a00] p-4 font-montserrat overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="z-10 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-lg w-full">
        
        {loading ? (
          <div className="py-8 text-center text-gray-500 animate-pulse font-medium">Memuat Halaman Voting...</div>
        ) : status === 'error' && !voteToken ? (
           <div className="flex flex-col items-center justify-center py-6 w-full transform animate-fade-in-up">
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                ✕
              </div>
              <h2 className="text-xl font-bold text-red-600 mb-2">Akses Terkunci</h2>
              <p className="text-gray-600 text-center bg-red-50 p-4 rounded-xl border border-red-100 text-sm leading-relaxed mb-6">
                {message}
              </p>
              <button 
                onClick={() => window.location.href = '/scan'}
                className="py-3 px-6 rounded-lg bg-gray-800 text-white font-semibold shadow hover:bg-gray-700 transition-colors"
              >
                Scan QR Dulu
              </button>
           </div>
        ) : status === 'success' ? (
           <div className="flex flex-col items-center justify-center py-6 w-full transform animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                ✓
              </div>
              <h2 className="text-xl font-bold text-green-600 mb-2">Suara Masuk!</h2>
              <p className="text-gray-600 text-center bg-green-50 p-4 rounded-xl border border-green-100 font-medium leading-relaxed mb-6">
                {message}
              </p>
           </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <h1 className="text-3xl font-extrabold text-[#5c0a00] mb-2 text-center">Pilihan Favorit</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Pilih satu kandidat terbaik. Anda hanya bisa melakukan vote sebanyak <strong className="text-red-600 underline">satu kali</strong>! Suara Anda akan direkam secara permanen.
            </p>

            {status === 'error' && (
              <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium text-center">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-4 w-full">
              {CANDIDATES.map((candidate) => (
                <button
                  key={candidate.id}
                  disabled={submitting}
                  onClick={() => handleVote(candidate.id)}
                  className={`relative overflow-hidden w-full ${candidate.color} ${candidate.hover} text-white font-bold py-5 px-6 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="relative z-10 text-lg uppercase tracking-wider">{candidate.name}</span>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/10 transition-opacity opacity-0 hover:opacity-100"></div>
                </button>
              ))}
            </div>

            {submitting && (
               <div className="mt-6 flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                  <span className="text-xs text-gray-500 mt-2">Merekam pilihan ke server...</span>
               </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
