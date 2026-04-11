"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";

type Step = 1 | 2 | 3 | 4;

const INDUSTRIES = ["Manufacturing", "Specialist Industrial", "Facilities Management", "Real Estate", "Hospitality", "SaaS / Tech", "E-Commerce", "Professional Services", "Other"];
const SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"];
const SERVICES = ["New Website", "Redesign", "SEO Infrastructure", "Paid Media (Meta/Google)", "AI Implementation", "Custom Software", "Strategy Only"];
const BUDGETS = ["< £5k", "£5k–£15k", "£15k–£35k", "£35k–£75k", "£75k+", "Let's discuss"];
const TIMELINES = ["Immediate", "1–3 Months", "3–6 Months", "Exploring"];

export default function StartAProjectClient() {
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    // Step 1: Services & Description
    services: [] as string[], description: "",
    // Step 2: About Business
    company: "", website: "", industry: "", size: "",
    // Step 3: Budget & Timeline
    budget: "", timeline: "",
    // Step 4: Contact
    name: "", email: "", phone: "",
  });

  const set = (key: keyof typeof form, val: any) => setForm(f => ({ ...f, [key]: val }));
  
  const toggleService = (svc: string) => {
    set("services", form.services.includes(svc)
      ? form.services.filter(s => s !== svc)
      : [...form.services, svc]
    );
  };

  const handleSubmit = async () => {
    if (sending) return;
    setSending(true);
    try {
      await fetch("/api/enquiry", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(form) 
      });
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again or email us directly at pete@avorria.com");
    } finally {
      setSending(false);
    }
  };

  // Entrance animations
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  if (done) {
    return (
      <main className="w-full bg-[#0A0A0A] min-h-screen flex items-center justify-center px-[var(--gutter)] py-40">
        <div className="text-center max-w-[700px]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">[ MISSION RECEIVED ]</div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-10" style={{ fontSize: "clamp(48px, 8vw, 110px)" }}>
            We&apos;ll be in touch <br/> <span className="text-[#C8F135]">within 24 hours.</span>
          </h1>
          <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B] leading-relaxed mb-16 max-w-[500px] mx-auto">
            Your brief has been routed to our architectural team. We don&apos;t do sales pitches — we&apos;ll come back with a strategy.
          </p>
          <TransitionLink 
            href="/" 
            className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors"
          >
            BACK TO HOME
          </TransitionLink>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen pt-48 pb-24 px-[var(--gutter)] flex flex-col items-center">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
        
        {/* FORM SIDE */}
        <div className="flex flex-col gap-12">
          
          <div className="animate-in flex flex-col gap-4">
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase">[ PROJECT ENQUIRY ]</div>
            <div className="flex items-center gap-2">
               {([1, 2, 3, 4] as Step[]).map(s => (
                 <div key={s} className="flex items-center gap-2">
                   <div className={`h-[2px] w-12 transition-all duration-500 ${step >= s ? "bg-[#C8F135]" : "bg-[#1E1E1E]"}`} />
                 </div>
               ))}
               <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] ml-4 font-bold tracking-widest uppercase">STEP {step} / 4</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h1 className="font-[family-name:var(--font-display)] font-bold text-[40px] md:text-[64px] text-[#F5F5F0] leading-[1]">What are we building?</h1>
                  <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B]">Select the services you&apos;re interested in.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {SERVICES.map(svc => (
                    <button 
                      key={svc} 
                      onClick={() => toggleService(svc)}
                      className={`font-[family-name:var(--font-display)] text-[13px] font-bold uppercase tracking-widest px-6 py-4 border transition-all duration-300 ${form.services.includes(svc) ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "text-[#6B6B6B] border-[#1E1E1E] hover:border-[#C8F135] hover:text-[#C8F135]"}`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em]">TELL US ABOUT THE GOALS</label>
                  <textarea 
                    value={form.description} 
                    onChange={e => set("description", e.target.value)}
                    className="bg-[#111111] border border-[#1E1E1E] p-6 font-[family-name:var(--font-display)] text-[16px] text-[#F5F5F0] focus:border-[#C8F135] outline-none transition-colors resize-none h-[200px]"
                    placeholder="Briefly describe what you're looking to achieve..."
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h1 className="font-[family-name:var(--font-display)] font-bold text-[40px] md:text-[64px] text-[#F5F5F0] leading-[1]">About your company.</h1>
                  <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B]">Help us understand the scale and sector.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">COMPANY NAME</label>
                    <input type="text" value={form.company} onChange={e => set("company", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">WEBSITE URL</label>
                    <input type="text" value={form.website} onChange={e => set("website", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">INDUSTRY</label>
                    <select value={form.industry} onChange={e => set("industry", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors appearance-none">
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">TEAM SIZE</label>
                     <div className="grid grid-cols-3 gap-2">
                        {SIZES.map(s => (
                          <button key={s} onClick={() => set("size", s)} className={`p-4 border text-[12px] font-bold transition-all ${form.size === s ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "text-[#6B6B6B] border-[#1E1E1E] hover:border-[#C8F135]"}`}>
                            {s}
                          </button>
                        ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h1 className="font-[family-name:var(--font-display)] font-bold text-[40px] md:text-[64px] text-[#F5F5F0] leading-[1]">Numbers & timing.</h1>
                  <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B]">We work with budgets of all sizes, but knowing your range helps us architect the right solution.</p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">APPROXIMATE BUDGET</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {BUDGETS.map(b => (
                        <button key={b} onClick={() => set("budget", b)} className={`p-6 border text-[14px] font-bold uppercase transition-all ${form.budget === b ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "text-[#6B6B6B] border-[#1E1E1E] hover:border-[#C8F135]"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">TARGET TIMELINE</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TIMELINES.map(t => (
                        <button key={t} onClick={() => set("timeline", t)} className={`p-6 border text-[14px] font-bold uppercase transition-all ${form.timeline === t ? "bg-[#C8F135] text-[#0A0A0A] border-[#C8F135]" : "text-[#6B6B6B] border-[#1E1E1E] hover:border-[#C8F135]"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h1 className="font-[family-name:var(--font-display)] font-bold text-[40px] md:text-[64px] text-[#F5F5F0] leading-[1]">One last thing.</h1>
                  <p className="font-[family-name:var(--font-display)] text-[16px] text-[#6B6B6B]">Who should we respond to?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">FULL NAME</label>
                    <input type="text" value={form.name} onChange={e => set("name", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">EMAIL ADDRESS</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">PHONE NUMBER</label>
                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} className="bg-[#111111] border border-[#1E1E1E] p-6 text-white focus:border-[#C8F135] outline-none transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-between pt-12 border-t border-[#1E1E1E]">
            {step > 1 ? (
              <button 
                onClick={() => setStep(s => (s - 1) as Step)}
                className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#6B6B6B] uppercase tracking-widest hover:text-white transition-colors"
                data-magnetic
              >
                ← BACK
              </button>
            ) : <div />}

            {step < 4 ? (
              <button 
                onClick={() => setStep(s => (s + 1) as Step)}
                className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors"
                data-magnetic
              >
                NEXT STEP →
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={sending}
                className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors disabled:opacity-50"
                data-magnetic
              >
                {sending ? "TRANSMITTING..." : "SUBMIT BRIEF →"}
              </button>
            )}
          </div>

        </div>

        {/* SIDEBAR SIDE */}
        <div className="hidden lg:flex flex-col gap-12">
          
          <div className="animate-in bg-[#111111] border border-[#1E1E1E] p-12 flex flex-col gap-10 sticky top-32">
            
            <div className="flex flex-col gap-4">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0] leading-tight text-balance">Why Avorria?</h3>
              <p className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B6B] leading-relaxed">We don&apos;t just build websites. We build commercial infrastructure for businesses that want to grow.</p>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { title: "Commercial Reality", desc: "Our founder operates seven non-agency businesses. We know your bottom line." },
                { title: "Next-Gen Performance", desc: "98+ PageSpeed. Zero WordPress. Hand-coded Next.js infrastructure." },
                { title: "Confidentiality", desc: "All briefs are handled with 100% strict confidentiality." }
              ].map(item => (
                <div key={item.title} className="flex flex-col gap-2">
                   <h4 className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#C8F135] uppercase tracking-widest">{item.title}</h4>
                   <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#1E1E1E]">
               <p className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] italic">&quot;The most data-driven agency we&apos;ve ever worked with.&quot;</p>
               <span className="font-[family-name:var(--font-body)] text-[10px] text-white font-bold block mt-2 tracking-widest uppercase">SYNERGY FM GROUP</span>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
