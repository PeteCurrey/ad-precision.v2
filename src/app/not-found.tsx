import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full bg-[#050508] min-h-screen flex flex-col items-center justify-center px-[var(--gutter)] text-center">
      <div className="font-[family-name:var(--font-body)] text-[11px] text-[#C8F135] tracking-[0.15em] uppercase mb-8">[ 404 ]</div>
      <h1 className="font-[family-name:var(--font-display)] font-bold text-[#F2F2F0] leading-[0.92] mb-8" style={{ fontSize: "clamp(80px, 15vw, 200px)" }}>
        404
      </h1>
      <p className="font-[family-name:var(--font-body)] text-[16px] text-[#6B6B72] max-w-[400px] leading-relaxed mb-12">
        This page doesn't exist. It might have moved, been removed, or you may have typed the address incorrectly.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/"
          className="bg-[#C8F135] text-[#050508] font-[family-name:var(--font-display)] font-bold text-[13px] uppercase px-10 py-5 hover:bg-white transition-colors">
          HOME →
        </Link>
        <Link href="/contact"
          className="border border-[#222228] text-[#F2F2F0] font-[family-name:var(--font-body)] text-[12px] uppercase tracking-widest px-8 py-5 hover:border-[#C8F135] transition-colors">
          CONTACT
        </Link>
      </div>
    </main>
  );
}
