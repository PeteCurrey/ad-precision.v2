import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

const MOCK_WORK = [
  { 
    slug: "nexus-group",
    client: "NEXUS GROUP", 
    tags: ["WEB DESIGN", "SEO"], 
    title: "Redefining the digital real estate experience.", 
    stat: "+312% organic traffic",
    problem: "Nexus Group was struggling with a legacy WordPress site that took over 6 seconds to load. Their high-value property listings were being buried by slow search performance and poor mobile UX.",
    solution: "We architected a headless solution using Next.js and a custom CMS. We optimized listing high-res media using Next/Image and implemented a lightning-fast map search. Technical SEO was baked into the routing structure.",
    results: "312% increase in organic reach within 4 months. Average session duration increased by 80%. Mobile conversion rate doubled."
  },
  { 
    slug: "auralight",
    client: "AURALIGHT", 
    tags: ["AI IMPLEMENTATION"], 
    title: "Automated content engines for e-commerce.", 
    stat: "20hrs/week saved",
    problem: "Auralight's marketing team was manually drafting 50+ product descriptions and social posts per week, leading to creative burnout and inconsistent brand voice.",
    solution: "We built a custom AI Content Engine using the Claude API. The system ingest product specs and generates brand-perfect copy across 4 channels instantly. We included a human-in-the-loop review interface.",
    results: "Saved 20+ hours of manual work per week. Production speed increased by 400%. Brand consistency reached a verified 98% alignment."
  },
  { 
    slug: "velocity",
    client: "VELOCITY", 
    tags: ["PAID MEDIA"], 
    title: "Scaling SaaS acquisition by 400%.", 
    stat: "400% ROAS",
    problem: "Velocity was burning £15k/month on Google Ads with 'broad match' strategies that brought in low-quality leads. Their CPL was unsustainable for their seat-based pricing model.",
    solution: "We rebuilt their account with a surgical 'Exact Match' hierarchy. We implemented offline conversion tracking to feed lead quality data back to the Google algorithm and built high-performance landing pages for every ad group.",
    results: "Achieved a stable 400% ROAS. CPL reduced by 45%. Lead quality increased, leading to a 30% higher sales-qualified lead (SQL) rate."
  },
  { 
    slug: "omni",
    client: "OMNI", 
    tags: ["WEB DESIGN", "E-COMMERCE"], 
    title: "headless Shopify architecture.", 
    stat: "98/100 PageSpeed",
    problem: "Omni's standard Shopify theme was struggling under the weight of 20+ apps, leading to sub-par Core Web Vitals and a clunky checkout experience.",
    solution: "We decoupled the frontend using Next.js and used Shopify as a headless backend. This removed the 'liquid' overhead and allowed us to build a custom, ultra-fast UI with zero layout shift.",
    results: "98/100 PageSpeed score. Cart abandonment dropped by 15%. Direct revenue from mobile users increased by 22%."
  },
];

export async function generateStaticParams() {
  return MOCK_WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_WORK.find((w) => w.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.client} Case Study | Avorria`,
    description: project.title,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = MOCK_WORK.find((w) => w.slug === slug);

  if (!project) notFound();

  return (
    <main className="w-full bg-[#050508] min-h-screen text-white">
      {/* Hero */}
      <section className="pt-48 pb-24 px-[var(--gutter)] max-w-[1200px] mx-auto border-b border-[#222228]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
             <span className="text-[11px] text-[#C8F135] uppercase tracking-widest font-[family-name:var(--font-body)]">{project.client}</span>
             <span className="text-[#333338]">/</span>
             <span className="text-[11px] text-[#6B6B72] uppercase tracking-widest font-[family-name:var(--font-body)]">{project.tags.join(' · ')}</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(40px,8vw,100px)] leading-[0.9] tracking-tight mb-8">
            {project.title}
          </h1>
          <div className="bg-[#C8F135] text-black w-max px-6 py-4 font-bold text-[18px]">
            {project.stat}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-[var(--gutter)] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
         <div className="flex flex-col gap-12">
            <div>
               <h2 className="text-[12px] text-[#6B6B72] uppercase tracking-[0.2em] mb-6">THE CHALLENGE</h2>
               <p className="text-[20px] text-[#F2F2F0] leading-relaxed opacity-80">{project.problem}</p>
            </div>
            <div>
               <h2 className="text-[12px] text-[#6B6B72] uppercase tracking-[0.2em] mb-6">THE SOLUTION</h2>
               <p className="text-[18px] text-[#6B6B72] leading-relaxed">{project.solution}</p>
            </div>
         </div>
         <div className="flex flex-col gap-12 bg-[#0A0A0F] border border-[#222228] p-12 justify-center">
            <h2 className="text-[12px] text-[#C8F135] uppercase tracking-[0.2em] mb-4">KEY OUTCOME</h2>
            <div className="text-[48px] font-[family-name:var(--font-display)] font-bold text-white mb-6 leading-tight">
               {project.stat}
            </div>
            <p className="text-[15px] text-[#6B6B72] leading-relaxed">{project.results}</p>
            <TransitionLink href="/start-a-project" className="mt-8 bg-[#C8F135] text-[#050508] font-bold text-[11px] uppercase py-4 text-center hover:bg-white transition-colors">
               SCALE YOUR BUSINESS →
            </TransitionLink>
         </div>
      </section>

      {/* Recommended */}
      <section className="py-24 px-[var(--gutter)] border-t border-[#222228]">
         <div className="max-w-[1200px] mx-auto">
            <h3 className="text-[11px] text-[#6B6B72] uppercase tracking-widest mb-12">SEE MORE WORK</h3>
            <div className="flex gap-12 overflow-x-auto pb-8 scrollbar-hide">
               {MOCK_WORK.filter(w => w.slug !== slug).map(w => (
                 <TransitionLink href={`/work/${w.slug}`} key={w.slug} className="min-w-[300px] group">
                    <div className="aspect-video bg-[#0A0A0F] border border-[#222228] mb-4 group-hover:border-[#C8F135] transition-colors" />
                    <h4 className="text-white font-bold group-hover:text-[#C8F135] transition-colors">{w.client}</h4>
                    <p className="text-[12px] text-[#6B6B72] uppercase tracking-widest mt-1">{w.tags[0]}</p>
                 </TransitionLink>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
