'use client';

import { useState, useEffect } from 'react';

// Data statis untuk antarmuka
const CANDIDATES = [
  { id: 'wayang', name: 'Tim Wayang', color: 'bg-red-500', barColor: 'bg-red-500', icon: '🎭' },
  { id: 'gatotkaca', name: 'Tim Gatotkaca', color: 'bg-orange-500', barColor: 'bg-orange-500', icon: '🦸‍♂️' },
  { id: 'srikandi', name: 'Tim Srikandi', color: 'bg-yellow-500', barColor: 'bg-yellow-400', icon: '🏹' },
];

export default function HasilVotePage() {
  const [data, setData] = useState<Record<string, number>>({
    wayang: 0,
    gatotkaca: 0,
    srikandi: 0
  });
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/vote-result');
      const json = await res.json();
      
      if (res.ok && json.success) {
        setData(json.data);
        const total = Object.values(json.data).reduce((a: any, b: any) => a + b, 0) as number;
        setTotalVotes(total);
      }
    } catch (err) {
      console.error('Failed fetching results', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Panggil saat pertama dimuat
    fetchResults();

    // Auto-refresh setiap 5 detik agar hasil tampil real-time (live)
    const interval = setInterval(() => {
      fetchResults();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Hitung kandidat pemenang saat ini
  const maxVotes = Math.max(...Object.values(data));
  const leadingCandidates = CANDIDATES.filter(c => data[c.id] === maxVotes && maxVotes > 0);

  return (
    <main className="min-h-screen bg-[#2c0000] text-white p-8 font-montserrat flex flex-col relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-600 rounded-full blur-[200px] mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      {/* Header */}
      <header className="z-10 text-center mb-16 pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 mb-4 drop-shadow-lg">
          Hasil Voting Sementara
        </h1>
        <p className="text-xl text-orange-200 opacity-80 uppercase tracking-widest font-semibold">
          Festival Kebudayaan - Culfest
        </p>
      </header>

      {/* Main Content */}
      <div className="z-10 flex flex-col flex-1 items-center max-w-5xl mx-auto w-full">
        
        {/* Total Votes Card */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full mb-12 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-1">Total Suara Masuk</h2>
            {loading ? (
              <div className="h-12 w-24 bg-white/20 animate-pulse rounded-lg mt-2"></div>
            ) : (
              <div className="text-6xl font-bold font-mono text-white">{totalVotes}</div>
            )}
          </div>
          
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
             <h2 className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-2">Memimpin Saat Ini:</h2>
             <div className="flex gap-2">
               {leadingCandidates.length > 0 ? leadingCandidates.map(c => (
                 <span key={c.id} className={`${c.color} px-4 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap`}>
                   {c.icon} {c.name}
                 </span>
               )) : (
                 <span className="bg-gray-700 px-4 py-2 rounded-full font-bold text-sm text-gray-300">Belum Ada Suara</span>
               )}
             </div>
          </div>
        </div>

        {/* Voting Bars */}
        <div className="w-full flex flex-col gap-8">
          {CANDIDATES.map((candidate) => {
            const count = data[candidate.id] || 0;
            const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            
            return (
              <div key={candidate.id} className="w-full group">
                {/* Lebel and Value */}
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow-md">{candidate.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-white/90 group-hover:text-white transition-colors">
                      {candidate.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-t from-white/70 to-white">
                      {count}
                    </span>
                    <span className="text-sm md:text-lg text-white/50 ml-2 font-medium">({percentage}%)</span>
                  </div>
                </div>
                
                {/* Progress Bar Track */}
                <div className="w-full h-8 md:h-12 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner relative">
                  {/* The Bar Fill */}
                  <div 
                    className={`h-full ${candidate.barColor} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${percentage}%` }}
                  >
                    {/* Glossy effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer indicator */}
      <footer className="z-10 text-center mt-16 pb-8">
        <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/40 font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live updating every 5 seconds
        </div>
      </footer>
    </main>
  );
}
