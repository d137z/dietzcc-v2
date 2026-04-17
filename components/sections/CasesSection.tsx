"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Counter from "@/components/Counter";
import AnimateIn from "@/components/AnimateIn";
import { useLanguage } from "@/contexts/LanguageContext";

type CaseData = {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  savedNumber: number;
  savedLabel: string;
  savedPrefix: string;
  savedSuffix?: string;
};

function CaseCard({ caseData, beforeLabel, afterLabel, savedLabel, delay }: { caseData: CaseData; beforeLabel: string; afterLabel: string; savedLabel: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[16px] border overflow-hidden"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Header */}
      <div
        className="px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium" style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            {caseData.id}
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "var(--accent-muted)", color: "var(--accent-dark)", fontSize: "11px" }}>
            {caseData.category}
          </span>
        </div>
        <div className="text-right">
          <div className="font-semibold tabular-nums" style={{ fontSize: "1.5rem", color: "var(--accent)", fontFamily: "var(--font-geist-sans)", lineHeight: 1 }}>
            {inView && (
              <>
                {caseData.savedPrefix}
                <Counter value={caseData.savedNumber} />
                {caseData.savedSuffix ?? ""}
              </>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {savedLabel} {caseData.savedLabel}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-8 py-5 sm:py-7">
        <h3 className="mb-6 font-semibold" style={{ fontSize: "var(--font-h3)", color: "var(--text-primary)", fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.01em" }}>
          {caseData.title}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl min-w-0" style={{ background: "rgba(163,163,163,0.08)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: "var(--text-muted)", letterSpacing: "0.05em", fontSize: "10px" }}>
              {beforeLabel}
            </p>
            <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6, overflowWrap: "break-word" }}>
              {caseData.before}
            </p>
          </div>
          <div className="p-4 rounded-xl min-w-0" style={{ background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.2)" }}>
            <p className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: "var(--accent)", letterSpacing: "0.05em", fontSize: "10px" }}>
              {afterLabel}
            </p>
            <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6, overflowWrap: "break-word" }}>
              {caseData.after}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function CasesSection() {
  const { t } = useLanguage();

  return (
    <section id="eksempler" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/images/baggrund4.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.27 }} />
      <div className="container-wide relative">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">{t.cases.eyebrow}</p>
          <h2 className="mb-4 max-w-2xl" style={{ fontSize: "var(--font-h1)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)", color: "var(--text-primary)" }}>
            {t.cases.headline}
          </h2>
          <p style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)" }}>{t.cases.sub}</p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {t.cases.cases.map((c, i) => (
            <CaseCard
              key={c.id}
              caseData={c}
              beforeLabel={t.cases.before}
              afterLabel={t.cases.after}
              savedLabel={t.cases.saved}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
