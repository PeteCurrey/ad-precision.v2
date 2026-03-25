import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Digital Marketing Glossary | 200+ Terms Explained | Avorria",
  description: "Every term you'll ever need to know about web design, SEO, AI, paid advertising, and analytics. Clear, practical definitions from Avorria's team.",
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
