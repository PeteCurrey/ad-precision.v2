import type { Metadata } from "next";
import TechClient from "./TechClient";

export const metadata: Metadata = {
  title: "Our Technology Stack | Next.js, Sanity, R3F & More | Avorria",
  description: "We pick the right tool for every job. Next.js 15, Sanity v3, React Three Fiber, GSAP, Vercel — the modern stack behind every Avorria build.",
};

export default function TechnologyPage() {
  return <TechClient />;
}
