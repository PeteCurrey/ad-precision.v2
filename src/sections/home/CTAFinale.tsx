"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "@/components/canvas/ParticleField";
import TransitionLink from "@/components/ui/TransitionLink";

export default function CTAFinale() {
  return (
    <section className="relative w-full h-[100svh] bg-[#050508] overflow-hidden flex items-center justify-center">
      {/* Dense 3D Canvas fixed behind */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField count={12000} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[var(--gutter)] max-w-[800px]">
        
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] tracking-[0.15em] uppercase mb-8">
          [ LET&apos;S TALK ]
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-bold text-[52px] md:text-[96px] text-white leading-[0.9] tracking-tight mb-8">
          Ready to build <br/>
          something that <br/>
          <span className="text-[#C8F135]">actually works?</span>
        </h2>

        <p className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] leading-relaxed max-w-[420px] mb-12">
          Tell us about your project. We&apos;ll come back with ideas, not a sales pitch.
        </p>

        <TransitionLink 
          href="/start-a-project" 
          className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[18px] uppercase px-[48px] py-[24px] w-full md:w-auto max-w-[600px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(200,241,53,0.2)] transition-all duration-300"
          data-magnetic
        >
          START YOUR PROJECT →
        </TransitionLink>

      </div>
    </section>
  );
}
