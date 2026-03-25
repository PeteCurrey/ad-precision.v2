// /lib/structured-data.ts
// Centralised JSON-LD structured data for all Avorria pages

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Avorria",
  url: "https://avorria.com",
  logo: "https://avorria.com/logo.png",
  foundingDate: "2013",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chesterfield",
    addressRegion: "Derbyshire",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
  },
  sameAs: [
    "https://linkedin.com/company/avorria",
    "https://twitter.com/avorria",
    "https://instagram.com/avorria",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Avorria",
  url: "https://avorria.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://avorria.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function localBusinessSchema(location?: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Avorria",
    description:
      "Award-winning digital agency specialising in web design, SEO, AI implementation, and paid media.",
    priceRange: "££££",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chesterfield",
      addressRegion: "Derbyshire",
      addressCountry: "GB",
    },
    areaServed: location ? { "@type": "City", name: location } : "GB",
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; slug: string };
  heroImage?: { url: string };
  excerpt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `https://avorria.com/team/${post.author.slug}`,
    },
    publisher: organizationSchema,
    image: post.heroImage?.url,
    description: post.excerpt,
  };
}

export function serviceSchema(service: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: organizationSchema,
    areaServed: "GB",
  };
}
