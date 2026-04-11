"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    num: "01",
    title: "DISCOVERY",
    desc: "We learn your business inside out. Goals, competitors, audience, pain points. No assumptions.",
    detail: "Commercial audit · Competitor analysis · Conversion architecture · Sitemap planning"
  },
  {
    num: "02",
    title: "STRATEGY",
    desc: "We define exactly what we're building, why, and how it connects to your revenue goals.",
    detail: "Keyword mapping · User journey design · Technical specification · Content architecture"
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Hand-coded in Next.js. Tested on real devices. Deployed to staging for your review.",
    detail: "Figma to code · GSAP animations · CMS integration · Performance optimisation"
  },
  {
    num: "04",
    title: "LAUNCH & SCALE",
    desc: "Go live on Vercel's edge network. Then we optimise, iterate, and scale what works.",
    detail: "Analytics setup · CRO tracking · Monthly reporting · Ongoing support"
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    // Only use horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      tl.to(track, {
        x: -totalWidth,
        ease: "none",
      });

      // Progress bar
      if (progressRef.current) {
        tl.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
        }, 0);
      }

      return () => {
        tl.kill();
      };
    });

    // Mobile: standard reveal
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".process-card") as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
            delay: i * 0.1
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] relative z-10 overflow-hidden">
      {/* Progress bar (desktop only) */}
      <div className="hidden md:block fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none" style={{ display: "none" }}>
        <div ref={progressRef} className="h-full bg-[#C8F135] origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* Header (always visible at top) */}
      <div className="px-[var(--gutter)] pt-[var(--section-gap)] pb-12 max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-6">
          [ THE PROCESS ]
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F5F5F0] leading-[0.95]">
          Four phases.<br /><span className="text-[#6B6B6B]">Zero guesswork.</span>
        </h2>
      </div>

      {/* Horizontal scroll track (desktop) / Vertical stack (mobile) */}
      <div ref={trackRef} className="flex md:flex-nowrap flex-wrap md:w-max w-full px-[var(--gutter)] pb-[var(--section-gap)] gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="process-card flex-none w-full md:w-[420px] bg-[#111111] border border-[#1E1E1E] p-10 flex flex-col gap-6 hover:border-[#C8F135] transition-colors duration-500 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-body)] text-[#C8F135] text-[11px] uppercase tracking-widest">{step.num}</span>
              <div className="w-8 h-[1px] bg-[#1E1E1E] group-hover:bg-[#C8F135] group-hover:w-16 transition-all duration-500" />
            </div>
            
            <h3 className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">
              {step.title}
            </h3>
            
            <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed flex-1">
              {step.desc}
            </p>
            
            <div className="pt-4 border-t border-[#1E1E1E]">
              <p className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
