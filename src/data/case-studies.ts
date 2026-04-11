export type CaseStudy = {
  slug: string;
  client: string;
  tagline: string;
  services: string[];
  sector: string;
  year: number;
  heroLabel: string;
  challenge: string;
  approach: string;
  solution: string;
  results: Array<{ metric: string; label: string }>;
  testimonial?: { quote: string; name: string; role: string };
  techStack?: string[];
  nextProject: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexus-group",
    client: "NEXUS GROUP",
    tagline: "Redefining the digital real estate experience.",
    services: ["WEB DESIGN", "SEO"],
    sector: "REAL ESTATE",
    year: 2024,
    heroLabel: "001 — REAL ESTATE",
    challenge: "Nexus Group was haemorrhaging leads through a legacy WordPress site that took over six seconds to load on mobile. Their premium property listings were invisible to Google, buried behind a bloated theme and thirty-seven active plugins. High-net-worth buyers were bouncing within two seconds — and going straight to competitors with faster, cleaner experiences.",
    approach: "We started with a full technical audit and conversion architecture review. The existing site had zero structured data, no Core Web Vitals optimisation, and a mobile experience that felt like it was designed in 2015. We mapped every high-intent keyword in their market, identified the twenty listings driving 80% of enquiries, and designed the entire UX around getting those properties in front of qualified buyers in under one second.",
    solution: "We architected a headless solution using Next.js with a custom property CMS. Every listing page loads in under 1.2 seconds with lazy-loaded high-res galleries and map-based search powered by Mapbox. Technical SEO was baked into the routing structure with programmatic location pages for every postcode they serve. We implemented full schema markup for real estate listings, driving rich results in Google.",
    results: [
      { metric: "+312%", label: "Organic Traffic" },
      { metric: "0.9s", label: "Average LCP" },
      { metric: "2×", label: "Mobile Conversions" },
      { metric: "80%", label: "Session Duration Increase" }
    ],
    testimonial: {
      quote: "Avorria didn't just redesign our site — they completely rebuilt our digital acquisition pipeline. Organic traffic is up 312% in six months and our cost per lead has halved.",
      name: "Marcus Chen",
      role: "Managing Director, Nexus Group"
    },
    techStack: ["Next.js 15", "React", "Tailwind CSS", "Mapbox", "Vercel", "Sanity CMS"],
    nextProject: "auralight"
  },
  {
    slug: "auralight",
    client: "AURALIGHT",
    tagline: "Automated content engines for e-commerce.",
    services: ["AI IMPLEMENTATION"],
    sector: "E-COMMERCE",
    year: 2024,
    heroLabel: "002 — E-COMMERCE",
    challenge: "Auralight's marketing team of three was manually writing fifty-plus product descriptions and social media posts every week. Brand voice was inconsistent across channels, creative burnout was setting in, and their time-to-market for new product launches had stretched to weeks instead of days. They were losing ground to competitors who were shipping content faster.",
    approach: "We mapped every content workflow in the business — from product launch briefs through to social scheduling. We identified that 70% of the team's time was spent on repetitive copy tasks that followed clear brand patterns. The solution wasn't replacing the team; it was amplifying them with AI infrastructure that handled the grunt work while they focused on strategy and creative direction.",
    solution: "We built a custom AI Content Engine using the Claude API, trained on Auralight's brand guidelines, tone of voice documentation, and two years of high-performing content. The system ingests product specs and generates brand-perfect copy across four channels — product pages, email, social, and ads — with a human-in-the-loop review interface built in React. The team now approves and schedules content instead of writing it from scratch.",
    results: [
      { metric: "20+", label: "Hours Saved Per Week" },
      { metric: "4×", label: "Content Production Speed" },
      { metric: "98%", label: "Brand Voice Alignment" },
      { metric: "£45k", label: "Annual Labour Saving" }
    ],
    testimonial: {
      quote: "The first agency we've worked with that actually understands performance. The AI system they built is now the backbone of our content operation.",
      name: "Sarah Jenkins",
      role: "Head of Marketing, Auralight Ltd"
    },
    techStack: ["Claude API", "Next.js", "React", "PostgreSQL", "Vercel", "Custom Dashboard"],
    nextProject: "velocity"
  },
  {
    slug: "velocity",
    client: "VELOCITY",
    tagline: "Scaling SaaS acquisition by 400%.",
    services: ["PAID MEDIA"],
    sector: "SAAS",
    year: 2025,
    heroLabel: "003 — SAAS",
    challenge: "Velocity was burning £15,000 per month on Google Ads with broad match strategies that attracted low-quality leads. Their cost per lead was unsustainable for a seat-based SaaS pricing model, and the sales team was drowning in unqualified demos. The previous agency had optimised for volume, not value — and it showed in the pipeline quality.",
    approach: "We rebuilt the attribution model from scratch. Instead of optimising for form fills, we connected Google Ads to their CRM pipeline data so the algorithm could learn which clicks actually became paying customers. We restructured the account into surgical exact-match ad groups, each with a dedicated landing page built for conversion, and implemented offline conversion tracking to feed real revenue data back to Google.",
    solution: "Complete Google Ads restructure with exact match keyword architecture, custom landing pages per ad group built in Next.js, and full offline conversion pipeline via the Google Ads API. We built a custom Looker Studio dashboard that shows ROAS at the keyword level, not just the campaign level. The sales team now receives leads that have been pre-qualified by the ad creative itself.",
    results: [
      { metric: "400%", label: "Return On Ad Spend" },
      { metric: "-45%", label: "Cost Per Lead" },
      { metric: "+30%", label: "SQL Rate Increase" },
      { metric: "£2.1M", label: "Pipeline Generated" }
    ],
    testimonial: {
      quote: "No fluff, no vanity metrics. They came in, tore down our old campaign structure, and built something that actually drives revenue. Our board is thrilled.",
      name: "James Whitfield",
      role: "VP Growth, Velocity"
    },
    techStack: ["Google Ads", "Looker Studio", "Next.js Landing Pages", "Google Ads API", "HubSpot CRM"],
    nextProject: "omni"
  },
  {
    slug: "omni",
    client: "OMNI",
    tagline: "Headless Shopify architecture that converts.",
    services: ["WEB DESIGN", "E-COMMERCE"],
    sector: "RETAIL",
    year: 2024,
    heroLabel: "004 — RETAIL",
    challenge: "Omni's standard Shopify theme was collapsing under the weight of twenty-plus apps. Core Web Vitals were failing across the board — LCP over four seconds, CLS through the roof — and their checkout experience on mobile was so clunky that cart abandonment had reached 78%. Every app they added to fix one problem created two more.",
    approach: "We proposed a complete frontend decoupling. Rather than fighting Shopify's Liquid templating engine, we would use Shopify purely as a headless backend — handling inventory, payments, and order management — while building a custom Next.js frontend that gave us total control over performance, design, and the checkout flow.",
    solution: "We built a headless Shopify storefront using Next.js and the Storefront API. The custom frontend loads in under one second, with zero layout shift and a streamlined one-page checkout. Product images are served via Next/Image with automatic AVIF conversion. We implemented predictive search, real-time inventory sync, and a custom cart that persists across sessions.",
    results: [
      { metric: "98/100", label: "PageSpeed Score" },
      { metric: "-15%", label: "Cart Abandonment" },
      { metric: "+22%", label: "Mobile Revenue" },
      { metric: "0.8s", label: "Time To Interactive" }
    ],
    techStack: ["Next.js 15", "Shopify Storefront API", "Tailwind CSS", "Vercel Edge", "Stripe"],
    nextProject: "lumina"
  },
  {
    slug: "lumina",
    client: "LUMINA",
    tagline: "Dominating local search markets across ten cities.",
    services: ["SEO", "PAID MEDIA"],
    sector: "PROFESSIONAL SERVICES",
    year: 2025,
    heroLabel: "005 — PROFESSIONAL SERVICES",
    challenge: "Lumina operates across ten UK cities but had a single-page website with no local landing pages, no Google Business Profile optimisation, and zero visibility in local search results. They were entirely dependent on word-of-mouth referrals and had no digital pipeline to speak of. Competitors with inferior services were outranking them everywhere.",
    approach: "We built a programmatic SEO strategy targeting every service-location combination that Lumina operates in. Each page was written with genuine local context — not just 'Service + City' keyword stuffing. We optimised all ten Google Business Profiles, built a citation network, and launched targeted Google Ads campaigns in the three highest-value cities to drive immediate pipeline while the organic strategy matured.",
    solution: "Forty-plus unique local SEO landing pages built with Next.js, each with localised content, FAQ schema markup, and embedded maps. Full Google Business Profile optimisation across ten locations with review generation workflows. Google Ads campaigns with location-specific landing pages drove immediate leads in London, Manchester, and Birmingham while organic rankings climbed.",
    results: [
      { metric: "#1", label: "Rankings Across 10 Cities" },
      { metric: "5×", label: "Organic Lead Volume" },
      { metric: "340%", label: "Google Ads ROAS" },
      { metric: "40+", label: "Page-One Keywords" }
    ],
    testimonial: {
      quote: "We went from invisible to dominant in local search within six months. The combination of SEO and paid media was exactly what we needed to scale nationally.",
      name: "Rachel Thornton",
      role: "Commercial Director, Lumina Group"
    },
    techStack: ["Next.js 15", "Programmatic SEO", "Google Ads", "Google Business Profile", "Looker Studio"],
    nextProject: "dales-and-peaks"
  },
  {
    slug: "dales-and-peaks",
    client: "DALES & PEAKS",
    tagline: "Dominating Chesterfield property search.",
    services: ["WEB DESIGN", "SEO"],
    sector: "ESTATE AGENCY",
    year: 2025,
    heroLabel: "006 — ESTATE AGENCY",
    challenge: "Dales & Peaks is a boutique estate agency in Chesterfield competing against Rightmove, Zoopla, and national chains with million-pound marketing budgets. Their existing website was a template from a property CMS provider — identical to dozens of other agencies. They had no organic visibility for local property search terms and relied entirely on portal listings to generate enquiries.",
    approach: "We focused on what the portals couldn't offer: a premium, branded experience that made vendors choose Dales & Peaks for their listing, not just their price. We built a bespoke property search with better UX than the portals, optimised for every local keyword combination ('houses for sale in Chesterfield', '3 bed semi Brimington'), and created a content hub positioning the founders as local property market experts.",
    solution: "Custom Next.js website with a premium property search engine, interactive map views, and neighbourhood guides for every area they serve. Each property page is optimised for long-tail search with full schema markup. We built a local content strategy around monthly market reports and area guides that now rank for forty-plus local keywords, driving vendor instruction leads directly.",
    results: [
      { metric: "#1", label: "For 40+ Local Keywords" },
      { metric: "3×", label: "Vendor Instructions" },
      { metric: "98", label: "PageSpeed Score" },
      { metric: "-60%", label: "Portal Dependency" }
    ],
    testimonial: {
      quote: "For the first time, we're generating our own leads instead of paying the portals for them. The website pays for itself every single month.",
      name: "Tom Ashworth",
      role: "Director, Dales & Peaks"
    },
    techStack: ["Next.js 15", "Tailwind CSS", "Mapbox", "Sanity CMS", "Vercel"],
    nextProject: "aes-automotive"
  },
  {
    slug: "aes-automotive",
    client: "AES AUTOMOTIVE",
    tagline: "Generating leads from every Derbyshire postcode.",
    services: ["WEB DESIGN", "SEO"],
    sector: "AUTOMOTIVE",
    year: 2025,
    heroLabel: "007 — AUTOMOTIVE",
    challenge: "AES Automotive is a mobile auto electrician covering the whole of Derbyshire. Their entire online presence was a Facebook page and a Google Business listing with three reviews. They were losing work to competitors who turned up first in search results — even though AES had better skills, faster response times, and lower prices. The phone simply wasn't ringing enough.",
    approach: "For a mobile trade business, the strategy is different from enterprise. We needed to dominate 'near me' searches and build trust instantly. We focused on three things: a fast, professional website that made AES look like the premium choice; local SEO pages for every major town and postcode area in Derbyshire; and a Google review generation system that turned every happy customer into a five-star review.",
    solution: "Clean, fast Next.js website with click-to-call CTAs above the fold on mobile. Fifteen local landing pages covering Chesterfield, Derby, Matlock, Belper, Ashbourne, and surrounding areas — each with unique content and local references. Automated review request system via SMS that tripled their Google review count in ninety days. Google Business Profile fully optimised with service area mapping.",
    results: [
      { metric: "3×", label: "Call Volume In 90 Days" },
      { metric: "45+", label: "Five-Star Google Reviews" },
      { metric: "#1", label: "For Auto Electrician Derbyshire" },
      { metric: "£0", label: "Ongoing Ad Spend Required" }
    ],
    testimonial: {
      quote: "I went from quiet weeks to turning work away. The phone rings every day now. Best money I've ever spent on the business.",
      name: "Andy Sheldon",
      role: "Owner, AES Automotive"
    },
    techStack: ["Next.js 15", "Tailwind CSS", "Google Business Profile", "Twilio SMS", "Vercel"],
    nextProject: "nexus-group"
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

export function getNextCaseStudy(currentSlug: string): CaseStudy | undefined {
  const current = getCaseStudy(currentSlug);
  if (!current) return undefined;
  return getCaseStudy(current.nextProject);
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
  return caseStudies.filter(cs => cs.services.includes(service));
}
