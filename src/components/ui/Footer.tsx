"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TransitionLink from "./TransitionLink";

const serviceLinks = [
  { name: "Web Design & Development", href: "/services/web-design-development" },
  { name: "AI Implementation", href: "/services/ai-implementation" },
  { name: "Search Engine Optimisation", href: "/services/seo" },
  { name: "Paid Advertising", href: "/services/paid-advertising" },
  { name: "Analytics & Data", href: "/services/analytics-data" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
  { name: "Start a Project", href: "/start-a-project" },
];

const locationLinks = [
  { name: "Chesterfield", href: "/chesterfield" },
  { name: "Sheffield", href: "/sheffield" },
  { name: "Nottingham", href: "/nottingham" },
  { name: "Derby", href: "/derby" },
  { name: "Leeds", href: "/leeds" },
  { name: "Manchester", href: "/manchester" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const cols = footerRef.current.querySelectorAll(".footer-col");

    const ctx = gsap.context(() => {
      gsap.fromTo(cols,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="w-full relative z-10 bg-[#0A0A0A] border-t border-[#1E1E1E]">
      
      {/* ─── CTA BAND ─── */}
      <div className="w-full border-b border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] text-[40px] md:text-[64px] leading-[0.9] -tracking-[0.03em]">
              READY TO <br className="hidden md:block" /><span className="text-[#C8F135]">TRANSCEND?</span>
            </h3>
            <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] max-w-[400px]">
              Let&apos;s build the technical infrastructure your ambition deserves.
            </p>
          </div>
          <TransitionLink
            href="/start-a-project"
            className="group relative bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase px-14 py-7 tracking-widest hover:bg-[#F5F5F0] transition-colors overflow-hidden"
            data-magnetic
          >
            <span className="relative z-10">START A PROJECT →</span>
          </TransitionLink>
        </div>
      </div>

      {/* ─── MAIN FOOTER GRID ─── */}
      <div className="w-full py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          
          {/* Col 1 — Brand */}
          <div className="footer-col flex flex-col gap-6">
            <TransitionLink href="/" className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#F5F5F0] tracking-[0.2em]" data-magnetic>
              AVORRIA
            </TransitionLink>
            <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed italic border-l border-[#C8F135] pl-6">
              Modern engineering <br/> for commercial gain.
            </p>
            <div className="flex flex-col gap-2 pt-4">
               <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">ESTABLISHED</span>
               <span className="font-[family-name:var(--font-display)] text-[13px] text-[#F5F5F0]">MMXIII · CHESTERFIELD UK</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-6">
              {["LinkedIn", "Twitter/X", "Instagram"].map(social => (
                <a 
                  key={social}
                  href="#" 
                  className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] hover:text-[#C8F135] transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4">CAPABILITIES</h4>
            {serviceLinks.map(link => (
              <TransitionLink 
                key={link.name}
                href={link.href} 
                className="font-[family-name:var(--font-display)] text-[14px] font-bold text-[#F5F5F0] hover:text-[#C8F135] transition-colors w-fit"
              >
                {link.name}
              </TransitionLink>
            ))}
          </div>

          {/* Col 3 — Company */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4">COMPANY</h4>
            {companyLinks.map(link => (
              <TransitionLink 
                key={link.name}
                href={link.href} 
                className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] hover:text-[#F5F5F0] transition-colors w-fit"
              >
                {link.name}
              </TransitionLink>
            ))}
          </div>

          {/* Col 4 — Regional */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4">LOCATIONS</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
               {locationLinks.map(link => (
                 <TransitionLink 
                   key={link.name}
                   href={link.href} 
                   className="font-[family-name:var(--font-display)] text-[13px] text-[#6B6B6B] hover:text-[#C8F135] transition-colors w-fit"
                 >
                   {link.name}
                 </TransitionLink>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="w-full border-t border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-center md:text-left">
            <p className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">
              © {new Date().getFullYear()} Avorria Limited
            </p>
            <div className="flex items-center gap-8">
              <TransitionLink href="/privacy" className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] hover:text-[#F5F5F0] transition-colors uppercase tracking-widest">Privacy</TransitionLink>
              <TransitionLink href="/terms" className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] hover:text-[#F5F5F0] transition-colors uppercase tracking-widest">Terms</TransitionLink>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.2em] hover:text-[#F5F5F0] transition-colors"
            data-magnetic
          >
            BACK TO TOP <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#C8F135] group-hover:border-[#F5F5F0] transition-colors">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
