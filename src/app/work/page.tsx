"use client";

import { useState } from "react";
import TransitionLink from "@/components/ui/TransitionLink";

const MOCK_WORK = [
  { client: "NEXUS GROUP", tags: ["WEB DESIGN", "SEO"], title: "Redefining the digital real estate experience.", img: "/work-1.jpg", stat: "+312% organic traffic" },
  { client: "AURALIGHT", tags: ["AI IMPLEMENTATION"], title: "Automated content engines for e-commerce.", img: "/work-2.jpg", stat: "20hrs/week saved" },
  { client: "VELOCITY", tags: ["PAID MEDIA"], title: "Scaling SaaS acquisition by 400%.", img: "/work-3.jpg", stat: "400% ROAS" },
  { client: "OMNI", tags: ["WEB DESIGN", "E-COMMERCE"], title: "headless Shopify architecture.", img: "/work-4.jpg", stat: "98/100 PageSpeed" },
  { client: "LUMINA", tags: ["SEO", "PAID MEDIA"], title: "Dominating local search markets.", img: "/work-5.jpg", stat: "#1 rankings across 10 cities" },
];

const FILTERS = ["ALL", "WEB DESIGN", "SEO", "PAID MEDIA", "AI IMPLEMENTATION", "E-COMMERCE"];

export default function WorkIndexPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredWork = activeFilter === "ALL" 
    ? MOCK_WORK 
    : MOCK_WORK.filter(w => w.tags.includes(activeFilter));

  return (
    <main className="w-full bg-[#050508] min-h-screen pt-40 pb-24">
      <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col mb-16">
          <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-8">
            [ SELECTED PROJECTS ]
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[80px] text-[#F2F2F0] leading-none mb-12">
            Work that performs.
          </h1>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 border-b border-[#222228] pb-6">
            {FILTERS.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                  activeFilter === f 
                    ? "bg-[#C8F135] border-[#C8F135] text-[#050508] font-bold" 
                    : "border-[#222228] text-[#6B6B72] hover:border-[#F2F2F0] hover:text-[#F2F2F0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredWork.map((item, idx) => (
             <TransitionLink 
               key={idx} 
               href={`/work/${item.client.toLowerCase().replace(/ /g, '-')}`}
               className="flex flex-col group cursor-pointer relative"
               data-magnetic
             >
                {/* Image Section */}
                <div className="w-full aspect-[4/5] bg-[#0E0E13] border border-[#222228] mb-6 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[#222228]/30 group-hover:bg-[#222228]/0 transition-colors duration-500 z-10" />
                   
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-[#050508]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
                         <h3 className="font-[family-name:var(--font-display)] font-bold text-3xl text-white mb-4">{item.client}</h3>
                         <span className="font-[family-name:var(--font-body)] text-[12px] text-[#C8F135] uppercase tracking-widest mb-6">
                           {item.tags.join(' · ')}
                         </span>
                         <div className="border border-[#F2F2F0] px-6 py-3 font-[family-name:var(--font-body)] font-bold text-white text-[10px] tracking-widest uppercase">
                           VIEW CASE STUDY →
                         </div>
                      </div>
                   </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                     <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B72] tracking-widest uppercase">
                       {item.client}
                     </span>
                     <span className="font-[family-name:var(--font-body)] font-bold text-[11px] text-[#C8F135] tracking-widest uppercase bg-[#C8F135]/10 px-2 py-1">
                       {item.stat}
                     </span>
                   </div>
                   <h4 className="font-[family-name:var(--font-display)] font-bold text-[24px] text-[#F2F2F0] leading-tight">
                     {item.title}
                   </h4>
                </div>
             </TransitionLink>
           ))}
        </div>

      </div>
    </main>
  );
}
