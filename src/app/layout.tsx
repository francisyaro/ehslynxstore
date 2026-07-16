import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EHS LYNX AFRIK | Équipements de Métrologie & Hygiène Industrielle",
  description: "Distributeur officiel des marques SVANTEK, SENSIDYNE, SLATESAFETY, et OHD en Afrique de l'Ouest et du Centre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-blue selection:text-white font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
