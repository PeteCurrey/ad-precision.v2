import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Avorria Digital Agency | Every Question, Answered",
  description: "No waffle. No ambiguity. Answers to every question about web design, SEO, AI, paid media, pricing, and working with Avorria.",
};

export default function FAQPage() {
  return <FAQClient />;
}
