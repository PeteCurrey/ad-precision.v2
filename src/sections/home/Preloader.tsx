"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [hasVisited, setHasVisited] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("avorria_visited");
      if (visited) {
        setHasVisited(true);
        onComplete();
        return;
      }
      setHasVisited(false);
      sessionStorage.setItem("avorria_visited", "true");
    }

    if (!textRef.current || !counterRef.current || !containerRef.current) return;

    // Split text
    const splitText = new SplitType(textRef.current, { types: 'chars' });
    const chars = splitText.chars;

    if (!chars) return;

    // Hide initially
    gsap.set(chars, { y: -40, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Cut out
        gsap.set(containerRef.current, { display: "none" });
        splitText.revert();
        onComplete();
      }
    });

    // Animate letters in with 50ms stagger
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
    });

    // Number counter
    const counter = { val: 1 };
    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `[ LOADING ${Math.floor(counter.val).toString().padStart(3, '0')} ]`;
        }
      }
    }, "<");

    // Exit expansion
    tl.to(chars, {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
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
    <div ref={containerRef} className="fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center pointer-events-none">
      <h1 ref={textRef} className="font-[family-name:var(--font-display)] font-bold text-4xl tracking-widest text-[#F2F2F0] overflow-hidden pb-2 mb-4">
        AVORRIA
      </h1>
      <span ref={counterRef} className="font-[family-name:var(--font-body)] text-[#6B6B72] text-[11px] tracking-widest">
        [ LOADING 001 ]
      </span>
    </div>
  );
}
