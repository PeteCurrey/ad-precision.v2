"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { caseStudies } from "@/data/case-studies";
import TransitionLink from "@/components/ui/TransitionLink";

const displayedWork = caseStudies.slice(0, 4);

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".fw-line");
        gsap.fromTo(lines,
          { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          {
            y: "0%",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            stagger: 0.08,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true }
          }
        );
      }

      // Card stagger
      const cards = containerRef.current!.querySelectorAll(".fw-card");
      gsap.fromTo(cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%", once: true },
          delay: 0.3
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] py-[var(--section-gap)] relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div ref={titleRef}>
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-6">
              [ SELECTED WORK ]
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F5F5F0] leading-[0.95]">
              <div className="overflow-hidden pb-1"><div className="fw-line">Projects that</div></div>
              <div className="overflow-hidden pb-1"><div className="fw-line text-[#6B6B6B]">prove the point.</div></div>
            </h2>
          </div>
          <TransitionLink 
            href="/work" 
            className="font-[family-name:var(--font-body)] text-[12px] text-[#C8F135] uppercase tracking-widest hover:text-[#F5F5F0] transition-colors whitespace-nowrap"
            data-magnetic
          >
            VIEW ALL WORK →
          </TransitionLink>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedWork.map((cs) => (
            <TransitionLink
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="fw-card group bg-[#111111] border border-[#1E1E1E] hover:border-[#C8F135] transition-all duration-500 p-8 md:p-10 flex flex-col gap-6"
              data-cursor-text="VIEW →"
            >
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{cs.services.join(" · ")}</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors leading-tight">
                {cs.client}
              </h3>
              <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed">{cs.tagline}</p>
              <div className="flex gap-6 mt-auto pt-4 border-t border-[#1E1E1E]">
                {cs.results.slice(0, 2).map(r => (
                  <div key={r.label} className="flex flex-col gap-0.5">
                    <span className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#C8F135]">{r.metric}</span>
                    <span className="font-[family-name:var(--font-body)] text-[9px] text-[#6B6B6B] uppercase tracking-widest">{r.label}</span>
                  </div>
                ))}
              </div>
            </TransitionLink>
          ))}

          {/* Start Your Project card */}
          <TransitionLink
            href="/start-a-project"
            className="fw-card group bg-[#0A0A0A] border-2 border-dashed border-[#1E1E1E] hover:border-[#C8F135] transition-all duration-500 p-8 md:p-10 flex flex-col items-center justify-center gap-4 md:col-span-2"
          >
            <span className="font-[family-name:var(--font-display)] font-bold text-[36px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors">YOUR PROJECT →</span>
            <span className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B] uppercase tracking-widest group-hover:text-[#C8F135] transition-colors">COULD BE NEXT</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
