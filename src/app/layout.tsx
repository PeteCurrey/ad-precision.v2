import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avorria | The Architects of Attention",
  description: "We build digital weapons. Premium web design, AI implementation, SEO and paid media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050508]">
      <body className={`${syne.variable} ${dmMono.variable} antialiased`}>
        <SmoothScroll>
          <Cursor />
          
          {/* Transition Overlays */}
          <div 
            id="transition-overlay" 
            className="fixed inset-0 bg-[#050508] z-[9990] pointer-events-none" 
            style={{ clipPath: "inset(100% 0 0 0)" }} 
          />
          <div 
            id="transition-bar" 
            className="fixed bottom-0 left-0 w-full h-1 bg-[#C8F135] z-[9991] origin-left pointer-events-none" 
            style={{ transform: "scaleX(0)" }} 
          />
          
          <Nav />
          
          <main className="flex-1 w-full min-h-screen">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
