'use client';

import Image from 'next/image';

type VotingPortraitFrameProps = {
    imageSrc: string;
    imageAlt?: string;
    label?: string;
};

function VotingPortraitFrame({
    imageSrc,
    imageAlt = 'Foto kandidat',
    label = 'Kandidat',
}: VotingPortraitFrameProps) {
    return (
        <article className="vp-card">
            <div className="vp-frame">
                <div className="vp-photo">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="vp-photo-img"
                        sizes="(max-width: 768px) 86vw, 331px"
                        quality={100}
                        priority
                    />
                </div>

                <Image src="/images/voting/frame.png" alt="" fill className="vp-frame-img" priority />

                <div className="vp-title">
                    <Image src="/images/voting/tittle.png" alt="" fill className="object-fill" priority />
                    <span>{label}</span>
                </div>
            </div>
        </article>
    );
}

export default function TestPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#6e0f04] bg-[url('/images/voting/bg.png')] bg-cover px-4 py-12">
            <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col items-center justify-center gap-8">
                <VotingPortraitFrame
                    label="Contoh"
                    imageSrc="/images/voting/teratai.png"
                    imageAlt="Contoh gambar"
                />
            </div>

            <style jsx global>{`
.vp-card{position:relative;width:min(76vw,331px)}
.vp-title{position:absolute;left:50%;top:3.6%;z-index:30;width:88%;height:13.5%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;padding:0 12%;filter:drop-shadow(0 4px 5px rgba(0,0,0,.38))}
.vp-title span{position:relative;z-index:2;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#ffd064;font-family:serif;font-size:22px;font-weight:900;text-transform:uppercase;text-shadow:0 2px 4px rgba(0,0,0,.65)}
.vp-frame{position:relative;aspect-ratio:331/462;width:100%;border-radius:26px;overflow:hidden;filter:drop-shadow(0 18px 24px rgba(0,0,0,.55))}
.vp-frame-img{z-index:10;object-fit:contain;pointer-events:none}
.vp-photo{position:absolute;z-index:1;inset:0;overflow:hidden;background:#083058}
.vp-photo-img{object-fit:cover;object-position:center;image-rendering:auto;transform:translateZ(0)}
@media(max-width:480px){
.vp-card{width:min(86vw,331px)}
.vp-title span{font-size:19px}
}
            `}</style>
        </main>
    );
}
