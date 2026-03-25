"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion, AnimatePresence } from "framer-motion";

const team = [
  { name: "Pete Currey", role: "Founder & CEO", location: "Chesterfield, UK", descriptor: "Runs six businesses. Builds websites like the seventh depends on it.", background: "Founder of Avorria, EntireFM, Alkota, BlockWaste, The Batch House, The Glass Yard, and Travio. 11 years building digital infrastructure for his own companies before offering it to others.", expertise: ["Commercial strategy", "Client relationships", "Product vision"] },
  { name: "Marcus Webb", role: "Creative Director", location: "London, UK", descriptor: "Former Ueno. Believes a website should feel like cinema feels.", background: "10 years in top-tier creative agencies. Led design on clients including a FTSE 100 financial brand, a global sportswear label, and three Awwwards SOTD winners.", expertise: ["Art direction", "Design systems", "Motion design"] },
  { name: "Sara Lindqvist", role: "Head of Development", location: "Stockholm, Sweden", descriptor: "Turns a 3.2s LCP into a 0.9s LCP. Every time.", background: "8 years specialising in performance-first React architecture. Core contributor to two open-source Next.js tooling libraries. Previously at Vercel's solutions team.", expertise: ["Next.js", "React Three Fiber", "WebGL"] },
  { name: "James Okoro", role: "Head of SEO", location: "Manchester, UK", descriptor: "Has ranked #1 for keywords that other agencies said were untouchable.", background: "Led SEO for a national e-commerce brand from 12,000 to 380,000 monthly organic visitors in 24 months. 9 years in search.", expertise: ["Technical SEO", "Content strategy", "Link acquisition"] },
  { name: "Priya Kapoor", role: "Head of Paid Media", location: "London, UK", descriptor: "Managed £2.4m in annual ad spend. Never missed a ROAS target.", background: "Former PPC lead at a top-30 UK digital agency. Specialises in high-ticket service industries and e-commerce. Google Premier Partner certified.", expertise: ["Google Ads", "Meta Ads", "ROAS optimisation"] },
  { name: "Dr. Alex Chen", role: "AI Implementation Lead", location: "Singapore", descriptor: "Builds AI tools that your team actually uses.", background: "PhD in Computer Science. 6 years building ML systems at enterprise scale. Joined Avorria to put serious AI implementation within reach of ambitious UK businesses.", expertise: ["Claude API", "LLM integrations", "Workflow automation"] },
  { name: "Charlotte Reed", role: "Senior UX Designer", location: "Sheffield, UK", descriptor: "Makes complex things feel simple. It's harder than it sounds.", background: "5 years UX with a background in cognitive psychology. Led UX redesigns for two UK financial services brands and an NHS digital product.", expertise: ["User research", "Interaction design", "Accessibility"] },
  { name: "Tom Barnett", role: "Senior Full-Stack Developer", location: "Nottingham, UK", descriptor: "Front-end that performs. Back-end that doesn't break at 3am.", background: "7 years building full-stack applications. Specialises in Sanity CMS architecture and complex Next.js data-fetching patterns.", expertise: ["Next.js", "Sanity v3", "Vercel edge functions"] },
  { name: "Elena Vasquez", role: "Content Strategist", location: "Barcelona, Spain", descriptor: "Copy that ranks and converts. Rarely both, until it is.", background: "Journalism degree, 6 years writing for digital agencies and in-house marketing teams. Speaks four languages.", expertise: ["Brand voice", "SEO copywriting", "Content architecture"] },
  { name: "Ryan Okafor", role: "Analytics & Data Lead", location: "London, UK", descriptor: "Turns data into decisions. Not dashboards.", background: "5 years analytics specialisation across e-commerce and lead generation. Built custom attribution models for brands with £10m+ annual ad spend.", expertise: ["GA4", "GTM", "Attribution modelling"] },
  { name: "Nadia Ibrahim", role: "Account Director", location: "Dubai, UAE", descriptor: "The person who makes sure everything we promise actually happens.", background: "8 years in digital agency account management, including 4 years managing enterprise clients across the MENA region.", expertise: ["Client strategy", "Project delivery", "MENA market"] },
  { name: "Finn Larsson", role: "Motion & 3D Designer", location: "Oslo, Norway", descriptor: "If it moves on the site, Finn touched it.", background: "7 years in motion design for digital. Contributed GLSL shaders to three Awwwards-nominated agency builds. Studies film direction in his spare time.", expertise: ["GSAP", "React Three Fiber", "Shader programming"] },
];

export default function TeamClient() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(".team-card",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <main className="w-full bg-[#050508] min-h-screen">

      {/* HERO */}
      <section className="w-full min-h-[70svh] flex flex-col justify-center pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ THE TEAM ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          12 specialists.<br />One agency.<br /><span className="text-[#6B6B72]">Zero mediocrity.</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed max-w-[460px]">
          We're distributed across the UK, Europe, and beyond — but the work is always built to the same standard.
        </p>
      </section>

      {/* TEAM GRID */}
      <section className="w-full border-t border-[#222228] py-24">
        <div ref={gridRef} className="max-w-[1400px] mx-auto px-[var(--gutter)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name}
              className="team-card bg-[#0A0A0F] border border-[#1A1A1F] overflow-hidden flex flex-col cursor-pointer group hover:border-[#222228] transition-colors duration-300"
              onClick={() => setActiveMember(member)}
            >
              {/* Portrait placeholder */}
              <div className="w-full aspect-[3/4] bg-[#111116] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0F]/60 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#222228] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#222228]">
                      {member.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </span>
                  </div>
                </div>
                {/* Hover accent overlay */}
                <div className="absolute inset-0 bg-[#C8F135]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"/>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-2">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F2F2F0]">{member.name}</h3>
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{member.role}</span>
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72]">📍 {member.location}</span>
                <p className="font-[family-name:var(--font-body)] italic text-[12px] text-[#888888] leading-[1.6] mt-1">"{member.descriptor}"</p>
                <div className="mt-3 pt-3 border-t border-[#1A1A1F] flex items-center justify-between">
                  <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B72] uppercase tracking-widest">View Profile</span>
                  <span className="text-[#C8F135] text-[14px]">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE STRIP */}
      <section className="w-full bg-[#F2F2F0] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)]">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[#050508] mb-8" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
            Distributed by design.<br />Focused by default.
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-relaxed max-w-[540px] mb-16">
            We hire the best people, wherever they are. What keeps us coherent isn't an office — it's a shared standard. Every deliverable is reviewed by at least two senior team members before it reaches a client.
          </p>
          <div className="flex flex-wrap gap-16">
            {[["9", "Cities"], ["7", "Countries"], ["11", "Years Building on the Web"]].map(([num, label]) => (
              <div key={label} className="flex items-end gap-3">
                <span className="font-[family-name:var(--font-display)] font-bold text-[#050508]" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>{num}</span>
                <span className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] uppercase tracking-widest pb-2 max-w-[80px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO DRAWER */}
      <AnimatePresence>
        {activeMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#050508]/80 backdrop-blur-sm z-[300]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveMember(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-[#0E0E13] border-t border-[#222228] z-[301] max-h-[80vh] overflow-y-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
            >
              <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-12">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] text-[#F2F2F0] mb-1">{activeMember.name}</h2>
                    <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-widest">{activeMember.role}</span>
                  </div>
                  <button onClick={() => setActiveMember(null)}
                    className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest border border-[#222228] px-4 py-2 hover:border-[#F2F2F0] hover:text-[#F2F2F0] transition-colors">
                    CLOSE ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <p className="font-[family-name:var(--font-body)] text-[14px] text-[#6B6B72] leading-[1.9] mb-6">{activeMember.background}</p>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.expertise.map(exp => (
                        <span key={exp} className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] border border-[#C8F135]/30 px-3 py-1 uppercase tracking-widest">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-[family-name:var(--font-display)] italic text-[28px] text-[#F2F2F0] leading-tight border-l-2 border-[#C8F135] pl-8">
                    "{activeMember.descriptor}"
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
