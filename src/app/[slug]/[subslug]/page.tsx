import { services, locations, industries, generateServiceLocationMeta, generateServiceIndustryMeta } from "@/lib/seo-data";
import { faqSchema, localBusinessSchema, serviceSchema } from "@/lib/structured-data";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { slug: string; subslug: string }[] = [];
  services.forEach(service => {
    locations.forEach(location => {
      params.push({ slug: service.slug, subslug: location.slug });
    });
    industries.forEach(industry => {
      params.push({ slug: service.slug, subslug: industry.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; subslug: string }> }): Promise<Metadata> {
  const { slug, subslug } = await params;
  const locMeta = generateServiceLocationMeta(slug, subslug);
  if (locMeta) return { title: locMeta.title, description: locMeta.description };
  const indMeta = generateServiceIndustryMeta(slug, subslug);
  if (indMeta) return { title: indMeta.title, description: indMeta.description };
  return {};
}

export const revalidate = 86400;

export default async function UnifiedSEOPage({ params }: { params: Promise<{ slug: string; subslug: string }> }) {
  const { slug, subslug } = await params;
  const locMeta = generateServiceLocationMeta(slug, subslug);
  const indMeta = generateServiceIndustryMeta(slug, subslug);

  if (locMeta) {
    const { service, location } = locMeta;
    const faqs = [
      { question: `How much does ${service.shortName} cost in ${location.name}?`, answer: `Our ${service.shortName.toLowerCase()} services start from £8,000 for focused projects. Comprehensive builds with full SEO architecture typically fall between £15,000–£35,000.` },
      { question: `Do you have an office in ${location.name}?`, answer: `We're headquartered in Chesterfield and work with clients across the UK and internationally. ${location.name} is one of our most active markets.` },
      { question: `How long does a ${service.shortName} project take in ${location.name}?`, answer: `A focused marketing site typically takes 6–10 weeks; larger builds 12–16 weeks.` },
      { question: `Why choose Avorria for ${service.shortName} in ${location.name}?`, answer: `We run six businesses ourselves. We understand the bottom line, not just the code.` },
    ];
    const jsonLd = [faqSchema(faqs), localBusinessSchema(location.name)];
    
    return (
      <>
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <main className="w-full bg-[#050508] min-h-screen pb-24">
          <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ {service.shortName.toUpperCase()} · {location.name.toUpperCase()} ]</div>
            <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
              {service.shortName}<br /><span className="text-[#C8F135]">{location.name}.</span>
            </h1>
            <p className="font-[family-name:var(--font-body)] text-[16px] text-[#6B6B72] leading-relaxed max-w-[560px] mb-12">{location.context}</p>
            
            {/* Stats Block */}
            <div className="flex flex-wrap gap-12 mb-12 py-8 border-y border-[#222228]">
              {service.keyStats.map(stat => (
                <div key={stat.label}>
                  <div className="text-[9px] text-[#6B6B72] uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                  <div className="text-[20px] font-bold text-white">{stat.value}</div>
                </div>
              ))}
              <div>
                <div className="text-[9px] text-[#6B6B72] uppercase tracking-[0.2em] mb-1">Local Context</div>
                <div className="text-[20px] font-bold text-[#C8F135]">{location.landmark || "Regional Hub"}</div>
              </div>
            </div>

            <TransitionLink href="/start-a-project" className="inline-block w-max bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors" data-magnetic>GET A FREE QUOTE →</TransitionLink>
          </section>

          {/* Methodology */}
          <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24">
             <div className="text-[11px] text-[#6B6B72] uppercase tracking-[0.15em] mb-12">OUR PROCESS FOR {location.name.toUpperCase()}</div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.methodology.map((step, idx) => (
                  <div key={step} className="p-8 border border-[#222228] bg-[#0A0A0F]">
                    <div className="text-[10px] text-[#C8F135] mb-2">0{idx+1}</div>
                    <h3 className="text-[16px] font-bold text-white mb-2">{step}</h3>
                    <p className="text-[12px] text-[#6B6B72] leading-relaxed">Systematic {service.shortName.toLowerCase()} implementation for {location.name} businesses.</p>
                  </div>
                ))}
             </div>
          </section>

          <section className="w-full border-t border-[#222228] py-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
             <h2 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-12 text-[32px]">FAQs: {service.shortName} in {location.name}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {faqs.map(faq => (
                  <div key={faq.question} className="py-8 border-b border-[#1A1A1F]">
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F2F2F0] mb-4">{faq.question}</h3>
                    <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.8]">{faq.answer}</p>
                  </div>
                ))}
             </div>
          </section>
        </main>
      </>
    );
  }

  if (indMeta) {
    const { service, industry } = indMeta;
    const faqs = [
      { question: `Do you understand the ${industry.name} sector?`, answer: `Yes. Our founder operates businesses across multiple sectors including FM and hospitality. We know your market from the ground up.` },
      { question: `How long does a ${service.shortName} project take for ${industry.shortName}?`, answer: `Typically 6–10 weeks for focused builds, 12–16 weeks for complex integrations.` },
    ];
    const jsonLd = [faqSchema(faqs), serviceSchema({ name: `${service.name} for ${industry.name}`, description: `${service.desc} Specialised for ${industry.name} businesses.` })];

    return (
      <>
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <main className="w-full bg-[#050508] min-h-screen pb-24">
          <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ {service.shortName.toUpperCase()} · {industry.shortName.toUpperCase()} ]</div>
            <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
              {service.shortName}<br /><span className="text-[#C8F135]">for {industry.name}.</span>
            </h1>
            <p className="font-[family-name:var(--font-body)] text-[18px] text-[#F2F2F0] leading-relaxed max-w-[600px] mb-8">{industry.painPoint}</p>
            
            {/* Sector Specific Value Prop */}
            <div className="bg-[#0A0A0F] border-l-2 border-[#C8F135] p-10 mb-12">
               <h2 className="text-[24px] font-[family-name:var(--font-display)] font-bold text-white mb-4">The Avorria {industry.shortName} Solution</h2>
               <p className="text-[15px] text-[#6B6B72] leading-relaxed mb-6">{industry.solution}</p>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#C8F135] uppercase tracking-widest font-bold">Trust Vector:</span>
                  <span className="text-[13px] text-white italic">{industry.trustFactor}</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 py-12 border-y border-[#222228]">
               <div>
                  <div className="text-[9px] text-[#6B6B72] uppercase tracking-[0.2em] mb-4">The Avorria Difference</div>
                  <p className="text-[15px] text-[#F2F2F0] leading-relaxed italic border-l border-[#C8F135] pl-6">"{service.detailedDesc}"</p>
               </div>
               <div>
                  <div className="text-[9px] text-[#6B6B72] uppercase tracking-[0.2em] mb-4">Sector Focus</div>
                  <p className="text-[15px] text-[#6B6B72] leading-relaxed">{industry.detailedCase}</p>
               </div>
            </div>

            <TransitionLink href="/start-a-project" className="inline-block w-max bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors" data-magnetic>GET A FREE QUOTE →</TransitionLink>
          </section>

          {/* Service Methodology specifically for this sector */}
          <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 border-t border-[#222228]">
             <h2 className="text-[32px] font-[family-name:var(--font-display)] font-bold text-white mb-12">Our {service.shortName} Methodology for {industry.name}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {service.methodology.map((step, idx) => (
                  <div key={step} className="p-8 border border-[#1A1A1F] hover:border-[#C8F135] transition-colors">
                     <div className="text-[20px] font-bold text-[#333338] mb-4">0{idx+1}</div>
                     <h3 className="text-[16px] font-bold text-white mb-2">{step}</h3>
                     <p className="text-[12px] text-[#6B6B72]">{service.shortName} precision for {industry.shortName} workflows.</p>
                  </div>
                ))}
             </div>
          </section>
        </main>
      </>
    );
  }

  return null;
}
