"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const testimonials = [
  { text: "Avorria didn't just redesign our site, they completely rebuilt our digital acquisition pipeline. Organic traffic is up 312%.", name: "MARCUS CHEN", company: "NEXUS REAL ESTATE" },
  { text: "The first agency we've worked with that actually understands performance. The Next.js stack is flawlessly fast.", name: "SARAH JENKINS", company: "AURALIGHT LTD" },
  { text: "No fluff, no vanity metrics. They built a custom front-end that doubled our conversion rate in sixty days.", name: "DAVID O'CONNOR", company: "TERRA FIRMA GEAR" },
  { text: "We went from invisible to dominant in local search within six months. The ROI was almost immediate.", name: "RACHEL THORNTON", company: "LUMINA GROUP" },
  { text: "The phone rings every day now. Best money I've ever spent on the business. Absolute professionals.", name: "ANDY SHELDON", company: "AES AUTOMOTIVE" }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 40,
    });

    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] py-[var(--section-gap)] relative z-10 overflow-hidden border-t border-[#1E1E1E]">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] mb-16">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-6">
          [ TESTIMONIALS ]
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--h3-size)] text-[#F5F5F0]">
          Don&apos;t just take our word for it.
        </h2>
      </div>
      
      <div 
        className="flex w-max group" 
        ref={trackRef}
        onMouseEnter={() => gsap.to(trackRef.current, { timeScale: 0.2, duration: 1 })}
        onMouseLeave={() => gsap.to(trackRef.current, { timeScale: 1, duration: 1 })}
      >
        {[...Array(2)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex gap-6 pr-6">
            {testimonials.map((t, i) => (
              <div 
                key={`${groupIdx}-${i}`} 
                className="w-[350px] md:w-[450px] bg-[#111111] border border-[#1E1E1E] p-10 relative flex flex-col justify-between hover:border-[#C8F135] transition-colors duration-500"
              >
                <div className="absolute top-4 left-4 font-[family-name:var(--font-display)] font-bold text-[80px] text-[#C8F135] opacity-10 leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                <p className="font-[family-name:var(--font-display)] text-[16px] text-[#F5F5F0] leading-[1.8] mb-12 relative z-10">
                  {t.text}
                </p>

                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#F5F5F0]">
                    {t.name}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] tracking-widest uppercase">
                    {t.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
