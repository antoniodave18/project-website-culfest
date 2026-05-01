'use client';

import Image from 'next/image';
import NavActionButton from '../components/NavActionButton';
import InteractiveMapComponent from './InteractiveMapComponent';

export default function MapPage() {
    return (
        <main className="mp-page">
            <div className="mp-bg" />
            <Image src="/images/voting/border.png" alt="" fill priority className="mp-frame" />

            <div className="mp-back">
                <NavActionButton href="/home" label="Kembali" icon="←" iconPosition="left" />
            </div>

            {/* FLOWERS */}
            <div className="mp-flower mp-fl1"><Image src="/images/voting/bunga(1).png" alt="" width={66} height={66} /></div>
            <div className="mp-flower mp-fl2"><Image src="/images/voting/bunga(1).png" alt="" width={62} height={62} /></div>
            <div className="mp-flower mp-fl3"><Image src="/images/voting/bunga(1).png" alt="" width={58} height={58} /></div>
            <div className="mp-flower mp-fl4"><Image src="/images/voting/bunga(1).png" alt="" width={60} height={60} /></div>
            <div className="mp-flower mp-fl5"><Image src="/images/voting/bunga(1).png" alt="" width={58} height={58} /></div>
            <div className="mp-flower mp-fl6"><Image src="/images/voting/bunga(1).png" alt="" width={54} height={54} /></div>

            <section className="mp-stage">
                <div className="mp-curtain">
                    <Image src="/images/voting/bg-merah.png" alt="" fill className="object-fill" priority />
                </div>
                <div className="mp-ellipse">
                    <Image src="/images/voting/Ellipse 149.png" alt="" fill className="object-fill" />
                </div>

                <div className="mp-scroll">
                    <div className="mp-rod mp-rod-top">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill" />
                    </div>

                    <div className="mp-scroll-body">
                        <div className="mp-window">
                            <div className="mp-banner">PETA INTERAKTIF</div>

                            <div className="mp-inner-content">
                                <div className="mp-3d-frame">
                                    <div className="mp-3d-inner">
                                        <InteractiveMapComponent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mp-rod mp-rod-bot">
                        <Image src="/images/jelajah/asrama/Gulungan atas.png" alt="" fill className="object-fill rotate-180" />
                    </div>
                </div>
            </section>

            <style jsx global>{`
.mp-page{min-height:100vh;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#103b8f;padding:38px 18px}
.mp-bg{position:absolute;inset:0;background:#123f95;background-image:linear-gradient(135deg,rgba(255,255,255,.12) 12.5%,transparent 12.5%,transparent 50%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.12) 62.5%,transparent 62.5%,transparent);background-size:34px 34px;opacity:.72;z-index:0}
.mp-frame{z-index:12;object-fit:fill;pointer-events:none}
.mp-back{position:absolute;left:22px;top:22px;z-index:20}
.mp-stage{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center}
.mp-curtain{position:absolute;z-index:1;left:3.7%;right:3.7%;top:3.6%;bottom:6.2%;filter:drop-shadow(0 18px 26px rgba(0,0,0,.38))}
.mp-ellipse{position:absolute;z-index:2;left:9%;right:9%;bottom:5.8%;height:24%;filter:drop-shadow(0 0 14px rgba(255,255,160,.45));pointer-events:none}
.mp-scroll{position:relative;z-index:6;width:min(62vw,860px);min-width:310px}
.mp-scroll-body{position:relative;z-index:2;background:linear-gradient(to bottom,#EF9E1E,#F7C063,#EF9E1E);box-shadow:0 0 34px rgba(0,0,0,.55);padding:78px 48px}
.mp-scroll-body:after{content:"";position:absolute;inset:0;background-image:url('/images/voting/bg.png');background-size:400px auto;opacity:.1;pointer-events:none}
.mp-rod{position:absolute;left:50%;width:132%;height:82px;z-index:4;pointer-events:none}
.mp-rod-top{top:0;transform:translateX(-50%) translateY(-50%)}
.mp-rod-bot{bottom:0;transform:translateX(-50%) translateY(50%)}
.mp-window{position:relative;z-index:3;aspect-ratio:1/1;width:min(100%,500px);margin:0 auto;border:10px solid #f3c34b;border-radius:44px;background:#9b0400;background-image:url('/images/voting/bg-merah.png');background-size:520px auto;background-position:center;display:flex;align-items:center;justify-content:center;padding:72px 42px 42px;box-shadow:inset 0 0 56px rgba(255,205,96,.24),0 14px 28px rgba(0,0,0,.38);overflow:visible}
.mp-window:before{content:"";position:absolute;inset:8%;border-radius:34px;background:rgba(244,190,75,.32);filter:blur(18px)}
.mp-banner{position:absolute;z-index:5;top:28px;left:50%;transform:translateX(-50%);width:calc(100% + 26px);height:58px;display:flex;align-items:center;justify-content:center;background:linear-gradient(to bottom,#f7c46c,#d9902f);color:#8a1b09;font-size:28px;font-weight:900;letter-spacing:.4px;text-shadow:0 3px 0 rgba(255,227,120,.58),0 4px 6px rgba(0,0,0,.32);clip-path:polygon(0 0,8% 50%,0 100%,100% 100%,92% 50%,100% 0)}
.mp-inner-content{position:relative;z-index:4;width:100%;display:flex;flex-direction:column;align-items:center}
.mp-3d-frame{width:100%;max-width:350px;aspect-ratio:1/1;border-radius:20px;background:linear-gradient(to bottom,#e1bf61,#fcf9c4,#e1bf61);padding:6px;box-shadow:0 10px 24px rgba(0,0,0,.5)}
.mp-3d-inner{position:relative;width:100%;height:100%;overflow:hidden;border-radius:16px;background:#000}
.mp-flower{position:absolute;z-index:14;pointer-events:none;filter:drop-shadow(0 5px 3px rgba(0,0,0,.35));animation:mpFloat 4s ease-in-out infinite}
.mp-fl1{left:6%;top:27%}.mp-fl2{left:13%;top:41%;animation-delay:.8s}.mp-fl3{left:16%;bottom:27%;animation-delay:1.4s}.mp-fl4{right:13%;top:41%;animation-delay:.5s}.mp-fl5{right:18%;bottom:27%;animation-delay:1.2s}.mp-fl6{right:8%;bottom:18%;animation-delay:1.8s}
@keyframes mpFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(5deg)}}
@media(max-width:900px){
.mp-page{min-height:100svh;padding:124px 0 28px;background:#8d0500;overflow:hidden}
.mp-bg{display:none}
.mp-frame{display:none}
.mp-back{top:112px;left:18px;z-index:60}
.mp-stage{position:absolute;inset:0;align-items:center;overflow:hidden}
.mp-curtain{left:0;right:0;top:0;bottom:0;filter:none}
.mp-curtain img{object-fit:cover!important;object-position:center top!important}
.mp-ellipse{display:none}
.mp-scroll{width:min(88vw,520px);min-width:0;max-height:calc(100svh - 150px);margin-top:92px}
.mp-scroll-body{padding:58px 18px 50px}
.mp-rod{width:116%;height:54px}
.mp-window{width:min(100%,420px);border-width:7px;border-radius:30px;padding:50px 16px 24px}
.mp-banner{top:22px;height:40px;font-size:20px}
.mp-flower img{width:42px!important;height:auto!important}
.mp-3d-frame{max-width:min(68vw,300px)}
.mp-fl1{left:8%;top:18%}.mp-fl2{left:4%;top:42%}.mp-fl3{left:13%;bottom:20%}.mp-fl4{right:7%;top:42%}.mp-fl5{right:13%;bottom:20%}.mp-fl6{right:6%;bottom:11%}
}
@media(max-width:480px){
.mp-page{padding:116px 0 20px}
.mp-back{top:106px;left:20px}
.mp-stage{inset:0}
.mp-scroll{width:86vw;max-height:calc(100svh - 132px);margin-top:88px}
.mp-scroll-body{padding:46px 12px 42px}
.mp-rod{height:38px;width:114%}
.mp-window{border-width:6px;border-radius:24px;padding:40px 8px 18px}
.mp-window:before{inset:7%;border-radius:22px;filter:blur(12px)}
.mp-banner{top:20px;height:34px;font-size:14px;width:calc(100% + 18px)}
.mp-3d-frame{max-width:min(60vw,240px);border-radius:18px}
.mp-3d-inner{border-radius:14px}
.mp-flower img{width:34px!important}
.mp-fl1{left:7%;top:18%}.mp-fl2{left:5%;top:43%}.mp-fl3{left:16%;bottom:20%}.mp-fl4{right:6%;top:43%}.mp-fl5{right:16%;bottom:20%}.mp-fl6{right:7%;bottom:10%}
}
@media(max-width:380px){
.mp-scroll{width:88vw}
.mp-scroll-body{padding:42px 10px 38px}
.mp-window{padding:38px 7px 16px}
.mp-3d-frame{max-width:min(58vw,218px)}
.mp-banner{font-size:13px}
}
            `}</style>
        </main>
    );
}
