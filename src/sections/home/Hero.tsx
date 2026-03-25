"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Canvas } from "@react-three/fiber";
import ParticleField from "@/components/canvas/ParticleField";
import TransitionLink from "@/components/ui/TransitionLink";

const stats = [
  { value: "98 / 100", label: "PAGESPEED SCORES" },
  { value: "4×", label: "AVERAGE TRAFFIC INCREASE IN YEAR 1" },
  { value: "143%", label: "AVERAGE PAID MEDIA ROAS" }
];

export default function Hero({ ready }: { ready: boolean }) {
  const h1Lines = useRef<(HTMLDivElement | null)[]>([]);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const [activeStat, setActiveStat] = useState(0);

  // Entrance timelines
  useEffect(() => {
    if (!ready) return;

    const tl = gsap.timeline();

    if (h1Lines.current.length > 0) {
      tl.fromTo(
        h1Lines.current.filter(Boolean),
        { y: "110%", opacity: 0 },
        { 
          y: "0%", 
          opacity: 1,
          duration: 1, 
          stagger: 0.12, 
          ease: "power3.out" 
        }
      );
    }

    if (subheadRef.current) {
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, [ready]);

  // Stat rotation
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <section className="relative w-full h-[100svh] bg-[#050508] overflow-hidden">
      {/* 3D Canvas fixed behind */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-[var(--gutter)] pt-[var(--section-gap)] pb-12 flex flex-col justify-end md:justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mt-auto md:mt-0">
          
          {/* Left Column */}
          <div className="w-full md:w-[60%] flex flex-col gap-6">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase">
              [ 001 — WE BUILD THE INTERNET&apos;S BEST WEBSITES ]
            </div>

            {/* Title with built-in masking for animation */}
            <h1 className="font-[family-name:var(--font-display)] font-bold text-[var(--hero-size)] text-[#F2F2F0] leading-[0.92] uppercase -tracking-[0.02em]">
              <div className="overflow-hidden pb-1 max-h-min">
                <div ref={(el) => { h1Lines.current[0] = el; }}>WE BUILD</div>
              </div>
              <div className="overflow-hidden pb-1 max-h-min">
                <div ref={(el) => { h1Lines.current[1] = el; }}>DIGITAL</div>
              </div>
              <div className="overflow-hidden pb-1 max-h-min flex items-center">
                <div ref={(el) => { h1Lines.current[2] = el; }}>WEAPONS.</div>
              </div>
            </h1>

            <p ref={subheadRef} className="font-[family-name:var(--font-body)] text-[#6B6B72] text-[15px] leading-relaxed max-w-[460px] opacity-0">
              Premium web design, AI implementation, SEO and paid media — built for businesses that are serious about growth.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <TransitionLink 
                href="/start-a-project" 
                className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-body)] font-bold text-[12px] uppercase tracking-[0.1em] px-[36px] py-[18px] hover:bg-white inset-ring inset-ring-transparent transition-colors duration-200"
                data-magnetic
              >
                START A PROJECT →
              </TransitionLink>
              <TransitionLink 
                href="/work" 
                className="bg-transparent text-[#F2F2F0] font-[family-name:var(--font-body)] font-bold text-[12px] uppercase tracking-[0.1em] px-[36px] py-[18px] border border-[#222228] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors duration-200"
                data-magnetic
              >
                VIEW OUR WORK
              </TransitionLink>
            </div>
          </div>

          {/* Right Column / Stats */}
          <div className="w-full md:w-[40%] flex justify-start md:justify-end pb-12 md:pb-0 h-[120px] relative">
             {stats.map((stat, i) => (
               <div 
                 key={i} 
                 className="absolute top-0 right-0 md:text-right flex flex-col opacity-0 transition-opacity duration-500 delay-100"
                 style={{ 
                   opacity: activeStat === i ? 1 : 0,
                   transform: activeStat === i ? 'translateY(0)' : 'translateY(20px)',
                   pointerEvents: activeStat === i ? 'auto' : 'none',
                   transition: 'all 0.5s ease-out'
                 }}
               >
                  <div className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-[64px] text-[#C8F135] leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest max-w-[200px] md:ml-auto">
                    {stat.label}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] tracking-widest">[ SCROLL ]</span>
          <div className="w-[1px] h-12 overflow-hidden relative bg-[#222228]">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-down_1.5s_infinite_ease-out_both]" />
          </div>
        </div>
      </div>
    </section>
  );
}
