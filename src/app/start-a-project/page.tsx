import type { Metadata } from "next";
import StartAProjectClient from "./StartAProjectClient";

export const metadata: Metadata = {
  title: "Start a Project | Avorria Digital Agency | Brief Us in 5 Minutes",
  description: "Tell us about your project. Web design, SEO, paid media, or AI implementation — we'll come back within one working day with a clear plan.",
};

export default function StartAProjectPage() {
  return <StartAProjectClient />;
}
