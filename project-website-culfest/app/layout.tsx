import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const efcoBrookshire = localFont({
  src: '../public/fonts/EFCO-Brookshire-Regular.ttf',
  variable: '--font-efco-brookshire',
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
        className={`${efcoBrookshire.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
