// app/home/leaderboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavActionButton from '../components/NavActionButton';

type CandidateRanking = {
    id: string;
    name: string;
    imageUrl: string;
    voteCount: number;
};



function LeaderboardRankRow({ candidate, rank }: { candidate: CandidateRanking; rank: number }) {
    let rankClass = "";
    if (rank === 1) rankClass = "lb-rank-gold";
    else if (rank === 2) rankClass = "lb-rank-silver";
    else if (rank === 3) rankClass = "lb-rank-bronze";

    return (
        <div className={`lb-rank-row ${rankClass}`}>
            <div className="lb-rank-number">{rank}</div>
            <p className="lb-rank-name">{candidate.name}</p>
            <div className="lb-rank-votes">
                <Image src="/images/voting/teratai.png" alt="" width={86} height={86} className="lb-rank-lotus" />
                <span>{candidate.voteCount} Suara</span>
            </div>
        </div>
    );
}

export default function LeaderboardPage() {
    const FIRST_PAGE_ROWS = 3;
    const NEXT_PAGE_ROWS = 6;

    const [rankings, setRankings] = useState<CandidateRanking[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = rankings.length <= FIRST_PAGE_ROWS
        ? 1
        : 1 + Math.ceil((rankings.length - FIRST_PAGE_ROWS) / NEXT_PAGE_ROWS);
    const paginatedRankings = currentPage === 0
        ? rankings.slice(0, FIRST_PAGE_ROWS)
        : rankings.slice(
            FIRST_PAGE_ROWS + (currentPage - 1) * NEXT_PAGE_ROWS,
            FIRST_PAGE_ROWS + currentPage * NEXT_PAGE_ROWS
        );

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard', { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setRankings(data.data);
            } else {
                setErrorMsg('Gagal memuat papan klasemen.');
            }
        } catch {
            setErrorMsg('Kesalahan jaringan, mencoba ulang...');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages - 1) {
            setCurrentPage(totalPages - 1);
        }
    }, [currentPage, totalPages]);

    return (
        <main className="lb-page">
            <div className="lb-bg"><Image src="/images/voting/bg.png" alt="" fill className="object-cover" priority /></div>

            <div className="lb-back">
                <NavActionButton href="/home" label="Kembali" icon="←" iconPosition="left" />
            </div>

            <div className="lb-ribbon lb-ribbon-tl">
                <Image src="/images/voting/pitapojokkiriatas.png" alt="" fill className="object-contain" style={{ objectPosition: 'top left' }} />
            </div>
            <div className="lb-ribbon lb-ribbon-br">
                <Image src="/images/voting/pitapojokkananbawa.png" alt="" fill className="object-contain" style={{ objectPosition: 'bottom right' }} />
            </div>

            <div className="lb-flower lb-fl1"><Image src="/images/voting/bunga(1).png" alt="" width={60} height={60} /></div>
            <div className="lb-flower lb-fl2"><Image src="/images/voting/bunga(1).png" alt="" width={45} height={45} /></div>
            <div className="lb-flower lb-fl3"><Image src="/images/voting/bunga(1).png" alt="" width={50} height={50} /></div>
            <div className="lb-flower lb-fl4"><Image src="/images/voting/bunga(1).png" alt="" width={40} height={40} /></div>

            <div className="lb-mascot lb-mascot-left">
                <Image src="/images/tentang/chileko.png" alt="Chileko" width={220} height={320} className="object-contain" />
            </div>
            <div className="lb-mascot lb-mascot-right">
                <Image src="/images/tentang/chitala.png" alt="Chitala" width={180} height={280} className="object-contain" />
            </div>

            <div className="lb-content">
                <div className="lb-title-wrap">
                    <Image src="/images/voting/tittleleaderboard.png" alt="Leaderboard" width={560} height={160} className="lb-title-img" priority />
                </div>

                <div className="lb-scroll">
                    <div className="lb-rod lb-rod-top">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill" />
                    </div>

                    <div className="lb-scroll-inner hide-scrollbar">
                        {loading && rankings.length === 0 ? (
                            <div className="lb-status">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-800"></div>
                                <p className="text-yellow-900 font-bold animate-pulse">Menghitung suara...</p>
                            </div>
                        ) : errorMsg && rankings.length === 0 ? (
                            <div className="lb-status">
                                <p className="lb-status-title">Pemberitahuan</p>
                                <p className="lb-status-text">{errorMsg}</p>
                            </div>
                        ) : rankings.length === 0 ? (
                            <div className="lb-status">
                                <p className="lb-status-title">Belum Ada Suara</p>
                                <p className="lb-status-text">Perolehan suara akan tampil setelah voting dimulai.</p>
                            </div>
                        ) : (
                            <>
                                <div className="lb-rank-list">
                                    {paginatedRankings.map((candidate, index) => (
                                        <LeaderboardRankRow
                                            key={candidate.id}
                                            candidate={candidate}
                                            rank={currentPage === 0 ? index + 1 : FIRST_PAGE_ROWS + (currentPage - 1) * NEXT_PAGE_ROWS + index + 1}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="lb-pagination">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                            disabled={currentPage === 0}
                                            className={`lb-page-btn ${currentPage === 0 ? 'lb-page-btn-off' : 'lb-page-btn-on'}`}
                                        >
                                            ‹
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i)}
                                                className={`lb-page-dot ${currentPage === i ? 'lb-page-dot-active' : ''}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                            disabled={currentPage === totalPages - 1}
                                            className={`lb-page-btn ${currentPage === totalPages - 1 ? 'lb-page-btn-off' : 'lb-page-btn-on'}`}
                                        >
                                            ›
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="lb-rod lb-rod-bot">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill rotate-180" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
.lb-page{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:154px 16px 52px}
.lb-bg{position:absolute;inset:0;z-index:0}
.lb-back{position:absolute;left:24px;top:92px;z-index:30}
.lb-ribbon{position:absolute;z-index:1;pointer-events:none}
.lb-ribbon-tl{top:0;left:0;width:320px;height:200px}
.lb-ribbon-br{bottom:0;right:0;width:360px;height:280px}
.lb-flower{position:absolute;z-index:3;pointer-events:none;animation:lbFloat 4s ease-in-out infinite}
.lb-fl1{top:5%;right:7%;animation-delay:0s}
.lb-fl2{top:40%;left:2%;animation-delay:1s}
.lb-fl3{top:50%;right:3%;animation-delay:2s}
.lb-fl4{bottom:7%;left:5%;animation-delay:.5s}
@keyframes lbFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(5deg)}}
.lb-mascot{position:absolute;z-index:4;pointer-events:none;filter:drop-shadow(0 18px 24px rgba(0,0,0,.35))}
.lb-mascot-left{left:-20px;top:50%;transform:translateY(-50%)}
.lb-mascot-right{right:-10px;top:50%;transform:translateY(-50%)}
.lb-content{position:relative;z-index:5;display:flex;flex-direction:column;align-items:center;width:100%;max-width:900px;gap:42px}
.lb-title-wrap{z-index:10;width:100%;display:flex;justify-content:center}
.lb-title-img{width:86%;max-width:560px;height:auto;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.5))}
.lb-scroll{position:relative;width:100%;background:linear-gradient(to bottom,#EF9E1E,#F7C063,#EF9E1E);box-shadow:0 0 50px rgba(0,0,0,.8);padding:40px 16px;margin-bottom:20pt}
.lb-rod{position:absolute;left:50%;transform:translateX(-50%);width:115%;height:55px;z-index:20;pointer-events:none}
.lb-rod-top{top:0;transform:translateX(-50%) translateY(-50%)}
.lb-rod-bot{bottom:0;transform:translateX(-50%) translateY(50%)}
.lb-scroll-inner{width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;padding:16px 8px 20pt}
.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
.lb-status{min-height:320px;padding:60px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center}
.lb-status-title{color:#5c2408;font-family:serif;font-size:26px;font-weight:900}
.lb-status-text{color:#6b2b08;font-weight:700;line-height:1.6;max-width:360px}
.lb-card-row{width:100%;max-width:640px;display:flex;justify-content:center}
.lb-rank-list{width:100%;display:flex;flex-direction:column;align-items:center;gap:20px;padding-top:10px}
.lb-rank-row{width:100%;max-width:650px;height:92px;border-radius:12px;background:linear-gradient(90deg,#4a0802,#6e0a03 58%,#4a0802);box-shadow:0 8px 16px rgba(0,0,0,.34);display:grid;grid-template-columns:72px minmax(0,1fr) 178px;align-items:center;overflow:hidden;border:1px solid rgba(255,222,106,.08);transition:all .3s ease}
.lb-rank-gold{background:linear-gradient(90deg,#6f4e00 0%,#f5c542 18%,#a87400 50%,#f5c542 82%,#6f4e00 100%);border:2px solid #ffd700;box-shadow:0 0 28px rgba(255,215,0,.55),inset 0 0 16px rgba(255,255,180,.18);transform:scale(1.04);z-index:10}
.lb-rank-gold .lb-rank-number{color:#fff4b2;text-shadow:0 0 10px #ffdf70,0 0 22px #ffb700;font-size:38px;font-style:normal;transform:scale(1.08)}
.lb-rank-silver{background:linear-gradient(90deg,#24272e 0%,#7d8696 20%,#4b525e 50%,#7d8696 80%,#24272e 100%);border:2px solid #d1d5db;box-shadow:0 0 20px rgba(209,213,219,.5),inset 0 0 12px rgba(209,213,219,.2);transform:scale(1.02);z-index:9}
.lb-rank-silver .lb-rank-number{color:#f3f4f6;text-shadow:0 0 10px #d1d5db,0 0 20px #9ca3af;font-size:34px;font-style:normal}
.lb-rank-bronze{background:linear-gradient(90deg,#3d1c02 0%,#ad5a1f 20%,#70360d 50%,#ad5a1f 80%,#3d1c02 100%);border:2px solid #f97316;box-shadow:0 0 18px rgba(249,115,22,.5),inset 0 0 10px rgba(249,115,22,.2);transform:scale(1.01);z-index:8}
.lb-rank-bronze .lb-rank-number{color:#ffedd5;text-shadow:0 0 10px #fdba74,0 0 20px #f97316;font-size:32px;font-style:normal}
.lb-rank-number{height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-family:serif;font-size:30px;font-weight:900;font-style:italic;text-shadow:0 2px 4px rgba(0,0,0,.55);transition:all .3s ease}
.lb-rank-name{min-width:0;padding:0 18px;color:#fff;font-family:serif;font-size:22px;font-weight:900;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 2px 4px rgba(0,0,0,.65)}
.lb-rank-votes{position:relative;height:100%;display:flex;align-items:center;justify-content:flex-start;color:#fff;font-size:12px;font-weight:900;text-shadow:0 2px 3px rgba(0,0,0,.65)}
.lb-rank-votes:before{content:"";position:absolute;right:20px;top:50%;width:96px;height:32px;transform:translateY(-50%);border:2px solid #d99712;border-left-width:1px;border-radius:4px 999px 999px 4px;background:linear-gradient(90deg,transparent,rgba(103,42,0,.28))}
.lb-rank-lotus{position:relative;z-index:2;width:86px;height:auto;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45))}
.lb-rank-votes span{position:relative;z-index:2;margin-left:-4px;margin-right:18px}
.lb-pagination{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px}
.lb-page-btn{width:36px;height:36px;border-radius:50%;border:2px solid #5c2408;background:transparent;color:#5c2408;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.lb-page-btn-on:hover{background:rgba(92,36,8,.15);transform:scale(1.1)}
.lb-page-btn-on:active{transform:scale(.9)}
.lb-page-btn-off{opacity:.3;cursor:not-allowed}
.lb-page-dot{width:32px;height:32px;border-radius:50%;border:2px solid #5c2408;background:transparent;color:#5c2408;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.lb-page-dot:hover{background:rgba(92,36,8,.1)}
.lb-page-dot-active{background:linear-gradient(to bottom,#6b1e06,#3a0600);color:#fff;border-color:#eab308;box-shadow:0 2px 8px rgba(0,0,0,.4)}
@media(max-width:767px){
.lb-mascot-left,.lb-mascot-right{display:none}
.lb-rank-list{gap:12px}
.lb-rank-row{height:78px;grid-template-columns:46px minmax(0,1fr) 100px;border-radius:10px}
.lb-rank-number{font-size:22px}
.lb-rank-gold .lb-rank-number{font-size:25px}
.lb-rank-silver .lb-rank-number{font-size:23px}
.lb-rank-bronze .lb-rank-number{font-size:22px}
.lb-rank-name{padding:0 10px;font-size:14px}
.lb-rank-votes:before{right:10px;width:64px;height:24px}
.lb-rank-lotus{width:52px}
.lb-rank-votes span{font-size:9px;margin-left:-2px;margin-right:8px}
}
@media(min-width:768px){
.lb-page{padding:128px 32px 60px}
.lb-ribbon-tl{width:400px;height:260px}
.lb-ribbon-br{width:440px;height:340px}
.lb-mascot-left,.lb-mascot-right{display:none}
.lb-mascot-left{left:-6px;top:60%}
.lb-mascot-right{right:-2px;top:58%}
.lb-mascot-left img{width:160px!important;height:auto!important}
.lb-mascot-right img{width:142px!important;height:auto!important}
.lb-content{max-width:860px;gap:44px}
.lb-title-img{max-width:580px}
.lb-scroll{padding:50px 24px}
.lb-rod{width:118%;height:75px}
.lb-scroll-inner{gap:18px;padding:20px 16px 20pt}
.lb-rank-row{max-width:680px}
}
@media(min-width:1024px){
.lb-page{padding:150px 48px 68px}
.lb-back{left:48px;top:110px}
.lb-ribbon-tl{width:460px;height:300px}
.lb-ribbon-br{width:520px;height:400px}
.lb-mascot-left{left:28px;top:59%}
.lb-mascot-right{right:28px;top:58%}
.lb-mascot-left img{width:240px!important;height:auto!important}
.lb-mascot-right img{width:210px!important;height:auto!important}
.lb-content{max-width:940px;gap:46px}
.lb-title-img{max-width:600px}
.lb-scroll{padding:60px 32px}
.lb-rod{width:120%;height:90px}
.lb-scroll-inner{gap:20px;padding:24px 24px 20pt}
.lb-scroll{padding:70px 32px}
@media(min-width:1400px){
.lb-page{padding-top:156px}
.lb-mascot-left{left:70px;top:58%}
.lb-mascot-right{right:70px;top:57%}
.lb-mascot-left img{width:300px!important;height:auto!important}
.lb-mascot-right img{width:260px!important;height:auto!important}
}
@media(max-width:400px){
.lb-page{padding:142px 8px 44px}
.lb-back{left:18px;top:88px}
.lb-ribbon-tl{width:220px;height:150px}
.lb-ribbon-br{width:240px;height:190px}
.lb-content{gap:34px}
.lb-title-img{width:95%;max-width:330px}
.lb-scroll{padding:30px 8px}
.lb-rod{width:112%;height:40px}
.lb-scroll-inner{gap:10px;padding:10px 4px 20pt}
.lb-feature{flex-direction:column;gap:10px;margin:4px 0 16px}
.lb-feature-mascot{display:none}
.lb-feature .lb-feature-mascot{display:none}
.lb-rank-list{gap:12px}
.lb-rank-row{height:76px;grid-template-columns:48px minmax(0,1fr) 104px;border-radius:10px}
.lb-rank-number{font-size:24px}
.lb-rank-name{padding:0 10px;font-size:15px}
.lb-rank-votes:before{right:10px;width:64px;height:24px}
.lb-rank-lotus{width:54px}
.lb-rank-votes span{font-size:9px;margin-left:-2px;margin-right:8px}
}
            `}</style>
        </main>
    );
}
