"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const testimonials = [
  { text: "Avorria didn't just redesign our site, they completely rebuilt our digital acquisition pipeline. Organic traffic is up 312% in six months.", name: "MARCUS CHEN", company: "NEXUS REAL ESTATE" },
  { text: "The first agency we've worked with that actually understands performance. The Next.js stack they built is flawlessly fast.", name: "SARAH JENKINS", company: "AURALIGHT LTD" },
  { text: "No fluff, no vanity metrics. They came in, tore down our old Shopify setup, and built a custom front-end that doubled our conversion rate.", name: "DAVID O'CONNOR", company: "TERRA FIRMA GEAR" }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray(".testimonial-card") as HTMLElement[];

    let ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, rotation: -1, opacity: 0 },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
            delay: i * 0.15
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#050508] py-[var(--section-gap)] relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col items-center">
        
        <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="testimonial-card flex-none w-[85vw] md:w-auto bg-[#0E0E13] border border-[#222228] p-10 relative snap-center"
            >
              {/* Giant Accent Quote */}
              <div className="absolute top-4 left-4 font-[family-name:var(--font-display)] font-bold text-[80px] text-[#C8F135] opacity-30 leading-none select-none pointer-events-none">
                &ldquo;
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <p className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] leading-[1.8] mb-12">
                  {t.text}
                </p>

                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F2F2F0]">
                    {t.name}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] tracking-widest uppercase">
                    {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
