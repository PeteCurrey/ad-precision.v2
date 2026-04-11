import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch. We'll respond within one working day. No sales pitch — just ideas.",
};

export default function ContactPage() {
  return <ContactClient />;
}
