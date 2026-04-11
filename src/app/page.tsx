import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Avorria | The Architects of Attention | Digital Agency",
  description: "We build digital weapons. Premium web design, AI implementation, SEO and paid media for manufacturers, industrial specialists, and growth-hungry businesses.",
};

export default function Home() {
  return <HomeClient />;
}
