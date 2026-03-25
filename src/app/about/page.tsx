import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Avorria | Digital Agency Founded by Real Business Operators",
  description: "Avorria is a digital agency founded by a multi-business operator with companies across FM, hospitality, waste, and tech. We build digital revenue engines, not showpieces.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Avorria",
  "foundingDate": "2013",
  "areaServed": "GB",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10-25" },
  "founder": {
    "@type": "Person",
    "name": "Pete Currey",
    "jobTitle": "Founder & CEO",
    "knowsAbout": ["Web Design", "Digital Marketing", "SEO", "AI Implementation", "Facilities Management", "Hospitality", "Business Operations"]
  }
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutClient />
    </>
  );
}
