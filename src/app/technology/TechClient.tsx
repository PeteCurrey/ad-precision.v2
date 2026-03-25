"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink from "@/components/ui/TransitionLink";

type Tech = {
  name: string;
  stars: number;
  tag: string;
  summary: string;
  useWhen?: string;
};

const categories: { label: string; items: Tech[] }[] = [
  {
    label: "FRONTEND FRAMEWORKS",
    items: [
      { name: "Next.js 15 (App Router)", stars: 5, tag: "Our Primary Framework", summary: "The best React framework on the planet. App Router, RSCs, ISR, edge functions, and Vercel's deployment infrastructure make it our default for every web application.", useWhen: "Any website needing SSR, ISR, API routes, or complex data architecture." },
      { name: "Astro 4", stars: 5, tag: "Content Sites", summary: "Zero JavaScript by default. Islands architecture means you only hydrate the components that need it. Lighthouse 100/100 achievable without tricks.", useWhen: "Marketing sites, documentation, blogs, or any site where JS payload must be minimal." },
      { name: "Svelte / SvelteKit", stars: 4, tag: "Performance-Critical Apps", summary: "Svelte compiles to vanilla JS — no virtual DOM overhead. Excellent for dashboards and apps where interactivity is dense.", useWhen: "Interactive dashboards, apps with heavy real-time data, or when bundle size is critical." },
      { name: "Remix / React Router v7", stars: 4, tag: "Full-Stack React", summary: "Web standards-first. Parallel data loading is exceptional. A compelling alternative to Next.js for projects where progressive enhancement matters.", useWhen: "Complex web apps, Shopify headless storefronts, or progressive enhancement." },
    ],
  },
  {
    label: "CMS PLATFORMS",
    items: [
      { name: "Sanity v3", stars: 5, tag: "Our Primary CMS", summary: "Structured content. Real-time collaboration. GROQ query language. A Studio you can fully customise in React. The most flexible CMS on the market.", useWhen: "Any client-facing CMS requirement." },
      { name: "Payload CMS v3", stars: 4, tag: "Code-First / Owned CMS", summary: "Lives in your codebase. TypeScript-native. Self-hosted. No vendor lock-in, ever. Payload v3 embeds directly into a Next.js App Router project.", useWhen: "Regulated industries, clients requiring self-hosting, or when vendor independence is critical." },
      { name: "Contentful", stars: 3, tag: "Enterprise Scale", summary: "When your client is FTSE 100 and needs 99.99% SLA, Contentful's infrastructure is hard to argue with. Enterprise procurement teams know the name.", useWhen: "Large enterprise clients with existing Contentful contracts." },
    ],
  },
  {
    label: "3D & ANIMATION",
    items: [
      { name: "React Three Fiber", stars: 5, tag: "3D Web Experiences", summary: "The React wrapper for Three.js. Write 3D scenes as React components. Combined with @react-three/drei, it's the complete WebGL toolkit." },
      { name: "GSAP + ScrollTrigger", stars: 5, tag: "Animation", summary: "The industry standard for professional web animation. ScrollTrigger, SplitText — GSAP's suite handles everything from page transitions to cinematic scroll sequences." },
      { name: "Lenis", stars: 5, tag: "Smooth Scroll", summary: "Replaces native scroll with lerp-based smooth scrolling. One library, massive UX improvement." },
      { name: "Framer Motion", stars: 4, tag: "React UI Animation", summary: "For component-level React animations, enter/exit transitions, and layout animations. Pairs with GSAP for a complete animation system." },
    ],
  },
  {
    label: "DEPLOYMENT & INFRASTRUCTURE",
    items: [
      { name: "Vercel", stars: 5, tag: "Primary Deployment", summary: "Instant deploys, preview URLs for every PR, edge functions, image CDN, analytics. Vercel + Next.js is the tightest deployment integration available. 95% of our projects deploy here." },
      { name: "Cloudflare Pages", stars: 4, tag: "Alternative Deployment", summary: "For projects where global edge performance is the primary concern, or for Astro/SvelteKit deployments where Cloudflare Workers integration adds value." },
      { name: "Neon / Supabase", stars: 4, tag: "Serverless Database", summary: "PostgreSQL at the edge. Both are excellent for Next.js projects requiring a relational database without server management." },
    ],
  },
  {
    label: "DESIGN TOOLING",
    items: [
      { name: "Figma", stars: 5, tag: "Design & Prototyping", summary: "Our primary design environment. Every project starts with a Figma system: tokens, components, responsive layouts — before a line of code is written." },
      { name: "Cursor / VS Code", stars: 5, tag: "Development", summary: "AI-native development environment. Cursor's code intelligence dramatically accelerates the engineering workflow." },
      { name: "Storybook", stars: 4, tag: "Component Documentation", summary: "For larger projects, Storybook ensures every component is documented, tested in isolation, and ready for team handoff." },
    ],
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(i => (
      <div key={i} className={`w-2.5 h-2.5 ${i <= count ? "bg-[#C8F135]" : "bg-[#222228]"}`} />
    ))}
  </div>
);

export default function TechClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".tech-card",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
        scrollTrigger: { trigger: ".tech-grid", start: "top 85%", toggleActions: "play none none none" }
      }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full bg-[#050508] min-h-screen">

      {/* HERO */}
      <section className="w-full min-h-[70svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ OUR TECHNOLOGY ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 7vw, 110px)" }}>
          We pick the right<br />tool for every job.<br /><span className="text-[#6B6B72]">Here's what that looks like.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed max-w-[500px]">
          We're framework-agnostic. But we're not framework-ignorant. We know every tool on this page deeply enough to know exactly when not to use it.
        </p>
      </section>

      {/* TECH CATEGORIES */}
      <div className="tech-grid max-w-[1400px] mx-auto px-[var(--gutter)] pb-24">
        {categories.map((category) => (
          <section key={category.label} className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-t border-[#222228] pt-8">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] uppercase tracking-[0.2em]">{category.label}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((tech) => (
                <div key={tech.name} className="tech-card bg-[#0A0A0F] border border-[#1A1A1F] p-6 flex flex-col gap-4 hover:border-[#C8F135]/30 transition-colors duration-300 group">
                  <Stars count={tech.stars} />
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[15px] text-[#F2F2F0] mb-1 group-hover:text-[#C8F135] transition-colors">{tech.name}</h3>
                    <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{tech.tag}</span>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] leading-relaxed flex-1">{tech.summary}</p>
                  {tech.useWhen && (
                    <div className="border-t border-[#1A1A1F] pt-4">
                      <span className="font-[family-name:var(--font-body)] text-[10px] text-[#888888] uppercase tracking-widest block mb-1">USE WHEN</span>
                      <p className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] leading-relaxed">{tech.useWhen}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="w-full border-t border-[#222228] bg-[#0A0A0F] py-24 px-[var(--gutter)] text-center">
        <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] mb-2">Not sure what stack your project needs?</p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-8" style={{ fontSize: "clamp(24px, 3vw, 48px)" }}>
          We'll give you a straight recommendation in 24 hours.
        </h2>
        <TransitionLink href="/start-a-project"
          className="inline-block border border-[#C8F135] text-[#C8F135] font-[family-name:var(--font-body)] font-bold text-[12px] uppercase tracking-widest px-10 py-5 hover:bg-[#C8F135] hover:text-[#050508] transition-all duration-300"
          data-magnetic>
          REQUEST A TECH AUDIT →
        </TransitionLink>
      </section>
    </main>
  );
}
