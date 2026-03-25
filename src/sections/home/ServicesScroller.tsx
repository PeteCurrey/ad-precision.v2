"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { WebDesignMesh, AINetwork, SEOGlobe, PaidBars, AnalyticsStream } from "@/components/canvas/ServiceModels";
import TransitionLink from "@/components/ui/TransitionLink";

const services = [
  {
    id: "01",
    title: "WEB DESIGN & DEVELOPMENT",
    bg: "#050508",
    desc: "Next.js, React, Tailwind. Hand-coded, pixel-perfect, and deployed to Vercel with a 98+ PageSpeed score. We don't use templates. We don't use page builders. Every line of code is ours.",
    link: "/services/web-design-development",
    CanvasComponent: WebDesignMesh
  },
  {
    id: "02",
    title: "AI IMPLEMENTATION",
    bg: "#080810",
    desc: "We build AI into your business — not as a gimmick, but as infrastructure. Claude API integrations, automated workflows, intelligent dashboards, and AI-assisted content engines that give your team leverage.",
    link: "/services/ai-implementation",
    CanvasComponent: AINetwork
  },
  {
    id: "03",
    title: "SEARCH ENGINE OPTIMISATION",
    bg: "#050508",
    desc: "Technical SEO, content strategy, link acquisition, Core Web Vitals. We've increased organic traffic by an average of 4× for our clients in year one. Numbers, not promises.",
    link: "/services/seo",
    CanvasComponent: SEOGlobe
  },
  {
    id: "04",
    title: "PAID ADVERTISING",
    bg: "#080810",
    desc: "Google Ads. Meta Ads. Maximum ROAS. We don't set budgets on fire. We build campaigns with precision targeting, obsessive creative testing, and weekly reporting that actually tells you something.",
    link: "/services/paid-advertising",
    CanvasComponent: PaidBars
  },
  {
    id: "05",
    title: "ANALYTICS & DATA",
    bg: "#050508",
    desc: "GA4, GTM, Looker Studio. Custom dashboards, conversion tracking, attribution modelling. We make sure every pound you spend online is accounted for.",
    link: "/services/analytics-data",
    CanvasComponent: AnalyticsStream
  }
];

export default function ServicesScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current || !progressRef.current) return;

    const totalWidth = trackRef.current.scrollWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    tl.to(trackRef.current, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none"
    });

    // Update progress bar
    tl.to(progressRef.current, {
      scaleX: 1,
      ease: "none"
    }, "<");
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen overflow-hidden relative z-10 bg-[#050508]">
      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex w-[500vw] h-full relative"
      >
        {services.map((svc) => (
           <div 
             key={svc.id} 
             className="service-panel w-[100vw] h-full flex flex-col md:flex-row relative"
             style={{ backgroundColor: svc.bg }}
           >
              {/* Background Giant Number */}
              <div className="absolute top-[20%] right-[10%] font-[family-name:var(--font-display)] text-[20vw] text-[#0E0E13] select-none pointer-events-none">
                 {svc.id}
              </div>

              {/* Content side */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-[var(--gutter)] max-w-[700px] z-10 pt-24 md:pt-0">
                 <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--h3-size)] text-[#F2F2F0] leading-tight mb-8">
                   {svc.title}
                 </h3>
                 <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.9] max-w-[480px]">
                   {svc.desc}
                 </p>
                 <div className="mt-12">
                   <TransitionLink 
                     href={svc.link}
                     className="font-[family-name:var(--font-body)] font-bold text-[#C8F135] text-[12px] uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C8F135] after:transition-all hover:after:w-full"
                     data-magnetic
                   >
                     {svc.title} →
                   </TransitionLink>
                 </div>
              </div>

              {/* R3F side */}
              <div className="w-full md:w-1/2 h-[50vh] md:h-full relative pointer-events-none z-10">
                 <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={1} />
                    <svc.CanvasComponent />
                    <Environment preset="city" />
                 </Canvas>
              </div>
           </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#222228] z-20">
         <div 
           ref={progressRef} 
           className="h-full w-full bg-[#C8F135] origin-left"
           style={{ transform: "scaleX(0)" }}
         />
      </div>
    </section>
  );
}
