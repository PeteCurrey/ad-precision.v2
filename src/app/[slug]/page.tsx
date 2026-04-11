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
    <main className="w-full bg-[#0A0A0A] min-h-screen text-[#F5F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(location.name)) }} />
      
      {/* ─── HERO ─── */}
      <section className="w-full min-h-[80svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ REGIONAL HUB · {location.name.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(48px, 10vw, 150px)" }}>
          Avorria<br /><span className="text-[#6B6B6B]">{location.name}.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[20px] text-[#6B6B6B] leading-relaxed max-w-[700px] mb-16">{location.context}</p>
        
        {location.landmark && (
          <div className="flex flex-col md:flex-row md:items-center gap-8 py-8 border-y border-[#1E1E1E]">
            <div className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">LOCAL CONTEXT</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0]">{location.landmark}</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-[#1E1E1E]" />
            <div className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">REGIONAL VIBE</span>
              <span className="font-[family-name:var(--font-display)] italic text-[18px] text-[#6B6B6B] uppercase">{location.vibe}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map(s => (
            <TransitionLink key={s.slug} href={`/${s.slug}/${location.slug}`}
              className="group p-10 border border-[#1E1E1E] bg-[#111111] hover:border-[#C8F135] transition-all duration-500 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                 <h3 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] text-[18px] group-hover:text-[#C8F135] transition-colors leading-[1.1]">{s.shortName} in {location.name}</h3>
                 <span className="text-[#C8F135] text-[20px] translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
              </div>
              <p className="font-[family-name:var(--font-display)] text-[13px] text-[#6B6B6B] leading-relaxed flex-1">{s.desc}</p>
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest mt-4">DISCOVER SERVICE →</span>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceHub({ service }: { service: SEOService }) {
  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen pb-24 text-[#F5F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: service.name, description: service.desc })) }} />
      
      {/* ─── HERO ─── */}
      <section className="w-full min-h-[85svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ SERVICE HUB · {service.shortName.toUpperCase()} ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(64px, 12vw, 200px)" }}>
          {service.shortName}<span className="text-[#C8F135]">.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[24px] md:text-[32px] text-[#6B6B6B] leading-[1.1] max-w-[900px] mb-16">{service.desc}</p>
        
        {/* Key Stats Block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-12 border-y border-[#1E1E1E] mb-20">
          {service.keyStats.map(stat => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">{stat.label}</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[32px] md:text-[48px] text-[#C8F135] leading-none">{stat.value}</span>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">AVAILABILITY</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-[32px] md:text-[48px] text-[#F5F5F0] leading-none">Q2 &apos;26</span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="max-w-[1000px] grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20 items-start">
           <div className="font-[family-name:var(--font-display)] text-[20px] md:text-[24px] text-[#6B6B6B] leading-relaxed italic border-l-2 border-[#C8F135] pl-10">
              &quot;{service.detailedDesc}&quot;
           </div>
           <TransitionLink 
             href="/start-a-project" 
             className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase px-12 py-6 tracking-widest hover:bg-[#F5F5F0] transition-colors text-center"
             data-magnetic
           >
             WORK WITH US →
           </TransitionLink>
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 md:py-40 border-t border-[#1E1E1E]">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-16">01. OUR ARCHITECTURAL BLUEPRINT</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.methodology.map((step, idx) => (
            <div key={step} className="p-10 border border-[#1E1E1E] bg-[#111111] flex flex-col gap-6 group hover:border-[#C8F135] transition-colors">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] font-bold">PHASE 0{idx + 1}</span>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors">{step}</h3>
              <p className="font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] leading-relaxed">Systematic execution designed for scale, speed, and absolute reliability for our {service.shortName.toLowerCase()} clients.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NATIONWIDE REACH ─── */}
      <section className="max-w-[1400px] mx-auto px-[var(--gutter)] py-24 md:py-40 border-t border-[#1E1E1E]">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-16">02. REGIONAL PRECISION</div>
        <div className="flex flex-wrap gap-4">
          {locations.slice(0, 20).map(l => (
            <TransitionLink key={l.slug} href={`/${service.slug}/${l.slug}`}
              className="px-8 py-5 border border-[#1E1E1E] font-[family-name:var(--font-display)] text-[12px] font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-[#C8F135] hover:border-[#C8F135] transition-all duration-300">
              {service.shortName} / {l.name}
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
