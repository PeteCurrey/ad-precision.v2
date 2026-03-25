"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";
import TransitionLink from "@/components/ui/TransitionLink";

const workItems = [
  { client: "NEXUS GROUP", tags: "WEB DESIGN · SEO", title: "Redefining the digital real estate experience.", img: "/work-1.jpg" },
  { client: "AURALIGHT", tags: "AI IMPLEMENTATION", title: "Automated content engines for e-commerce.", img: "/work-2.jpg" },
  { client: "VELOCITY", tags: "PAID MEDIA · CRO", title: "Scaling SaaS acquisition by 400%.", img: "/work-3.jpg" },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
    if (!splitTitle.chars) return;

    gsap.set(splitTitle.chars, { y: 40, opacity: 0 });

    let ctx = gsap.context(() => {
      gsap.to(splitTitle.chars, {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => {
      splitTitle.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0F] py-[var(--section-gap)] relative z-10">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col">
        
        {/* Header */}
        <div className="mb-16">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] tracking-[0.15em] uppercase mb-4">
            [ 03 — SELECTED WORK ]
          </div>
          <h2 ref={titleRef} className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] text-[#F2F2F0] leading-none mb-4 -tracking-[0.02em]">
            Projects that moved the needle.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {workItems.map((item, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer" data-magnetic>
              {/* Image Card */}
              <div className="w-full aspect-video bg-[#1A1A1F] relative overflow-hidden mb-6 border border-[#222228]">
                 <div className="absolute inset-0 bg-[#222228] opacity-50 transition-opacity duration-500 group-hover:opacity-0" />
                 {/* Simulate Image (placeholder styling) */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1F] to-[#0A0A0F] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105" />
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-[#050508]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                       <h4 className="font-[family-name:var(--font-display)] font-bold text-[20px] text-white leading-none mb-2">
                         {item.client}
                       </h4>
                       <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest block mb-4">
                         {item.tags}
                       </span>
                       <span className="font-[family-name:var(--font-body)] font-bold text-[12px] text-white uppercase tracking-widest block border-b border-white pb-1 w-max">
                         VIEW CASE STUDY →
                       </span>
                    </div>
                 </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] tracking-widest uppercase">
                  {item.client}
                </span>
                <span className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#F2F2F0]">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width CTA */}
        <TransitionLink 
          href="/work" 
          className="w-full h-[80px] border border-[#222228] flex items-center justify-center font-[family-name:var(--font-body)] font-bold text-[12px] text-[#F2F2F0] uppercase tracking-widest hover:border-[#C8F135] hover:text-[#C8F135] transition-colors duration-300"
          data-magnetic
        >
          SEE ALL WORK →
        </TransitionLink>

      </div>
    </section>
  );
}
