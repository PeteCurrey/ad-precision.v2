"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";
import TransitionLink from "@/components/ui/TransitionLink";

const businesses = [
  { id: "01", name: "AVORRIA", sector: "DIGITAL AGENCY", desc: "The agency built on real commercial experience.", url: "avorria.com" },
  { id: "02", name: "ENTIREFM", sector: "FACILITIES MANAGEMENT", desc: "UK FM company serving commercial and public sector clients.", url: "entirefm.com" },
  { id: "03", name: "ALKOTA", sector: "INDUSTRIAL", desc: "Building specialist industrial solutions.", url: "alkota.co.uk" },
  { id: "04", name: "BLOCKWASTE", sector: "WASTE MANAGEMENT", desc: "Premium waste collection and disposal solutions.", url: "blockwaste.co.uk" },
  { id: "05", name: "THE BATCH HOUSE", sector: "HOSPITALITY", desc: "Award-winning coffee and hospitality experience.", url: "thebatchhouse.co.uk" },
  { id: "06", name: "THE GLASS YARD", sector: "HOSPITALITY", desc: "Boutique events and hospitality venue.", url: "theglassyard.co.uk" },
  { id: "07", name: "TRAVIO", sector: "TECHNOLOGY", desc: "Next-generation travel and mobility platform.", url: "travio.co.uk" },
];

const values = [
  { num: "01", title: "COMMERCIAL FIRST", body: "We measure success in revenue, leads, and growth — not awards. Though we have a few of those too." },
  { num: "02", title: "TECHNICALLY UNCOMPROMISING", body: "98+ PageSpeed. Zero WordPress. Hand-coded Next.js on Vercel. We don't cut corners because corners show." },
  { num: "03", title: "RADICALLY TRANSPARENT", body: "You'll always know what we're doing, why, and what it's costing. No mystery invoices. No BS reporting." },
];

const approach = [
  { title: "REVENUE ARCHITECTURE", body: "Every site we build starts with a conversion architecture review. Where are visitors arriving from? What do they need to see? Where do they drop off? The design follows the data." },
  { title: "PERFORMANCE AS STANDARD", body: "We target 98+ PageSpeed on every build. Not as a boast — because Google measures it, users feel it, and it directly impacts your paid media CPC and organic rankings." },
  { title: "OWNED INFRASTRUCTURE", body: "You own your code. You own your CMS. You own your data. We use Next.js + Sanity + Vercel — you can deploy to another host tomorrow if you want. That's how it should be." },
];

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Hero headline lines clip-reveal
    const lines = heroRef.current.querySelectorAll(".hero-line-inner");
    gsap.fromTo(lines,
      { y: "100%" },
      { y: "0%", duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(".hero-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1 }
    );

    // Pull quote: char-by-char SplitType
    if (pullQuoteRef.current) {
      const split = new SplitType(pullQuoteRef.current, { types: "chars" });
      gsap.fromTo(split.chars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.015,
          duration: 0.4,
          ease: "none",
          scrollTrigger: { trigger: pullQuoteRef.current, start: "top 75%" }
        }
      );
    }

    // Business cards stagger
    gsap.fromTo(".biz-card",
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".biz-grid", start: "top 80%" }
      }
    );

    // Values cards
    gsap.fromTo(".value-card",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".values-section", start: "top 75%" }
      }
    );
  }, []);

  return (
    <main className="w-full bg-[#050508] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[100svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto" ref={heroRef}>
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">
          [ ABOUT AVORRIA ]
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.92] -tracking-[0.02em] mb-10" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          {["We build digital", "infrastructure for", "businesses that want"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div className="hero-line-inner" style={{ transform: "translateY(100%)" }}>{line}</div>
            </div>
          ))}
          <div className="overflow-hidden">
            <div className="hero-line-inner text-[#C8F135]" style={{ transform: "translateY(100%)" }}>to grow.</div>
          </div>
        </h1>
        <p className="hero-subtext font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed max-w-[500px] opacity-0">
          Founded in Chesterfield. Operating across the UK. Trusted by manufacturers, FM companies, hospitality groups, and SaaS startups.
        </p>
      </section>

      {/* ─── FOUNDER STORY ─── */}
      <section className="w-full border-t border-[#222228] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          {/* Portrait */}
          <div className="w-full md:w-[42%] flex-none">
            <div className="w-full aspect-[3/4] bg-[#0E0E13] border border-[#222228] relative flex items-center justify-center">
              <span className="font-[family-name:var(--font-body)] text-[#1A1A1F] text-[12px] tracking-widest uppercase">
                [ FOUNDER PORTRAIT ]
              </span>
            </div>
          </div>
          {/* Copy */}
          <div className="w-full md:w-[58%] flex flex-col justify-center">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-8">
              [ THE FOUNDER ]
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[48px] text-[#F2F2F0] leading-tight mb-8">
              Built on real business.<br />Not just agency life.
            </h2>
            <div className="flex flex-col gap-5 font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.9] max-w-[540px]">
              <p>Pete founded Avorria with one conviction: most digital agencies don't understand the businesses they build for. They understand aesthetics. They understand code. But they've never had to worry about a P&L, manage a workforce, or answer to a client who needs leads by Friday.</p>
              <p>Pete has. Across multiple sectors. He runs EntireFM — a UK facilities management company. He built Alkota, operates BlockWaste, The Batch House, The Glass Yard, and Travio. Each one is a real trading business with real customers, real overheads, and real growth requirements.</p>
              <p>That commercial foundation is what makes Avorria different. When we build your website, your SEO strategy, or your paid media campaigns, we're thinking about your bottom line — not our award cabinet.</p>
              <p className="text-[#F2F2F0] font-bold">The websites we build aren't showpieces. They're revenue engines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section className="w-full bg-[#0A0A0F] border-y border-[#222228] py-24 md:py-40 px-[var(--gutter)] text-center">
        <h2
          ref={pullQuoteRef}
          className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] max-w-[900px] mx-auto leading-tight"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          "Most agencies have never run a business. We run{" "}
          <span className="text-[#C8F135]">six.</span>"
        </h2>
      </section>

      {/* ─── BUSINESS PORTFOLIO ─── */}
      <section className="w-full py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] tracking-[0.15em] uppercase mb-6">
            [ BUSINESSES WE OPERATE ]
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-tight mb-4" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
            We don't just advise on growth.<br />We practice it.
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-relaxed max-w-[540px] mb-16">
            Every business below has benefited from the same digital strategy, SEO infrastructure, and performance-first web development that we now offer to our clients. These aren't case studies — they're ongoing operations.
          </p>

          <div className="biz-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
            {businesses.map((biz) => (
              <div key={biz.id} className="biz-card bg-[#0E0E13] border border-[#222228] p-8 flex flex-col gap-4 hover:border-[#C8F135] transition-colors duration-300 group">
                <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] tracking-widest">{biz.id}</div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F2F2F0] group-hover:text-[#C8F135] transition-colors duration-300">{biz.name}</h3>
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{biz.sector}</span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B72] leading-relaxed flex-1">{biz.desc}</p>
                <a href={`https://${biz.url}`} target="_blank" rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] hover:text-[#C8F135] transition-colors border-b border-[#6B6B72] hover:border-[#C8F135] pb-0.5 w-max">
                  {biz.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="values-section w-full bg-[#F2F2F0] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((v) => (
              <div key={v.num} className="value-card flex flex-col gap-4 relative">
                <div className="absolute top-[-20px] left-[-10px] font-[family-name:var(--font-display)] font-bold text-[100px] text-[#E8E8E6] leading-none select-none pointer-events-none z-0">
                  {v.num}
                </div>
                <div className="relative z-10 pt-12">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#050508] mb-4">{v.title}</h3>
                  <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B72] leading-relaxed max-w-[300px]">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section className="w-full py-24 md:py-40 border-t border-[#222228]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-16" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
            How we think about digital.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {approach.map((a, i) => (
              <div key={i} className="flex flex-col gap-4 border-t border-[#222228] pt-8">
                <h3 className="font-[family-name:var(--font-body)] font-bold text-[11px] text-[#C8F135] uppercase tracking-widest">{a.title}</h3>
                <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.9]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="w-full bg-[#050508] border-t border-[#222228] py-16">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] grid grid-cols-2 md:grid-cols-4 gap-8">
          {[["2013", "Founded"], ["200+", "Projects Delivered"], ["98", "Avg PageSpeed"], ["4×", "Avg Traffic Growth"]].map(([num, label]) => (
            <div key={label} className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-display)] font-bold text-[#C8F135]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>{num}</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] uppercase tracking-widest max-w-[80px]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-24 border-t border-[#222228] text-center px-[var(--gutter)]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-8" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
          Ready to work with an agency that understands business?
        </h2>
        <TransitionLink href="/start-a-project"
          className="inline-block bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[16px] uppercase px-12 py-6 hover:bg-white transition-colors duration-300"
          data-magnetic>
          START YOUR PROJECT →
        </TransitionLink>
      </section>

    </main>
  );
}
