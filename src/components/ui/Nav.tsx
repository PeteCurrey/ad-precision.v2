"use client";

import { useState, useEffect } from "react";
import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ backgroundColor: "rgba(5, 5, 8, 0)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(5, 5, 8, 0.9)" : "rgba(5, 5, 8, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full h-[72px] z-[50] flex items-center justify-between px-[var(--gutter)] border-b border-transparent transition-colors"
        style={{ borderBottomColor: scrolled ? "var(--border)" : "transparent" }}
      >
        <TransitionLink href="/" className="font-[family-name:var(--font-display)] font-bold text-[20px] tracking-tight group relative overflow-hidden text-white" data-magnetic>
          <span className="relative z-10 transition-colors group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#C8F135] to-[#C8F135] bg-[length:0%_100%] bg-no-repeat group-hover:bg-[length:100%_100%] duration-300">
            AVORRIA
          </span>
        </TransitionLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <TransitionLink
              key={link.name}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.12em] text-[#6B6B72] hover:text-[#F2F2F0] transition-colors relative group py-2"
              data-magnetic
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C8F135] transition-all duration-200 group-hover:w-full" />
            </TransitionLink>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <TransitionLink 
            href="/start-a-project"
            className="hidden md:flex items-center justify-center bg-[#C8F135] text-[#050508] font-bold text-[11px] px-5 py-2.5 uppercase tracking-widest hover:scale-[0.97] hover:bg-[#d8fc56] transition-all origin-center"
            data-magnetic
          >
            START A PROJECT
          </TransitionLink>
          
          <button 
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-[6px] z-[60] relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-full h-[2px] bg-[#F2F2F0] transform transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`w-full h-[2px] bg-[#F2F2F0] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-[2px] bg-[#F2F2F0] transform transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 bg-[#050508] z-[40] flex flex-col justify-center px-[var(--gutter)] pt-20"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <TransitionLink href={link.href} className="text-4xl text-white font-[family-name:var(--font-display)] font-bold">
                    {link.name}
                  </TransitionLink>
                </motion.div>
              ))}
              <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.1 + links.length * 0.05, duration: 0.4 }}
                  className="mt-8"
              >
                 <TransitionLink href="/start-a-project" className="bg-[#C8F135] text-[#050508] font-bold text-sm px-6 py-4 uppercase tracking-widest inline-block">
                    START A PROJECT
                 </TransitionLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
