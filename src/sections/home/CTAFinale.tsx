"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "@/components/canvas/ParticleField";
import TransitionLink from "@/components/ui/TransitionLink";

export default function CTAFinale() {
  return (
    <section className="relative w-full h-[100svh] bg-[#0A0A0A] overflow-hidden flex items-center justify-center border-t border-[#1E1E1E]">
      {/* Scan line effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="w-full h-[1px] bg-[#C8F135]/20 absolute top-0 left-0 animate-[scan-line_4s_infinite_linear]" />
      </div>

      {/* Dense 3D Canvas fixed behind */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField count={15000} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[var(--gutter)] max-w-[1000px]">
        
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-12">
          [ THE FINAL WORD ]
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-bold text-[52px] md:text-[110px] text-[#F5F5F0] leading-[0.9] -tracking-[0.03em] mb-12">
          Ready to build <br/>
          something that <br/>
          <span className="text-[#C8F135]">actually works?</span>
        </h2>

        <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed max-w-[480px] mb-12">
          We don&apos;t do sales pitches. We do strategy. Tell us about your project and we&apos;ll tell you how we&apos;d win.
        </p>

        <div className="flex flex-wrap gap-4 justify-center w-full">
          <TransitionLink 
            href="/start-a-project" 
            className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[15px] uppercase tracking-widest px-[56px] py-[24px] hover:bg-[#F5F5F0] transition-colors"
            data-magnetic
          >
            START A PROJECT →
          </TransitionLink>
          <TransitionLink 
            href="/work" 
            className="bg-transparent text-[#F5F5F0] font-[family-name:var(--font-display)] font-bold text-[15px] uppercase tracking-widest px-[56px] py-[24px] border border-[#1E1E1E] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors"
            data-magnetic
          >
            VIEW OUR WORK
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}
