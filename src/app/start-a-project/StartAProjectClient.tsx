"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "@/components/ui/TransitionLink";

type Step = 1 | 2 | 3 | 4;

const INDUSTRIES = ["Legal", "Healthcare", "Manufacturing", "Real Estate", "Finance / Fintech", "Hospitality", "Education", "Retail / E-Commerce", "Construction", "Professional Services", "SaaS / Technology", "Recruitment", "Automotive", "Charity / Non-Profit", "Food & Drink", "Facilities Management", "Other"];
const SIZES = ["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"];
const SERVICES = ["New Website", "Website Redesign", "SEO", "Paid Media", "AI Implementation", "Branding", "E-Commerce", "Analytics / CRO", "All of the above"];
const BUDGETS = ["< £5,000", "£5,000–£15,000", "£15,000–£35,000", "£35,000–£75,000", "£75,000+", "Let's discuss"];
const FOUND_US = ["Google", "LinkedIn", "Referral / Word of Mouth", "Social Media", "Conference / Event", "Other"];
const CONTACT_PREFS = ["Email", "Phone", "Video Call"];

export default function StartAProjectClient() {
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    // Step 1
    company: "", website: "", industry: "", size: "",
    // Step 2
    services: [] as string[], description: "",
    // Step 3
    budget: "", startDate: "", foundUs: "",
    // Step 4
    name: "", email: "", phone: "", contactPref: "",
  });

  const set = (key: keyof typeof form, val: string | string[]) => setForm(f => ({ ...f, [key]: val }));
  const toggleService = (svc: string) => {
    set("services", form.services.includes(svc)
      ? form.services.filter(s => s !== svc)
      : [...form.services, svc]
    );
  };

  const handleSubmit = async () => {
    setSending(true);
    await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }).catch(() => null);
    setSending(false);
    setDone(true);
  };

  const stepVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  if (done) {
    return (
      <main className="w-full bg-[#050508] min-h-screen flex items-center justify-center px-[var(--gutter)]">
        <motion.div className="text-center max-w-[600px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-6">[ BRIEF RECEIVED ]</div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-6" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            We have your brief.
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-[#6B6B72] leading-relaxed mb-12">
            One of our senior team will respond within one working day.
          </p>
          <div className="flex flex-col gap-4 text-left border border-[#222228] p-8 mb-12">
            {[["01 — REVIEW", "We'll read your brief and prepare a response."], ["02 — DISCOVERY CALL", "A 30-minute call to go deeper on your goals."], ["03 — PROPOSAL", "A fixed-fee proposal within 5 working days of the call."]].map(([num, desc]) => (
              <div key={num} className="flex gap-4">
                <span className="font-[family-name:var(--font-body)] font-bold text-[12px] text-[#C8F135]">{num}</span>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[#6B6B72]">{desc}</span>
              </div>
            ))}
          </div>
          <TransitionLink href="/" className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] uppercase tracking-widest hover:text-[#C8F135] transition-colors">← Back to home</TransitionLink>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#050508] min-h-screen pt-40 pb-24 px-[var(--gutter)]">
      <div className="max-w-[800px] mx-auto">

        {/* Label */}
        <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-10">[ START A PROJECT ]</div>

        {/* Progress dots */}
        <div className="flex items-center gap-3 mb-16">
          {([1, 2, 3, 4] as Step[]).map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === s ? "bg-[#C8F135] scale-125" : step > s ? "bg-[#C8F135]/40" : "bg-[#222228]"}`} />
              {s < 4 && <div className="w-12 h-px bg-[#222228]" />}
            </div>
          ))}
          <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] ml-3">Step {step} of 4</span>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-10" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>About your business</h1>
              <div className="flex flex-col gap-6">
                {[["Company Name", "company", "text"], ["Website (if you have one)", "website", "url"]].map(([label, key, type]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">{label}</label>
                    <input type={type} value={form[key as keyof typeof form] as string} onChange={e => set(key as keyof typeof form, e.target.value)}
                      className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors" />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Industry</label>
                  <select value={form.industry} onChange={e => set("industry", e.target.value)}
                    className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-[#050508] border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors">
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Company Size</label>
                  <select value={form.size} onChange={e => set("size", e.target.value)}
                    className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-[#050508] border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors">
                    <option value="">Select size</option>
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-10" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>About your project</h1>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">What do you need?</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(svc => (
                      <button key={svc} onClick={() => toggleService(svc)}
                        className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-all ${form.services.includes(svc) ? "bg-[#C8F135] text-[#050508] border-[#C8F135]" : "text-[#6B6B72] border-[#222228] hover:border-[#C8F135]"}`}>
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Tell us about the project</label>
                  <textarea rows={5} value={form.description} onChange={e => set("description", e.target.value)}
                    className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors resize-none"
                    placeholder="What's the project? What are your goals? What's not working currently?" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-10" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>Budget & timeline</h1>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Budget Range</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {BUDGETS.map(b => (
                      <button key={b} onClick={() => set("budget", b)}
                        className={`font-[family-name:var(--font-body)] text-[12px] px-4 py-3 border transition-all ${form.budget === b ? "bg-[#C8F135] text-[#050508] border-[#C8F135]" : "text-[#6B6B72] border-[#222228] hover:border-[#C8F135]"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Ideal Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)}
                    className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">How did you find us?</label>
                  <select value={form.foundUs} onChange={e => set("foundUs", e.target.value)}
                    className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-[#050508] border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors">
                    <option value="">Select</option>
                    {FOUND_US.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] mb-10" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>Your details</h1>
              <div className="flex flex-col gap-6">
                {[["Your Name", "name", "text"], ["Email Address", "email", "email"], ["Phone Number (optional)", "phone", "tel"]].map(([label, key, type]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">{label}</label>
                    <input type={type} value={form[key as keyof typeof form] as string} onChange={e => set(key as keyof typeof form, e.target.value)}
                      className="font-[family-name:var(--font-body)] text-[14px] text-[#F2F2F0] bg-transparent border border-[#222228] px-5 py-4 outline-none focus:border-[#C8F135] transition-colors" />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] uppercase tracking-widest">Preferred Contact</label>
                  <div className="flex gap-3">
                    {CONTACT_PREFS.map(p => (
                      <button key={p} onClick={() => set("contactPref", p)}
                        className={`font-[family-name:var(--font-body)] text-[12px] px-5 py-3 border transition-all ${form.contactPref === p ? "bg-[#C8F135] text-[#050508] border-[#C8F135]" : "text-[#6B6B72] border-[#222228] hover:border-[#C8F135]"}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-[#222228]">
          {step > 1 ? (
            <button onClick={() => setStep(s => (s - 1) as Step)}
              className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B72] uppercase tracking-widest hover:text-[#F2F2F0] transition-colors">
              ← Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button onClick={() => setStep(s => (s + 1) as Step)}
              className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={sending}
              className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors disabled:opacity-60">
              {sending ? "Sending..." : "Send Brief →"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
