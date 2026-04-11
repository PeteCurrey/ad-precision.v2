"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { caseStudies } from "@/data/case-studies";
import TransitionLink from "@/components/ui/TransitionLink";

const allServices = Array.from(new Set(caseStudies.flatMap(cs => cs.services))).sort();

export default function WorkClient() {
  const [filter, setFilter] = useState("ALL");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "ALL"
    ? caseStudies
    : caseStudies.filter(cs => cs.services.includes(filter));

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".work-card");
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
    );
  }, [filter]);

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[65svh] flex flex-col justify-center pt-40 pb-16 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">
          [ OUR WORK ]
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 7vw, 100px)" }}>
          Real projects.<br /><span className="text-[#6B6B6B]">Real results.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed max-w-[500px]">
          Every project below drove measurable commercial outcomes. No vanity metrics. No hypothetical results.
        </p>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div className="sticky top-16 z-20 bg-[#0A0A0A]/90 backdrop-blur border-y border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-4 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("ALL")}
            className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${filter === "ALL" ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "border-[#1E1E1E] text-[#6B6B6B] hover:border-[#C8F135]"}`}
          >
            ALL
          </button>
          {allServices.map(svc => (
            <button
              key={svc}
              onClick={() => setFilter(svc)}
              className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${filter === svc ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "border-[#1E1E1E] text-[#6B6B6B] hover:border-[#C8F135]"}`}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      {/* ─── PROJECT GRID ─── */}
      <div ref={gridRef} className="max-w-[1400px] mx-auto px-[var(--gutter)] py-16 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
        {filtered.map((cs, i) => (
          <TransitionLink
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className={`work-card group bg-[#111111] border border-[#1E1E1E] hover:border-[#C8F135] transition-all duration-500 p-8 md:p-10 flex flex-col gap-6 ${i === 0 ? "md:col-span-2" : ""}`}
            data-cursor-text="VIEW →"
          >
            {/* Top row: label */}
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{cs.services.join(" · ")}</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] ml-auto">{cs.year}</span>
            </div>

            {/* Client name */}
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[28px] md:text-[36px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors leading-tight">
              {cs.client}
            </h2>

            {/* Tagline */}
            <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed max-w-[500px]">
              {cs.tagline}
            </p>

            {/* Key metrics */}
            <div className="flex gap-6 mt-auto pt-4 border-t border-[#1E1E1E]">
              {cs.results.slice(0, 3).map(r => (
                <div key={r.label} className="flex flex-col gap-0.5">
                  <span className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#C8F135]">{r.metric}</span>
                  <span className="font-[family-name:var(--font-body)] text-[9px] text-[#6B6B6B] uppercase tracking-widest">{r.label}</span>
                </div>
              ))}
            </div>
          </TransitionLink>
        ))}

        {/* Phantom "Start Your Project" card */}
        <TransitionLink
          href="/start-a-project"
          className="work-card group bg-[#0A0A0A] border-2 border-dashed border-[#1E1E1E] hover:border-[#C8F135] transition-colors p-8 md:p-10 flex flex-col items-center justify-center gap-4 min-h-[300px]"
        >
          <span className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors">YOUR PROJECT</span>
          <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest">COULD BE HERE →</span>
        </TransitionLink>
      </div>
    </main>
  );
}
