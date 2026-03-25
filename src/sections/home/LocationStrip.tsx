"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";

const locations = [
  "WEB DESIGN CHESTERFIELD", "WEB DESIGN SHEFFIELD", "WEB DESIGN NOTTINGHAM",
  "WEB DESIGN DERBY", "WEB DESIGN LEEDS", "WEB DESIGN MANCHESTER", 
  "SEO CHESTERFIELD", "AI AGENCY CHESTERFIELD", "DIGITAL MARKETING SHEFFIELD", 
  "PAID ADS NOTTINGHAM"
];

export default function LocationStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    // Auto-scroll loop (Opposite direction to Header Marquee)
    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(trackRef.current, 
      { xPercent: -50 },
      { xPercent: 0, ease: "none", duration: 40 }
    );

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
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
    <section ref={containerRef} className="w-full bg-[#050508] py-8 overflow-hidden flex items-center select-none relative z-10 border-t border-[#222228]">
      <div className="flex w-max gap-4" ref={trackRef}>
        {[...Array(2)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center gap-4 px-2">
            {locations.map((loc, idx) => (
              <TransitionLink 
                key={`${groupIdx}-${idx}`} 
                href={`/${loc.toLowerCase().replace(/ /g, '-')}`}
                className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest px-5 py-2.5 rounded-full border border-[#222228] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors duration-300"
                data-magnetic
              >
                {loc}
              </TransitionLink>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
