"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/home/about-event", label: "Tentang Culfest" },
    { href: "/home/jelajah/ormada", label: "ORMADA" },
    { href: "/home/jelajah/asrama", label: "ASRAMA" },
    { href: "/home/voting", label: "VOTING" },
    { href: "/home/faq", label: "FAQ" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const pathname = usePathname();

    if (pathname === '/' || pathname === '/home/faq') {
        return null;
    }

    return (
        <header className="fixed left-1/2 top-5 z-50 w-[90%] md:w-[98%] rounded-2xl -translate-x-1/2 shadow-sm">
            <nav className="mx-auto flex rounded-2xl items-center justify-between px-4 py-3 border-amber-400 border lg:px-6"
                style={{ backgroundImage: 'url("/images/header/header-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Link href="/home" className="flex items-center gap-3">
                    <Image
                        src="/images/logo-culfest.png"
                        alt="logo"
                        width={70}
                        height={70}
                        preload
                        className="object-cover w-[25%] rounded-full"
                    />
                    <span className="text-white text-sm font-semibold">Cultural <br />Festival 15</span>
                </Link>

                <div className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white transition hover:text-orange-600"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="inline-flex items-center rounded-lg p-2 text-white transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 lg:hidden"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? (
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {isMobileMenuOpen && (
                <div className=" border-slate-200 bg-white mt-1 px-4 py-4 rounded-2xl lg:hidden">
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMobileMenu}
                                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-orange-50 hover:text-orange-700"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}