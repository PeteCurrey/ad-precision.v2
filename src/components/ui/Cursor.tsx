"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cursorRef.current || !dotRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;
    let activeElement: HTMLElement | null = null;
    let requestRef: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // The dot is 1:1 with mouse, the circle follows with ease
      gsap.to(dotRef.current, { x: mouse.x, y: mouse.y, duration: 0.1, ease: "none" });
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      if (!activeElement) {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
      } else {
        const rect = activeElement.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        pos.x += (targetX - pos.x) * 0.25;
        pos.y += (targetY - pos.y) * 0.25;
      }
      gsap.set(cursorRef.current, { x: pos.x, y: pos.y });
      requestRef = requestAnimationFrame(render);
    };

    requestRef = requestAnimationFrame(render);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for cursor text (work cards, articles)
      const cursorTextEl = target.closest("[data-cursor-text]") as HTMLElement;
      if (cursorTextEl) {
        const text = cursorTextEl.getAttribute("data-cursor-text") || "VIEW →";
        setCursorText(text);
        gsap.to(cursorRef.current, {
          width: 90,
          height: 90,
          backgroundColor: "#C8F135",
          borderColor: "#C8F135",
          mixBlendMode: "normal",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.1 });
        return;
      }

      // Standard interactive elements
      const interactive = target.closest("a, button, [data-magnetic]") as HTMLElement;
      if (interactive) {
        activeElement = interactive;
        gsap.to(cursorRef.current, {
          width: 45,
          height: 45,
          borderColor: "#C8F135",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.1 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      const cursorTextEl = target.closest("[data-cursor-text]");
      if (cursorTextEl && (!relatedTarget || !cursorTextEl.contains(relatedTarget))) {
        setCursorText("");
        gsap.to(cursorRef.current, {
          width: 14,
          height: 14,
          backgroundColor: "transparent",
          borderColor: "#C8F135",
          mixBlendMode: "difference",
          duration: 0.3,
        });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.3 });
      }

      const interactive = target.closest("a, button, [data-magnetic]");
      if (interactive && (!relatedTarget || !interactive.contains(relatedTarget))) {
        activeElement = null;
        gsap.to(cursorRef.current, {
          width: 14,
          height: 14,
          backgroundColor: "transparent",
          borderColor: "#C8F135",
          mixBlendMode: "difference",
          duration: 0.3,
        });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.3 });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(requestRef);
    };
  }, [pathname]); // Re-init on path change to ensure listeners remain active and state resets

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[14px] h-[14px] border border-[#C8F135] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center overflow-hidden" 
        style={{ backgroundColor: "transparent" }}
      >
        {cursorText && (
          <span 
            ref={textRef}
            className="font-[family-name:var(--font-body)] text-[10px] text-[#0A0A0A] uppercase tracking-widest font-bold whitespace-nowrap animate-in"
          >
            {cursorText}
          </span>
        )}
      </div>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1 h-1 bg-[#C8F135] rounded-full pointer-events-none z-[10000] hidden md:block" 
      />
    </>
  );
}
