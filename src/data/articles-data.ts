export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  content: string; // Full article body in sections
  sections: Array<{ heading: string; body: string }>;
  relatedSlugs: string[];
};

export const articles: Article[] = [
  {
    slug: "why-your-wordpress-site-is-costing-you-more-than-you-think",
    title: "Why Your WordPress Site Is Costing You More Than You Think",
    category: "WEB DESIGN",
    excerpt: "The true cost of WordPress isn't the hosting bill. It's the leads you're losing every single day to slow load times, security vulnerabilities, and a mobile experience that hasn't been updated since 2018.",
    readTime: "8 min",
    date: "2026-03-15",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "WordPress powers 43% of the web. That statistic is often used to justify choosing it. But market share isn't an endorsement of quality — it's a reflection of how low the barrier to entry is. The real question isn't whether WordPress can build your website. It's whether it should.",
    sections: [
      {
        heading: "The Hidden Tax on Every Page Load",
        body: "Your WordPress site probably loads in 3–5 seconds. You might think that's acceptable. Google doesn't. Every second above 1.5 seconds costs you approximately 7% of conversions. For a business generating £50,000/month through its website, that's £3,500 lost every month — £42,000 a year — to a problem you can't see.\n\nThe reason is architectural. WordPress serves pages through PHP, queries a MySQL database on every request, and layers on JavaScript from however many plugins you've installed. A typical WordPress site has 30–50 HTTP requests before the page renders. A Next.js site has 3–5.\n\nThis isn't a minor difference. It's the difference between a website that works and a website that wins."
      },
      {
        heading: "The Plugin Dependency Trap",
        body: "WordPress relies on plugins for everything — contact forms, SEO, security, caching, image optimisation, analytics. Each plugin adds JavaScript weight, creates potential security vulnerabilities, and introduces dependencies on third-party developers who may or may not maintain their code.\n\nThe average WordPress site has 20–30 active plugins. Each one is a potential point of failure. When Plugin A updates and breaks Plugin B, you're stuck debugging someone else's code at 11pm on a Tuesday.\n\nIn a hand-coded Next.js build, there are no plugins. Every feature is purpose-built, tested, and maintained as part of a single, coherent codebase. When something breaks — and things always break — you know exactly where to look."
      },
      {
        heading: "Security Isn't Optional Anymore",
        body: "70% of hacked websites globally run WordPress. That's not FUD — that's data from Sucuri's annual website threat report. The attack surface is enormous: an open-source PHP core, thousands of third-party plugins, and a login page at /wp-admin that every bot on the internet knows about.\n\nCompare that to a statically-generated Next.js site deployed to Vercel. There's no database to inject. There's no login page to brute-force. There's no PHP to exploit. The attack surface is, for practical purposes, zero.\n\nIf your business handles customer data, processes payments, or operates in a regulated industry, WordPress is a liability you can't afford."
      },
      {
        heading: "The SEO Illusion",
        body: "WordPress is often marketed as 'great for SEO' because of Yoast. But Yoast is a checklist tool, not an SEO strategy. It tells you to add a meta description. It doesn't tell you whether your site architecture is cannibalising keywords, whether your Core Web Vitals are tanking your rankings, or whether your internal linking structure is wasting crawl budget.\n\nGoogle's ranking algorithm now heavily weights page experience signals — LCP, CLS, INP. WordPress sites consistently fail these metrics because of their architectural overhead. You can install every caching plugin available and still not match the baseline performance of a properly built Next.js site."
      },
      {
        heading: "What the Migration Actually Looks Like",
        body: "Moving from WordPress to Next.js isn't as painful as it sounds. We've done it dozens of times. The process takes 8–12 weeks and follows a clear path: audit your existing content and information architecture, redesign the UX in Figma, build the new site in Next.js with a headless CMS (usually Sanity), migrate your content, set up 301 redirects, and launch.\n\nThe result is a website that loads 5× faster, ranks higher, converts better, and costs less to maintain. Every client who's made the switch has told us the same thing: they wish they'd done it sooner."
      },
      {
        heading: "The Bottom Line",
        body: "WordPress isn't free. It costs you in load time, security risk, maintenance overhead, and lost conversions. The website you have today is either making you money or costing you money. There's no neutral position.\n\nIf your business depends on its website for leads, revenue, or credibility — and in 2026, every business does — the question isn't whether you can afford to move away from WordPress. It's whether you can afford not to."
      }
    ],
    relatedSlugs: ["how-we-get-98-pagespeed-on-every-build", "why-we-use-nextjs-for-every-website-we-build"]
  },
  {
    slug: "how-we-get-98-pagespeed-on-every-build",
    title: "How We Get 98/100 PageSpeed on Every Build (And Why It Matters)",
    category: "WEB DESIGN",
    excerpt: "Most developers think you have to choose between a beautiful site and a fast site. That's a false choice. Here's exactly how we achieve both, every single time.",
    readTime: "10 min",
    date: "2026-03-01",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "A 98/100 PageSpeed score isn't a vanity metric. It's a competitive weapon. Google uses Core Web Vitals as a ranking signal. Users bounce from slow sites. And every millisecond of load time directly impacts your conversion rate and your paid media CPC.",
    sections: [
      {
        heading: "Why PageSpeed Is a Business Metric",
        body: "Let's start with the numbers that matter. A 1-second improvement in page load time increases conversions by 7% on average. Google Ads rewards fast-loading landing pages with lower CPCs — some clients see 15–20% reductions in cost-per-click simply by improving their landing page speed.\n\nPageSpeed isn't a developer concern. It's a commercial concern. Every millisecond shows up on your P&L, whether you measure it or not."
      },
      {
        heading: "The Asset Strategy",
        body: "Most slow websites are slow because of assets — images, fonts, and JavaScript. Our strategy is surgical:\n\nEvery image is served as WebP or AVIF via Next/Image with automatic responsive sizing. No 4MB JPEG hero images. No uncompressed PNGs. Every image is optimised at build time.\n\nEvery font is self-hosted WOFF2 with font-display: swap. No Google Fonts CDN calls. No layout shift from late-loading typefaces.\n\nEvery JavaScript dependency is audited. We tree-shake GSAP to include only the plugins we use. We lazy-load Three.js canvases below the fold. We never load a library we don't need."
      },
      {
        heading: "Server Components and the React 19 Revolution",
        body: "Next.js 15 with React Server Components changed everything. 90% of our UI renders on the server as zero-JavaScript HTML. Only interactive components — form inputs, animations, scroll-driven effects — ship client-side JavaScript.\n\nThis means the initial HTML payload is tiny. The browser receives a fully-rendered page in milliseconds. Interactive elements hydrate after the critical content is already visible.\n\nThe result: LCP under 1.2 seconds on every build. Not as a target — as a floor."
      },
      {
        heading: "Vercel's Edge Network",
        body: "Deployment matters. We deploy every site to Vercel's global edge network, which serves content from the nearest data centre to each user. A visitor in London gets the site from a London edge node. A visitor in Sydney gets it from Sydney.\n\nCombined with ISR (Incremental Static Regeneration), our sites serve pre-built HTML with zero server computation at request time. The server did its work at build time. The edge just delivers the result.\n\nThis architecture eliminates the concept of 'cold starts' that plague traditional WordPress hosting."
      },
      {
        heading: "The Metrics We Obsess Over",
        body: "We monitor four Core Web Vitals on every build:\n\nLCP (Largest Contentful Paint): Under 1.2 seconds. This is when the main content becomes visible. We achieve this by prioritising above-the-fold content and lazy-loading everything else.\n\nCLS (Cumulative Layout Shift): Near zero. We use explicit dimensions on all media elements and font-display: swap to prevent layout shifts.\n\nINP (Interaction to Next Paint): Under 200ms. We minimise main-thread JavaScript and use web workers for heavy computation.\n\nTTFB (Time to First Byte): Under 200ms via Vercel Edge. The server responds before the user's finger has left the mouse button."
      },
      {
        heading: "Real Results, Not Lab Results",
        body: "Lab scores (Lighthouse) are useful but field data (Chrome User Experience Report) is what Google actually uses for rankings. We monitor both.\n\nEvery site we launch has a real-world PageSpeed score above 95. Most hit 98–100. This isn't because we sacrificed design — our sites feature custom GSAP animations, Three.js 3D elements, and complex interactions. The performance comes from engineering discipline, not design compromise.\n\nFast and beautiful aren't mutually exclusive. They're requirements."
      }
    ],
    relatedSlugs: ["why-your-wordpress-site-is-costing-you-more-than-you-think", "why-we-use-nextjs-for-every-website-we-build"]
  },
  {
    slug: "7-technical-seo-fixes-every-derbyshire-business-needs",
    title: "The 7 Technical SEO Fixes Every Derbyshire Business Website Needs Right Now",
    category: "SEO",
    excerpt: "You don't need a £5,000/month SEO retainer. You need these seven fixes. Most can be implemented in a day, and the impact on your local search visibility will be immediate.",
    readTime: "7 min",
    date: "2026-02-20",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "Local SEO for Derbyshire businesses isn't complicated. But it does require technical precision. Here are the seven fixes that will have the biggest impact on your Google visibility — ranked by urgency.",
    sections: [
      {
        heading: "1. Your Google Business Profile Is Incomplete",
        body: "This is the single highest-ROI SEO task for any local business. Your Google Business Profile (GBP) is what appears in the map pack — and for local searches, the map pack gets 42% of all clicks.\n\nMost Derbyshire businesses have a GBP with a name, address, and phone number. That's not enough. You need: complete service descriptions with keywords, 50+ photos (interior, exterior, team, work examples), regular Google Posts (weekly minimum), Q&A section populated with common customer questions, and accurate business hours including bank holidays.\n\nIf you do nothing else from this article, complete your GBP today. It's free and it works."
      },
      {
        heading: "2. Your Site Doesn't Have Local Landing Pages",
        body: "If you're a plumber in Chesterfield who also serves Sheffield, Dronfield, and Matlock — you need a landing page for each location. Not a single 'Areas We Cover' page with a list of towns. A dedicated, unique page for each.\n\nEach page needs: a unique H1 ('Emergency Plumber in Dronfield'), local context (references to the area, local landmarks), service-specific content, embedded Google Map, and customer reviews from that area.\n\nGoogle rewards pages that demonstrate genuine local relevance. A generic 'We serve Derbyshire' page doesn't do that."
      },
      {
        heading: "3. Your Core Web Vitals Are Failing",
        body: "Go to Google Search Console right now. Click 'Core Web Vitals'. If you see red or yellow, Google considers your site's user experience to be below standard — and it's costing you rankings.\n\nThe most common issues for Derbyshire small business websites: oversized images (hero images over 1MB), render-blocking CSS and JavaScript from WordPress themes, no font preloading causing layout shift, and third-party scripts (live chat widgets, analytics) blocking the main thread.\n\nFix the images first. Compress everything to WebP. That alone typically improves LCP by 40–60%."
      },
      {
        heading: "4. You're Missing Schema Markup",
        body: "Schema markup is structured data that tells Google exactly what your business does. Local businesses should implement: LocalBusiness schema (name, address, phone, opening hours), Service schema (list of services offered), FAQ schema (on your FAQ page — gets rich results), and Review schema (if you feature reviews on your site).\n\nMost Derbyshire business websites have zero schema markup. Adding it is a quick win that helps Google understand your business and can trigger rich snippets in search results."
      },
      {
        heading: "5. Your Internal Linking Is Non-Existent",
        body: "Internal links — links between pages on your own site — are one of the most underused SEO levers. They help Google understand your site's hierarchy and distribute page authority.\n\nEvery service page should link to related services. Every blog post should link to relevant service pages. Your most important pages should receive the most internal links. This isn't complicated, but most businesses never think about it."
      },
      {
        heading: "6. Your Title Tags Are Generic",
        body: "If your homepage title tag is 'Home | Business Name', you're wasting your most valuable SEO real estate. Title tags should be keyword-rich and compelling: 'Emergency Plumber Chesterfield | 24/7 Same-Day Call-Out | Smith Plumbing'.\n\nEvery page on your site needs a unique, descriptive title tag that includes your target keyword and your location. This is basic SEO that 80% of Derbyshire businesses still get wrong."
      },
      {
        heading: "7. You Don't Have a Review Strategy",
        body: "Google reviews are a ranking factor for local search. Businesses with 50+ reviews and a 4.5+ rating dominate the map pack. Most Derbyshire businesses have 5–10 reviews.\n\nBuild a simple review request system: after every job or transaction, send a text message or email with a direct link to your Google review page. Make it one click. We use automated SMS sequences that have tripled review counts for our clients within 90 days.\n\nReviews build trust, improve rankings, and directly increase conversion rates. They're the compounding asset most local businesses ignore."
      }
    ],
    relatedSlugs: ["why-your-wordpress-site-is-costing-you-more-than-you-think", "google-ads-is-broken-heres-how-we-fixed-roas"]
  },
  {
    slug: "we-integrated-claude-api-into-facilities-management",
    title: "We Integrated Claude API Into a Facilities Management Business. Here's What Happened.",
    category: "AI",
    excerpt: "EntireFM processes 200+ reactive maintenance requests per month. We built an AI system that triages, categorises, and drafts responses automatically. The results surprised even us.",
    readTime: "9 min",
    date: "2026-02-05",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "This isn't a theoretical case study about AI. This is what happened when we integrated the Claude API into EntireFM — a facilities management business that Pete founded and still operates. We know the workflows because we live them.",
    sections: [
      {
        heading: "The Problem: Death by Email",
        body: "EntireFM receives 200+ reactive maintenance requests per month via email. Each one needs to be triaged (urgency level), categorised (trade type — plumbing, electrical, HVAC), matched to the right subcontractor, and responded to within an SLA window.\n\nBefore AI, this process required a full-time coordinator spending 4+ hours per day on email triage alone. Urgent requests sometimes sat in the inbox for 45 minutes during peak periods. Response time was the single biggest factor in client satisfaction — and we were losing ground."
      },
      {
        heading: "The Build: Two Weeks from Concept to Production",
        body: "We built a custom email processing pipeline using the Claude API. Here's the architecture:\n\nIncoming emails hit a webhook endpoint. The email body and any attachments are parsed. Claude analyses the content and returns a structured JSON response: urgency level (P1–P4), trade category, site location, required response, and a draft reply.\n\nP1 emergencies (flooding, fire, security) trigger an immediate SMS to the on-call engineer. P2–P4 requests are queued and auto-drafted for human review. The coordinator's job shifted from 'read every email and decide what to do' to 'review AI recommendations and approve'."
      },
      {
        heading: "Prompt Engineering Was Everything",
        body: "The system's accuracy is entirely dependent on the quality of the system prompt. We spent more time on prompt engineering than on the actual code.\n\nThe prompt includes: EntireFM's complete SLA matrix (response times by priority and contract type), a taxonomy of 47 trade categories with definitions, examples of correctly triaged historical requests, and explicit instructions for edge cases (e.g. 'if the email mentions water and ceiling, classify as P1 regardless of language tone').\n\nAccuracy after the first iteration: 89%. After two weeks of prompt refinement with real production data: 97.3%."
      },
      {
        heading: "The Results: Numbers That Matter",
        body: "After 90 days in production:\n\nAverage response time dropped from 38 minutes to 4 minutes. The coordinator saved 3.5 hours per day. That's 17.5 hours per week freed up for higher-value work — contractor relationship management, contract renewals, and operations planning.\n\nClient satisfaction scores increased from 8.1/10 to 9.4/10. Not because the AI is better at empathy — it isn't — but because faster response times made clients feel heard.\n\nCost of the Claude API: approximately £120/month for 200+ email analyses. Cost of the development: one-off £6,000 build. ROI breakeven: 6 weeks."
      },
      {
        heading: "What We Learned",
        body: "AI works best when it's applied to structured, repetitive tasks with clear rules. Email triage is perfect because there are defined categories, defined urgency levels, and defined response templates. The AI isn't making creative decisions — it's applying business rules faster and more consistently than a human can.\n\nThe biggest mistake companies make with AI is starting too big. Don't try to 'AI-ify' your entire business. Pick one workflow, build one agent, prove ROI, and then scale. That's exactly what we did, and it's exactly what we recommend to our clients."
      },
      {
        heading: "What's Next",
        body: "We're now building Phase 2: predictive maintenance scheduling. Using historical data on reactive callouts, we're training a model to predict which sites are likely to need preventive maintenance before something breaks. If it works — and early results are promising — it'll fundamentally change how FM businesses approach asset management.\n\nBut that's for another article. For now, the takeaway is simple: practical AI, applied to real business workflows, delivers measurable ROI in weeks. Not months. Not years. Weeks."
      }
    ],
    relatedSlugs: ["google-ads-is-broken-heres-how-we-fixed-roas", "why-we-use-nextjs-for-every-website-we-build"]
  },
  {
    slug: "google-ads-is-broken-heres-how-we-fixed-roas",
    title: "Google Ads Is Broken. Here's How We Fixed Our Clients' ROAS.",
    category: "PAID MEDIA",
    excerpt: "Google Ads keeps pushing automation tools that optimise for Google's revenue, not yours. Here's how we fight back with exact match architecture, offline conversions, and landing pages that actually convert.",
    readTime: "8 min",
    date: "2026-01-22",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "Google Ads in 2026 is designed to spend your money. The platform's default settings — broad match keywords, automatically applied recommendations, Performance Max campaigns — are all optimised for one thing: increasing Google's revenue. Here's how we protect your budget and maximise your ROAS.",
    sections: [
      {
        heading: "The Broad Match Problem",
        body: "Google's push toward broad match keywords is their single biggest revenue driver — and your single biggest source of wasted spend. Broad match tells Google 'show my ad for anything vaguely related to this keyword'. For a plumber in Chesterfield, targeting 'emergency plumber' on broad match might show your ad for 'plumber salary UK', 'how to become a plumber', or 'plumber near me' from someone in Glasgow.\n\nWe use exact match and phrase match exclusively. Yes, the volume is lower. But the quality is dramatically higher. A click from someone searching 'emergency plumber Chesterfield now' is worth 50× more than a click from 'plumber apprenticeship'."
      },
      {
        heading: "Offline Conversion Tracking Changes Everything",
        body: "The biggest problem with Google Ads isn't the ads — it's the measurement. Most businesses optimise for form submissions or phone calls. But a form submission isn't revenue. A phone call isn't revenue.\n\nWe implement offline conversion tracking: feeding actual sales data from your CRM back into Google Ads. When John Smith fills in your contact form, becomes a lead, and eventually signs a £20,000 contract — that £20,000 conversion value gets attributed back to the exact keyword, ad, and landing page that generated the click.\n\nNow Google's algorithm can optimise for actual revenue, not just clicks or form fills. The difference is staggering. One client saw their ROAS increase from 180% to 540% within 60 days of implementing offline conversions."
      },
      {
        heading: "Landing Pages Are Conversion Infrastructure",
        body: "Sending Google Ads traffic to your homepage is the single most common — and most expensive — mistake businesses make. Your homepage is designed for multiple audiences. Your landing page should be designed for one: the person who just searched for exactly what you sell.\n\nWe build one landing page per ad group, each with: a headline that mirrors the search query, a clear value proposition above the fold, social proof (reviews, stats, logos), a single CTA (not three), and zero navigation links that let the user wander away.\n\nEvery landing page is hand-coded in Next.js and loads in under 1 second. Google rewards fast landing pages with better Quality Scores, which directly reduce your CPC."
      },
      {
        heading: "The Automatically Applied Recommendations Trap",
        body: "Google Ads now automatically applies 'recommendations' to your account unless you explicitly opt out. These recommendations include: adding broad match keywords, increasing budgets, enabling auto-applied ad suggestions, and switching bid strategies.\n\nEvery one of these changes is designed to increase your spend. We opt out of all automatically applied recommendations on day one and review every suggestion manually. If Google's recommendation improves performance for our client, we'll adopt it. If it improves performance for Google's quarterly earnings, we won't."
      },
      {
        heading: "The Structure That Actually Works",
        body: "Here's the campaign architecture we use for every client:\n\nSingle Theme Ad Groups (STAGs): One keyword theme per ad group. 'Emergency plumber Chesterfield' gets its own ad group, its own ads, and its own landing page. This ensures maximum relevance between search query, ad copy, and landing page.\n\nNegative keyword libraries: Extensive lists of irrelevant search terms that we constantly update. We review search term reports weekly and add negatives aggressively.\n\nManual bid strategies: We start with Manual CPC to gather data, then move to Target CPA or Target ROAS only once we have 30+ conversions of real data. We never let Google auto-bid from day one.\n\nThis structure is more work than letting Google automate everything. But it consistently delivers 3–5× better ROAS for our clients."
      },
      {
        heading: "What You Should Do Right Now",
        body: "If you're running Google Ads and not seeing the returns you expected, do these three things today:\n\n1. Check your search term report for the last 30 days. If you see irrelevant queries, add them as negative keywords immediately.\n\n2. Turn off all automatically applied recommendations in your account settings.\n\n3. Look at your landing page load time. If it's over 2 seconds, it's costing you money in both Quality Score and conversions.\n\nOr, let us audit your account. We'll tell you exactly where you're wasting budget and what we'd change — no commitment required."
      }
    ],
    relatedSlugs: ["we-integrated-claude-api-into-facilities-management", "7-technical-seo-fixes-every-derbyshire-business-needs"]
  },
  {
    slug: "why-we-use-nextjs-for-every-website-we-build",
    title: "Why We Use Next.js for Every Website We Build in 2026",
    category: "WEB DESIGN",
    excerpt: "It's not about trends. It's about measurable performance advantages that directly impact our clients' revenue, rankings, and competitive position.",
    readTime: "7 min",
    date: "2026-01-10",
    author: "Pete Barrett",
    authorRole: "Founder & Director",
    content: "Every website we build at Avorria uses Next.js. Not because it's fashionable — because it delivers measurably better outcomes for our clients across every metric that matters: speed, SEO, conversion rate, and total cost of ownership.",
    sections: [
      {
        heading: "Performance Isn't a Feature. It's the Foundation.",
        body: "Next.js with React Server Components renders 90% of your pages as static HTML on the server. The browser receives a fully-rendered page in milliseconds — before any JavaScript has loaded. Interactive elements hydrate after the critical content is already visible.\n\nThe result: LCP under 1.2 seconds on every build. CLS near zero because the HTML structure is defined server-side. INP under 200ms because only essential JavaScript ships to the client.\n\nCompare this to WordPress, which serves every page through PHP + MySQL, or traditional React SPAs, which show a blank white page until the JavaScript bundle downloads and renders. The performance gap isn't marginal — it's generational."
      },
      {
        heading: "SEO That's Built In, Not Bolted On",
        body: "Next.js was built for the web. SEO isn't an afterthought — it's a core architectural concern. The metadata API lets us define unique title tags, descriptions, OpenGraph images, and canonical URLs per page using the same type-safe TypeScript code we use for everything else.\n\nProgrammatic SEO at scale? Simple. generateStaticParams lets us pre-render hundreds of location, service, and industry pages at build time — each with unique metadata, unique content, and unique structured data.\n\nTry doing that in WordPress without a dozen conflicting plugins."
      },
      {
        heading: "The Vercel Edge: Global by Default",
        body: "Next.js is built by Vercel, and deploying to Vercel's edge network gives us global CDN, serverless functions, incremental static regeneration, and automatic HTTPS — out of the box.\n\nA user in London gets the site served from a London edge node. A user in Sydney gets it from Sydney. TTFB is consistently under 200ms worldwide. There are no cold starts, no server management, and no scaling concerns.\n\nFor our clients, this means their website performs identically whether they have 10 visitors or 10,000 visitors. The infrastructure scales automatically and invisibly."
      },
      {
        heading: "Developer Experience Drives Client Outcomes",
        body: "This might seem like an internal concern, but developer experience directly affects what we can deliver and how fast.\n\nNext.js with Turbopack gives us near-instant hot module reloading in development. We iterate on designs in real-time during client review calls. TypeScript catches errors before they reach production. The component model means we build reusable design systems that maintain consistency across 50+ page sites.\n\nFaster development means lower costs for clients. Fewer bugs. More time spent on design and UX, less time fighting the framework."
      },
      {
        heading: "The Total Cost of Ownership Argument",
        body: "A Next.js site on Vercel costs approximately £20–£50/month to host — regardless of traffic. There are no server management costs, no security patching, no plugin update cycles, and no database maintenance.\n\nA WordPress site on managed hosting costs £30–£100/month, plus £500–£2,000/year for premium plugins, plus developer time for updates and security patches, plus the opportunity cost of the performance gap.\n\nOver three years, the TCO difference is typically £5,000–£15,000 in favour of Next.js. That's before accounting for the revenue difference from better PageSpeed and conversion rates."
      },
      {
        heading: "When Not to Use Next.js",
        body: "We believe in intellectual honesty. Next.js isn't the right choice for every project.\n\nIf you need a simple blog that a non-technical person updates daily, WordPress with a good theme might be more appropriate. If you're building a highly interactive web application with real-time collaboration features, something like Remix or SvelteKit might be a better fit.\n\nBut for business websites — marketing sites, e-commerce storefronts, SaaS landing pages, service provider portfolios — Next.js is the best tool available in 2026. We've tested the alternatives. We've built with the alternatives. And we keep coming back to Next.js because the results speak for themselves.\n\n98/100 PageSpeed. 4× average traffic growth. Conversion rates that make our clients' accountants smile. That's why we use Next.js for every website we build."
      }
    ],
    relatedSlugs: ["how-we-get-98-pagespeed-on-every-build", "why-your-wordpress-site-is-costing-you-more-than-you-think"]
  }
];

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map(s => getArticle(s))
    .filter((a): a is Article => a !== undefined);
}
