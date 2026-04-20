import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import "./globals.css";
import Header from "./components/Header";

const efcoBrookshire = localFont({
  src: "../public/fonts/EFCO-Brookshire-Regular.ttf",
  variable: "--font-efco-brookshire",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Cultural Festival",
  description: "Culfest Web 2026",
  icons: {
    icon: "/images/logo-culfest.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${efcoBrookshire.variable} ${merriweather.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
