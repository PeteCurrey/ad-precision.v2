"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  "WEB DESIGN", "AI IMPLEMENTATION", "SEO", "PAID MEDIA", "NEXT.JS", 
  "REACT THREE FIBER", "ANALYTICS", "CONVERSION RATE OPTIMISATION", 
  "CHESTERFIELD", "SHEFFIELD", "NOTTINGHAM", "AWARD-WINNING", 
  "VERCEL", "SANITY", "GSAP", "TAILWIND", "WEBGL", "FIGMA TO CODE"
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    // Auto-scroll loop
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30
    });

    // Scroll-linked velocity & direction using ScrollTrigger
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Accelerate marquee based on scroll velocity (up or down)
          const velocity = Math.min(Math.max(self.getVelocity() / 100, -5), 5);
          gsap.to(tl, { timeScale: 1 + velocity, duration: 0.5, overwrite: true, onComplete: () => {
             gsap.to(tl, { timeScale: 1, duration: 0.5 });
          }});
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-[80px] bg-[#0E0E13] border-y border-[#222228] overflow-hidden flex items-center select-none relative z-10">
      <div className="flex w-max" ref={trackRef}>
        {[...Array(2)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center">
            {items.map((item, idx) => (
              <div key={`${groupIdx}-${idx}`} className="flex items-center font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] whitespace-nowrap">
                <span className="px-6">{item}</span>
                <span className="text-[#C8F135] font-bold text-lg leading-none transform translate-y-[-2px]">·</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
