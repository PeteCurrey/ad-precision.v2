"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";

type Tech = {
  name: string;
  stars: number;
  tag: string;
  summary: string;
  useWhen?: string;
};

const categories: { label: string; items: Tech[] }[] = [
  {
    label: "ARCHITECTURAL FRAMEWORKS",
    items: [
      { name: "Next.js 15 (App Router)", stars: 5, tag: "Our Standard", summary: "The best React framework on the planet. App Router, RSCs, and edge infrastructure make it our default for every commercial build.", useWhen: "Any project needing top-tier speed, SEO, and developer agility." },
      { name: "Astro 4", stars: 5, tag: "The Speed Demon", summary: "Zero JS by default. Islands architecture means you only hydrate what you need. Absolute perfection for content-heavy sites.", useWhen: "Marketing sites, blogs, or sites where PageSpeed 100 is non-negotiable." },
      { name: "SvelteKit", stars: 4, tag: "Reactive Specialist", summary: "Compiles to vanilla JS. Zero virtual DOM overhead. Ideal for dashboards and interactivity-dense applications.", useWhen: "Highly interactive dashboards and data-visualisation products." },
    ],
  },
  {
    label: "CONTENT & DATA",
    items: [
      { name: "Sanity v3", stars: 5, tag: "Headless CMS", summary: "Structured content. Real-time collaboration. The most flexible, developer-friendly CMS we've ever used.", useWhen: "Any build requiring client content management." },
      { name: "Payload CMS v3", stars: 5, tag: "Code-First", summary: "Self-hosted, TypeScript-native, and incredibly powerful. No vendor lock-in, ever.", useWhen: "Regulated industries or clients requiring full ownership of infrastructure." },
      { name: "Supabase", stars: 4, tag: "PostgreSQL", summary: "The open-source Firebase alternative. Instant APIs and real-time database capabilities at the edge.", useWhen: "Back-end heavy applications and SaaS products." },
    ],
  },
  {
    label: "VISUAL & INTERACTION",
    items: [
      { name: "GSAP + ScrollTrigger", stars: 5, tag: "Gold Standard", summary: "The industry standard for professional web animation. We use it for every cinematic transition and scroll scrub." },
      { name: "React Three Fiber", stars: 5, tag: "3D Web", summary: "WebGL scenes built as React components. This is how we build the immersive 3D elements that set our work apart." },
      { name: "Lenis", stars: 5, tag: "Smooth Scrolling", summary: "Replaces native scroll with high-frequency interpolation for that buttery agency-grade feel." },
      { name: "Framer Motion", stars: 4, tag: "UI Transitions", summary: "Perfect for component-level entering/exiting and layout shifts. Pairs beautifully with GSAP." },
    ],
  },
  {
    label: "INFRASTRUCTURE",
    items: [
      { name: "Vercel", stars: 5, tag: "Deployment", summary: "The standard for Next.js. Edge delivery, instant rollbacks, and world-class performance infrastructure." },
      { name: "Cloudflare", stars: 5, tag: "Edge Network", summary: "Security, DNS, and worker-based edge logic. Essential for global reliability and DDoS protection." },
    ],
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className={`w-3 h-[2px] transition-colors duration-500 ${i <= count ? "bg-[#C8F135]" : "bg-[#1E1E1E]"}`} />
    ))}
  </div>
);

export default function TechClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tech-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: ".tech-grid", start: "top 85%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[70svh] flex flex-col justify-end pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ THE STACK ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(48px, 10vw, 160px)" }}>
          Pick the tool,<br />not the trend.<br /><span className="text-[#6B6B6B]">Our core engine.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-relaxed max-w-[500px]">
          We&apos;re framework-agnostic but standards-obsessed. We choose infrastructure that scales revenue, not just traffic.
        </p>
      </section>

      {/* ─── TECH GRID ─── */}
      <div className="tech-grid max-w-[1400px] mx-auto px-[var(--gutter)] pb-40">
        {categories.map((category) => (
          <section key={category.label} className="mb-24">
            <div className="flex items-center gap-4 mb-10 border-t border-[#1E1E1E] pt-10">
              <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.2em] opacity-60">{category.label}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map((tech) => (
                <div key={tech.name} className="tech-card bg-[#111111] border border-[#1E1E1E] p-8 flex flex-col gap-6 hover:border-[#C8F135] transition-all duration-500 group">
                  <div className="flex justify-between items-start">
                    <Stars count={tech.stars} />
                    <span className="font-[family-name:var(--font-display)] text-[18px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors">↗</span>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0] mb-2 group-hover:text-[#C8F135] transition-colors">{tech.name}</h3>
                    <span className="font-[family-name:var(--font-body)] text-[9px] text-[#C8F135] uppercase tracking-widest">{tech.tag}</span>
                  </div>
                  <p className="font-[family-name:var(--font-display)] text-[13px] text-[#6B6B6B] leading-relaxed flex-1">{tech.summary}</p>
                  {tech.useWhen && (
                    <div className="mt-4 pt-6 border-t border-[#1E1E1E]">
                      <span className="font-[family-name:var(--font-body)] text-[9px] text-[#6B6B6B] uppercase tracking-widest block mb-2">Architect&apos;s Note</span>
                      <p className="font-[family-name:var(--font-display)] text-[12px] text-[#6B6B6B] italic leading-relaxed">{tech.useWhen}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ─── CTA ─── */}
      <section className="w-full bg-[#111111] py-32 md:py-56 px-[var(--gutter)] text-center border-t border-[#1E1E1E]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-12 max-w-[900px] mx-auto leading-[0.92]" style={{ fontSize: "clamp(32px, 6vw, 72px)" }}>
          Not sure what <span className="text-[#C8F135]">infrastructure</span> your project needs?
        </h2>
        <TransitionLink 
          href="/start-a-project"
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors"
          data-magnetic
        >
          GET A TECH RECOMMENDATION →
        </TransitionLink>
      </section>
    </main>
  );
}
