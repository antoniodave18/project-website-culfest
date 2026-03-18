import type { Metadata } from "next";
import { Merriweather, Montserrat } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";

const efcoBrookshire = localFont({
  src: '../public/fonts/EFCO-Brookshire-Regular.ttf',
  variable: '--font-efco-brookshire',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
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
        className={`${efcoBrookshire.variable} ${merriweather.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
