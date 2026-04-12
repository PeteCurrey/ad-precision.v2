"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Canvas } from "@react-three/fiber";
import ParticleField from "@/components/canvas/ParticleField";
import TransitionLink from "@/components/ui/TransitionLink";

const stats = [
  { value: "98 / 100", label: "PAGESPEED SCORES" },
  { value: "4×", label: "AVERAGE TRAFFIC INCREASE" },
  { value: "143%", label: "AVERAGE PAID MEDIA ROAS" }
];

export default function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const h1Lines = useRef<(HTMLDivElement | null)[]>([]);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeStat, setActiveStat] = useState(0);

  // Entrance timelines
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure initial states
      gsap.set(h1Lines.current, { y: "110%", opacity: 0 });
      gsap.set(subheadRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      tl.to(h1Lines.current.filter(Boolean), { 
        y: "0%", 
        opacity: 1,
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out" 
      })
      .to(subheadRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6")
      .to(ctaRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6");

      // Exit scroll parallax / scaling
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * 200,
              opacity: 1 - self.progress * 1.5,
              scale: 1 - self.progress * 0.1,
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  // Stat rotation
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-[#0A0A0A] overflow-hidden">
      {/* 3D Canvas fixed behind */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField count={8000} />
        </Canvas>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col justify-center"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          {/* Left Column */}
          <div className="w-full md:w-[70%] flex flex-col gap-16">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.3em] uppercase opacity-80">
              [ 001 — THE ARCHITECTS OF ATTENTION ]
            </div>

            <h1 
              className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[1.02] uppercase -tracking-[0.02em] my-12 md:my-16"
              style={{ fontSize: "clamp(54px, 11vw, 160px)" }}
            >
              <div className="overflow-y-hidden overflow-x-visible pb-4 px-12 -mx-12">
                <div ref={(el) => { h1Lines.current[0] = el; }}>WE BUILD</div>
              </div>
              <div className="overflow-y-hidden overflow-x-visible pb-4 px-12 -mx-12">
                <div ref={(el) => { h1Lines.current[1] = el; }}>DIGITAL</div>
              </div>
              <div className="overflow-y-hidden overflow-x-visible pb-4 px-12 -mx-12 text-[#C8F135]">
                <div ref={(el) => { h1Lines.current[2] = el; }}>WEAPONS.</div>
              </div>
            </h1>

            <div ref={subheadRef} className="flex flex-col gap-12">
              <p className="font-[family-name:var(--font-display)] text-[#6B6B6B] text-[18px] md:text-[22px] leading-relaxed max-w-[560px]">
                Premium web design, AI implementation, and performance SEO for businesses serious about dominance.
              </p>
              
              <div ref={ctaRef} className="flex flex-wrap gap-6">
                <TransitionLink 
                  href="/start-a-project" 
                  className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase tracking-widest px-[48px] py-[22px] hover:bg-[#F5F5F0] transition-colors"
                  data-magnetic
                >
                  START A PROJECT →
                </TransitionLink>
                <TransitionLink 
                  href="/work" 
                  className="bg-transparent text-[#F5F5F0] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase tracking-widest px-[48px] py-[22px] border border-[#1E1E1E] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors"
                  data-magnetic
                >
                  VIEW OUR WORK
                </TransitionLink>
              </div>
            </div>
          </div>

          {/* Right Column / Stats */}
          <div className="w-full md:w-[30%] flex justify-start md:justify-end h-[120px] relative">
             {stats.map((stat, i) => (
               <div 
                 key={i} 
                 className="absolute top-0 right-0 md:text-right flex flex-col"
                 style={{ 
                   opacity: activeStat === i ? 1 : 0,
                   transform: activeStat === i ? 'translateY(0)' : 'translateY(15px)',
                   pointerEvents: activeStat === i ? 'auto' : 'none',
                   transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                 }}
               >
                  <div className="font-[family-name:var(--font-display)] font-bold text-5xl md:text-[80px] text-[#C8F135] leading-none mb-4">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] max-w-[180px] md:ml-auto">
                    {stat.label}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-[var(--gutter)] flex items-center gap-4">
          <div className="w-[1px] h-16 bg-[#1E1E1E] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#C8F135] origin-top animate-[scroll-down_2s_infinite_cubic-bezier(0.76,0,0.24,1)]" />
          </div>
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
