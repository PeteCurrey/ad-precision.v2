"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const lines = heroRef.current.querySelectorAll(".hero-line-inner");
        gsap.fromTo(lines,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
        );
        gsap.fromTo(".hero-subtext",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
        );
      }

      // Pull quote character reveal
      if (pullQuoteRef.current) {
        const split = new SplitType(pullQuoteRef.current, { types: "chars,words" });
        gsap.fromTo(split.chars,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: pullQuoteRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            }
          }
        );
      }

      // Business grid stagger
      gsap.fromTo(".biz-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".biz-grid", start: "top 75%", once: true }
        }
      );

      // Value cards entrance
      gsap.fromTo(".value-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".values-section", start: "top 70%", once: true }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="w-full min-h-[90svh] flex flex-col justify-end pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">
          [ ABOUT AVORRIA ]
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(48px, 10vw, 160px)" }}>
          <div className="overflow-hidden pb-1">
            <div className="hero-line-inner text-[#F5F5F0]">THE AGENCY BUILT</div>
          </div>
          <div className="overflow-hidden pb-1">
            <div className="hero-line-inner text-[#6B6B6B]">ON REAL WORLD</div>
          </div>
          <div className="overflow-hidden pb-1 text-[#C8F135]">
            <div className="hero-line-inner uppercase">EXPERIENCE.</div>
          </div>
        </h1>
        <p className="hero-subtext font-[family-name:var(--font-display)] text-[18px] md:text-[22px] text-[#6B6B6B] leading-relaxed max-w-[560px]">
          Founded in Chesterfield. Operating across the UK. Trusted by manufacturers, industrial specialists, and growth-hungry startups.
        </p>
      </section>

      {/* ─── FOUNDER STORY ─── */}
      <section className="w-full border-t border-[#1E1E1E] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col md:flex-row gap-24 items-start">
          <div className="w-full md:w-[45%] flex-none">
            <div className="w-full aspect-[4/5] bg-[#111111] border border-[#1E1E1E] relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/40" />
               <span className="font-[family-name:var(--font-body)] text-[#1E1E1E] text-[12px] tracking-widest uppercase relative z-10">
                  [ PETE CURREY — FOUNDER ]
               </span>
            </div>
          </div>
          <div className="w-full md:w-[55%] flex flex-col">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">
              [ THE FOUNDATION ]
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[64px] text-[#F5F5F0] leading-[0.95] mb-12">
              Most agencies have never run a business. <span className="text-[#6B6B6B]">We run seven.</span>
            </h2>
            <div className="flex flex-col gap-8 font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-[1.8] max-w-[580px]">
              <p>Avorria was built on a simple conviction: digital advice is only valuable when it&apos;s anchored in commercial reality. We don&apos;t just understand aesthetics and code; we understand P&L, workforce management, and the pressure of generating revenue.</p>
              <p>Our founder, Pete Currey, doesn&apos;t just run an agency. He operates six other businesses across facilities management, industrial manufacturing, and hospitality. From EntireFM to Alkota, these are real trading companies with real overheads.</p>
              <p className="text-[#F5F5F0] font-bold">That experience is our secret weapon. We don&apos;t build showpieces. We build growth engines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section className="w-full bg-[#111111] border-y border-[#1E1E1E] py-32 md:py-56 px-[var(--gutter)] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] select-none text-[#C8F135] font-[family-name:var(--font-display)] font-bold text-[30vw] flex items-center justify-center -translate-y-10 uppercase">
          COMMERCIAL
        </div>
        <h2
          ref={pullQuoteRef}
          className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] max-w-[1100px] mx-auto leading-tight relative z-10"
          style={{ fontSize: "clamp(32px, 6vw, 84px)" }}
        >
          We measure our success in your revenue, not our awards.
        </h2>
      </section>

      {/* ─── BUSINESS PORTFOLIO ─── */}
      <section className="w-full py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] tracking-[0.15em] uppercase mb-8">
            [ OUR OPERATED PORTFOLIO ]
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.95] mb-20" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            We field-test every strategy<br />on our own companies first.
          </h2>

          <div className="biz-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => (
              <a 
                key={biz.id} 
                href={`https://${biz.url}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="biz-card bg-[#111111] border border-[#1E1E1E] p-10 flex flex-col gap-8 hover:border-[#C8F135] transition-all duration-500 group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] tracking-[0.2em]">{biz.id}</span>
                  <span className="font-[family-name:var(--font-display)] text-[24px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors">↗</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">{biz.name}</h3>
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{biz.sector}</span>
                </div>
                <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed flex-1">{biz.desc}</p>
                <div className="pt-4 border-t border-[#1E1E1E] flex justify-between items-baseline">
                   <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest">{biz.url}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES (New Style) ─── */}
      <section className="values-section w-full border-t border-[#1E1E1E] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/3">
             <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">
              [ OUR VALUES ]
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[52px] text-[#F5F5F0] leading-[1]">
              The principles we build by.
            </h2>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 gap-12">
            {values.map((v) => (
              <div key={v.num} className="value-card flex flex-col md:flex-row gap-8 md:gap-16 items-start py-12 border-t border-[#1E1E1E] first:border-t-0">
                <span className="font-[family-name:var(--font-display)] font-bold text-[#1E1E1E] text-[48px] leading-none">{v.num}</span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0]">{v.title}</h3>
                  <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed max-w-[500px]">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS GRID ─── */}
      <section className="w-full bg-[#111111] border-y border-[#1E1E1E] py-24">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] grid grid-cols-2 md:grid-cols-4 gap-12">
          {[["2013", "Established"], ["200+", "Partnerships"], ["98/100", "Avg Perfromance"], ["4×", "Growth Curve"]].map(([num, label]) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-display)] font-bold text-[#C8F135] text-[40px] md:text-[64px] leading-none">{num}</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-32 md:py-56 text-center px-[var(--gutter)]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-12 max-w-[1000px] mx-auto leading-[0.95]" style={{ fontSize: "clamp(32px, 7vw, 96px)" }}>
          Ready to work with a <span className="text-[#C8F135]">real</span> business partner?
        </h2>
        <TransitionLink 
          href="/start-a-project"
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[15px] uppercase tracking-widest px-16 py-8 hover:bg-[#F5F5F0] transition-colors"
          data-magnetic
        >
          START YOUR PROJECT →
        </TransitionLink>
      </section>

    </main>
  );
}
