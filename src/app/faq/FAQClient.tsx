"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = { q: string; a: string };

const faqData: Record<string, FAQ[]> = {
  Pricing: [
    { q: "How much does a website cost from Avorria?", a: "Our websites start at £8,000 for a lean marketing site (up to 10 pages, Next.js, Sanity CMS, deployed to Vercel). A comprehensive site with multiple service pages, blog, SEO architecture, and custom animations typically falls between £15,000–£35,000. Enterprise builds are quoted individually. Every project includes discovery, design, development, testing, launch, and a handover documentation session." },
    { q: "Do you offer payment plans?", a: "Yes. For projects over £10,000, we typically structure payments as: 30% on kick-off, 40% at design sign-off, 30% on launch. For larger engagements, we can discuss monthly phased payments." },
    { q: "Are there ongoing costs after launch?", a: "Your main ongoing costs are hosting (Vercel Pro: ~£15–20/month), CMS (Sanity free tier covers most sites, Pro from ~£80/month), and your domain (~£10–15/year). We also offer optional monthly retainers from £500/month covering updates, SEO, analytics, and ongoing development." },
    { q: "Why are your sites more expensive than a Webflow or WordPress agency?", a: "Because they're not the same product. A hand-coded Next.js site on Vercel performs, scales, and converts differently. Our sites score 98+ on PageSpeed, rank on Google without fighting the platform, and you own every line of code. You're not paying for a template — you're paying for a revenue engine." },
  ],
  "Web Design": [
    { q: "How long does a website take to build?", a: "A focused marketing site takes 6–10 weeks from kick-off to launch. Larger projects with complex integrations run 12–16 weeks. We'll define the timeline precisely at the discovery stage." },
    { q: "What do you need from us before starting?", a: "Brand guidelines (or we'll handle branding), copywriting (or we'll help extract it), any existing assets, access to analytics, and a clear brief of your target audience and commercial goals." },
    { q: "Do you work with our existing brand guidelines?", a: "Yes. We work within your existing brand system. If you don't have one, we can create it as part of the project." },
    { q: "What CMS will we use to manage content?", a: "Sanity v3 in almost all cases. It's the most capable, flexible CMS available and we'll train your team to use it at handover. For clients with specific data sovereignty requirements, we offer Payload CMS v3." },
    { q: "Can we update the website ourselves after launch?", a: "Yes. We build and configure Sanity so your team can manage pages, blog posts, case studies, and service content independently. We provide documentation and a training session at handover." },
  ],
  SEO: [
    { q: "How long does SEO take to work?", a: "Technical SEO improvements can show impact within weeks. Content and link acquisition compounds over 3–6 months. For new domains or heavily penalised sites, expect 6–12 months to see meaningful organic traffic growth." },
    { q: "What results can we realistically expect?", a: "Our median client achieves 4× organic traffic in year 1. More importantly, they achieve a measurable increase in leads and enquiries from organic — which is what actually matters. We agree targets at the start of every engagement." },
    { q: "Do you guarantee first page rankings?", a: "No. Any agency that guarantees specific rankings is misleading you — Google doesn't work that way. We guarantee a transparent process, agreed KPIs, and monthly reporting that tells you exactly what's changed and why." },
    { q: "Can you recover a site from a Google penalty?", a: "Yes. We've recovered several clients from both manual and algorithmic penalties. It requires a full technical audit, link analysis, and in some cases a disavow file. Recovery timelines are typically 3–6 months post-remediation." },
  ],
  "AI Implementation": [
    { q: "What AI systems do you build with?", a: "Primarily Anthropic's Claude API and OpenAI's GPT-4o. We also build with LangChain, Pinecone, Supabase pgvector, and N8N for workflow automation. The toolchain depends on the use case." },
    { q: "Is our data safe when using AI?", a: "Yes. We use enterprise API tiers with data processing agreements in place. Your data is never used to train public models. For highly regulated industries, we can run models on your own infrastructure." },
    { q: "What's a realistic AI project for a small business?", a: "A single automated workflow — for example, lead qualification, invoice processing, or content drafting — typically starts at £8,000. That's a meaningful starting point that delivers measurable ROI within 30–60 days." },
    { q: "How long does an AI implementation project take?", a: "A focused single-workflow automation typically takes 4–6 weeks. Enterprise AI programmes with multiple integration points run 3–6 months. We scope precisely at discovery." },
  ],
  "Paid Advertising": [
    { q: "What budget do we need to start Google Ads?", a: "We recommend a minimum of £3,000/month in ad spend to achieve statistically meaningful data for optimisation. Below that, results are often inconclusive. Our management fee is charged separately." },
    { q: "How do you report on paid media performance?", a: "Weekly dashboards in Looker Studio showing spend, clicks, conversions, CPA, and ROAS. Monthly strategy calls. You always have access to the raw accounts — no locked-in reporting." },
    { q: "What's a realistic ROAS expectation?", a: "This depends heavily on your sector, margin, and audience size. Across our client base, we maintain an average of 3.8× ROAS. For e-commerce brands with good margins, we regularly achieve 5–8×." },
  ],
  Technology: [
    { q: "Why do you build in Next.js rather than WordPress?", a: "Performance, security, developer experience, and ownership. WordPress is a content management system adapted into a web framework. Next.js is a purpose-built full-stack framework. Our sites score 98+ on PageSpeed. WordPress sites routinely score 40–65. The difference isn't cosmetic — it affects your SEO, your bounce rate, and your paid media CPC." },
    { q: "What is Sanity CMS?", a: "Sanity is a headless CMS — a content management platform that separates your content from your presentation layer. You manage content in a clean, customisable Studio interface (built in React), and your Next.js site fetches it via API. This gives you complete design freedom and content portability." },
    { q: "Can you work with our existing tech stack?", a: "In most cases yes. We audit what you have, assess what's worth keeping, and recommend the most pragmatic path forward. We're experienced with most major platforms and can integrate with most APIs and databases." },
  ],
  "Working With Avorria": [
    { q: "Where are you based?", a: "We're headquartered in Chesterfield, Derbyshire. Our team is distributed across 9 cities in 7 countries — we work effectively with clients across the UK and internationally." },
    { q: "Do you work with international clients?", a: "Yes. We work with clients in London, Dubai, Barcelona, Singapore, and more. Time zones and distance have never been a blocker — we communicate via structured weekly updates, video calls, and shared design/dev environments." },
    { q: "Who will we actually be working with?", a: "A named senior team member from day one. You'll have a dedicated account director managing delivery, and direct access to the lead designer and developer on your project. No juniors handed a brief they haven't written." },
    { q: "What's the first step in starting a project?", a: "Fill in our Start a Project form — this takes about 5 minutes and gives us everything we need to prepare a meaningful first conversation. We'll come back to you within one working day to schedule a 30-minute discovery call." },
  ],
};

const categories = Object.keys(faqData);

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-l-2 transition-colors duration-300 cursor-pointer ${open ? "border-[#C8F135]" : "border-[#222228]"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-start justify-between gap-6 py-6 px-6">
        <h3 className="font-[family-name:var(--font-body)] font-bold text-[13px] text-[#F2F2F0] leading-relaxed flex-1">{q}</h3>
        <span className={`font-[family-name:var(--font-display)] text-[20px] transition-transform duration-300 flex-none mt-0.5 ${open ? "rotate-45 text-[#C8F135]" : "text-[#6B6B72]"}`}>+</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B72] leading-[1.9] px-6 pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState("Pricing");
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return Object.values(faqData).flat().filter(faq =>
        faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
      );
    }
    return faqData[activeCategory] ?? [];
  }, [search, activeCategory]);

  return (
    <main className="w-full bg-[#050508] min-h-screen">

      {/* HERO */}
      <section className="w-full min-h-[60svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ FAQ ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          Questions.<br /><span className="text-[#C8F135]">Answered.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed max-w-[500px] mb-10">
          No waffle. No ambiguity. If your question isn't here, we'll answer it in 24 hours.
        </p>
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search any question..."
          className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-6 py-4 max-w-[540px] outline-none focus:border-[#C8F135] transition-colors placeholder:text-[#6B6B72]"
        />
      </section>

      {/* CONTENT */}
      <section className="w-full border-t border-[#222228] py-16">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          {/* Category pills */}
          {!search && (
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-all duration-200 ${activeCategory === cat ? "bg-[#C8F135] text-[#050508] border-[#C8F135]" : "text-[#6B6B72] border-[#222228] hover:border-[#C8F135]"}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {search && (
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest mb-8">
              {filteredFaqs.length} results for "{search}"
            </div>
          )}

          <div className="flex flex-col gap-2">
            {filteredFaqs.map(faq => (
              <FAQItem key={faq.q} {...faq} />
            ))}
            {filteredFaqs.length === 0 && (
              <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] py-12">
                No results found. <a href="/contact" className="text-[#C8F135] underline">Contact us directly →</a>
              </p>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
