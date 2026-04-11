import { articles, getArticle, getRelatedArticles } from "@/data/articles-data";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} | Avorria Insights`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);

  return (
    <main className="w-full bg-[#0A0A0A] min-h-screen text-[#F5F5F0]">
      
      {/* ─── READING PROGRESS (FIXED TOP) ─── */}
      <div className="fixed top-16 left-0 w-full h-[2px] z-50 pointer-events-none">
        <div id="read-progress" className="h-full bg-[#C8F135] w-0" />
      </div>

      {/* ─── ARTICLE HERO ─── */}
      <section className="w-full pt-48 pb-16 px-[var(--gutter)] max-w-[1400px] mx-auto border-b border-[#1E1E1E]">
        <div className="max-w-[900px]">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] uppercase tracking-widest">{article.category}</span>
            <span className="text-[#1E1E1E]">|</span>
            <span className="font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] uppercase tracking-widest">{article.readTime} READ</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(40px,7vw,100px)] leading-[0.9] -tracking-[0.03em] mb-12">
            {article.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 pt-10 border-t border-[#1E1E1E]">
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">WRITTEN BY</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#F5F5F0]">{article.author}</span>
            </div>
            <div className="flex flex-col gap-0.5 md:pl-10 md:border-l md:border-[#1E1E1E]">
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">PUBLISHED</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-[14px] text-[#F5F5F0]">{article.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE CONTENT ─── */}
      <section className="w-full py-24 px-[var(--gutter)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-24">
          
          {/* Main Body */}
          <article className="max-w-[800px]">
            <p className="font-[family-name:var(--font-display)] text-[22px] md:text-[28px] text-[#F5F5F0] leading-relaxed mb-16 italic opacity-90 border-l-2 border-[#C8F135] pl-8">
              {article.excerpt}
            </p>

            <div className="flex flex-col gap-16">
              {article.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-[28px] md:text-[36px] text-[#F5F5F0] leading-tight">
                    {section.heading}
                  </h2>
                  <div className="font-[family-name:var(--font-display)] text-[17px] text-[#6B6B6B] leading-[1.8] whitespace-pre-line space-y-6">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-16">
              {/* Share */}
              <div className="flex flex-col gap-4">
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">SHARE INSIGHT</span>
                <div className="flex gap-4">
                  {["LN", "TW", "FB"].map(s => (
                    <button key={s} className="w-10 h-10 border border-[#1E1E1E] flex items-center justify-center font-[family-name:var(--font-body)] text-[11px] text-[#6B6B6B] hover:border-[#C8F135] hover:text-[#C8F135] transition-colors">{s}</button>
                  ))}
                </div>
              </div>

              {/* Related */}
              <div className="flex flex-col gap-6">
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest">RELATED ARTICLES</span>
                <div className="flex flex-col gap-8">
                  {related.map(r => (
                    <TransitionLink key={r.slug} href={`/insights/${r.slug}`} className="group flex flex-col gap-2">
                       <span className="font-[family-name:var(--font-body)] text-[9px] text-[#C8F135] uppercase tracking-widest">{r.category}</span>
                       <h4 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#F5F5F0] group-hover:text-[#C8F135] transition-colors leading-tight">{r.title}</h4>
                    </TransitionLink>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-[#111111] border border-[#1E1E1E] p-8 flex flex-col gap-6">
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#F5F5F0]">Weekly Alpha</h4>
                <p className="font-[family-name:var(--font-body)] text-[12px] text-[#6B6B6B] leading-relaxed">The exact commercial strategies we use for our own businesses. Zero spam.</p>
                <div className="flex flex-col gap-3">
                  <input type="email" placeholder="Email address" className="bg-transparent border border-[#1E1E1E] px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#C8F135] transition-colors" />
                  <button className="bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[11px] uppercase py-3 tracking-widest hover:bg-[#F5F5F0] transition-colors">SUBSCRIBE</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── NEXT ARTICLE ─── */}
      <section className="w-full py-24 border-t border-[#1E1E1E]">
        <div className="max-w-[1400px] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
          <span className="font-[family-name:var(--font-body)] text-[10px] text-[#6B6B6B] uppercase tracking-widest mb-6">CONTINUE READING</span>
          <TransitionLink 
            href="/insights" 
            className="font-[family-name:var(--font-display)] font-bold text-[24px] md:text-[32px] text-[#F5F5F0] hover:text-[#C8F135] transition-colors"
          >
            ← BACK TO ALL INSIGHTS
          </TransitionLink>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section className="w-full bg-[#111111] py-24 px-[var(--gutter)] border-y border-[#1E1E1E] text-center">
        <h3 className="font-[family-name:var(--font-display)] font-bold text-[32px] md:text-[48px] text-[#F5F5F0] mb-8">Ready to evolve your digital strategy?</h3>
        <TransitionLink 
          href="/start-a-project" 
          className="inline-block bg-[#C8F135] text-[#0A0A0A] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-12 py-6 tracking-widest hover:bg-[#F5F5F0] transition-colors"
          data-magnetic
        >
          START THE CONVERSATION →
        </TransitionLink>
      </section>
    </main>
  );
}
