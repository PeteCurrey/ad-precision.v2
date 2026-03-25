import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team | Avorria Digital Agency | 12 Specialists, One Standard",
  description: "Meet the Avorria team — 12 digital specialists across web design, development, SEO, paid media, AI implementation, and analytics. Distributed across the UK, Europe, and beyond.",
};

export default function TeamPage() {
  return <TeamClient />;
}
