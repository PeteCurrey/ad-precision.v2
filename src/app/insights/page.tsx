import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights & Resources | Avorria Digital Agency",
  description: "Ideas, research, guides, and tools from the Avorria team. Everything we've learned from 11 years building digital infrastructure for UK businesses.",
};

export default function InsightsPage() {
  return <InsightsClient />;
}
