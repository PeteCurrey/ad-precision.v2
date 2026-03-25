import { insights, ResourceType } from "@/lib/seo-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightContentClient from "./InsightContentClient";

export async function generateStaticParams() {
  return insights.map((insight) => ({
    type: insight.type,
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: ResourceType; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((i) => i.slug === slug);
  if (!insight) return { title: "Not Found" };

  return {
    title: `${insight.title} | Avorria Insights`,
    description: insight.desc,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ type: ResourceType; slug: string }> }) {
  const { type, slug } = await params;
  const insight = insights.find((i) => i.slug === slug && i.type === type);

  if (!insight) notFound();

  const otherInsights = insights
    .filter((i) => i.slug !== slug)
    .slice(0, 3);

  return (
    <main className="w-full bg-[#050508] min-h-screen pb-24">
      {/* Article Hero */}
      <section className="w-full pt-48 pb-24 px-[var(--gutter)] max-w-[1000px] mx-auto border-b border-[#222228]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase">[ {insight.type.toUpperCase()} ]</span>
            <span className="text-[#333338]">|</span>
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-[0.15em]">{insight.tag}</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(32px,6vw,64px)] text-[#F2F2F0] leading-[1.1] tracking-tight">
            {insight.title}
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[#F2F2F0] text-[18px] leading-relaxed max-w-[700px] opacity-80">
            {insight.desc}
          </p>
          <div className="flex items-center gap-6 pt-6 border-t border-[#1A1A1F] mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#6B6B72] uppercase tracking-widest mb-1">MARCH 2026</span>
              <span className="text-[12px] text-white font-bold uppercase">AVORRIA RESEARCH</span>
            </div>
            {insight.readTime && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#6B6B72] uppercase tracking-widest mb-1">READ TIME</span>
                <span className="text-[12px] text-white font-bold uppercase">{insight.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Content Handler */}
      <InsightContentClient insight={insight} otherInsights={otherInsights} />
    </main>
  );
}
