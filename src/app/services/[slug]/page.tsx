import { servicePages } from "@/data/services-data";
import { caseStudies } from "@/data/case-studies";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return servicePages.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find(s => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.name} | Avorria`,
    description: service.subheadline,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find(s => s.slug === slug);
  if (!service) notFound();

  const relatedWork = service.relatedCaseStudySlugs
    .map(s => caseStudies.find(cs => cs.slug === s))
    .filter(Boolean);

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase">[ SERVICE {service.number} ]</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(40px, 6vw, 90px)" }}>
          {service.headline}
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[20px] text-[#6B6B6B] leading-relaxed max-w-[600px] mb-12">
          {service.subheadline}
        </p>
        <TransitionLink
          href="/start-a-project"
          className="w-max bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-[#9DB82A] transition-colors"
          data-magnetic
        >
          START YOUR PROJECT →
        </TransitionLink>
      </section>

      {/* ─── DESCRIPTION ─── */}
      <section className="w-full border-t border-[#1E1E1E] py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-6">THE APPROACH</div>
            <p className="font-[family-name:var(--font-display)] text-[18px] text-[#F5F5F0] leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-[#111111] border border-[#1E1E1E] p-12 text-center">
              <span className="font-[family-name:var(--font-display)] font-bold text-[100px] leading-none text-[#1E1E1E]">{service.number}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES ─── */}
      <section className="w-full bg-[#111111] py-24 px-[var(--gutter)] border-y border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-[0.2em] mb-8">WHAT YOU GET</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((d, i) => (
              <div key={i} className="border border-[#1E1E1E] hover:border-[#C8F135] transition-colors p-8 bg-[#0A0A0A]">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F5F5F0] mb-3">{d.name}</h3>
                <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B] leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="w-full py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4">HOW IT WORKS</div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-16" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div key={p.step} className="flex flex-col gap-4 py-8 border-t border-[#1E1E1E]">
                <span className="font-[family-name:var(--font-body)] text-[#C8F135] text-[11px] uppercase tracking-widest">{p.step}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0]">{p.title}</h3>
                <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B6B] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROOF — RELATED CASE STUDIES ─── */}
      {relatedWork.length > 0 && (
        <section className="w-full bg-[#111111] py-24 px-[var(--gutter)] border-y border-[#1E1E1E]">
          <div className="max-w-[1400px] mx-auto">
            <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-8">PROOF</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedWork.map((cs) => cs && (
                <TransitionLink
                  key={cs.slug}
                  href={`/work/${cs.slug}`}
                  className="group bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#C8F135] transition-colors p-8 flex flex-col gap-4"
                  data-cursor-text="VIEW →"
                >
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{cs.services.join(" · ")}</span>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">{cs.client}</h3>
                  <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed">{cs.tagline}</p>
                  <div className="flex gap-6 mt-auto pt-4 border-t border-[#1E1E1E]">
                    {cs.results.slice(0, 2).map(r => (
                      <div key={r.label}>
                        <div className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#C8F135]">{r.metric}</div>
                        <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PRICING SIGNAL ─── */}
      <section className="w-full py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4">INVESTMENT</div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            Transparent Pricing
          </h2>
          <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed mb-12 max-w-[500px]">
            Every project is unique, but here&#39;s a clear starting point so you know what to expect.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.pricing.map(p => (
              <div key={p.tier} className={`border p-8 flex flex-col gap-6 ${p.tier === "Growth" ? "border-[#C8F135] bg-[#111111]" : "border-[#1E1E1E]"}`}>
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{p.tier}</span>
                <div className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#F5F5F0]">{p.range}</div>
                <ul className="flex flex-col gap-2">
                  {p.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B]">
                      <span className="text-[#C8F135] leading-none mt-0.5">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="w-full border-t border-[#1E1E1E] py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-12" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {service.faqs.map(faq => (
              <div key={faq.question} className="py-6 border-b border-[#1E1E1E]">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F5F5F0] mb-3">{faq.question}</h3>
                <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B6B] leading-[1.8]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-24 border-t border-[#1E1E1E] text-center px-[var(--gutter)]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] mb-8" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
          Ready to start?
        </h2>
        <TransitionLink
          href="/start-a-project"
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[16px] uppercase px-12 py-6 hover:bg-[#9DB82A] transition-colors"
          data-magnetic
        >
          START YOUR PROJECT →
        </TransitionLink>
      </section>
    </main>
  );
}
