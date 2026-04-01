import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/data/content";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#050000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["AI Engineer", "ML Engineer", "Next.js", "Portfolio", "Gaurav More"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-[#050000] text-[#ffe5e5] overflow-x-hidden selection:bg-red-600/30">
        <div className="noise-layer" />
        
        {/* Glow Effects - Rendered Server Side for initial paint performance */}
        <div className="fixed rounded-full blur-[120px] pointer-events-none z-0" 
          style={{ width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(220,38,38,0.25), transparent 70%)', top: '-10%', left: '-10%' }} 
        />
        <div className="fixed rounded-full blur-[120px] pointer-events-none z-0" 
          style={{ width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(239,68,68,0.20), transparent 70%)', bottom: '10%', right: '-8%' }} 
        />
        
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
