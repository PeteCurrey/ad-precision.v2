import { services, locations, SEOService, SEOLocation } from "@/lib/seo-data";
import { localBusinessSchema, serviceSchema } from "@/lib/structured-data";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  locations.forEach(l => params.push({ slug: l.slug }));
  services.forEach(s => params.push({ slug: s.slug }));
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find(l => l.slug === slug);
  if (location) {
    return {
      title: `Digital Agency in ${location.name} | Web Design & SEO | Avorria`,
      description: `Premium digital services in ${location.name}. ${location.context.split(".")[0]}.`,
    };
  }
  const service = services.find(s => s.slug === slug);
  if (service) {
    return {
      title: `${service.name} | Award-Winning Digital Agency | Avorria`,
      description: service.desc,
    };
  }
  return {};
}

export const revalidate = 86400;

export default async function TopLevelSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find(l => l.slug === slug);
  const service = services.find(s => s.slug === slug);

  if (location) return <LocationHub location={location} />;
  if (service) return <ServiceHub service={service} />;
  return null;
}

function LocationHub({ location }: { location: SEOLocation }) {
  return (
    <main className="w-full bg-[#050508] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(location.name)) }} />
      <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ REGIONAL HUB · {location.name.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          Avorria <br /><span className="text-[#C8F135]">{location.name}.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[16px] text-[#6B6B72] leading-relaxed max-w-[560px] mb-12">{location.context}</p>
        
        {location.landmark && (
          <div className="flex items-center gap-4 mb-12 py-4 border-y border-[#222228] w-max">
            <span className="text-[#6B6B72] text-[10px] uppercase tracking-widest">Local Context:</span>
            <span className="text-[#F2F2F0] text-[12px] font-bold uppercase tracking-wider">{location.landmark}</span>
            <span className="text-[#333338]">|</span>
            <span className="text-[#6B6B72] text-[12px] italic">{location.vibe}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s => (
            <TransitionLink key={s.slug} href={`/${s.slug}/${location.slug}`}
              className="p-8 border border-[#222228] bg-[#0A0A0F] hover:border-[#C8F135] transition-colors group">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-[16px] mb-4 group-hover:text-[#C8F135] transition-colors">{s.shortName} in {location.name} →</h3>
              <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] leading-relaxed">{s.desc}</p>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceHub({ service }: { service: SEOService }) {
  return (
    <main className="w-full bg-[#050508] min-h-screen pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: service.name, description: service.desc })) }} />
      
      {/* Hero */}
      <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ SERVICE HUB · {service.shortName.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          {service.shortName}<span className="text-[#C8F135]">.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[20px] text-[#F2F2F0] leading-relaxed max-w-[700px] mb-12">{service.desc}</p>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-8 border-y border-[#222228]">
          {service.keyStats.map(stat => (
            <div key={stat.label}>
              <div className="text-[10px] text-[#6B6B72] uppercase tracking-[0.2em] mb-2">{stat.label}</div>
              <div className="text-[24px] font-[family-name:var(--font-display)] font-bold text-[#C8F135]">{stat.value}</div>
            </div>
          ))}
          <div>
            <div className="text-[10px] text-[#6B6B72] uppercase tracking-[0.2em] mb-2">Availability</div>
            <div className="text-[24px] font-[family-name:var(--font-display)] font-bold text-[#F2F2F0]">Q2 2026</div>
          </div>
        </div>

        <div className="bg-[#0A0A0F] border border-[#222228] p-12 mb-16 max-w-[900px]">
           <h2 className="text-[11px] text-[#C8F135] uppercase tracking-[0.15em] mb-6">WHY AVORRIA FOR {service.shortName.toUpperCase()}?</h2>
           <p className="font-[family-name:var(--font-body)] text-[16px] text-[#6B6B72] leading-relaxed italic border-l border-[#C8F135] pl-8">
              "{service.detailedDesc}"
           </p>
        </div>

        <TransitionLink href="/start-a-project" className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors w-max">RESERVE A CONSULTATION →</TransitionLink>
      </section>

      {/* Methodology walkthrough */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24">
        <div className="text-[11px] text-[#6B6B72] uppercase tracking-[0.15em] mb-12">01. OUR METHODOLOGY</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.methodology.map((step, idx) => (
            <div key={step} className="p-8 border border-[#222228] bg-[#0A0A0F]">
              <div className="text-[10px] text-[#C8F135] mb-4">PHASE 0{idx + 1}</div>
              <h3 className="text-[18px] font-bold text-white mb-4">{step}</h3>
              <p className="text-[13px] text-[#6B6B72] leading-relaxed">Systematic execution designed for scale, speed, and absolute reliability.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations loop */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 border-t border-[#222228]">
        <div className="text-[11px] text-[#6B6B72] uppercase tracking-[0.15em] mb-12">02. NATIONWIDE SCALE</div>
        <div className="flex flex-wrap gap-4">
          {locations.slice(0, 12).map(l => (
            <TransitionLink key={l.slug} href={`/${service.slug}/${l.slug}`}
              className="text-[12px] border border-[#222228] px-6 py-4 hover:border-[#C8F135] hover:text-[#C8F135] transition-colors uppercase tracking-widest">
              {service.shortName} / {l.name}
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
