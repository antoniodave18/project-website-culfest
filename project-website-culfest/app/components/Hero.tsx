'use client';

import { useState } from 'react';
import Image from 'next/image';

type HeroProps = {
	onRevealScroll: () => void;
};

export default function Hero({ onRevealScroll }: HeroProps) {
	const [chestOpen, setChestOpen] = useState(false);
	const [bgChanged, setBgChanged] = useState(false);

	const handleChestClick = () => {
		if (chestOpen) {
			return;
		}

		setChestOpen(true);
		setTimeout(() => setBgChanged(true), 300);
		setTimeout(() => onRevealScroll(), 700);
	};

	return (
		<section className="relative w-full h-screen overflow-hidden">
			<Image
				src="/images/beranda/bg.png"
				alt="background"
				fill
				sizes="100vw"
				className="object-cover z-0 transition-opacity duration-700"
				style={{ opacity: bgChanged ? 0 : 1 }}
				priority
			/>

			<div className="absolute inset-0 z-1 bg-linear-to-b from-black/40" />

			<div
				className="absolute inset-0 z-1 transition-opacity duration-700"
				style={{
					opacity: bgChanged ? 1 : 0,
					background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0a0500 100%)',
				}}
			/>

			<div className="absolute top-0 w-full z-3">
				<Image
					src="/images/beranda/tirai-atas.png"
					alt="tirai atas"
					width={1920}
					height={300}
					className="w-full object-cover"
				/>
			</div>

			<div
				className="absolute -bottom-1 right-0 w-[110%] z-2 animate-waveFloat transition-opacity duration-500"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<Image
					src="/images/beranda/wave.png"
					alt="wave"
					width={1920}
					height={300}
					className="object-cover"
				/>
			</div>

			<div
				className="absolute w-1/3 h-3/5 z-3 animate-sway transition-opacity duration-500 max-sm:hidden"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<Image
					src="/images/beranda/songket-kiri.png"
					alt="songket kiri"
					fill
					sizes="(max-width: 768px) 50vw, 33vw"
					className="object-fill"
				/>
			</div>

			<div
				className="absolute top-0 right-0 w-1/3 h-3/5 z-3 animate-swayReverse transition-opacity duration-500 max-sm:hidden"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<Image
					src="/images/beranda/songket-kanan.png"
					alt="songket kanan"
					fill
					sizes="(max-width: 768px) 50vw, 33vw"
					className="object-fill"
				/>
			</div>

			<div
				className="absolute -left-20 top-40 z-4 animate-cloudLeft transition-opacity duration-500"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<Image
					src="/images/beranda/awan.png"
					alt="cloud left"
					width={320}
                    height={100}
					className="object-fill"
				/>
			</div>

			<div
				className="absolute top-30 -right-15 h-30 w-50 z-4 animate-cloudRight transition-opacity duration-500"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<Image
					src="/images/beranda/awan.png"
					alt="cloud right"
					width={245}
                    height={100}
					className="object-fill"
				/>
			</div>

			<div
				className="absolute top-[8%] left-1/2 -translate-x-1/2 z-5 text-center transition-opacity duration-500"
				style={{ opacity: bgChanged ? 0 : 1 }}
			>
				<h1 className="text-5xl text-yellow-400 drop-shadow-lg tracking-wide">Cultural Festival</h1>
			</div>

			<div
				onClick={handleChestClick}
				className={`
					absolute left-1/2 -translate-x-1/2
					z-6 w-2/3 h-2/3
					transition-all duration-700
					${!chestOpen ? 'cursor-pointer hover:scale-105 top-1/2 -translate-y-1/2' : 'top-[10%] translate-y-0 w-[320px] h-70'}
				`}
			>
				<Image
					src={chestOpen ? '/images/beranda/chest-open.png' : '/images/beranda/chest-close.png'}
					alt="chest"
					fill
					sizes="(max-width: 768px) 66vw, 320px"
					className="object-contain"
				/>
			</div>

			{!chestOpen && (
				<p
					className="
						absolute bottom-[8%] left-1/2 -translate-x-1/2
						text-white/70 text-sm tracking-widest uppercase
						z-6 animate-pulse text-center
					"
				>
					Klik untuk membuka
				</p>
			)}
		</section>
	);
}