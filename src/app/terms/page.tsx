import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Avorria Digital Agency",
  description: "Terms and conditions for working with Avorria.",
};

export default function TermsPage() {
  return (
    <main className="w-full bg-[#050508] min-h-screen pt-40 pb-24 px-[var(--gutter)]">
      <div className="max-w-[800px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 border-b border-[#222228] pb-12">
          <div className="text-[11px] text-[#C8F135] uppercase tracking-widest font-[family-name:var(--font-body)]">[ LEGAL ]</div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(40px,6vw,80px)] text-white">Terms of Service.</h1>
        </div>
        
        <div className="prose prose-invert prose-avorria max-w-none">
          <p className="text-[18px] text-[#F2F2F0] font-bold mb-8">By accessing or using Avorria's website and services, you agree to be bound by these Terms of Service.</p>
          
          <h2>01. Scope of Work</h2>
          <p>Engagement with Avorria begins with a signed Master Services Agreement (MSA) and a specific Statement of Work (SOW). Our digital builds are hand-coded and subject to iterative refinement.</p>
          
          <h2>02. IP Ownership</h2>
          <p>Unless otherwise agreed, intellectual property for custom code, design systems, and brand assets is transferred to the client upon final payment of all project fees.</p>
          
          <h2>03. Performance Guarantees</h2>
          <p>We build for sub-1.2s LCP. However, external integrations, third-party trackers, and client-uploaded assets may affect final performance scores.</p>
          
          <h2>04. Liability</h2>
          <p>Avorria is not liable for indirect or consequential damages arising from the use or inability to use our services once the final site has been signed off and handed over.</p>
          
          <h2>05. Governing Law</h2>
          <p>These terms are governed by and construed in accordance with the laws of England and Wales.</p>
        </div>
      </div>
    </main>
  );
}
