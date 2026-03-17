import type { Metadata } from "next";
import { Merriweather } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";

const efcoBrookshire = localFont({
  src: '../public/fonts/EFCO-Brookshire-Regular.ttf',
  variable: '--font-efco-brookshire',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
});


export const metadata: Metadata = {
  title: "Culfest Web 2025",
  description: "Culfest Web 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${efcoBrookshire.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
