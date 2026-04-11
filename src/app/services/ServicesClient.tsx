"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";

const services = [
  {
    num: "01",
    name: "WEB DESIGN & DEVELOPMENT",
    desc: "Next.js, React, Tailwind. Hand-coded from scratch. Deployed to Vercel. 98+ PageSpeed guaranteed.",
    deliverables: "Custom development · Figma to code · CMS integration · Performance optimisation",
    link: "/services/web-design-development",
  },
  {
    num: "02",
    name: "AI IMPLEMENTATION",
    desc: "Claude API, GPT-4o, custom pipelines. Not chatbots — infrastructure that saves 20+ hours a week.",
    deliverables: "API integrations · Automated workflows · AI dashboards · Custom tooling",
    link: "/services/ai-implementation",
  },
  {
    num: "03",
    name: "SEARCH ENGINE OPTIMISATION",
    desc: "Technical SEO, content strategy, link acquisition. Average 4× traffic growth in year one.",
    deliverables: "Technical audits · Programmatic SEO · Content architecture · Core Web Vitals",
    link: "/services/seo",
  },
  {
    num: "04",
    name: "PAID ADVERTISING",
    desc: "Google Ads. Meta Ads. 143% average ROAS. Campaigns built on data, tested obsessively.",
    deliverables: "Campaign strategy · Creative testing · Budget optimisation · Weekly reporting",
    link: "/services/paid-advertising",
  },
  {
    num: "05",
    name: "ANALYTICS & DATA",
    desc: "GA4, GTM, Looker Studio. Custom dashboards. You'll know exactly where every pound goes.",
    deliverables: "GA4 implementation · Conversion tracking · Attribution modelling · Dashboards",
    link: "/services/analytics-data",
  },
];

const comparison = [
  { feature: "Custom code", avorria: true, freelancer: false, bigAgency: false, template: false },
  { feature: "98+ PageSpeed", avorria: true, freelancer: false, bigAgency: false, template: false },
  { feature: "SEO-first architecture", avorria: true, freelancer: false, bigAgency: true, template: false },
  { feature: "Dedicated PM", avorria: true, freelancer: false, bigAgency: true, template: false },
  { feature: "Transparent pricing", avorria: true, freelancer: true, bigAgency: false, template: true },
  { feature: "Ongoing support", avorria: true, freelancer: false, bigAgency: true, template: false },
];

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".service-hero-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      // Service panels slide in
      const panels = gsap.utils.toArray(".service-panel") as HTMLElement[];
      panels.forEach((panel, i) => {
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(panel,
          { x: direction, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%", once: true }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">
          [ OUR DISCIPLINES ]
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 7vw, 100px)" }}>
          <div className="overflow-hidden"><div className="service-hero-line">EVERY SERVICE.</div></div>
          <div className="overflow-hidden"><div className="service-hero-line">ONE AGENDA:</div></div>
          <div className="overflow-hidden"><div className="service-hero-line text-[#C8F135]">YOUR GROWTH.</div></div>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-relaxed max-w-[600px]">
          We don&#39;t do retainers for vanity metrics. Every service we offer is measured against revenue, traffic, or conversions.
        </p>
      </section>

      {/* ─── SERVICE PANELS ─── */}
      {services.map((svc, i) => (
        <section
          key={svc.num}
          className={`service-panel w-full min-h-[70vh] flex items-center border-t border-[#1E1E1E] ${i % 2 === 0 ? "" : "bg-[#111111]"}`}
        >
          <div className={`max-w-[1400px] mx-auto px-[var(--gutter)] py-24 flex flex-col md:flex-row items-start gap-16 w-full ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="font-[family-name:var(--font-body)] text-[200px] leading-none text-[#1A1A1A] select-none pointer-events-none -mb-16 -ml-2">
                {svc.num}
              </div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] text-[36px] md:text-[56px] leading-tight mb-6 relative z-10">
                {svc.name}
              </h2>
              <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed max-w-[480px] mb-8">
                {svc.desc}
              </p>
              <p className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest mb-8">
                {svc.deliverables}
              </p>
              <TransitionLink
                href={svc.link}
                className="font-[family-name:var(--font-body)] font-bold text-[#C8F135] text-[12px] uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C8F135] after:transition-all hover:after:w-full w-fit"
                data-magnetic
              >
                EXPLORE SERVICE →
              </TransitionLink>
            </div>

            {/* Visual placeholder */}
            <div className="w-full md:w-1/2 aspect-square max-h-[500px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] border border-[#1E1E1E] flex items-center justify-center">
                <span className="font-[family-name:var(--font-body)] text-[120px] text-[#1E1E1E] font-bold select-none">{svc.num}</span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── COMPARISON TABLE ─── */}
      <section className="w-full py-24 border-t border-[#1E1E1E]">
        <div className="max-w-[1000px] mx-auto px-[var(--gutter)]">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] text-[32px] md:text-[48px] mb-4">
            Why not just use...?
          </h2>
          <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed mb-12 max-w-[500px]">
            Here&#39;s how we compare to the alternatives you&#39;re probably considering.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1E1E1E]">
                  <th className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest text-left py-4 pr-4"></th>
                  <th className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest text-center py-4 px-4">AVORRIA</th>
                  <th className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest text-center py-4 px-4">FREELANCER</th>
                  <th className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest text-center py-4 px-4">BIG AGENCY</th>
                  <th className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest text-center py-4 px-4">TEMPLATE</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-[#1E1E1E]/50">
                    <td className="font-[family-name:var(--font-display)] text-[14px] text-[#F5F5F0] py-4 pr-4">{row.feature}</td>
                    <td className="text-center py-4 px-4"><span className={row.avorria ? "text-[#C8F135]" : "text-[#6B6B6B]"}>{row.avorria ? "✓" : "✗"}</span></td>
                    <td className="text-center py-4 px-4"><span className={row.freelancer ? "text-[#C8F135]" : "text-[#6B6B6B]"}>{row.freelancer ? "✓" : "✗"}</span></td>
                    <td className="text-center py-4 px-4"><span className={row.bigAgency ? "text-[#C8F135]" : "text-[#6B6B6B]"}>{row.bigAgency ? "✓" : "✗"}</span></td>
                    <td className="text-center py-4 px-4"><span className={row.template ? "text-[#C8F135]" : "text-[#6B6B6B]"}>{row.template ? "✓" : "✗"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-24 border-t border-[#1E1E1E] text-center px-[var(--gutter)]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-4" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
          Ready to build something that actually works?
        </h2>
        <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] mb-8">
          Tell us about your project. We&#39;ll come back with ideas, not a sales pitch.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <TransitionLink href="/start-a-project" className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-[#9DB82A] transition-colors" data-magnetic>
            START YOUR PROJECT →
          </TransitionLink>
          <TransitionLink href="/work" className="border border-[#F5F5F0] text-[#F5F5F0] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:border-[#C8F135] hover:text-[#C8F135] transition-colors" data-magnetic>
            SEE OUR WORK
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
