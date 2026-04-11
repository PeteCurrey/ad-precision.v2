"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";
import { articles } from "@/data/articles-data";

const categories = ["ALL", "WEB DESIGN", "SEO", "AI", "PAID MEDIA"];

export default function InsightsClient() {
  const [filter, setFilter] = useState("ALL");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "ALL"
    ? articles
    : articles.filter(a => a.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".article-card");
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
    );
  }, [filter]);

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[60svh] flex flex-col justify-center pt-40 pb-16 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">
          [ INSIGHTS & RESOURCES ]
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 7vw, 120px)" }}>
          Ideas, data,<br /><span className="text-[#6B6B6B]">& strategies.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed max-w-[500px]">
          11 years of architectural failures and hard-won victories. Distilled into guides worth your attention.
        </p>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div className="sticky top-16 z-20 bg-[#0A0A0A]/90 backdrop-blur border-y border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-4 flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${filter === cat ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "border-[#1E1E1E] text-[#6B6B6B] hover:border-[#C8F135]"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── ARTICLE GRID ─── */}
      <div ref={gridRef} className="max-w-[1400px] mx-auto px-[var(--gutter)] py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <TransitionLink
            key={a.slug}
            href={`/insights/${a.slug}`}
            className="article-card group bg-[#111111] border border-[#1E1E1E] hover:border-[#C8F135] transition-all duration-500 p-8 flex flex-col gap-6"
            data-cursor-text="READ →"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{a.category}</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B]">{a.readTime} read</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors leading-tight">
              {a.title}
            </h2>

            <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed flex-1">
              {a.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-[#1E1E1E]">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{a.date}</span>
              <span className="font-[family-name:var(--font-display)] text-[20px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors">→</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </main>
  );
}
