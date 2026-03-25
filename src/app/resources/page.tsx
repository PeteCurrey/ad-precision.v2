import InsightsClient from "../insights/InsightsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Avorria Digital Agency",
  description: "Free guides, reports, and tools from the UK's most technically advanced digital agency.",
};

export default function ResourcesPage() {
  return <InsightsClient />;
}
