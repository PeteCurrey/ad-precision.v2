export type ServicePage = {
  slug: string;
  number: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  deliverables: Array<{ name: string; description: string }>;
  process: Array<{ step: string; title: string; description: string }>;
  pricing: Array<{ tier: string; range: string; includes: string[]; }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedCaseStudySlugs: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-design-development",
    number: "01",
    name: "WEB DESIGN & DEVELOPMENT",
    headline: "HAND-CODED. PIXEL-PERFECT. BUILT TO PERFORM.",
    subheadline: "Next.js, React, Tailwind. Deployed to Vercel. 98+ PageSpeed guaranteed.",
    description: "We don't use templates. We don't use page builders. Every line of code is written by our team, optimised for performance, and deployed on infrastructure that scales. The result is a website that loads in under a second, ranks higher, converts better, and makes your competitors look like they're still in 2019.",
    deliverables: [
      { name: "Custom Development", description: "Hand-coded Next.js with React — no templates, no WordPress, no shortcuts." },
      { name: "Figma to Code", description: "Pixel-perfect implementation of bespoke designs, approved before a single line is written." },
      { name: "CMS Integration", description: "Sanity, Contentful, or headless WordPress — you manage content, we manage performance." },
      { name: "Performance Optimisation", description: "98+ PageSpeed scores, sub-1.2s LCP, zero layout shift. Guaranteed." },
      { name: "Responsive Design", description: "Flawless across every device — designed mobile-first, scaled to ultrawide." },
      { name: "SEO Architecture", description: "Technical SEO baked into the routing, metadata, and content structure from day one." },
    ],
    process: [
      { step: "01", title: "DISCOVERY & STRATEGY", description: "We learn your business, audit your competitors, map your conversion architecture, and define the sitemap." },
      { step: "02", title: "DESIGN & PROTOTYPE", description: "High-fidelity Figma designs with interaction specs. Client-approved before development begins." },
      { step: "03", title: "DEVELOPMENT", description: "Hand-coded in Next.js with Tailwind CSS. Deployed to Vercel staging for real-device testing." },
      { step: "04", title: "LAUNCH & OPTIMISE", description: "Go live on Vercel's edge network. Post-launch: analytics setup, CRO tracking, and ongoing support." },
    ],
    pricing: [
      { tier: "Starter", range: "£3k – £8k", includes: ["5–8 page marketing site", "Custom Next.js build", "Basic CMS", "Mobile responsive", "SEO fundamentals"] },
      { tier: "Growth", range: "£8k – £25k", includes: ["10–20+ pages", "Advanced CMS with content modelling", "Custom animations (GSAP)", "Blog/insights section", "Conversion tracking setup", "3 months post-launch support"] },
      { tier: "Enterprise", range: "£25k+", includes: ["Complex web applications", "Multi-language", "E-commerce integrations", "Custom dashboards", "API integrations", "Dedicated project manager", "Ongoing retainer option"] },
    ],
    faqs: [
      { question: "How long does a website project take?", answer: "A focused marketing site typically takes 6–10 weeks. Larger builds with complex CMS requirements or e-commerce integrations take 12–16 weeks. We'll give you a precise timeline after the discovery phase." },
      { question: "Why don't you use WordPress?", answer: "WordPress is a 20-year-old PHP platform that requires plugins for everything, creates security vulnerabilities, and is fundamentally slow. We use Next.js because it's faster, more secure, and produces better results for your SEO and conversion rates." },
      { question: "Do I own the code?", answer: "Yes. 100%. Your code, your CMS, your data. We deploy to your Vercel account. You can take it to another developer tomorrow if you want. That's how it should be." },
      { question: "What does 98+ PageSpeed actually mean for my business?", answer: "Google uses page speed as a ranking factor. Faster sites rank higher, convert better, and cost less per click on Google Ads. Every second of load time you lose costs you approximately 7% of conversions." },
      { question: "Can you redesign my existing site?", answer: "Yes, but we don't patch old code. We rebuild from scratch using your existing brand assets and content. The result is a faster, more secure, higher-performing site built on modern infrastructure." },
      { question: "What about ongoing maintenance?", answer: "We offer monthly retainers starting at £500/month for hosting management, security updates, content changes, and performance monitoring. Most clients take this because it keeps their site in peak condition." },
    ],
    relatedCaseStudySlugs: ["nexus-group", "omni", "dales-and-peaks"],
  },
  {
    slug: "ai-implementation",
    number: "02",
    name: "AI IMPLEMENTATION",
    headline: "NOT CHATBOTS. INFRASTRUCTURE.",
    subheadline: "Claude API, GPT-4o, custom pipelines. Automation that saves 20+ hours a week.",
    description: "We don't bolt a chatbot onto your site and call it AI. We map your team's workflows, identify the repetitive tasks eating their time, and build bespoke AI infrastructure that handles them — faster, more consistently, and at a fraction of the cost. This is operational AI that shows up on your P&L, not your LinkedIn feed.",
    deliverables: [
      { name: "API Integrations", description: "Claude, GPT-4o, and custom model integrations wired directly into your business systems." },
      { name: "Automated Workflows", description: "RFP generation, content drafting, data processing — automated end-to-end with human review gates." },
      { name: "AI Dashboards", description: "Custom monitoring interfaces that show what your AI systems are producing and how they're performing." },
      { name: "Custom Tooling", description: "Bespoke AI tools built to your exact specifications — not off-the-shelf SaaS with a monthly subscription." },
      { name: "Prompt Engineering", description: "System prompts engineered for accuracy, consistency, and brand voice alignment." },
      { name: "Team Training", description: "We train your team to use, manage, and iterate on the AI systems we build." },
    ],
    process: [
      { step: "01", title: "WORKFLOW MAPPING", description: "We shadow your team, map every repetitive task, and identify the highest-ROI automation opportunities." },
      { step: "02", title: "PROTOTYPE & TEST", description: "We build a working prototype of the highest-value automation within two weeks. You test it with real data." },
      { step: "03", title: "BUILD & INTEGRATE", description: "Full production build with error handling, monitoring, and integration into your existing tools." },
      { step: "04", title: "TRAIN & ITERATE", description: "Team training, documentation, and a 30-day optimisation window to fine-tune accuracy." },
    ],
    pricing: [
      { tier: "Starter", range: "£3k – £8k", includes: ["Single workflow automation", "Claude or GPT-4o integration", "Basic dashboard", "Team training session"] },
      { tier: "Growth", range: "£8k – £25k", includes: ["Multiple workflow automations", "Custom AI dashboard", "CRM/ERP integration", "Prompt library", "30-day optimisation"] },
      { tier: "Enterprise", range: "£25k+", includes: ["Full operational AI suite", "Custom model fine-tuning", "Multi-department rollout", "Ongoing support retainer", "Quarterly strategy reviews"] },
    ],
    faqs: [
      { question: "Is this just ChatGPT with a wrapper?", answer: "No. We build custom AI infrastructure using the Claude and GPT APIs — not consumer chat interfaces. Your AI tools are purpose-built for your specific workflows, with system prompts engineered for your business context." },
      { question: "Will AI replace my team?", answer: "No. AI amplifies your team. The goal is to eliminate the repetitive tasks that eat 20+ hours per week so your people can focus on strategic, high-value work that actually grows the business." },
      { question: "How do you ensure accuracy?", answer: "Every system we build includes human-in-the-loop review gates. Nothing goes to production without human verification. We also implement confidence scoring so the AI flags uncertain outputs for manual review." },
      { question: "What data security measures are in place?", answer: "We use enterprise-tier API access with data processing agreements. Your data is never used to train models. All systems are hosted on your infrastructure with full encryption in transit and at rest." },
      { question: "How quickly can you build something?", answer: "We can have a working prototype in your hands within two weeks. Full production builds typically take 4–8 weeks depending on complexity and integration requirements." },
      { question: "What ROI should I expect?", answer: "Most clients see ROI within 90 days. A single automation that saves 10 hours per week at £30/hour pays for itself in under 6 months. Most of our builds save significantly more than that." },
    ],
    relatedCaseStudySlugs: ["auralight", "velocity"],
  },
  {
    slug: "seo",
    number: "03",
    name: "SEARCH ENGINE OPTIMISATION",
    headline: "TRAFFIC THAT CONVERTS. NOT TRAFFIC THAT EXISTS.",
    subheadline: "Technical SEO, content strategy, link acquisition. Average 4× traffic growth in year one.",
    description: "SEO in 2026 isn't about keyword density or blog post volume. It's about topical authority, technical performance, and search intent alignment. We build SEO strategies that target the keywords that actually generate revenue — not the ones that look good in a monthly report. Every ranking we chase has a direct line to your bottom line.",
    deliverables: [
      { name: "Technical Audits", description: "Deep-dive into your site's technical health — Core Web Vitals, crawlability, indexation, structured data." },
      { name: "Programmatic SEO", description: "Scalable page generation for location, service, and industry keyword combinations." },
      { name: "Content Architecture", description: "Hub-and-spoke content clusters that build topical authority and capture long-tail search demand." },
      { name: "Core Web Vitals", description: "LCP under 1.2s, CLS near zero, INP under 200ms. Performance that Google rewards." },
      { name: "Link Acquisition", description: "Value-first link building through digital PR, resource creation, and strategic outreach." },
      { name: "Local SEO", description: "Google Business Profile optimisation, citation building, and local landing pages." },
    ],
    process: [
      { step: "01", title: "AUDIT & BENCHMARK", description: "Full technical audit, competitor analysis, keyword mapping, and baseline performance reporting." },
      { step: "02", title: "ARCHITECTURE & CONTENT", description: "Sitemap restructure, content calendar, and prioritised keyword targeting based on commercial intent." },
      { step: "03", title: "IMPLEMENTATION", description: "Technical fixes, on-page optimisation, content production, and link acquisition — executed systematically." },
      { step: "04", title: "SCALE & DOMINATE", description: "Monthly reporting, ranking tracking, and iterative strategy refinement to compound results." },
    ],
    pricing: [
      { tier: "Starter", range: "£1.5k – £3k/month", includes: ["Technical SEO audit", "10 target keywords", "Monthly reporting", "Core Web Vitals monitoring", "Quarterly strategy review"] },
      { tier: "Growth", range: "£3k – £6k/month", includes: ["30+ target keywords", "Content production (4 articles/month)", "Link building campaign", "Programmatic SEO pages", "Bi-weekly reporting"] },
      { tier: "Enterprise", range: "£6k+/month", includes: ["Full-scale SEO programme", "100+ keywords", "Dedicated SEO strategist", "Weekly reporting", "International SEO", "Custom dashboards"] },
    ],
    faqs: [
      { question: "How long does SEO take to work?", answer: "You'll typically see measurable improvements within 3–4 months and significant results within 6–12 months. SEO is a compounding investment — the longer you commit, the stronger the returns." },
      { question: "Can you guarantee rankings?", answer: "No honest SEO provider guarantees specific rankings. What we guarantee is a systematic, data-driven approach that has delivered an average 4× traffic increase for our clients in year one." },
      { question: "Do you write the content?", answer: "Yes. Our content team produces SEO-optimised articles, landing pages, and resource content based on keyword research and competitive analysis. Every piece is written for humans first, search engines second." },
      { question: "What about AI-generated content?", answer: "We use AI as a research and drafting tool, but every piece of content is written, edited, and quality-checked by humans. Google's guidelines are clear: content quality matters more than how it was produced." },
      { question: "How do you measure success?", answer: "Revenue and leads, not just rankings. We track organic traffic, keyword positions, conversion rates, and cost per acquisition. Monthly reports show exactly how SEO is contributing to your bottom line." },
      { question: "Can you fix a Google penalty?", answer: "Yes. We've recovered sites from manual actions and algorithmic penalties. The process starts with a thorough audit to identify the root cause, followed by a systematic remediation plan." },
    ],
    relatedCaseStudySlugs: ["nexus-group", "lumina", "dales-and-peaks"],
  },
  {
    slug: "paid-advertising",
    number: "04",
    name: "PAID ADVERTISING",
    headline: "CAMPAIGNS BUILT ON DATA. TESTED OBSESSIVELY.",
    subheadline: "Google Ads. Meta Ads. 143% average ROAS. No budgets set on fire.",
    description: "Most paid media budgets are wasted on broad targeting, generic creative, and monthly reports that measure impressions instead of revenue. We build campaigns with surgical precision — exact match keyword architecture on Google, hyper-targeted audiences on Meta — and we optimise against actual business outcomes, not vanity metrics.",
    deliverables: [
      { name: "Campaign Strategy", description: "Full-funnel campaign architecture built around your unit economics and customer acquisition costs." },
      { name: "Creative Testing", description: "Systematic creative iteration — we test headlines, images, videos, and copy to find what converts." },
      { name: "Budget Optimisation", description: "Real-time budget allocation based on performance data, not fixed percentages." },
      { name: "Weekly Reporting", description: "Transparent reporting that shows ROAS, CPL, and pipeline contribution — not impressions and clicks." },
      { name: "Landing Page Design", description: "High-converting landing pages built specifically for your ad campaigns." },
      { name: "Conversion Tracking", description: "Full conversion tracking setup including offline conversions and CRM integration." },
    ],
    process: [
      { step: "01", title: "AUDIT & STRATEGY", description: "Account audit, competitor analysis, keyword research, audience mapping, and campaign architecture." },
      { step: "02", title: "BUILD & LAUNCH", description: "Campaign build, creative production, landing pages, and conversion tracking — all before we spend a penny." },
      { step: "03", title: "OPTIMISE", description: "Daily monitoring, weekly optimisation, creative testing, and budget reallocation based on real performance data." },
      { step: "04", title: "SCALE", description: "Once we find what works, we scale it. New channels, new audiences, higher budgets — with confidence." },
    ],
    pricing: [
      { tier: "Starter", range: "£1.5k – £3k/month + ad spend", includes: ["Single platform (Google or Meta)", "Campaign setup & management", "Monthly reporting", "Basic conversion tracking"] },
      { tier: "Growth", range: "£3k – £6k/month + ad spend", includes: ["Multi-platform campaigns", "Creative testing programme", "Custom landing pages", "CRM integration", "Weekly reporting & strategy calls"] },
      { tier: "Enterprise", range: "£6k+/month + ad spend", includes: ["Full-funnel multi-platform", "Video creative production", "Advanced attribution modelling", "Dedicated account manager", "Custom dashboards"] },
    ],
    faqs: [
      { question: "What's your minimum ad spend?", answer: "We recommend a minimum of £2,000/month in ad spend to generate statistically significant data for optimisation. Below that, it's difficult to test and iterate effectively." },
      { question: "Do you charge a percentage of ad spend?", answer: "No. We charge a flat management fee. Percentage-based pricing creates a perverse incentive to increase your spend regardless of performance. Our incentive is results, not budget inflation." },
      { question: "How quickly will I see results?", answer: "Paid media delivers faster than SEO. You'll typically see initial results within 2–4 weeks. Meaningful optimisation and stable ROAS usually takes 6–8 weeks as we gather data and iterate." },
      { question: "Can you fix my existing campaigns?", answer: "Yes. We regularly take over underperforming accounts. We'll audit what exists, identify the problems, and rebuild from scratch if necessary. Most clients see a 30–50% improvement in ROAS within the first 60 days." },
      { question: "What platforms do you manage?", answer: "Google Ads (Search, Shopping, Display, YouTube), Meta Ads (Facebook, Instagram), LinkedIn Ads, and Microsoft Ads. We'll recommend the right channels based on your audience and objectives." },
      { question: "How do you report?", answer: "Weekly performance emails and monthly strategy reports. Custom Looker Studio dashboards with real-time data. We show ROAS and CPL, not vanity metrics." },
    ],
    relatedCaseStudySlugs: ["velocity", "lumina"],
  },
  {
    slug: "analytics-data",
    number: "05",
    name: "ANALYTICS & DATA",
    headline: "KNOW EXACTLY WHERE EVERY POUND GOES.",
    subheadline: "GA4, GTM, Looker Studio. Custom dashboards. Data you can actually act on.",
    description: "Data without action is just noise. We don't just set up tracking — we build analytical infrastructure that tells you what's working, what's not, and what to change next. Every dashboard we create is designed to surface the three or four metrics that actually matter for your business decisions.",
    deliverables: [
      { name: "GA4 Implementation", description: "Full GA4 setup with custom events, conversion goals, and audience definitions." },
      { name: "Conversion Tracking", description: "End-to-end conversion tracking from first click to closed deal, including offline conversions." },
      { name: "Attribution Modelling", description: "Understanding which channels actually drive revenue, not just which ones get the last click." },
      { name: "Custom Dashboards", description: "Looker Studio dashboards designed for decision-making — not data dumps." },
      { name: "Tag Management", description: "Server-side GTM for privacy compliance and reduced client-side JavaScript." },
      { name: "CRO Audits", description: "Conversion rate optimisation based on behavioural data, heatmaps, and session recordings." },
    ],
    process: [
      { step: "01", title: "AUDIT & PLAN", description: "Full tracking audit, measurement plan, and KPI definition aligned to your business objectives." },
      { step: "02", title: "IMPLEMENT", description: "GA4, GTM, conversion tracking, and event setup — tested and validated before going live." },
      { step: "03", title: "DASHBOARD & REPORT", description: "Custom Looker Studio dashboards with automated reporting and insight summaries." },
      { step: "04", title: "OPTIMISE & TEST", description: "CRO recommendations, A/B testing, and iterative improvement based on real data." },
    ],
    pricing: [
      { tier: "Starter", range: "£2k – £5k one-off", includes: ["GA4 setup", "5 conversion events", "Basic Looker Studio dashboard", "GTM implementation"] },
      { tier: "Growth", range: "£5k – £15k one-off", includes: ["Advanced GA4 with custom events", "Server-side GTM", "Multi-channel attribution", "Custom dashboard suite", "CRO audit"] },
      { tier: "Enterprise", range: "£1.5k+/month ongoing", includes: ["Full analytics management", "Monthly CRO recommendations", "A/B testing programme", "Quarterly strategy reviews", "Custom data pipelines"] },
    ],
    faqs: [
      { question: "Do I need GA4 if I already have Universal Analytics?", answer: "Universal Analytics stopped processing data in July 2023. If you haven't migrated to GA4, you're flying blind. We can set up GA4 from scratch with proper event tracking and conversion goals." },
      { question: "What's wrong with my current analytics?", answer: "Most businesses have tracking that's either broken, incomplete, or measuring the wrong things. We audit your setup and fix it so you can make decisions based on accurate data." },
      { question: "Can you build dashboards for my team?", answer: "Yes. We build role-specific Looker Studio dashboards — C-suite overview, marketing performance, sales pipeline — so every stakeholder sees the metrics that matter to them." },
      { question: "What about privacy and GDPR?", answer: "We implement consent-aware tracking and server-side GTM to ensure compliance. Your data collection is accurate and legal." },
      { question: "How do you handle attribution?", answer: "We implement multi-touch attribution models that show the full customer journey, not just the last click. This is critical for understanding which channels are actually driving value." },
      { question: "Do you do A/B testing?", answer: "Yes. We use statistical rigour for all testing — no 'gut feeling' optimisation. We define hypotheses, run tests with sufficient sample sizes, and only implement changes that show statistically significant improvements." },
    ],
    relatedCaseStudySlugs: ["velocity", "nexus-group"],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find(s => s.slug === slug);
}
