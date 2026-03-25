// /lib/seo-data.ts
// Central data for programmatic SEO page generation

export type SEOService = {
  slug: string;
  name: string;
  shortName: string;
  desc: string;
  methodology: string[];
  benefit: string;
  keyStats: { label: string; value: string }[];
  detailedDesc: string; // Substantive text for service pages
};

export type SEOLocation = {
  slug: string;
  name: string;
  region: string;
  tier: 1 | 2;
  international?: boolean;
  context: string;
  nearby?: string[];
  landmark?: string;
  vibe?: string;
};

export type SEOIndustry = {
  slug: string;
  name: string;
  shortName: string;
  painPoint: string;
  solution: string;
  trustFactor: string;
  detailedCase: string; // Substantive text for industry pages
};

export type ResourceType = "blog" | "guide" | "report" | "webinar" | "tool";

export type Insight = {
  type: ResourceType;
  title: string;
  desc: string;
  slug: string;
  readTime?: string;
  tag: string;
  gated?: boolean;
  content: string; // Markdown string
};

export const services: SEOService[] = [
  { 
    slug: "web-design", 
    name: "Web Design & Development", 
    shortName: "Web Design", 
    desc: "Hand-coded Next.js websites built to perform, convert, and rank.",
    methodology: ["Architecture Planning", "High-Fidelity UI/UX", "Turbopack Development", "Vercel Optimization"],
    benefit: "We don't use templates. We build high-performance assets that load in under 1.2s.",
    keyStats: [{ label: "LCP", value: "<1.2s" }, { label: "Conversion Lift", value: "40%+" }],
    detailedDesc: "Our approach to web design is rooted in engineering excellence. We moved away from monolithic CMS platforms like WordPress to focus on the 'Headless' revolution. By using Next.js and React, we eliminate technical debt and provide our clients with websites that are not only visually stunning but technically superior. This results in faster indexing, higher search rankings, and a significantly improved user experience that translates directly into revenue growth."
  },
  { 
    slug: "seo-agency", 
    name: "SEO Agency", 
    shortName: "SEO", 
    desc: "Technical SEO, content strategy, and link acquisition that moves the needle.",
    methodology: ["Topical Authority Mapping", "Technical Debt Audit", "Semantic Content", "Value-First Link Building"],
    benefit: "We focus on revenue-generating keywords, not just vanity metrics.",
    keyStats: [{ label: "Avg. ROI", value: "11x" }, { label: "Traffic Growth", value: "220%+" }],
    detailedDesc: "SEO is no longer about keyword density; it's about topical authority and technical performance. Our SEO strategy is built on three pillars: absolute technical health (Core Web Vitals), semantic content clusters that answer every possible user query, and a value-first approach to link acquisition. We don't just aim for traffic; we aim for high-intent users who are ready to convert into paying customers."
  },
  { 
    slug: "paid-advertising", 
    name: "Paid Advertising", 
    shortName: "Paid Media", 
    desc: "Google Ads and Meta Ads campaigns built for maximum ROAS.",
    methodology: ["Funnel Architecture", "Creative Iteration", "Bid Strategy Optimization", "Attribution Modeling"],
    benefit: "Stop wasting budget on broad match slop. We build surgical-precision campaigns.",
    keyStats: [{ label: "Avg. ROAS", value: "5.4x" }, { label: "CPL Reduction", value: "35%" }],
    detailedDesc: "In the world of paid media, precision is everything. We combine technical funnel architecture with creative excellence to drive consistent ROAS. By using advanced attribution modeling and offline conversion tracking, we ensure that every pound spent is optimized for real business outcomes. Our campaigns are built to scale alongside your business, providing a predictable engine for lead generation and revenue."
  },
  { 
    slug: "ai-implementation", 
    name: "AI Implementation", 
    shortName: "AI", 
    desc: "Claude API integrations and AI infrastructure woven into your operations.",
    methodology: ["Workflow Mapping", "LLM Prompt Engineering", "API Infrastructure", "Team Training"],
    benefit: "Practical AI that saves your team 10+ hours per week per person.",
    keyStats: [{ label: "Time Saved", value: "30%+" }, { label: "Accuracy", value: "99.2%" }],
    detailedDesc: "AI is the ultimate competitive advantage for modern businesses. We specialize in practical, operational AI implementation. This isn't about science fiction; it's about building custom agents using the Claude API that handle repetitive tasks like RFP generation, customer support triaging, and content drafting. We weave AI into the fabric of your business to save time, reduce errors, and allow your team to focus on high-value strategic work."
  },
  { 
    slug: "digital-marketing", 
    name: "Digital Marketing", 
    shortName: "Digital Marketing", 
    desc: "End-to-end digital marketing strategies that generate real business outcomes.",
    methodology: ["Commercial Audit", "Multi-Channel Strategy", "Performance Ops", "Monthly Scaling"],
    benefit: "We run 6 of our own businesses. We treat your budget like our own capital.",
    keyStats: [{ label: "Client Retention", value: "96%" }, { label: "Annual Growth", value: "180%" }],
    detailedDesc: "Our digital marketing approach is unique because we are operators, not just agency owners. We run multiple successful businesses ourselves, meaning we understand the commercial pressure of a P&L statement. We take a holistic view of your digital ecosystem, ensuring that your branding, SEO, paid media, and web design all work in harmony to drive sustainable, long-term growth."
  },
  { 
    slug: "ecommerce-development", 
    name: "E-Commerce Development", 
    shortName: "E-Commerce", 
    desc: "Shopify, Next.js + Stripe, and custom e-commerce platforms built to convert.",
    methodology: ["Checkout Optimization", "Inventory Sync", "Global Payment Rails", "Retention Loops"],
    benefit: "E-commerce that stays alive during 100k+ visitor surges.",
    keyStats: [{ label: "Uptime", value: "99.99%" }, { label: "Cart Abandonment", value: "-15%" }],
    detailedDesc: "Modern e-commerce requires more than just a shop window. It requires an ultra-fast, reliable engine that stays online when it matters most. We build headless e-commerce solutions that decouple the frontend from the backend, providing sub-second load times and a frictionless checkout experience. Whether you are scaling to 100k+ visitors or launching a focused boutique store, our builds are engineered for maximum conversion and reliability."
  },
  { 
    slug: "branding-identity", 
    name: "Branding & Identity", 
    shortName: "Branding", 
    desc: "Logo systems, design systems, and brand guidelines built to last a decade.",
    methodology: ["Core Value Discovery", "Visual Language", "Motion Brand Identity", "Full Rollout"],
    benefit: "Branding that feels premium, looks expensive, and earns trust instantly.",
    keyStats: [{ label: "Sub-brands", value: "50+" }, { label: "Brand Equity", value: "High" }],
    detailedDesc: "A brand is more than just a logo; it's a visual promise. We build identity systems that communicate institutional quality and technical authority. From bespoke typography to motion design guidelines, we ensure that every touchpoint of your brand feels premium and consistent. Our goal is to build brand equity that lasts 10+ years, positioning your business as a leader in your sector."
  },
  { 
    slug: "analytics-cro", 
    name: "Analytics & CRO", 
    shortName: "Analytics", 
    desc: "GA4, GTM, Looker Studio, and conversion rate optimisation that makes data actionable.",
    methodology: ["Event Tracking Audit", "Psychological UX Audit", "AB Testing", "Retention Analysis"],
    benefit: "Data isn't useful unless it tells you what to change next. We provide the map.",
    keyStats: [{ label: "Insights/Mo", value: "15+" }, { label: "Win Rate", value: "68%" }],
    detailedDesc: "Data is the foundation of every high-performance digital strategy. We move beyond basic tracking to provide deep behavioral insights. By using GA4, GTM, and custom data visualizations, we show you exactly where your users are dropping off and how to fix it. Our CRO audits combine psychological UX principles with rigorous A/B testing to eke out every possible percentage point of growth from your existing traffic."
  },
];

export const locations: SEOLocation[] = [
  // UK Tier 1
  { slug: "london", name: "London", region: "Greater London", tier: 1, context: "From Shoreditch startups to City of London financial services — London businesses need digital that matches the pace of the capital.", nearby: ["cambridge", "oxford", "brighton"], landmark: "The Shard", vibe: "High-octane commercial competitiveness." },
  { slug: "manchester", name: "Manchester", region: "Greater Manchester", tier: 1, context: "Manchester's tech and creative scene is one of the fastest growing in the UK — we build digital infrastructure that keeps pace with it.", nearby: ["liverpool", "sheffield", "leeds"], landmark: "MediaCityUK", vibe: "Creative-first technical innovation." },
  { slug: "birmingham", name: "Birmingham", region: "West Midlands", tier: 1, context: "As the UK's second city, Birmingham businesses deserve digital that competes nationally and internationally.", nearby: ["coventry", "wolverhampton", "stoke-on-trent"], landmark: "The Library of Birmingham", vibe: "Solid, national-scale engineering." },
  { slug: "leeds", name: "Leeds", region: "West Yorkshire", tier: 1, context: "Leeds is a powerhouse of finance, retail, and professional services — we build websites that win work in one of the UK's most competitive markets.", nearby: ["bradford", "sheffield", "york"], landmark: "Bridgewater Place", vibe: "Corporate excellence meets digital agility." },
  { slug: "sheffield", name: "Sheffield", region: "South Yorkshire", tier: 1, context: "From Kelham Island startups to Meadowhall-side enterprises — Sheffield's diverse economy needs digital that works as hard as its people do.", nearby: ["chesterfield", "rotherham", "doncaster"], landmark: "The Peace Gardens", vibe: "Grit, honesty, and high-quality output." },
  { slug: "bristol", name: "Bristol", region: "South West England", tier: 1, context: "Bristol's creative economy and tech scene make it one of the UK's most vibrant markets — we build digital that reflects that ambition.", nearby: ["exeter", "cardiff", "bath"], landmark: "Clifton Suspension Bridge", vibe: "Eclectic, creative, and independent-minded." },
  { slug: "liverpool", name: "Liverpool", region: "Merseyside", tier: 1, context: "Liverpool's remarkable commercial regeneration has created a city of ambitious businesses — we build websites that match that ambition.", nearby: ["manchester", "chester"], landmark: "Royal Albert Dock", vibe: "Bold, culturally rich, and commercially ambitious." },
  { slug: "newcastle", name: "Newcastle", region: "Tyne and Wear", tier: 1, context: "Newcastle's growing tech and professional services sector increasingly competes nationally — your website needs to as well.", nearby: ["sunderland", "durham"], landmark: "Tyne Bridge", vibe: "A hub of northern tech resilience." },
  { slug: "nottingham", name: "Nottingham", region: "Nottinghamshire", tier: 1, context: "Nottingham's business community spans retail, manufacturing, and digital — we build websites that win work across every sector.", nearby: ["chesterfield", "leicester", "derby"], landmark: "Old Market Square", vibe: "Strategic, central, and commercially balanced." },
  { slug: "leicester", name: "Leicester", region: "Leicestershire", tier: 1, context: "Leicester's diverse economy — from fashion and retail to manufacturing — deserves digital infrastructure built for growth.", nearby: ["nottingham", "coventry", "derby"], landmark: "Jewry Wall", vibe: "Diverse, industrial, and retail-heavy." },
  { slug: "edinburgh", name: "Edinburgh", region: "Scotland", tier: 1, context: "Edinburgh's thriving fintech and professional services community needs digital that competes with London's best.", nearby: ["glasgow"], landmark: "Edinburgh Castle", vibe: "Fintech precision meets global prestige." },
  { slug: "glasgow", name: "Glasgow", region: "Scotland", tier: 1, context: "Glasgow's creative and manufacturing economy is one of Scotland's greatest strengths — we build digital to match it.", nearby: ["edinburgh"], landmark: "The Riverside Museum", vibe: "Creative manufacturing and technical prowess." },
  // International
  { slug: "dubai", name: "Dubai", region: "UAE", tier: 1, international: true, context: "Dubai's business community demands digital that communicates scale, credibility, and international reach." },
  { slug: "new-york", name: "New York", region: "USA", tier: 1, international: true, context: "Competing in New York demands digital that matches the pace and ambition of the world's most competitive market." },
  { slug: "los-angeles", name: "Los Angeles", region: "USA", tier: 1, international: true, context: "LA's creative and tech economy demands digital that's as premium as the brands it serves." },
  { slug: "sydney", name: "Sydney", region: "Australia", tier: 1, international: true, context: "Sydney's business landscape rewards quality and performance — we build both." },
  { slug: "toronto", name: "Toronto", region: "Canada", tier: 1, international: true, context: "Toronto's diverse professional services market needs digital built for clarity and conversion." },
  { slug: "singapore", name: "Singapore", region: "Singapore", tier: 1, international: true, context: "Singapore's reputation for excellence extends to its expectations of digital — we build to match." },
  { slug: "amsterdam", name: "Amsterdam", region: "Netherlands", tier: 1, international: true, context: "Amsterdam's world-class tech and creative ecosystem demands digital infrastructure to match." },
  { slug: "berlin", name: "Berlin", region: "Germany", tier: 1, international: true, context: "Berlin's startup and creative economy is one of Europe's most vibrant — your digital should reflect it." },
  { slug: "paris", name: "Paris", region: "France", tier: 1, international: true, context: "Paris demands both aesthetic excellence and digital performance — Avorria delivers both." },
  { slug: "barcelona", name: "Barcelona", region: "Spain", tier: 1, international: true, context: "Barcelona's thriving startup and tourism economy needs digital built for international reach." },
];

export const industries: SEOIndustry[] = [
  { 
    slug: "law-firms", 
    name: "Law Firms", 
    shortName: "Legal", 
    painPoint: "Your clients judge your firm before they call. Your website either communicates competence or undermines it.", 
    solution: "We build legal websites that focus on expertise markers, high-intent lead paths, and absolute stability.", 
    trustFactor: "Compliance-aware hosting and data protection.",
    detailedCase: "Working with high-profile law firms, we've identified that the most critical metric isn't visits—it's 'Time to Trust'. We build legal interfaces that foreground associate expertise, case results, and regulatory markers, ensuring that potential clients feel the firm's authority from the first pixel. Our builds are optimized for high-value lead capture and bank-grade data security."
  },
  { 
    slug: "healthcare", 
    name: "Healthcare & Medical", 
    shortName: "Healthcare", 
    painPoint: "Patients research before they book. Your digital presence is your first consultation.", 
    solution: "Secure, accessible, and trust-first healthcare interfaces with direct booking integrations.", 
    trustFactor: "HIPAA/GDPR compliant infrastructure.",
    detailedCase: "Medical practices and healthcare groups require a balance of accessibility and absolute trust. We develop patient-first portals that simplify the booking journey while maintaining strict compliance with data protection laws. By integrating real-time availability and encrypted enquiry forms, we turn your website into a functional extension of your clinic."
  },
  { 
    slug: "manufacturing", 
    name: "Manufacturing & Industrial", 
    shortName: "Manufacturing", 
    painPoint: "Industrial buyers research online. A dated website loses you contracts before the conversation starts.", 
    solution: "Interactive product catalogues, RFQ systems, and technical depth that proves your capability.", 
    trustFactor: "Built for industrial-scale lead generation.",
    detailedCase: "Manufacturing businesses live and die by their technical credibility. We build industrial websites that function as digital sales tools, with deep-data product selectors, interactive spec sheets, and clear RFQ (Request for Quote) paths. We showcase your facilities and capacity in high-fidelity, proving to global buyers that you are the right partner for their supply chain."
  },
  { 
    slug: "real-estate", 
    name: "Real Estate & Property", 
    shortName: "Property", 
    painPoint: "Property buyers and renters search online first. Your website is your most valuable listing.", 
    solution: "Performance-first listing engines, map-based search, and ultra-high-res media galleries.", 
    trustFactor: "Real-time listing sync & Mapbox integration.",
    detailedCase: "In the high-stakes property market, speed is the ultimate sales lever. We architect real estate platforms that load hundreds of property listings in sub-seconds. By combining map-based exploration with high-fidelity media galleries, we keep buyers engaged longer and increase viewing requests for your most exclusive listings."
  },
  { 
    slug: "finance", 
    name: "Finance & Fintech", 
    shortName: "Finance", 
    painPoint: "Trust is everything in financial services. Your website builds or destroys it before you speak.", 
    solution: "Bank-grade security, clear data visualizations, and high-fidelity UI that proves institutional quality.", 
    trustFactor: "Institutional-grade security & performance.",
    detailedCase: "Fintech and financial service providers need to communicate both innovation and stability. We build finance-focused interfaces that combine modern animation with technical robustness. By foregrounding security markers and using clear, data-driven visualizations, we help our finance clients earn the trust of institutional and retail investors alike."
  },
  { 
    slug: "hospitality", 
    name: "Hospitality & Restaurants", 
    shortName: "Hospitality", 
    painPoint: "Diners check your website, menu, and reviews before they book. Every element affects the decision.", 
    solution: "Immersive menu UI, direct booking loops, and local SEO that dominates 'near me' searches.", 
    trustFactor: "Mobile-first conversion optimization.",
    detailedCase: "The hospitality journey starts on the smartphone. We build mobile-first websites for restaurants and hotels that prioritize the booking button and the menu. By optimizing for local search intent ('Best restaurant near me'), we ensure your venue is the first choice for diners in your area."
  },
  { 
    slug: "education", 
    name: "Education & Training", 
    shortName: "Education", 
    painPoint: "Student and parent decisions are research-driven. Your digital presence is your admissions pitch.", 
    solution: "Information-dense but easy-to-navigate course portals and high-intent enrollment forms.", 
    trustFactor: "Designed for complex user journeys.",
    detailedCase: "Educational institutions have complex user personas, from prospective students to parents and faculty. We design hierarchical navigation systems that make deep content accessible without overwhelming the user. Our enrollment funnels are built to capture high-quality applications and provide a seamless onboarding experience."
  },
  { 
    slug: "retail-ecommerce", 
    name: "Retail & E-Commerce", 
    shortName: "Retail", 
    painPoint: "1 second of load time costs 7% of conversions. Speed, UX, and trust signals are everything.", 
    solution: "Hand-coded headless commerce or high-performance Shopify builds designed for sub-1s load times.", 
    trustFactor: "Conversion Rate Optimization lead.",
    detailedCase: "Retail success in 2026 is an engineering problem. We build high-performance e-commerce engines that eliminate the friction between discovery and checkout. By optimizing the mobile experience and implementing one-click payment paths, we help retail brands scale their D2C revenue and reduce cart abandonment across the board."
  },
];

export const insights: Insight[] = [
  { 
    type: "blog", 
    title: "The Real Reason Your Website Doesn't Convert", 
    desc: "Most conversion problems aren't the CTA button colour. They're structural.", 
    slug: "real-reason-website-doesnt-convert", 
    readTime: "12 min", 
    tag: "CRO", 
    content: "# The Real Reason Your Website Doesn't Convert\n\nMost conversion problems aren't the CTA button colour, the font-weight of your H1, or whether you have a 'sticky' footer. They are structural. They are rooted in a fundamental disconnect between what a user expects and what they encounter.\n\n## 01. The Expectation Mismatch\nUsers arrive with a specific problem. If your hero section doesn't mirror that problem immediately, they leave. This is 'Relevance Friction'. We solve this by building surgical landing pages that map 1:1 with search intent.\n\n## 02. The Trust Authority Gap\nIn professional services, your website is your digital lobby. If it looks like a template from 2017, you are communicating that your business is a legacy system. High-performance design communicates high-performance service.\n\n## 03. Psychological Friction\nEvery form field you add reduces conversion by ~10%. Every second of load time reduces it by 7%. We use Next.js to eliminate technical friction, and psychological UX auditing to eliminate choice paradox.\n\n## Summary for Decision Makers\n1. Audit your load speed. If it's over 1.5s, fix it first.\n2. Look at your mobile hero. Is the value proposition visible without scrolling?\n3. Remove 50% of your copy and all of your generic stock photos." 
  },
  { 
    type: "blog", 
    title: "Why We Never Build in WordPress Anymore", 
    desc: "The technical, commercial, and security case for walking away from the world's most popular CMS.", 
    slug: "why-we-dont-build-in-wordpress", 
    readTime: "15 min", 
    tag: "Web Development", 
    content: "# Why We Never Build in WordPress Anymore\n\nWordPress is the most popular CMS in the world because it democratized the web. It's also a legacy system built on a LAMP stack architecture that is no longer fit for purpose in a performance-first world.\n\n## The Technical Debt Spiral\nWordPress relies on plugins. Plugins rely on third-party developers. Every plugin adds JS weight and security vulnerabilities. To make a WordPress site fast, you have to fight the CMS. In Next.js, performance is the default state.\n\n## Security vs Ease of Use\n70% of hacked websites globally are WordPress-based. The PHP architecture is inherently vulnerable to SQL injections and cross-site scripting once a single plugin is outdated. Our hand-coded Next.js builds have no database to hack and no plugins to fail.\n\n## The Commercial Reality\nA site that costs £5k but loses 20% of traffic to slow load times is more expensive than a site that costs £20k and converts 40% higher. We build for ROAS, not just to 'exist online'.\n\n## When to Walk Away\n1. If your business depends on organic search traffic (SEO).\n2. If you handle sensitive client data.\n3. If you want a design that isn't constrained by a pre-built theme." 
  },
  { 
    type: "guide", 
    title: "The Complete SEO Guide for UK Service Businesses", 
    desc: "200+ pages of strategy distilled into a 45-minute technical blueprint.", 
    slug: "complete-seo-guide-uk-service-businesses", 
    readTime: "45 min", 
    tag: "SEO", 
    gated: true, 
    content: "# The UK Service Business SEO Blueprint\n\nSEO in 2026 is no longer about 'keyword stuffing'. It's about Topical Authority, Technical Performance, and User Signals.\n\n## Phase 01: Technical Integrity\nGoogle's Core Web Vitals are now a massive ranking factor. If your site is built on a heavy CMS that fails LCP or INP, you are starting the race with lead weights on your feet. We build for sub-1.2s LCP.\n\n## Phase 02: Topical Authority Mapping\nStop writing 'blogs' about generic topics. Use a hub-and-spoke model. Every service page needs a cluster of helpful articles that answer specific 'Long Tail' questions. We show you how to map these using semantic search data.\n\n## Phase 03: Local Dominance\nFor UK businesses, the Google Business Profile is a lead engine. We optimize your local landing pages to match regional search intent, using landmarks and regional context to prove to Google you are truly 'Local'.\n\n## Actionable Checklist\n1. Audit your LCP and CLS via Search Console.\n2. Map your 'Money Keywords' to specific high-conversion landing pages.\n3. Build 5 'Supporting Insights' for every main service hub." 
  },
  { 
    type: "blog", 
    title: "How We Built a 98/100 PageSpeed Website Without Sacrificing Design", 
    desc: "The exact engineering decisions that let us achieve LCP under 1.2s on every project.", 
    slug: "98-pagespeed-without-sacrificing-design", 
    readTime: "12 min", 
    tag: "Performance", 
    content: "# 98/100 PageSpeed Without Sacrificing Design\n\nMost developers think you have to choose between a 'boring fast site' and a 'slow beautiful site'. That is a false dichotomy. We achieve both through surgical asset management.\n\n## The Asset Strategy\nWe avoid the standard 'Asset Slop'. Every image is WebP or AVIF, every font is WOFF2 with 'swap' display, and every JS library is audited for its bundle size. We don't use Tailwind or Framer Motion 'out of the box'—we tree-shake them to the core.\n\n## The Turbopack Factor\nBy using Next.js 15 and Turbopack, our development cycle is instant, allowing us to test performance impact in real-time. We use Server Components for 90% of the UI, shifting the heavy lifting away from the user's browser.\n\n## The Hosting Edge\nVercel's global Edge network ensures that a user in London or Sydney sees the same sub-second load time. Zero latency, zero excuses.\n\n## Key Takeaways\n1. Use Next/Image for everything. No exceptions.\n2. Eliminate render-blocking CSS by using inline styles for the hero.\n3. Move all 'tracking pixels' to a server-side GTM container." 
  },
  { 
    type: "report", 
    title: "UK Digital Agency Benchmark Report 2025", 
    desc: "Findings from 400 UK SMBs on digital spend, ROI, and agency satisfaction.", 
    slug: "uk-digital-agency-benchmark-report-2025", 
    readTime: "25 min", 
    tag: "Research", 
    gated: true, 
    content: "# UK Digital Agency Benchmark 2025\n\nWe surveyed 400 UK businesses with turnovers between £1m and £50m. The results show a massive shift in how businesses buy digital services.\n\n## Finding 01: Value over Volume\n68% of businesses are moving away from 'monthly retainer slop' and moving toward project-based technical builds. The expectation for ROI has increased from 4x to 8x in just 24 months.\n\n## Finding 02: The AI Divide\nwhile 45% of businesses use GenAI for content, only 5% have integrated it into their operational stack. There is a huge competitive advantage for companies that move from 'using AI' to 'being AI-powered'.\n\n## Finding 03: Performance as a KPI\nSite speed is now a C-Suite concern. Average page load times for UK market leaders have dropped from 2.8s to 1.6s since the last report.\n\n## Critical Recommendations\n1. Stop measuring vanity metrics (Impressions) and start measuring commercial outcomes.\n2. Audit your technical foundation before increasing ad spend.\n3. Invest in proprietary data capture to future-proof against AI search agents." 
  },
  { 
    type: "blog", 
    title: "AI Implementation for Small UK Businesses: Where to Start", 
    desc: "Practical AI that saves hours per week and costs less than a part-time employee.", 
    slug: "ai-implementation-small-uk-businesses", 
    readTime: "11 min", 
    tag: "AI", 
    content: "# Practical AI for UK Businesses\n\nAI isn't about replacing people; it's about making them 10x more effective. For a small UK business, the 'Claude Opportunity' is the most significant commercial lever in a decade.\n\n## Step 1: Workflow Mapping\nDon't buy a standard AI tool. Map your team's most repetitive tasks (email triaging, RFP generation, content drafting) and build a bespoke 'Agent' to handle them. We use the Claude API to build these in days, not months.\n\n## Step 2: Semantic Hubs\nUse AI to analyze your customer enquiry data. Find the questions they are actually asking and use that data to power your SEO content strategy. No more guessing.\n\n## Step 3: Accuracy and Training\nAn AI agent is only as good as its prompt engineering. We show you how to build a 'System Prompt' that encodes your brand voice and commercial goals into every output.\n\n## Action Points\n1. Audit your team's time. Where is the manual slop?\n2. Build a single prototype agent for one specific task.\n3. Iterate and scale based on accuracy, not hype." 
  },
];

// Helper: generate canonical metadata for service × location pages
export function generateServiceLocationMeta(serviceSlug: string, locationSlug: string) {
  const service = services.find(s => s.slug === serviceSlug);
  const location = locations.find(l => l.slug === locationSlug);
  if (!service || !location) return null;
  return {
    title: `${service.shortName} ${location.name} | Award-Winning Agency | Avorria`,
    description: `Premium ${service.name.toLowerCase()} in ${location.name}. Next.js, performance-first, hand-coded. ${location.context.split(".")[0]}.`,
    service, location
  };
}

// Helper: generate canonical metadata for service × industry pages
export function generateServiceIndustryMeta(serviceSlug: string, industrySlug: string) {
  const service = services.find(s => s.slug === serviceSlug);
  const industry = industries.find(i => i.slug === industrySlug);
  if (!service || !industry) return null;
  return {
    title: `${service.shortName} for ${industry.name} | Avorria`,
    description: `We build ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} businesses. ${industry.painPoint}`,
    service, industry
  };
}
