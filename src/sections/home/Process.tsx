"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const steps = [
  { num: "01", title: "DISCOVERY", desc: "We learn your business, your competitors, and your customers." },
  { num: "02", title: "DESIGN", desc: "Figma wireframes, motion concepts, and client-approved before a line of code." },
  { num: "03", title: "BUILD", desc: "Next.js, hand-coded, deployed to Vercel in weeks not months." },
  { num: "04", title: "GROW", desc: "SEO, paid media, analytics, CRO. The launch is just day one." },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray(".process-card") as HTMLElement[];

    let ctx = gsap.context(() => {
      // 1 from left, 2 below, 3 below, 4 from right
      const directions = [
        { x: -100, y: 0 },
        { x: 0, y: 100 },
        { x: 0, y: 100 },
        { x: 100, y: 0 }
      ];

      cards.forEach((card, i) => {
        gsap.fromTo(card, 
          { x: directions[i].x, y: directions[i].y, opacity: 0 },
          { 
            x: 0, 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
            delay: i * 0.1
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#F2F2F0] py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
          
          {/* Decorative central line connecting them on desktop */}
          <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-[#D4D4D0] z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="process-card flex flex-col relative z-10">
              <div className="font-[family-name:var(--font-display)] font-bold text-[80px] text-[#E8E8E6] leading-none mb-[-20px] select-none pointer-events-none relative z-0">
                {step.num}
              </div>
              <div className="relative z-10 border-t md:border-t-0 md:pt-0 pt-6 border-[#D4D4D0]">
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[32px] text-[#050508] mb-4">
                  {step.title}
                </h4>
                <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B72] leading-relaxed max-w-[260px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
