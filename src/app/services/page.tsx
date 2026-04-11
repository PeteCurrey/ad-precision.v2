import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | Every Service. One Agenda: Your Growth",
  description: "Web design, AI implementation, SEO, paid advertising, and analytics. Measured against revenue, traffic, or conversions — not vanity metrics.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
