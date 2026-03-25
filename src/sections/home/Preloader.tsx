"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [hasVisited, setHasVisited] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("avorria_visited");
      if (visited) {
        setHasVisited(true);
        onComplete();
        return;
      }
      sessionStorage.setItem("avorria_visited", "true");
    }

    if (!textRef.current || !counterRef.current || !containerRef.current || !progressLineRef.current) return;

    // Split text
    const splitText = new SplitType(textRef.current, { types: 'chars' });
    const chars = splitText.chars;

    if (!chars) return;

    // Initial states
    gsap.set(chars, { y: 40, opacity: 0 });
    gsap.set(progressLineRef.current, { scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
            splitText.revert();
            onComplete();
          }
        });
      }
    });

    // ─── ANIMATION SEQUENCE (2 SECONDS TOTAL) ───

    // 1. Entrance (0.4s)
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.out",
    });

    // 2. Progress (1.6s) - Green line + Counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.0, // User requested 2s for the main sequence
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `[ LOADING ${Math.floor(counter.val).toString().padStart(3, '0')} ]`;
        }
      }
    }, 0.2); // Start slightly after entrance

    tl.to(progressLineRef.current, {
      scaleX: 1,
      duration: 2.0,
      ease: "power2.inOut",
    }, 0.2);

    // 3. Exit (0.5s)
    tl.to([chars, counterRef.current, progressLineRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.in"
    });

    return () => {
      splitText.revert();
      tl.kill();
    };
  }, [onComplete]);

  if (hasVisited) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center pointer-events-none px-[var(--gutter)]">
      
      {/* Container for logo + line */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[400px]">
        <h1 ref={textRef} className="font-[family-name:var(--font-display)] font-bold text-[32px] tracking-[0.2em] text-[#F2F2F0] overflow-hidden">
          AVORRIA
        </h1>
        
        {/* Horizontal Green Line */}
        <div className="w-full h-[1px] bg-[#222228] relative overflow-hidden">
          <div 
            ref={progressLineRef}
            className="absolute inset-0 bg-[#C8F135] origin-left"
          />
        </div>

        <span ref={counterRef} className="font-[family-name:var(--font-body)] text-[#6B6B72] text-[10px] tracking-[0.2em] uppercase">
          [ LOADING 000 ]
        </span>
      </div>

    </div>
  );
}
