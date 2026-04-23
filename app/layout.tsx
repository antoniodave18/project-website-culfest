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

const siteName = "Cultural Festival";
const rawSiteDescription =
  "Cultural Festival adalah acara tahunan UGM Residence bertema Unity in Diversity yang menampilkan seni, budaya, dan kompetisi interaktif Nusantara.";
const siteDescription = rawSiteDescription.slice(0, 160);
const siteUrl = "https://culturalfestivalugmr.id/";
const previewImage = "/images/logo-culfest.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  other: {
    title: siteName,
  },
  icons: {
    icon: "/images/logo-culfest.png",
  },
  openGraph: {
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    type: "website",
    images: [
      {
        url: previewImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [previewImage],
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
