import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Our Work | Case Studies & Results",
  description: "Real projects. Real results. 312% organic traffic growth. 400% ROAS. 98/100 PageSpeed. See what we build.",
};

export default function WorkPage() {
  return <WorkClient />;
}
