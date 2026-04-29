'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { VotingCard } from '../../components/VotingCard';

type Candidate = {
    id: string;
    name: string;
    imageUrl: string;
};

export default function VotePage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);

    const ITEMS_PER_PAGE = 6;

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(candidates.length / ITEMS_PER_PAGE);
    const paginatedCandidates = candidates.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    useEffect(() => {
        const votedFlag = localStorage.getItem('culfest_voted');
        if (votedFlag === 'true') {
            setHasVoted(true);
            setLoading(false);
            setStatusMessage('Tindakan Ditolak: Perangkat ini sudah pernah digunakan untuk voting.');
            return;
        }
        if (!token) {
            setLoading(false);
            setStatusMessage('Mohon maaf, tautan ini belum lengkap. Pastikan Anda masuk dengan scan ulang QR yang benar ya.');
            return;
        }
        const fetchCandidates = async () => {
            try {
                const res = await fetch('/api/candidates');
                const data = await res.json();
                if (data.success) setCandidates(data.data);
                else setStatusMessage('Gagal mengambil data kandidat.');
            } catch (err) {
                setStatusMessage('Terjadi kesalahan jaringan.');
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [token]);

    const openConfirmModal = () => { if (!selectedCandidateId) return; setShowConfirmModal(true); };

    const executeVote = async () => {
        setShowConfirmModal(false);
        setSubmitting(true);
        setStatusMessage('');
        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateId: selectedCandidateId, token })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('culfest_voted', 'true');
                setHasVoted(true);
                setStatusMessage('Terima kasih! Suara Anda telah berhasil direkam.');
            } else {
                setStatusMessage(data.message || 'Mohon maaf, suara Anda gagal tersimpan karena sedikit kendala.');
            }
        } catch (error) {
            setStatusMessage('Mohon maaf, sedang ada sedikit kendala. Silakan coba kembali atau scan ulang ya.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="vt-page">
            <div className="vt-bg"><Image src="/images/voting/bg.png" alt="" fill className="object-cover" priority /></div>

            {/* CORNER RIBBONS */}
            <div className="vt-ribbon vt-ribbon-tl">
                <Image src="/images/voting/pitapojokkiriatas.png" alt="" fill className="object-contain" style={{ objectPosition: 'top left' }} />
            </div>
            <div className="vt-ribbon vt-ribbon-br">
                <Image src="/images/voting/pitapojokkananbawa.png" alt="" fill className="object-contain" style={{ objectPosition: 'bottom right' }} />
            </div>

            {/* FLOWERS */}
            <div className="vt-flower vt-fl1"><Image src="/images/voting/bunga(1).png" alt="" width={60} height={60} /></div>
            <div className="vt-flower vt-fl2"><Image src="/images/voting/bunga(1).png" alt="" width={45} height={45} /></div>
            <div className="vt-flower vt-fl3"><Image src="/images/voting/bunga(1).png" alt="" width={50} height={50} /></div>
            <div className="vt-flower vt-fl4"><Image src="/images/voting/bunga(1).png" alt="" width={40} height={40} /></div>

            {/* MASCOTS */}
            <div className="vt-mascot vt-mascot-left">
                <Image src="/images/tentang/chileko.png" alt="Chileko" width={220} height={320} className="object-contain" />
            </div>
            <div className="vt-mascot vt-mascot-right">
                <Image src="/images/tentang/chitala.png" alt="Chitala" width={180} height={280} className="object-contain" />
            </div>

            {/* MAIN CONTENT */}
            <div className="vt-content">
                <div className="vt-title-wrap">
                    <Image src="/images/voting/tittlevoting.png" alt="Voting" width={500} height={150} className="vt-title-img" priority />
                </div>

                <div className="vt-scroll">
                    <div className="vt-rod vt-rod-top">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill" />
                    </div>
                    <div className="vt-scroll-inner hide-scrollbar">
                        {loading ? (
                            <div className="vt-status">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-800"></div>
                                <p className="text-yellow-900 font-bold animate-pulse">Menyiapkan surat suara...</p>
                            </div>
                        ) : (hasVoted || !token || statusMessage) ? (
                            <div className="vt-status">
                                <div className="text-6xl">{hasVoted ? '✅' : '❌'}</div>
                                <p className="text-yellow-900 font-bold text-xl md:text-2xl mt-4">Pemberitahuan</p>
                                <p className="text-yellow-900 font-medium leading-relaxed max-w-sm text-center">{statusMessage || 'Silakan coba scan ulang kembali ya.'}</p>
                            </div>
                        ) : (
                            <>
                                {paginatedCandidates.map((candidate) => {
                                    const globalIndex = candidates.findIndex(c => c.id === candidate.id);
                                    const isSelected = selectedCandidateId === candidate.id;
                                    return (
                                        <div key={candidate.id} className="vt-card-row">
                                            <div className={`vt-card-wrap ${isSelected ? 'vt-card-sel' : ''}`}>
                                                {isSelected && <div className="vt-card-glow"></div>}
                                                <VotingCard rank={globalIndex + 1} name={candidate.name} imageUrl={candidate.imageUrl || "/images/voting/teratai.png"} onClick={() => setSelectedCandidateId(candidate.id)} showVoteDecoration={false} />
                                            </div>
                                        </div>
                                    );
                                })}

                                {totalPages > 1 && (
                                    <div className="vt-pagination">
                                        <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className={`vt-page-btn ${currentPage === 0 ? 'vt-page-btn-off' : 'vt-page-btn-on'}`}>‹</button>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button key={i} onClick={() => setCurrentPage(i)} className={`vt-page-dot ${currentPage === i ? 'vt-page-dot-active' : ''}`}>{i + 1}</button>
                                        ))}
                                        <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1} className={`vt-page-btn ${currentPage === totalPages - 1 ? 'vt-page-btn-off' : 'vt-page-btn-on'}`}>›</button>
                                    </div>
                                )}

                                {candidates.length > 0 && (
                                    <div className="vt-konfirmasi">
                                        <button onClick={openConfirmModal} disabled={!selectedCandidateId || submitting} className={`vt-btn ${selectedCandidateId && !submitting ? 'vt-btn-on' : 'vt-btn-off'}`}>
                                            {submitting ? 'Mengirim Data...' : 'Konfirmasi'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="vt-rod vt-rod-bot">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill rotate-180" />
                    </div>
                </div>
            </div>

            {showConfirmModal && (
                <div className="vt-modal-overlay">
                    <div className="vt-modal-bg" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="vt-modal animate-fade-in-up">
                        <div className="vt-modal-icon"><span className="text-3xl">🤔</span></div>
                        <h3 className="vt-modal-title">Konfirmasi</h3>
                        <p className="vt-modal-text">Apakah kamu yakin menyalurkan suara untuk kandidat ini?<br /><span className="vt-modal-warn">Pilihan otomatis tersimpan dan tidak dapat diubah kembali.</span></p>
                        <div className="vt-modal-acts">
                            <button onClick={() => setShowConfirmModal(false)} className="vt-modal-cancel">Cek Lagi</button>
                            <button onClick={executeVote} className="vt-modal-ok">Yakin!</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
.vt-page{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:24px 16px}
.vt-bg{position:absolute;inset:0;z-index:0}
.vt-pagination{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px}
.vt-page-btn{width:36px;height:36px;border-radius:50%;border:2px solid #5c2408;background:transparent;color:#5c2408;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.vt-page-btn-on:hover{background:rgba(92,36,8,.15);transform:scale(1.1)}
.vt-page-btn-on:active{transform:scale(.9)}
.vt-page-btn-off{opacity:.3;cursor:not-allowed}
.vt-page-dot{width:32px;height:32px;border-radius:50%;border:2px solid #5c2408;background:transparent;color:#5c2408;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.vt-page-dot:hover{background:rgba(92,36,8,.1)}
.vt-page-dot-active{background:linear-gradient(to bottom,#6b1e06,#3a0600);color:#fff;border-color:#eab308;box-shadow:0 2px 8px rgba(0,0,0,.4)}
.vt-ribbon{position:absolute;z-index:1;pointer-events:none}
.vt-ribbon-tl{top:0;left:0;width:320px;height:200px}
.vt-ribbon-br{bottom:0;right:0;width:360px;height:280px}
.vt-flower{position:absolute;z-index:3;pointer-events:none;animation:floatF 4s ease-in-out infinite}
.vt-fl1{top:5%;right:7%;animation-delay:0s}
.vt-fl2{top:40%;left:2%;animation-delay:1s}
.vt-fl3{top:50%;right:3%;animation-delay:2s}
.vt-fl4{bottom:7%;left:5%;animation-delay:.5s}
@keyframes floatF{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(5deg)}}
.vt-mascot{position:absolute;z-index:4;pointer-events:none;filter:drop-shadow(0 18px 24px rgba(0,0,0,.35))}
.vt-mascot-left{left:-20px;top:50%;transform:translateY(-50%)}
.vt-mascot-right{right:-10px;top:50%;transform:translateY(-50%)}
.vt-content{position:relative;z-index:5;display:flex;flex-direction:column;align-items:center;width:100%;max-width:650px;gap:28px}
.vt-title-wrap{z-index:10;width:100%;display:flex;justify-content:center}
.vt-title-img{width:80%;max-width:460px;height:auto;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.5))}
.vt-scroll{position:relative;width:100%;background:linear-gradient(to bottom,#EF9E1E,#F7C063,#EF9E1E);box-shadow:0 0 50px rgba(0,0,0,.8);padding:40px 16px;margin-bottom:20pt}
.vt-rod{position:absolute;left:50%;transform:translateX(-50%);width:115%;height:55px;z-index:20;pointer-events:none}
.vt-rod-top{top:0;transform:translateX(-50%) translateY(-50%)}
.vt-rod-bot{bottom:0;transform:translateX(-50%) translateY(50%)}
.vt-scroll-inner{overflow-y:auto;width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;padding:16px 8px 20pt}
.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
.vt-status{padding:60px 16px;display:flex;flex-direction:column;align-items:center;gap:16px}
.vt-card-row{width:100%;max-width:560px;display:flex;justify-content:center}
.vt-card-wrap{width:100%;border-radius:12px;transition:all .3s;position:relative;z-index:30}
.vt-card-sel{box-shadow:0 0 40px rgba(255,183,3,1);transform:scale(1.04);outline:3px solid #ffb703;border-radius:12px}
.vt-card-glow{position:absolute;inset:0;background:linear-gradient(to right,rgba(255,183,3,.2),transparent,rgba(255,183,3,.2));pointer-events:none;z-index:20;border-radius:12px}
.vt-konfirmasi{margin-top:20pt;display:flex;justify-content:center;width:100%}
.vt-btn{padding:12px 40px;border-radius:12px;border:2px solid;font-family:serif;font-weight:700;font-size:18px;transition:all .2s}
.vt-btn-on{background:linear-gradient(to bottom,#6b1e06,#3a0600);color:#fff;border-color:#eab308;box-shadow:0 4px 10px rgba(0,0,0,.5);cursor:pointer}
.vt-btn-on:hover{transform:scale(1.05)}.vt-btn-on:active{transform:scale(.95)}
.vt-btn-off{background:#5e382d;color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.2);cursor:not-allowed;filter:grayscale(1)}
.vt-modal-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}
.vt-modal-bg{position:absolute;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px)}
.vt-modal{position:relative;width:100%;max-width:380px;background:linear-gradient(135deg,#f8d998,#e8b55d);border:4px solid #5c2408;border-radius:24px;box-shadow:0 10px 50px rgba(0,0,0,.8);padding:24px;text-align:center}
.vt-modal-icon{width:64px;height:64px;margin:0 auto 16px;background:linear-gradient(to bottom,#6b1e06,#3a0600);border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(234,179,8,.5)}
.vt-modal-title{font-size:24px;font-family:serif;font-weight:900;color:#4a1c05;margin-bottom:12px}
.vt-modal-text{color:#642b0d;font-weight:500;margin-bottom:28px;line-height:1.6;font-size:14px}
.vt-modal-warn{color:#8c1717;font-weight:700;font-size:12px}
.vt-modal-acts{display:flex;gap:12px}
.vt-modal-cancel{flex:1;padding:12px;border-radius:12px;border:2px solid #5c2408;color:#5c2408;font-weight:700;background:transparent;cursor:pointer;transition:all .2s}
.vt-modal-cancel:hover{background:rgba(92,36,8,.1)}.vt-modal-cancel:active{transform:scale(.95)}
.vt-modal-ok{flex:1;padding:12px;border-radius:12px;border:2px solid #eab308;background:linear-gradient(to bottom,#6b1e06,#3a0600);color:#fff;font-weight:700;cursor:pointer;transition:all .2s}
.vt-modal-ok:hover{filter:brightness(1.1)}.vt-modal-ok:active{transform:scale(.95)}
@keyframes fade-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.animate-fade-in-up{animation:fade-in-up .4s cubic-bezier(.16,1,.3,1) forwards}
.vt-mascot-left,.vt-mascot-right{display:none}
@media(min-width:768px){
.vt-page{padding:40px 32px}
.vt-ribbon-tl{width:400px;height:260px}
.vt-ribbon-br{width:440px;height:340px}
.vt-mascot-left,.vt-mascot-right{display:block}
.vt-mascot-left{left:-6px;top:60%}
.vt-mascot-right{right:-2px;top:58%}
.vt-mascot-left img{width:160px!important;height:auto!important}
.vt-mascot-right img{width:142px!important;height:auto!important}
.vt-content{max-width:700px;gap:24px}
.vt-title-img{max-width:500px}
.vt-scroll{padding:50px 24px}
.vt-rod{width:118%;height:75px}
.vt-scroll-inner{gap:18px;padding:20px 16px 20pt}
.vt-card-row{max-width:600px}
.vt-btn{font-size:20px;padding:14px 48px}
}
@media(min-width:1024px){
.vt-page{padding:48px}
.vt-ribbon-tl{width:460px;height:300px}
.vt-ribbon-br{width:520px;height:400px}
.vt-mascot-left,.vt-mascot-right{display:block}
.vt-mascot-left{left:28px;top:59%}
.vt-mascot-right{right:28px;top:58%}
.vt-mascot-left img{width:240px!important;height:auto!important}
.vt-mascot-right img{width:210px!important;height:auto!important}
.vt-content{max-width:750px;gap:28px}
.vt-title-img{max-width:540px}
.vt-scroll{padding:60px 32px}
.vt-rod{width:120%;height:90px}
.vt-scroll-inner{gap:20px;padding:24px 24px 20pt}
.vt-card-row{max-width:640px}
}
@media(min-width:1400px){
.vt-mascot-left{left:70px;top:58%}
.vt-mascot-right{right:70px;top:57%}
.vt-mascot-left img{width:300px!important;height:auto!important}
.vt-mascot-right img{width:260px!important;height:auto!important}
}
@media(max-width:400px){
.vt-page{padding:16px 8px}
.vt-ribbon-tl{width:220px;height:150px}
.vt-ribbon-br{width:240px;height:190px}
.vt-content{gap:20px}
.vt-title-img{width:95%;max-width:300px}
.vt-scroll{padding:30px 8px}
.vt-rod{width:112%;height:40px}
.vt-scroll-inner{gap:10px;padding:10px 4px 20pt}
.vt-btn{font-size:15px;padding:10px 32px}
}
            `}</style>
        </main>
    );
}
