import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Avorria Digital Agency",
  description: "How we handle your data at Avorria.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full bg-[#050508] min-h-screen pt-40 pb-24 px-[var(--gutter)]">
      <div className="max-w-[800px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 border-b border-[#222228] pb-12">
          <div className="text-[11px] text-[#C8F135] uppercase tracking-widest font-[family-name:var(--font-body)]">[ LEGAL ]</div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(40px,6vw,80px)] text-white">Privacy Policy.</h1>
        </div>
        
        <div className="prose prose-invert prose-avorria max-w-none">
          <p className="text-[18px] text-[#F2F2F0] font-bold mb-8">This policy describes how Avorria ("we", "us", or "our") handles your personal data when you use our website or services.</p>
          
          <h2>01. Data Collection</h2>
          <p>We collect information you provide directly to us, such as when you fill out our "Start a Project" form or sign up for our insights. This typically includes your name, email address, and company details.</p>
          
          <h2>02. Use of Information</h2>
          <p>We use the data collected to provide and improve our services, respond to enquiries, and send technical guides or marketing communications (if you have opted in).</p>
          
          <h2>03. Data Security</h2>
          <p>We implement bank-grade security and SSL encryption to protect your data. We do not sell your personal information to third parties.</p>
          
          <h2>04. Cookies</h2>
          <p>We use cookies to analyze traffic and optimize performance. For a high-performance site, we keep these tracking scripts minimal and server-side where possible.</p>
          
          <h2>05. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at legal@avorria.com.</p>
        </div>
      </div>
    </main>
  );
}
