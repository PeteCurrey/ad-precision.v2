"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    if (!cursorRef.current || !dotRef.current) return;

    // Set initial position
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // lerp speed
    let activeElement: HTMLElement | null = null;
    let requestRef: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // The dot follows instantly
      gsap.to(dotRef.current, {
        x: mouse.x,
        y: mouse.y,
        duration: 0,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      if (!activeElement) {
        // Normal lerp
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
      } else {
        // Magnetic snap - smooth snap to the center of the element
        const rect = activeElement.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        pos.x += (targetX - pos.x) * 0.3;
        pos.y += (targetY - pos.y) * 0.3;
      }

      gsap.set(cursorRef.current, { x: pos.x, y: pos.y });
      requestRef = requestAnimationFrame(render);
    };

    requestRef = requestAnimationFrame(render);

    // Hover states for links and CTAs
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button, [data-magnetic]') as HTMLElement;
      
      if (link) {
        activeElement = link;
        gsap.to(cursorRef.current, {
          width: 20,
          height: 20,
          duration: 0.3,
          ease: "back.out(1.5)",
        });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.1 }); // hide inner dot on hover
      }
    };

    const handleMouseOut = () => {
      activeElement = null;
      gsap.to(cursorRef.current, {
        width: 40,
        height: 40,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, { opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(requestRef);
    };
  }, [pathname]);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-[#F2F2F0]/40 rounded-full pointer-events-none z-[9999] mix-blend-exclusion hidden md:block" 
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1 h-1 bg-[#F2F2F0] rounded-full pointer-events-none z-[10000] mix-blend-exclusion hidden md:block" 
      />
    </>
  );
}
