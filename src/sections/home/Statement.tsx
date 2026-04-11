"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Split the text into words
      const split = new SplitType(textRef.current!, { types: "words" });

      // Word color scrub animation
      gsap.fromTo(split.words,
        { color: "#1E1E1E" },
        { 
          color: "#F5F5F0",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          }
        }
      );

      // Decorative number reveal
      gsap.fromTo(".statement-num",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0A0A] py-[var(--section-gap)] px-[var(--gutter)] relative z-10 border-t border-[#1E1E1E]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-0">
        
        {/* Left Side - Large Decorative Number */}
        <div className="w-full md:w-1/2 flex items-start">
          <div className="statement-num font-[family-name:var(--font-display)] text-[200px] leading-none text-[#111111] select-none -translate-x-4">
            01
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-[40px]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-12">
            [ WHAT WE BELIEVE ]
          </div>

          <h2 ref={textRef} className="font-[family-name:var(--font-display)] font-bold text-[var(--h2-size)] leading-[1.1] mb-12">
            The best websites don&apos;t just look good. They perform. They convert. They dominate.
          </h2>

          <div className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-[1.8] max-w-[520px] space-y-4">
            <p>
              Most agencies will sell you a pretty website. We&apos;ll build you
              a growth engine. Every project we take on combines obsessive
              design craft with conversion architecture, technical SEO from
              day one, and the kind of attention to performance that means
              your site doesn&apos;t just win awards — it wins clients.
            </p>
          </div>

          <div className="flex gap-12 mt-12 pt-8 border-t border-[#1E1E1E] w-fit">
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0]">11 YEARS</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">Building on the web</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0]">200+</span>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">Projects delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
