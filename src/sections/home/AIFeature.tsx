"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AIDodecahedron } from "@/components/canvas/AIDodecahedron";

const features = [
  "Claude API integrations",
  "AI-assisted content pipelines",
  "Automated reporting dashboards",
  "Intelligent lead qualification",
  "Custom AI tools, built to spec"
];

export default function AIFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h2Lines = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      tl.fromTo(
        h2Lines.current.filter(Boolean),
        { y: "120%", opacity: 0 },
        { 
          y: "0%", 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out" 
        }
      );

      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
          "-=0.5"
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[100svh] bg-[#050508] relative z-10 py-[var(--section-gap)] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-[var(--gutter)] flex flex-col md:flex-row items-center gap-16 h-full relative z-10">
        
        {/* Left Half: Content */}
        <div className="w-full md:w-1/2 flex flex-col z-10">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-12">
            [ AI IMPLEMENTATION ]
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F2F2F0] leading-[0.95] mb-8">
            <div className="overflow-hidden pb-1 max-h-min"><div ref={el => {h2Lines.current[0] = el;}}>Your competitors</div></div>
            <div className="overflow-hidden pb-1 max-h-min"><div ref={el => {h2Lines.current[1] = el;}}>are already using AI.</div></div>
            <div className="overflow-hidden pb-1 max-h-min"><div ref={el => {h2Lines.current[2] = el;}}>The question is</div></div>
            <div className="overflow-hidden pb-1 max-h-min text-[#6B6B72]"><div ref={el => {h2Lines.current[3] = el;}}>whether they&apos;re using</div></div>
            <div className="overflow-hidden pb-1 max-h-min text-[#6B6B72]"><div ref={el => {h2Lines.current[4] = el;}}>it properly.</div></div>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] leading-[1.9] max-w-[480px] mb-10">
            We integrate Claude, GPT-4o, and bespoke AI tooling directly
            into your business workflows. Not chatbots. Not gimmicks.
            Real automation that saves your team 20+ hours a week.
          </p>

          <ul ref={listRef} className="flex flex-col gap-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 font-[family-name:var(--font-body)] text-[13px] text-[#F2F2F0]">
                <span className="text-[#C8F135] text-lg leading-none transform translate-y-[-1px]">→</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Half: R3F Canvas */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full min-h-[600px] pointer-events-none z-0 absolute md:relative right-0 opacity-30 md:opacity-100">
           <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
              <ambientLight intensity={0.2} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
              <AIDodecahedron />
              <Environment preset="city" />
           </Canvas>
        </div>

      </div>
    </section>
  );
}
