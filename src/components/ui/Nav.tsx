"use client";

import { useState, useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { name: "Services", href: "/services", hasMega: true },
  { name: "Work", href: "/work", hasMega: false },
  { name: "About", href: "/about", hasMega: false },
  { name: "Insights", href: "/insights", hasMega: false },
];

const coreServices = [
  { name: "Web Design & Development", href: "/services/web-design-development" },
  { name: "AI Implementation", href: "/services/ai-implementation" },
  { name: "Search Engine Optimisation", href: "/services/seo" },
  { name: "Paid Advertising", href: "/services/paid-advertising" },
  { name: "Analytics & Data", href: "/services/analytics-data" },
];

const sectors = [
  { name: "Manufacturing & Industrial", href: "/manufacturing" },
  { name: "Facilities Management", href: "/law-firms" },
  { name: "Hospitality & Food", href: "/hospitality" },
  { name: "Professional Services", href: "/finance" },
  { name: "Retail & E-Commerce", href: "/retail-ecommerce" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background
      setScrolled(currentScrollY > 50);

      // Visibility logic (Hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Reset menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // GSAP mobile nav animation
  useEffect(() => {
    if (!menuOpen || !mobileLinksRef.current) return;
    const links = mobileLinksRef.current.querySelectorAll(".mobile-nav-item");
    gsap.fromTo(links,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.2 }
    );
  }, [menuOpen]);

  const handleServicesEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleServicesLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-[var(--gutter)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${!visible ? "-translate-y-full" : "translate-y-0"}`}
        style={{
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.92)" : "rgba(10, 10, 10, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid #1E1E1E" : "1px solid transparent",
        }}
      >
        {/* Wordmark */}
        <TransitionLink 
          href="/" 
          className="font-[family-name:var(--font-display)] font-semibold text-[18px] tracking-[0.2em] text-[#F5F5F0] hover:text-[#C8F135] transition-colors duration-300"
          data-magnetic
        >
          AVORRIA
        </TransitionLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.name}
              onMouseEnter={link.hasMega ? handleServicesEnter : undefined}
              onMouseLeave={link.hasMega ? handleServicesLeave : undefined}
              className="relative"
            >
              <TransitionLink
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] hover:text-[#F5F5F0] transition-colors relative group py-2 font-[family-name:var(--font-body)] font-medium"
                data-magnetic
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C8F135] transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""}`} />
              </TransitionLink>
            </div>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-6">
          <TransitionLink 
            href="/start-a-project"
            className="hidden md:flex items-center justify-center bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[11px] px-8 py-3.5 uppercase tracking-widest hover:bg-[#F5F5F0] transition-colors"
            data-magnetic
          >
            START A PROJECT
          </TransitionLink>
          
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px] z-[60] relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-full h-px bg-[#F5F5F0] transform transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-full h-px bg-[#F5F5F0] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-px bg-[#F5F5F0] transform transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* ─── MEGA MENU PANEL ─── */}
      <div
        ref={megaRef}
        onMouseEnter={handleMegaEnter}
        onMouseLeave={handleMegaLeave}
        className="fixed top-20 left-0 w-full z-[45] pointer-events-none"
        style={{ opacity: 0, transform: "translateY(-10px)" }}
      >
        {megaOpen && (
          <MegaPanel megaRef={megaRef} />
        )}
      </div>

      {/* Backdrop blur when mega is open */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-[40] bg-[#0A0A0A]/60 backdrop-blur-[6px] pointer-events-none"
          style={{ top: "80px" }}
        />
      )}

      {/* ─── MOBILE OVERLAY ─── */}
      {menuOpen && (
        <div
          ref={mobileNavRef}
          className="fixed inset-0 bg-[#0A0A0A] z-[55] flex flex-col justify-between px-[var(--gutter)] pt-32 pb-16 overflow-y-auto"
        >
          <div ref={mobileLinksRef} className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-nav-item">
                {link.hasMega ? (
                  <>
                    <button
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className="w-full text-left font-[family-name:var(--font-display)] font-bold text-5xl text-[#F5F5F0] py-4 flex items-center justify-between group"
                    >
                      <span className="group-hover:text-[#C8F135] transition-colors">{link.name}</span>
                      <span className={`text-[#C8F135] text-3xl transition-transform duration-300 ${servicesExpanded ? "rotate-90" : ""}`}>→</span>
                    </button>
                    {servicesExpanded && (
                      <div className="pl-6 pb-6 flex flex-col gap-4 border-l border-[#1E1E1E]">
                        {coreServices.map((svc) => (
                          <TransitionLink
                            key={svc.name}
                            href={svc.href}
                            className="font-[family-name:var(--font-display)] text-xl text-[#6B6B6B] hover:text-[#C8F135] transition-colors"
                          >
                            {svc.name}
                          </TransitionLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <TransitionLink
                    href={link.href}
                    className="block font-[family-name:var(--font-display)] font-bold text-5xl text-[#F5F5F0] py-4 hover:text-[#C8F135] transition-colors"
                  >
                    {link.name}
                  </TransitionLink>
                )}
              </div>
            ))}
            <div className="mobile-nav-item">
              <TransitionLink
                href="/contact"
                className="block font-[family-name:var(--font-display)] font-bold text-5xl text-[#F5F5F0] py-4 hover:text-[#C8F135] transition-colors"
              >
                Contact
              </TransitionLink>
            </div>
          </div>

          <div className="mobile-nav-item flex flex-col gap-10 mt-12 bg-[#111111] p-10 border border-[#1E1E1E]">
            <div className="flex flex-wrap gap-8">
              {["LinkedIn", "Twitter/X", "Instagram"].map(social => (
                <a key={social} href="#" className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] hover:text-[#C8F135] transition-colors">{social}</a>
              ))}
            </div>
            <TransitionLink 
              href="/start-a-project" 
              className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-xs px-10 py-5 uppercase tracking-widest inline-block text-center"
            >
              START A PROJECT
            </TransitionLink>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── MEGA PANEL COMPONENT ─── */
function MegaPanel({ megaRef }: { megaRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    if (!megaRef.current) return;
    
    const links = megaRef.current.querySelectorAll(".mega-stagger");
    
    gsap.set(megaRef.current, { opacity: 0, y: -10 });
    gsap.to(megaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power4.out",
    });
    
    gsap.fromTo(links,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );
    
    megaRef.current.style.pointerEvents = "auto";

    return () => {
      if (megaRef.current) {
        gsap.to(megaRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
        });
        megaRef.current.style.pointerEvents = "none";
      }
    };
  }, [megaRef]);

  return (
    <div className="w-full bg-[#111111] border-b border-[#1E1E1E] shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] py-20 grid grid-cols-4 gap-12">
        
        {/* Col 1 — Business Orientation */}
        <div className="flex flex-col gap-6 mega-stagger">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#C8F135] uppercase tracking-[0.2em]">ORIENTATION</span>
          <p className="font-[family-name:var(--font-display)] text-[18px] text-[#6B6B6B] leading-[1.3] italic">
            Building technical assets that generate commercial leverage.
          </p>
          <TransitionLink 
            href="/services"
            className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-widest mt-4 hover:text-[#F5F5F0] transition-colors w-fit"
          >
            SERVICE ARCHIVE →
          </TransitionLink>
        </div>

        {/* Col 2 — Core Capabilities */}
        <div className="flex flex-col gap-4">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4 mega-stagger">CAPABILITIES</span>
          {coreServices.map((svc) => (
            <TransitionLink
              key={svc.name}
              href={svc.href}
              className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-[14px] font-bold text-[#F5F5F0] hover:text-[#C8F135] transition-colors mega-stagger"
            >
              <span className="text-[#C8F135] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">→</span>
              {svc.name}
            </TransitionLink>
          ))}
        </div>

        {/* Col 3 — Sector Expertise */}
        <div className="flex flex-col gap-4">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-4 mega-stagger">SECTORS</span>
          {sectors.map((sector) => (
            <TransitionLink
              key={sector.name}
              href={sector.href}
              className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-[14px] text-[#6B6B6B] hover:text-[#C8F135] transition-colors mega-stagger"
            >
              <span className="text-[#C8F135] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">→</span>
              {sector.name}
            </TransitionLink>
          ))}
        </div>

        {/* Col 4 — Performance Snapshot */}
        <div className="flex flex-col mega-stagger">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-6">LATEST REVENUE BENCHMARK</span>
          <TransitionLink
            href="/insights/98-pagespeed-without-sacrificing-design"
            className="group flex flex-col gap-6 bg-[#0A0A0A] p-8 border border-[#1E1E1E] hover:border-[#C8F135] transition-colors"
          >
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-body)] text-[9px] text-[#6B6B6B] uppercase tracking-widest">PERFORMANCE</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors leading-tight">
                98/100 LCP Efficiency
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#C8F135] font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest">
               READ ANALYSIS <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
