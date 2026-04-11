import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team | Avorria Digital Agency | 12 Specialists, One Standard",
  description: "Meet the Avorria team — 12 digital specialists across web design, development, SEO, paid media, AI implementation, and analytics. Distributed across the UK, Europe, and beyond.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Avorria",
  "employee": [
    { "@type": "Person", "name": "Pete Currey", "jobTitle": "Founder & CEO" },
    { "@type": "Person", "name": "Marcus Webb", "jobTitle": "Creative Director" },
    { "@type": "Person", "name": "Sara Lindqvist", "jobTitle": "Head of Development" }
  ]
};

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeamClient />
    </>
  );
}
