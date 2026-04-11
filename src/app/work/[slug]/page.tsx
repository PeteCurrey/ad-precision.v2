import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/data/case-studies";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: `${cs.client} — ${cs.tagline}`,
    description: `Case study: ${cs.tagline} ${cs.results[0]?.metric} ${cs.results[0]?.label}.`,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const nextCs = getNextCaseStudy(slug);
  const otherProjects = caseStudies.filter(c => c.slug !== slug).slice(0, 3);

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen text-[#F5F5F0]">

      {/* ─── 1. HERO ─── */}
      <section className="w-full min-h-[90svh] flex flex-col justify-end pt-40 pb-16 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-widest">{cs.heroLabel}</span>
            <span className="text-[#1E1E1E]">|</span>
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest">{cs.services.join(" · ")}</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.88] -tracking-[0.02em] mb-8" style={{ fontSize: "clamp(48px, 10vw, 140px)" }}>
            {cs.tagline}
          </h1>

          {/* Key stat callout */}
          <div className="flex flex-wrap gap-8 mt-8 py-8 border-y border-[#1E1E1E]">
            {cs.results.map(r => (
              <div key={r.label} className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[52px] text-[#C8F135] leading-none">{r.metric}</span>
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. CHALLENGE / SOLUTION ─── */}
      <section className="w-full py-24 px-[var(--gutter)] border-t border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-6">THE CHALLENGE</div>
            <p className="font-[family-name:var(--font-display)] text-[20px] text-[#F5F5F0] leading-relaxed">{cs.challenge}</p>
          </div>
          <div>
            <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-6">OUR APPROACH</div>
            <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed">{cs.approach}</p>
          </div>
        </div>
      </section>

      {/* ─── 3. SOLUTION DEEP DIVE ─── */}
      <section className="w-full bg-[#111111] py-24 px-[var(--gutter)] border-y border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-[0.2em] mb-6">THE SOLUTION</div>
          <p className="font-[family-name:var(--font-display)] text-[18px] text-[#F5F5F0] leading-relaxed max-w-[800px]">{cs.solution}</p>

          {/* Tech Stack */}
          {cs.techStack && (
            <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-[#1E1E1E]">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest mr-4 self-center">BUILT WITH</span>
              {cs.techStack.map(tech => (
                <span key={tech} className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] border border-[#1E1E1E] px-3 py-1.5 uppercase tracking-wider">{tech}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 4. RESULTS ─── */}
      <section className="w-full py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-[0.2em] mb-12">KEY OUTCOMES</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cs.results.map(r => (
              <div key={r.label} className="flex flex-col gap-2 py-8 border-t border-[#1E1E1E]">
                <span className="font-[family-name:var(--font-display)] font-bold text-[48px] md:text-[64px] text-[#C8F135] leading-none">{r.metric}</span>
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. TESTIMONIAL ─── */}
      {cs.testimonial && (
        <section className="w-full bg-[#111111] py-24 px-[var(--gutter)] border-y border-[#1E1E1E]">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="font-[family-name:var(--font-display)] font-bold text-[80px] text-[#C8F135] opacity-20 leading-none mb-[-40px] select-none">&ldquo;</div>
            <blockquote className="font-[family-name:var(--font-display)] text-[20px] md:text-[28px] text-[#F5F5F0] leading-relaxed mb-8 relative z-10">
              {cs.testimonial.quote}
            </blockquote>
            <div className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#F5F5F0]">{cs.testimonial.name}</span>
              <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest">{cs.testimonial.role}</span>
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. NEXT PROJECT + MORE WORK ─── */}
      <section className="w-full py-24 px-[var(--gutter)] border-t border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto">
          {/* Next Project */}
          {nextCs && (
            <TransitionLink
              href={`/work/${nextCs.slug}`}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between w-full py-12 border-b border-[#1E1E1E] hover:border-[#C8F135] transition-colors mb-16"
            >
              <div className="flex flex-col gap-2">
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">NEXT PROJECT</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[32px] md:text-[48px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">{nextCs.client}</h3>
                <span className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B] uppercase tracking-widest">{nextCs.services.join(" · ")}</span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-[80px] text-[#1E1E1E] group-hover:text-[#C8F135] transition-colors leading-none">→</span>
            </TransitionLink>
          )}

          {/* More Work */}
          <h3 className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest mb-8">MORE WORK</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map(p => (
              <TransitionLink
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group bg-[#111111] border border-[#1E1E1E] hover:border-[#C8F135] transition-colors p-8 flex flex-col gap-4"
                data-cursor-text="VIEW →"
              >
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{p.services.join(" · ")}</span>
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">{p.client}</h4>
                <p className="font-[family-name:var(--font-display)] text-[13px] text-[#6B6B6B] leading-relaxed">{p.tagline}</p>
                <div className="flex gap-4 mt-auto pt-4 border-t border-[#1E1E1E]">
                  <span className="font-[family-name:var(--font-display)] font-bold text-[#C8F135] text-[16px]">{p.results[0]?.metric}</span>
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest self-center">{p.results[0]?.label}</span>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-16 border-t border-[#1E1E1E] text-center px-[var(--gutter)]">
        <TransitionLink
          href="/start-a-project"
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-[#9DB82A] transition-colors"
          data-magnetic
        >
          START YOUR PROJECT →
        </TransitionLink>
      </section>
    </main>
  );
}
