"use client";

import { useState } from "react";
import Link from "next/link";
import TransitionLink from "@/components/ui/TransitionLink";

import { insights, ResourceType } from "@/lib/seo-data";

const typeColors: Record<string, string> = {
  blog: "#6B6B72",
  guide: "#C8F135",
  report: "#F135C8",
  webinar: "#35C8F1",
  tool: "#F1C835",
  all: "#F2F2F0",
};

export default function InsightsClient() {
  const [activeType, setActiveType] = useState<string>("all");

  const filtered = activeType === "all" ? insights : insights.filter(r => r.type === activeType);

  return (
    <main className="w-full bg-[#050508] min-h-screen">

      {/* HERO */}
      <section className="w-full min-h-[65svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ INSIGHTS & RESOURCES ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 7vw, 100px)" }}>
          Ideas, research,<br />guides, and tools<br /><span className="text-[#6B6B72]">worth your time.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed max-w-[500px]">
          11 years of lessons. Distilled into articles, guides, and tools we'd want someone to give us. No gated fluff, no lead-gen spam.
        </p>
      </section>

      {/* TYPE FILTER */}
      <div className="sticky top-0 z-20 bg-[#050508]/90 backdrop-blur border-y border-[#222228]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-4 flex flex-wrap gap-3">
          {["all", "blog", "guide", "report", "webinar", "tool"].map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              style={{ borderColor: activeType === t ? typeColors[t] : undefined, color: activeType === t ? typeColors[t] : undefined }}
              className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${activeType === t ? "" : "border-[#222228] text-[#6B6B72] hover:border-[#C8F135]"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(r => (
          <Link href={`/insights/${r.type.toLowerCase()}/${r.slug}`} key={r.slug}
            className="group bg-[#0A0A0F] border border-[#1A1A1F] p-7 flex flex-col gap-4 hover:border-[#C8F135]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest" style={{ color: typeColors[r.type] }}>{r.type}</span>
              {r.gated && <span className="font-[family-name:var(--font-body)] text-[9px] text-[#6B6B72] border border-[#333338] px-2 py-0.5 uppercase tracking-wider">GATED</span>}
              {r.readTime && <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72]">{r.readTime} read</span>}
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F2F2F0] group-hover:text-[#C8F135] transition-colors leading-tight">{r.title}</h2>
            <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] leading-relaxed flex-1">{r.desc}</p>
            <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1F]">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] border border-[#222228] px-2 py-0.5">{r.tag}</span>
              <span className="text-[#C8F135] text-[14px] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
