"use client";

import { useState, useRef, useEffect } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap } from "@/lib/gsap";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-in",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <main className="w-full bg-[#0A0A0A] min-h-screen flex items-center justify-center px-[var(--gutter)] py-40">
        <div className="text-center max-w-[700px]">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-12">[ TRANSMISSION SUCCESSFUL ]</div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.92] mb-12" style={{ fontSize: "clamp(48px, 8vw, 110px)" }}>
            We&apos;ll be in touch <br/> <span className="text-[#C8F135]">within 24 hours.</span>
          </h1>
          <p className="font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-relaxed mb-16">
            Your enquiry has been routed to our strategy team. We don&apos;t do sales pitches — we&apos;ll respond with a technical perspective.
          </p>
          <TransitionLink 
            href="/" 
            className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors"
          >
            BACK TO HOME
          </TransitionLink>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="w-full bg-[#0A0A0A] min-h-screen pt-48 pb-24 px-[var(--gutter)] flex flex-col items-center">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-24">

        {/* ─── LEFT SIDE ─── */}
        <div className="flex flex-col">
          <div className="animate-in font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.2em] uppercase mb-10">
            [ CONTACT ]
          </div>
          <h1 className="animate-in font-[family-name:var(--font-display)] font-bold text-[#F5F5F0] leading-[0.9] -tracking-[0.03em] mb-12" style={{ fontSize: "clamp(48px, 8vw, 110px)" }}>
            Let&apos;s talk about <br /><span className="text-[#6B6B6B]">commercial gain.</span>
          </h1>
          <p className="animate-in font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-relaxed mb-16 max-w-[500px]">
            We build for businesses that understand digital as an investment, not a cost. Drop us a message to start the architectural audit.
          </p>

          <div className="animate-in flex flex-col gap-10 pt-12 border-t border-[#1E1E1E]">
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">DIRECT LINE</span>
              <a href="mailto:hello@avorria.com" className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F5F5F0] hover:text-[#C8F135] transition-colors">hello@avorria.com</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">LOCATION</span>
              <p className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#F5F5F0]">Chesterfield, UK</p>
              <p className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest mt-1 italic">Operated centrally, deployed globally.</p>
            </div>
            <div className="flex items-center gap-6 pt-10 border-t border-[#1E1E1E]">
              {["LinkedIn", "Twitter/X", "Instagram"].map(social => (
                <a key={social} href="#" className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest hover:text-[#C8F135] transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT SIDE: FORM ─── */}
        <div className="animate-in flex flex-col bg-[#111111] border border-[#1E1E1E] p-10 md:p-16">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {[
              { label: "Your Name", key: "name", type: "text", required: true },
              { label: "Email Address", key: "email", type: "email", required: true },
              { label: "Phone (optional)", key: "phone", type: "tel", required: false },
              { label: "Company (optional)", key: "company", type: "text", required: false },
            ].map(({ label, key, type, required }) => (
              <div key={key} className="flex flex-col gap-4">
                <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">
                  {label} {required && <span className="text-[#C8F135]">*</span>}
                </label>
                <input
                  type={type}
                  required={required}
                  value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  className="font-[family-name:var(--font-display)] text-[16px] text-[#F5F5F0] bg-transparent border-b border-[#1E1E1E] pb-4 outline-none focus:border-[#C8F135] transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <label className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em]">
                YOUR MESSAGE <span className="text-[#C8F135]">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={e => set("message", e.target.value)}
                placeholder="Briefly describe your objectives..."
                className="font-[family-name:var(--font-display)] text-[16px] text-[#F5F5F0] bg-transparent border-b border-[#1E1E1E] pb-4 outline-none focus:border-[#C8F135] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[14px] uppercase tracking-widest px-14 py-6 hover:bg-[#F5F5F0] transition-colors text-center disabled:opacity-50 mt-10"
              data-magnetic
            >
              {sending ? "TRANSMITTING..." : "SUBMIT MESSAGE →"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
