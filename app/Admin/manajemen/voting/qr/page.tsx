'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NavActionButton from '../../../../home/components/NavActionButton';

export default function QRGeneratorPage() {
    const [token, setToken] = useState<string | null>(null);
    const [expiresAt, setExpiresAt] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [originUrl, setOriginUrl] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const voteUrl = token && originUrl ? `${originUrl}/vote/${token}` : '';
    const qrImageSrc = voteUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(voteUrl)}` : '';

    const generateNewQR = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/voting-tokens', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                const nextExpiresAt = new Date(data.data.expiresAt);
                setToken(data.data.token);
                setExpiresAt(nextExpiresAt);
                setTimeLeft(Math.max(0, Math.floor((nextExpiresAt.getTime() - Date.now()) / 1000)));
            } else {
                alert('Gagal menghasilkan QR: ' + data.message);
            }
        } catch {
            alert('Kesalahan jaringan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setOriginUrl(window.location.origin);
    }, []);

    useEffect(() => {
        if (!originUrl || token || loading) return;
        generateNewQR();
    }, [originUrl, token, loading]);

    useEffect(() => {
        if (!expiresAt || timeLeft <= 0) {
            if (token && timeLeft <= 0 && !loading) {
                generateNewQR();
            }
            return;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
            setTimeLeft(remaining);
            if (remaining === 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt, timeLeft, token, loading]);

    return (
        <main className="qr-page">
            <div className="qr-bg" />
            <Image src="/images/voting/border.png" alt="" fill priority className="qr-frame" />

            <div className="qr-back">
                <NavActionButton href="/Admin/manajemen/voting" label="Kembali" icon="←" iconPosition="left" />
            </div>

            <div className="qr-flower qr-fl1"><Image src="/images/voting/bunga(1).png" alt="" width={66} height={66} /></div>
            <div className="qr-flower qr-fl2"><Image src="/images/voting/bunga(1).png" alt="" width={62} height={62} /></div>
            <div className="qr-flower qr-fl3"><Image src="/images/voting/bunga(1).png" alt="" width={58} height={58} /></div>
            <div className="qr-flower qr-fl4"><Image src="/images/voting/bunga(1).png" alt="" width={60} height={60} /></div>
            <div className="qr-flower qr-fl5"><Image src="/images/voting/bunga(1).png" alt="" width={58} height={58} /></div>
            <div className="qr-flower qr-fl6"><Image src="/images/voting/bunga(1).png" alt="" width={54} height={54} /></div>

            <section className="qr-stage">
                <div className="qr-curtain">
                    <Image src="/images/voting/bg-merah.png" alt="" fill className="object-fill" priority />
                </div>
                <div className="qr-ellipse">
                    <Image src="/images/voting/Ellipse 149.png" alt="" fill className="object-fill" />
                </div>

                <div className="qr-scroll">
                    <div className="qr-rod qr-rod-top">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill" />
                    </div>

                    <div className="qr-scroll-body">
                        <div className="qr-window">
                            <div className="qr-banner">SCAN QR BERIKUT!</div>

                            {qrImageSrc ? (
                                <button
                                    type="button"
                                    className="qr-code"
                                    onClick={() => setIsFullscreen(true)}
                                    title="Klik untuk memperbesar QR"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={qrImageSrc} alt="QR Code" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={generateNewQR}
                                    disabled={loading}
                                    className="qr-start"
                                >
                                    {loading ? 'Membuat QR...' : 'Mulai QR'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="qr-rod qr-rod-bot">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill rotate-180" />
                    </div>
                </div>
            </section>

            {isFullscreen && token && (
                <button
                    type="button"
                    className="qr-fullscreen"
                    onClick={() => setIsFullscreen(false)}
                    aria-label="Tutup QR besar"
                >
                    <span className="qr-fullscreen-card">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrImageSrc} alt="QR Code Besar" />
                    </span>
                </button>
            )}

            <style jsx global>{`
.qr-page{min-height:100vh;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#103b8f;padding:38px 18px}
.qr-bg{position:absolute;inset:0;background:#123f95;background-image:linear-gradient(135deg,rgba(255,255,255,.12) 12.5%,transparent 12.5%,transparent 50%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.12) 62.5%,transparent 62.5%,transparent);background-size:34px 34px;opacity:.72;z-index:0}
.qr-frame{z-index:12;object-fit:fill;pointer-events:none}
.qr-back{position:absolute;left:22px;top:22px;z-index:20}
.qr-stage{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center}
.qr-curtain{position:absolute;z-index:1;left:3.7%;right:3.7%;top:3.6%;bottom:6.2%;filter:drop-shadow(0 18px 26px rgba(0,0,0,.38))}
.qr-ellipse{position:absolute;z-index:2;left:9%;right:9%;bottom:5.8%;height:24%;filter:drop-shadow(0 0 14px rgba(255,255,160,.45));pointer-events:none}
.qr-scroll{position:relative;z-index:6;width:min(58vw,820px);min-width:310px}
.qr-scroll-body{position:relative;z-index:2;background:linear-gradient(to bottom,#EF9E1E,#F7C063,#EF9E1E);box-shadow:0 0 34px rgba(0,0,0,.55);padding:78px 72px}
.qr-scroll-body:after{content:"";position:absolute;inset:0;background-image:url('/images/voting/bg.png');background-size:400px auto;opacity:.1;pointer-events:none}
.qr-rod{position:absolute;left:50%;width:132%;height:82px;z-index:4;pointer-events:none}
.qr-rod-top{top:0;transform:translateX(-50%) translateY(-50%)}
.qr-rod-bot{bottom:0;transform:translateX(-50%) translateY(50%)}
.qr-window{position:relative;z-index:3;aspect-ratio:1/1;width:min(100%,500px);margin:0 auto;border:10px solid #f3c34b;border-radius:44px;background:#9b0400;background-image:url('/images/voting/bg-merah.png');background-size:520px auto;background-position:center;display:flex;align-items:center;justify-content:center;padding:72px 42px 42px;box-shadow:inset 0 0 56px rgba(255,205,96,.24),0 14px 28px rgba(0,0,0,.38);overflow:visible}
.qr-window:before{content:"";position:absolute;inset:8%;border-radius:34px;background:rgba(244,190,75,.32);filter:blur(18px)}
.qr-banner{position:absolute;z-index:5;top:28px;left:50%;transform:translateX(-50%);width:calc(100% + 26px);height:58px;display:flex;align-items:center;justify-content:center;background:linear-gradient(to bottom,#f7c46c,#d9902f);color:#8a1b09;font-size:30px;font-weight:900;letter-spacing:.4px;text-shadow:0 3px 0 rgba(255,227,120,.58),0 4px 6px rgba(0,0,0,.32);clip-path:polygon(0 0,8% 50%,0 100%,100% 100%,92% 50%,100% 0)}
.qr-code{position:relative;z-index:4;background:#fff;border-radius:16px;padding:12px;box-shadow:0 4px 18px rgba(0,0,0,.28);transition:transform .2s}
.qr-code:hover{transform:scale(1.025)}
.qr-code img{display:block;width:min(42vw,330px);height:min(42vw,330px);object-fit:contain}
.qr-start{position:relative;z-index:4;border:2px solid #f0b83d;background:linear-gradient(to bottom,#7a2608,#3a0600);color:#fff;border-radius:999px;padding:13px 24px;font-weight:900;box-shadow:0 6px 14px rgba(0,0,0,.35)}
.qr-flower{position:absolute;z-index:14;pointer-events:none;filter:drop-shadow(0 5px 3px rgba(0,0,0,.35));animation:qrFloat 4s ease-in-out infinite}
.qr-fl1{left:6%;top:27%}.qr-fl2{left:13%;top:41%;animation-delay:.8s}.qr-fl3{left:16%;bottom:27%;animation-delay:1.4s}.qr-fl4{right:13%;top:41%;animation-delay:.5s}.qr-fl5{right:18%;bottom:27%;animation-delay:1.2s}.qr-fl6{right:8%;bottom:18%;animation-delay:1.8s}
@keyframes qrFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(5deg)}}
.qr-fullscreen{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;padding:24px;cursor:pointer}
.qr-fullscreen-card{display:block;background:#fff;border-radius:28px;padding:24px;box-shadow:0 0 80px rgba(255,255,255,.28)}
.qr-fullscreen-card img{display:block;width:min(82vw,600px);height:auto}
@media(max-width:900px){
.qr-page{padding:76px 14px 32px}
.qr-back{top:18px;left:18px}
.qr-stage{position:absolute;inset:0}
.qr-curtain{left:4.2%;right:4.2%;top:4%;bottom:6.5%}
.qr-ellipse{left:6%;right:6%;bottom:6%;height:22%}
.qr-scroll{width:min(78vw,620px)}
.qr-scroll-body{padding:62px 34px}
.qr-rod{width:132%;height:62px}
.qr-window{border-width:8px;border-radius:34px;padding:52px 18px 28px}
.qr-banner{top:22px;height:44px;font-size:22px}
.qr-code img{width:min(54vw,280px);height:min(54vw,280px)}
.qr-flower img{width:46px!important;height:auto!important}
}
@media(max-width:480px){
.qr-page{padding:74px 8px 24px}
.qr-stage{position:absolute;inset:0}
.qr-curtain{left:4.5%;right:4.5%;top:4.5%;bottom:7%}
.qr-ellipse{left:3%;right:3%;bottom:6.5%;height:20%}
.qr-scroll{width:86vw}
.qr-scroll-body{padding:48px 16px}
.qr-rod{height:44px}
.qr-window{border-width:7px;border-radius:26px;padding:44px 12px 22px}
.qr-banner{height:36px;font-size:16px}
.qr-code{border-radius:12px;padding:8px}
.qr-code img{width:min(64vw,210px);height:min(64vw,210px)}
.qr-fl1{left:4%;top:27%}.qr-fl2{left:8%;top:43%}.qr-fl3{left:14%;bottom:25%}.qr-fl4{right:7%;top:43%}.qr-fl5{right:13%;bottom:25%}.qr-fl6{right:5%;bottom:17%}
}
            `}</style>
        </main>
    );
}
