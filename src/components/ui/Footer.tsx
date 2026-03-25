import TransitionLink from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050508] text-[#6B6B72] border-t border-[#222228] py-16 px-[var(--gutter)] relative z-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Area */}
        <div className="col-span-1 md:col-span-1">
          <TransitionLink href="/" className="font-[family-name:var(--font-display)] font-bold text-[20px] text-white tracking-tight block mb-4" data-magnetic>
            AVORRIA
          </TransitionLink>
          <p className="text-[13px] leading-relaxed max-w-[280px]">
            We build digital weapons. Premium web design, AI implementation, SEO, and paid media for businesses serious about growth.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-4 font-[family-name:var(--font-body)]">Navigation</h4>
          <TransitionLink href="/services" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Services</TransitionLink>
          <TransitionLink href="/work" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Work</TransitionLink>
          <TransitionLink href="/about" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">About</TransitionLink>
          <TransitionLink href="/insights" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Insights</TransitionLink>
          <TransitionLink href="/contact" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Contact</TransitionLink>
        </div>

        {/* Locations */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-4 font-[family-name:var(--font-body)]">Locations</h4>
          <TransitionLink href="/web-design/london" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">London</TransitionLink>
          <TransitionLink href="/web-design/manchester" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Manchester</TransitionLink>
          <TransitionLink href="/web-design/sheffield" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Sheffield</TransitionLink>
          <TransitionLink href="/web-design/nottingham" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit">Nottingham</TransitionLink>
        </div>

        {/* Social / Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-4 font-[family-name:var(--font-body)]">Connect</h4>
          <a href="#" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit" target="_blank" rel="noopener noreferrer">Twitter / X</a>
          <a href="#" className="text-[13px] hover:text-[#C8F135] transition-colors w-fit" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-[#222228] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} Avorria. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <TransitionLink href="/privacy" className="hover:text-white transition-colors">Privacy Policy</TransitionLink>
          <TransitionLink href="/terms" className="hover:text-white transition-colors">Terms of Service</TransitionLink>
        </div>
      </div>
    </footer>
  );
}
