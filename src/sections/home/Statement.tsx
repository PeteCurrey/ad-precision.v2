"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Lines = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline clip reveal
      gsap.fromTo(
        h2Lines.current.filter(Boolean),
        { y: "120%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { 
          y: "0%", 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          duration: 1.2, 
          stagger: 0.08, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050508] py-[var(--section-gap)] px-[var(--gutter)] relative z-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-0">
        
        {/* Left Side - Large Decorative Number */}
        <div className="w-full md:w-1/2 flex items-start">
          <div className="font-[family-name:var(--font-display)] text-[200px] leading-none text-[#1A1A1F] select-none -translate-x-4">
            02
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-[40px]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-[0.15em] mb-12">
            [ WHAT WE BELIEVE ]
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F2F2F0] leading-[0.95] mb-12 flex flex-col">
             <div className="overflow-hidden pb-2 max-h-min">
               <div ref={(el) => { h2Lines.current[0] = el; }}>The best websites</div>
             </div>
             <div className="overflow-hidden pb-2 max-h-min">
               <div ref={(el) => { h2Lines.current[1] = el; }}>don&apos;t just look good.</div>
             </div>
             <div className="overflow-hidden pb-2 max-h-min">
               <div ref={(el) => { h2Lines.current[2] = el; }}>They perform.</div>
             </div>
          </h2>

          <div className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.9] max-w-[520px] mix-blend-lighten space-y-4">
            <p>
              Most agencies will sell you a pretty website. We&apos;ll build you
              a growth engine. Every project we take on combines obsessive
              design craft with conversion architecture, technical SEO from
              day one, and the kind of attention to performance that means
              your site doesn&apos;t just win awards — it wins clients.
            </p>
          </div>

          <div className="flex gap-12 mt-12 pt-8 border-t border-[#222228] w-fit">
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] font-bold text-[13px] text-[#F2F2F0]">11 YEARS</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] uppercase tracking-widest">Building on the web</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] font-bold text-[13px] text-[#F2F2F0]">200+</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] uppercase tracking-widest">Projects delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
