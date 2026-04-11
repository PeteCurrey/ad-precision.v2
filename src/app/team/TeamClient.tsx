"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion, AnimatePresence } from "framer-motion";

const team = [
  { name: "Pete Currey", role: "Founder & CEO", location: "Chesterfield, UK", descriptor: "Runs seven businesses. Builds websites like the eighth depends on it.", background: "Founder of Avorria, EntireFM, Alkota, BlockWaste, The Batch House, The Glass Yard, and Travio. 11 years building digital infrastructure for his own companies before offering it to others.", expertise: ["Commercial strategy", "Client relationships", "Product vision"] },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".team-card",
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-[70svh] flex flex-col justify-end pt-40 pb-24 px-[var(--gutter)] max-w-[1400px] mx-auto">
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ THE COLLECTIVE ]</div>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(48px, 10vw, 160px)" }}>
          12 specialists.<br />One agency.<br /><span className="text-[#6B6B6B]">Zero noise.</span>
        </h1>
        <p className="font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-relaxed max-w-[500px]">
          We&apos;re distributed across the UK, Europe, and Asia — but the work is always built to a single architectural standard.
        </p>
      </section>

      {/* ─── TEAM GRID ─── */}
      <section className="team-grid w-full border-t border-[#1E1E1E] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name}
              className="team-card bg-[#111111] border border-[#1E1E1E] flex flex-col cursor-pointer group hover:border-[#C8F135] transition-all duration-500 overflow-hidden"
              onClick={() => setActiveMember(member)}
            >
              {/* Profile Wrapper */}
              <div className="w-full aspect-[4/5] bg-[#0A0A0A] relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                <span className="font-[family-name:var(--font-display)] font-bold text-[80px] text-[#1E1E1E] group-hover:text-[#C8F135]/10 transition-colors">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
                <div className="absolute bottom-10 left-10 flex flex-col gap-1 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                   <h3 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0]">{member.name}</h3>
                   <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-widest">{member.role}</span>
                </div>
              </div>

              {/* Quick Info bar */}
              <div className="p-10 flex items-center justify-between border-t border-[#1E1E1E]">
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">{member.location}</span>
                <span className="text-[#C8F135] text-[20px] translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VALUES STRIP ─── */}
      <section className="w-full bg-[#111111] border-y border-[#1E1E1E] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col md:flex-row gap-20">
           <div className="w-full md:w-1/3">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[52px] text-[#F5F5F0] leading-[1]">
                Distributed <br/>by design.
              </h2>
           </div>
           <div className="w-full md:w-2/3 flex flex-col gap-10">
              <p className="font-[family-name:var(--font-display)] text-[20px] text-[#6B6B6B] leading-relaxed max-w-[600px]">
                We hire the best specialists, wherever they are. What keeps us coherent isn&apos;t an office — it&apos;s a shared architectural standard. Every deliverable is reviewed by two senior partners before it reaches a client.
              </p>
              <div className="flex flex-wrap gap-12">
                {[[ "9", "Cities" ], [ "7", "Countries" ], [ "11yr", "Legacy" ]].map(([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="font-[family-name:var(--font-display)] font-bold text-[#C8F135] text-[40px] leading-none">{num}</span>
                    <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">{label}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── BIO DRAWER ─── */}
      <AnimatePresence>
        {activeMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[300]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveMember(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#C8F135]/30 z-[301] max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 350 }}
            >
              <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-20">
                <div className="flex items-start justify-between mb-16">
                  <div className="flex flex-col gap-4">
                    <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-[0.2em]">[ MEMBER PROFILE ]</span>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-[40px] md:text-[72px] text-[#F5F5F0] leading-none">{activeMember.name}</h2>
                    <span className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#6B6B6B] uppercase tracking-widest">{activeMember.role}</span>
                  </div>
                  <button onClick={() => setActiveMember(null)}
                    className="w-16 h-16 border border-[#1E1E1E] flex items-center justify-center text-[#F5F5F0] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors rounded-full text-[20px]">
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20">
                  <div className="flex flex-col gap-10">
                    <div className="font-[family-name:var(--font-display)] text-[18px] text-[#F5F5F0] leading-relaxed max-w-[700px]">
                      {activeMember.background}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activeMember.expertise.map(exp => (
                        <span key={exp} className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] border border-[#C8F135]/40 px-5 py-3 tracking-widest uppercase">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-[family-name:var(--font-display)] italic text-[24px] md:text-[36px] text-[#6B6B6B] leading-[1.2] border-l-2 border-[#C8F135] pl-10 h-max">
                     &quot;{activeMember.descriptor}&quot;
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
