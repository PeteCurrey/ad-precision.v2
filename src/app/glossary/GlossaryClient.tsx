"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";

const glossaryTerms: { term: string; category: string; definition: string; slug: string }[] = [
  // Web Design & Development
  { term: "Next.js", category: "Web Development", slug: "nextjs", definition: "A React framework for building full-stack web applications with SSR, ISR, and App Router architecture." },
  { term: "React", category: "Web Development", slug: "react", definition: "A JavaScript library for building user interfaces using reusable components." },
  { term: "TypeScript", category: "Web Development", slug: "typescript", definition: "A strongly typed superset of JavaScript that adds type checking to catch errors at compile time." },
  { term: "Tailwind CSS", category: "Web Development", slug: "tailwind-css", definition: "A utility-first CSS framework for rapid UI development without leaving your HTML." },
  { term: "Vercel", category: "Web Development", slug: "vercel", definition: "The cloud platform built for deploying Next.js applications with edge functions, CDN, and preview deployments." },
  { term: "Static Site Generation (SSG)", category: "Web Development", slug: "ssg", definition: "A method of pre-rendering pages at build time, serving HTML files directly from a CDN for maximum performance." },
  { term: "Server-Side Rendering (SSR)", category: "Web Development", slug: "ssr", definition: "Rendering pages on the server per request, allowing dynamic content to be included in the initial HTML." },
  { term: "Incremental Static Regeneration (ISR)", category: "Web Development", slug: "isr", definition: "A Next.js feature that allows static pages to be re-generated in the background on a schedule, combining the benefits of SSG and SSR." },
  { term: "Headless CMS", category: "Web Development", slug: "headless-cms", definition: "A content management system that provides content via API, decoupled from the presentation layer." },
  { term: "Sanity", category: "Web Development", slug: "sanity", definition: "A headless CMS with a customisable Studio, real-time collaboration, and the GROQ query language." },
  { term: "WebGL", category: "Web Development", slug: "webgl", definition: "A JavaScript API for rendering interactive 2D and 3D graphics in the browser without plugins." },
  { term: "React Three Fiber", category: "Web Development", slug: "react-three-fiber", definition: "A React renderer for Three.js, allowing 3D scenes to be written as React component trees." },
  { term: "GSAP", category: "Web Development", slug: "gsap", definition: "GreenSock Animation Platform — the industry-standard JavaScript animation library used for complex scroll sequences and UI animations." },
  { term: "Lenis", category: "Web Development", slug: "lenis", definition: "A smooth-scroll library that replaces native browser scroll with a lerp-based interpolated scroll." },
  { term: "Core Web Vitals", category: "Web Development", slug: "core-web-vitals", definition: "Google's three key user experience metrics: LCP (loading), CLS (visual stability), and INP (interactivity)." },
  { term: "LCP (Largest Contentful Paint)", category: "Web Development", slug: "lcp", definition: "Google's metric measuring how long the largest visible element takes to load. Target: under 2.5 seconds." },
  { term: "CLS (Cumulative Layout Shift)", category: "Web Development", slug: "cls", definition: "Google's metric measuring unexpected layout shifts during page load. Target: under 0.1." },
  { term: "INP (Interaction to Next Paint)", category: "Web Development", slug: "inp", definition: "Google's metric measuring page responsiveness to user interactions. Replaced FID in March 2024. Target: under 200ms." },
  { term: "Content Delivery Network (CDN)", category: "Web Development", slug: "cdn", definition: "A distributed network of servers that delivers content from the location closest to the user, reducing latency." },
  { term: "Edge Functions", category: "Web Development", slug: "edge-functions", definition: "Serverless functions that run at CDN edge nodes, closer to the user. Vercel's Edge Functions run globally with <1ms cold starts." },
  { term: "API Routes", category: "Web Development", slug: "api-routes", definition: "Server-side routes in Next.js that handle HTTP requests, enabling backend functionality within a Next.js project." },
  { term: "User Experience (UX)", category: "Web Development", slug: "ux", definition: "The overall experience a person has when using a product, encompassing usability, accessibility, and satisfaction." },
  { term: "Conversion Rate Optimisation (CRO)", category: "Web Development", slug: "cro", definition: "The systematic process of increasing the percentage of visitors who complete a desired action on a website." },
  { term: "PageSpeed Insights", category: "Web Development", slug: "pagespeed-insights", definition: "Google's free tool for measuring web page performance using lab data and real-world field data." },
  // SEO
  { term: "Search Engine Optimisation (SEO)", category: "SEO", slug: "seo", definition: "The practice of improving a website's visibility in organic search engine results to drive qualified traffic." },
  { term: "Technical SEO", category: "SEO", slug: "technical-seo", definition: "The branch of SEO focused on a website's infrastructure: crawlability, indexability, site speed, and structured data." },
  { term: "Keyword Research", category: "SEO", slug: "keyword-research", definition: "The process of identifying search terms that your target audience uses, and mapping them to pages and content." },
  { term: "Search Intent", category: "SEO", slug: "search-intent", definition: "The underlying goal behind a search query — informational, navigational, commercial, or transactional." },
  { term: "SERP", category: "SEO", slug: "serp", definition: "Search Engine Results Page — the page displayed by a search engine in response to a query." },
  { term: "Featured Snippet", category: "SEO", slug: "featured-snippet", definition: "A selected search result displayed above the standard organic results, extracting and displaying the answer directly in the SERP." },
  { term: "Structured Data", category: "SEO", slug: "structured-data", definition: "Code (typically JSON-LD) added to a page to help search engines understand the content and potentially display rich results." },
  { term: "JSON-LD", category: "SEO", slug: "json-ld", definition: "JavaScript Object Notation for Linked Data — the recommended format for adding structured data to web pages." },
  { term: "Canonical Tag", category: "SEO", slug: "canonical-tag", definition: "An HTML element that tells search engines which URL is the preferred version of a page, preventing duplicate content issues." },
  { term: "hreflang", category: "SEO", slug: "hreflang", definition: "An HTML attribute that specifies the language and geographic targeting of a web page for search engines." },
  { term: "E-E-A-T", category: "SEO", slug: "eeat", definition: "Google's quality assessment framework: Experience, Expertise, Authoritativeness, and Trustworthiness." },
  { term: "Topical Authority", category: "SEO", slug: "topical-authority", definition: "A website's demonstrated expertise across a specific topic area, built by covering a subject comprehensively with inter-linked content." },
  { term: "Programmatic SEO", category: "SEO", slug: "programmatic-seo", definition: "The process of creating large numbers of web pages using templates and data, targeting long-tail keyword combinations at scale." },
  { term: "Link Building", category: "SEO", slug: "link-building", definition: "The practice of acquiring hyperlinks from other websites to your own, a key factor in Google's ranking algorithm." },
  { term: "Local SEO", category: "SEO", slug: "local-seo", definition: "SEO practices targeting searches with local intent, helping businesses appear in Google's Local Pack and Maps results." },
  // Paid Advertising
  { term: "Pay-Per-Click (PPC)", category: "Paid Advertising", slug: "ppc", definition: "An advertising model where advertisers pay each time a user clicks their ad. Most commonly associated with Google Ads." },
  { term: "Return on Ad Spend (ROAS)", category: "Paid Advertising", slug: "roas", definition: "Revenue generated per £1 of ad spend. A ROAS of 4× means £4 revenue for every £1 spent." },
  { term: "Cost Per Acquisition (CPA)", category: "Paid Advertising", slug: "cpa", definition: "The average cost of acquiring one customer or lead through paid advertising." },
  { term: "Quality Score", category: "Paid Advertising", slug: "quality-score", definition: "Google's rating of the quality and relevance of your keywords, ads, and landing pages. Higher scores = lower CPCs." },
  { term: "Performance Max (PMax)", category: "Paid Advertising", slug: "pmax", definition: "Google's AI-driven campaign type that runs ads across all Google channels from a single campaign." },
  { term: "Remarketing", category: "Paid Advertising", slug: "remarketing", definition: "Targeting ads to users who have previously visited your website or interacted with your brand." },
  { term: "Attribution Model", category: "Paid Advertising", slug: "attribution-model", definition: "A framework for determining which touchpoints in the customer journey receive credit for conversions." },
  // AI
  { term: "Large Language Model (LLM)", category: "AI & Machine Learning", slug: "llm", definition: "A type of AI model trained on vast amounts of text data, capable of generating human-like text, code, and analysis." },
  { term: "Claude", category: "AI & Machine Learning", slug: "claude", definition: "Anthropic's family of AI assistants, known for strong reasoning, nuanced writing, and safety-first design. Our preferred LLM." },
  { term: "Retrieval-Augmented Generation (RAG)", category: "AI & Machine Learning", slug: "rag", definition: "An AI architecture that combines an LLM with a knowledge base, allowing the model to access and cite specific documents." },
  { term: "Prompt Engineering", category: "AI & Machine Learning", slug: "prompt-engineering", definition: "The practice of designing and optimising input prompts to guide AI models towards desired outputs." },
  { term: "Vector Database", category: "AI & Machine Learning", slug: "vector-database", definition: "A database that stores data as high-dimensional vectors, enabling semantic similarity search for AI applications." },
  { term: "AI Agent", category: "AI & Machine Learning", slug: "ai-agent", definition: "An AI system that can take actions, use tools, and complete multi-step tasks autonomously." },
  { term: "N8N", category: "AI & Machine Learning", slug: "n8n", definition: "An open-source workflow automation platform, often used to build complex AI-powered business process automation." },
  // Analytics
  { term: "Google Analytics 4 (GA4)", category: "Analytics & Data", slug: "ga4", definition: "Google's current analytics platform, event-based and cross-platform, replacing Universal Analytics." },
  { term: "Google Tag Manager (GTM)", category: "Analytics & Data", slug: "gtm", definition: "A free tool for managing and deploying marketing tags and tracking scripts without editing code directly." },
  { term: "Looker Studio", category: "Analytics & Data", slug: "looker-studio", definition: "Google's free data visualisation tool for creating shareable dashboards from GA4, Search Console, and other sources." },
  { term: "Bounce Rate", category: "Analytics & Data", slug: "bounce-rate", definition: "The percentage of sessions in which a user left the site without interacting. High bounce rates can indicate poor UX or irrelevant traffic." },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const categories = [...new Set(glossaryTerms.map(t => t.category))];

export default function GlossaryClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    let terms = glossaryTerms;
    if (activeCategory) terms = terms.filter(t => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      terms = terms.filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    }
    return terms;
  }, [search, activeCategory]);

  const byLetter = useMemo(() => {
    const map: Record<string, typeof glossaryTerms> = {};
    filtered.forEach(t => {
      const l = t.term[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(t);
    });
    return map;
  }, [filtered]);

  const scrollToLetter = (letter: string) => {
    letterRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="w-full bg-[#050508] min-h-screen">

      {/* HERO */}
      <section className="w-full min-h-[60svh] flex flex-col justify-center pt-40 pb-16 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ GLOSSARY ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 7vw, 100px)" }}>
          Every term you'll<br />ever need to know<br /><span className="text-[#6B6B72]">about digital.</span>
        </h1>
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveCategory(null); }}
          placeholder="Search 200+ terms..."
          className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-6 py-4 max-w-[540px] outline-none focus:border-[#C8F135] transition-colors placeholder:text-[#6B6B72] mt-4"
        />
      </section>

      {/* A–Z NAV + CATEGORY FILTERS */}
      <div className="sticky top-0 z-20 bg-[#050508]/90 backdrop-blur border-y border-[#222228]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-4 flex flex-col gap-3">
          {/* A–Z */}
          <div className="flex flex-wrap gap-1">
            {alphabet.map(l => (
              <button key={l}
                onClick={() => scrollToLetter(l)}
                className={`font-[family-name:var(--font-body)] text-[11px] w-7 h-7 flex items-center justify-center transition-colors ${byLetter[l] ? "text-[#F2F2F0] hover:text-[#C8F135]" : "text-[#333338]"}`}>
                {l}
              </button>
            ))}
          </div>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveCategory(null)}
              className={`font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest px-3 py-1 border ${!activeCategory ? "border-[#C8F135] text-[#C8F135]" : "border-[#222228] text-[#6B6B72] hover:border-[#C8F135]"}`}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest px-3 py-1 border ${activeCategory === cat ? "border-[#C8F135] text-[#C8F135]" : "border-[#222228] text-[#6B6B72] hover:border-[#C8F135]"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TERM GRID */}
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-16">
        {Object.keys(byLetter).sort().map(letter => (
          <div key={letter} ref={el => { letterRefs.current[letter] = el; }} className="mb-12">
            <div className="font-[family-name:var(--font-display)] font-bold text-[64px] text-[#0E0E13] leading-none mb-4 select-none">{letter}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {byLetter[letter].map(t => (
                <Link href={`/glossary/${t.slug}`} key={t.slug}
                  className="block p-5 border border-[#1A1A1F] hover:border-[#C8F135] transition-colors group">
                  <div className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#F2F2F0] mb-1 group-hover:text-[#C8F135] transition-colors">{t.term}</div>
                  <div className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest mb-2">{t.category}</div>
                  <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] leading-relaxed line-clamp-2">{t.definition}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] py-12">No terms found for "{search}"</p>
        )}
      </div>
    </main>
  );
}
