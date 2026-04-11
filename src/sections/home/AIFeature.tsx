"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const features = [
  "Claude API integrations",
  "AI-assisted content pipelines",
  "Automated reporting dashboards",
  "Intelligent lead qualification",
  "Custom AI tools, built to spec"
];

const consoleLines = [
  { type: "input", text: "> avorria.ai.init({ model: 'claude-4', mode: 'production' })" },
  { type: "output", text: "✓ Agent initialised. Scanning 847 documents..." },
  { type: "output", text: "✓ Mapped 23 automation opportunities." },
  { type: "output", text: "✓ Top candidate: RFP Generation Pipeline" },
  { type: "input", text: "> avorria.ai.deploy('rfp-pipeline')" },
  { type: "output", text: "✓ Pipeline deployed. Estimated saving: 18.5 hrs/week" },
  { type: "output", text: "✓ Accuracy: 97.3% | Confidence: HIGH" },
  { type: "success", text: "→ ROI breakeven: 6 weeks" },
];

export default function AIFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h2Lines = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          once: true,
        }
      });

      tl.fromTo(
        h2Lines.current.filter(Boolean),
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      // Feature list
      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Console lines: character-by-character reveal on scroll
      if (consoleRef.current) {
        const lines = consoleRef.current.querySelectorAll(".console-line");
        lines.forEach((line, i) => {
          gsap.fromTo(line,
            { opacity: 0, x: -10 },
            {
              opacity: 1, x: 0, duration: 0.4, ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${200 + i * 60} center`,
                once: true,
              }
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[100svh] bg-[#0A0A0A] relative z-10 py-[var(--section-gap)] flex items-center overflow-hidden">
      {/* Subtle chartreuse radial glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#C8F135] opacity-[0.03] blur-[200px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-[1400px] mx-auto w-full px-[var(--gutter)] flex flex-col md:flex-row items-start gap-16 relative z-10">
        
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-12">
            [ AI IMPLEMENTATION ]
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F5F5F0] leading-[0.95] mb-8">
            <div className="overflow-hidden pb-1"><div ref={el => {h2Lines.current[0] = el;}}>Your competitors</div></div>
            <div className="overflow-hidden pb-1"><div ref={el => {h2Lines.current[1] = el;}}>are already using AI.</div></div>
            <div className="overflow-hidden pb-1"><div ref={el => {h2Lines.current[2] = el;}}>The question is</div></div>
            <div className="overflow-hidden pb-1 text-[#6B6B6B]"><div ref={el => {h2Lines.current[3] = el;}}>whether they&apos;re using</div></div>
            <div className="overflow-hidden pb-1 text-[#6B6B6B]"><div ref={el => {h2Lines.current[4] = el;}}>it properly.</div></div>
          </h2>

          <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-[1.9] max-w-[480px] mb-10">
            We integrate Claude, GPT-4o, and bespoke AI tooling directly
            into your business workflows. Not chatbots. Not gimmicks.
            Real automation that saves your team 20+ hours a week.
          </p>

          <ul ref={listRef} className="flex flex-col gap-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 font-[family-name:var(--font-display)] text-[13px] text-[#F5F5F0]">
                <span className="text-[#C8F135] text-lg leading-none">→</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: AI Console Mockup */}
        <div className="w-full md:w-1/2">
          <div ref={consoleRef} className="bg-[#111111] border border-[#1E1E1E] rounded-sm overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E1E] bg-[#0E0E0E]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-4 font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] tracking-widest">AVORRIA AI TERMINAL</span>
            </div>
            
            {/* Console content */}
            <div className="p-6 flex flex-col gap-3 min-h-[400px]">
              {consoleLines.map((line, i) => (
                <div key={i} className={`console-line font-[family-name:var(--font-body)] text-[12px] leading-relaxed ${
                  line.type === "input" ? "text-[#F5F5F0]" :
                  line.type === "success" ? "text-[#C8F135] font-bold" :
                  "text-[#6B6B6B]"
                }`}>
                  {line.text}
                </div>
              ))}
              
              {/* Blinking cursor */}
              <div className="flex items-center gap-1 mt-2">
                <span className="font-[family-name:var(--font-body)] text-[12px] text-[#F5F5F0]">&gt;</span>
                <span className="w-2 h-4 bg-[#C8F135] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
