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

  if (locMeta) return <LocationServicePage locMeta={locMeta} />;
  if (indMeta) return <IndustryServicePage indMeta={indMeta} />;
  return null;
}

function LocationServicePage({ locMeta }: { locMeta: any }) {
  const { service, location } = locMeta;
  const faqs = [
    { question: `How much does ${service.shortName} cost in ${location.name}?`, answer: `Our ${service.shortName.toLowerCase()} services start from £8,000 for focused projects. Comprehensive builds with full SEO architecture typically fall between £15,000–£35,000.` },
    { question: `Do you have an office in ${location.name}?`, answer: `We're headquartered in Chesterfield and work with clients across the UK and internationally. ${location.name} is one of our most active markets.` },
    { question: `How long does a ${service.shortName} project take in ${location.name}?`, answer: `A focused marketing site typically takes 6–10 weeks; larger builds 12–16 weeks.` },
    { question: `Why choose Avorria for ${service.shortName} in ${location.name}?`, answer: `We run six businesses ourselves. We understand the commercial reality, not just the code.` },
  ];
  
  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen pb-24 text-[#F5F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema(faqs), localBusinessSchema(location.name)]) }} />
      
      {/* ─── HERO ─── */}
      <section className="w-full min-h-[85svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ {service.shortName.toUpperCase()} · {location.name.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(64px, 12vw, 180px)" }}>
          {service.shortName}<br /><span className="text-[#6B6B6B]">{location.name}.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[22px] md:text-[28px] text-[#6B6B6B] leading-[1.2] max-w-[800px] mb-16">{location.context}</p>
        
        {/* Stats Block */}
        <div className="flex flex-wrap gap-12 py-10 border-y border-[#1E1E1E] mb-20">
          {service.keyStats.map((stat: any) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">{stat.label}</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#C8F135]">{stat.value}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">HUB CONTEXT</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#F5F5F0]">{location.landmark || "Regional Focus"}</span>
          </div>
        </div>

        <TransitionLink 
          href="/start-a-project" 
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase px-14 py-6 tracking-widest hover:bg-[#F5F5F0] transition-colors"
          data-magnetic
        >
          START THE CONVERSATION →
        </TransitionLink>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 md:py-40 border-t border-[#1E1E1E]">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-16">THE {service.shortName.toUpperCase()} METHODOLOGY</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.methodology.map((step: any, idx: number) => (
            <div key={step} className="p-10 border border-[#1E1E1E] bg-[#111111] hover:border-[#C8F135] transition-colors group">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] font-bold">0{idx + 1}</span>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#F5F5F0] mt-4 mb-4">{step}</h3>
              <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed">Precision {service.shortName.toLowerCase()} execution tailored for the {location.name} commercial landscape.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="w-full border-t border-[#1E1E1E] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[52px] text-[#F5F5F0] mb-20">FAQs: {service.shortName} / {location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {faqs.map(faq => (
              <div key={faq.question} className="pb-12 border-b border-[#1E1E1E]">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0] mb-5 leading-tight">{faq.question}</h3>
                <p className="font-[family-name:var(--font-display)] text-[15px] text-[#6B6B6B] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function IndustryServicePage({ indMeta }: { indMeta: any }) {
  const { service, industry } = indMeta;
  const faqs = [
    { question: `Do you understand the ${industry.name} sector?`, answer: `Yes. Our founder operates businesses across multiple sectors including FM and hospitality. We know your market from the ground up.` },
    { question: `How long does a ${service.shortName} project take for ${industry.shortName}?`, answer: `Typically 6–10 weeks for focused builds, 12–16 weeks for complex integrations.` },
  ];
  const jsonLd = [faqSchema(faqs), serviceSchema({ name: `${service.name} for ${industry.name}`, description: `${service.desc} Specialised for ${industry.name} businesses.` })];

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen pb-24 text-[#F5F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* ─── HERO ─── */}
      <section className="w-full min-h-[85svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ {service.shortName.toUpperCase()} · {industry.shortName.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(56px, 10vw, 180px)" }}>
          {service.shortName}<br /><span className="text-[#6B6B6B]">for {industry.name}.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[22px] md:text-[28px] text-[#F5F5F0] leading-relaxed max-w-[800px] mb-12 italic opacity-80 border-l-2 border-[#C8F135] pl-10">
          {industry.painPoint}
        </p>
        
        {/* Industry Value Prop */}
        <div className="bg-[#111111] border border-[#1E1E1E] p-12 mb-16 max-w-[900px]">
           <h2 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#C8F135] mb-6">THE {industry.shortName.toUpperCase()} ARCHITECTURE</h2>
           <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed mb-8">{industry.solution}</p>
           <div className="flex flex-col md:flex-row md:items-center gap-4 pt-8 border-t border-[#1E1E1E]">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest font-bold">TRUST VECTOR</span>
              <span className="font-[family-name:var(--font-display)] text-[14px] text-[#F5F5F0] italic opacity-60">{industry.trustFactor}</span>
           </div>
        </div>

        <TransitionLink 
          href="/start-a-project" 
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase px-14 py-6 tracking-widest hover:bg-[#F5F5F0] transition-colors"
          data-magnetic
        >
          REQUEST SECTOR AUDIT →
        </TransitionLink>
      </section>

      {/* ─── TECHNICAL DEPTH ─── */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 md:py-40 border-t border-[#1E1E1E]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="flex flex-col gap-6">
               <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">COMMERCIAL REALITY</span>
               <p className="font-[family-name:var(--font-display)] text-[20px] md:text-[24px] text-[#F5F5F0] leading-relaxed italic opacity-90 border-l-2 border-[#C8F135] pl-10">
                 &quot;{service.detailedDesc}&quot;
               </p>
            </div>
            <div className="flex flex-col gap-6">
               <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">SECTOR SPECIFICATION</span>
               <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed">{industry.detailedCase}</p>
            </div>
         </div>
      </section>
    </main>
  );
}
