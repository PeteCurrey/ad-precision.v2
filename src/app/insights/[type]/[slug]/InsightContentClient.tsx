"use client";

import { useState } from "react";
import { Insight } from "@/lib/seo-data";
import TransitionLink from "@/components/ui/TransitionLink";

export default function InsightContentClient({ insight, otherInsights }: { insight: Insight; otherInsights: Insight[] }) {
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(!insight.gated);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsUnlocking(true);
    // Simulate API call to track lead
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsUnlocked(true);
    setIsUnlocking(false);
  };

  return (
    <>
      <section className="relative w-full py-24 px-[var(--gutter)] max-w-[800px] mx-auto min-h-[40vh]">
        <div className={`prose prose-invert prose-avorria max-w-none transition-all duration-700 ${!isUnlocked ? "blur-md select-none pointer-events-none opacity-50" : "blur-0 opacity-100"}`}>
          {insight.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
            if (line.startsWith('# ')) return null;
            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ')) {
               return <li key={i} className="ml-4">{line.replace(/^\d\. /, '')}</li>
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
        
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050508]/40 backdrop-blur-sm z-10 p-[var(--gutter)]">
            <div className="max-w-[500px] w-full bg-[#0A0A0F] border border-[#C8F135] p-10 text-center shadow-2xl">
               <div className="text-[10px] text-[#C8F135] uppercase tracking-[0.2em] mb-4">MEMBER EXCLUSIVE</div>
               <h3 className="text-[24px] font-[family-name:var(--font-display)] font-bold text-white mb-4">This {insight.type} is gated.</h3>
               <p className="text-[14px] text-[#6B6B72] mb-8 leading-relaxed">Please enter your work email to unlock the full technical guide and ROI analysis.</p>
               <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                 <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com" 
                    className="bg-transparent border border-[#222228] px-6 py-4 text-white text-[14px] outline-none focus:border-[#C8F135] w-full" 
                 />
                 <button 
                    disabled={isUnlocking}
                    className="bg-[#C8F135] text-black font-bold text-[13px] uppercase py-4 hover:bg-white transition-colors disabled:opacity-50">
                    {isUnlocking ? "UNLOCKING..." : "UNLOCK INSTANTLY →"}
                 </button>
               </form>
               <div className="mt-6 text-[10px] text-[#333338] uppercase tracking-widest">NO SPAM. JUST HIGH-VALUE DATA.</div>
            </div>
          </div>
        )}
      </section>

      {/* Recommended */}
      <section className="w-full py-24 px-[var(--gutter)] bg-[#0A0A0F] border-t border-[#222228]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] text-[#6B6B72] uppercase tracking-[0.15em] mb-12">CONTINUE READING</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherInsights.map((r) => (
              <TransitionLink href={`/insights/${r.type}/${r.slug}`} key={r.slug}
                className="group bg-[#050508] border border-[#1A1A1F] p-8 flex flex-col gap-4 hover:border-[#C8F135]/40 transition-colors">
                <span className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-[#6B6B72]">{r.type}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F2F2F0] group-hover:text-[#C8F135] transition-colors leading-tight">{r.title}</h3>
                <span className="text-[#C8F135] text-[14px] pt-4 border-t border-[#1A1A1F]">READ MORE →</span>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
