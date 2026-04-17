"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Counter from "@/components/Counter";
import AnimateIn from "@/components/AnimateIn";

const cases = [
  {
    id: "01",
    title: "Webshoppens ordreflow",
    before: "4 timer dagligt på manuel ordrehåndtering mellem Shopify, e-conomic og fragtfirma.",
    after: "Fuldt automatiseret. 15 minutter dagligt til stikprøver.",
    savedNumber: 20,
    savedLabel: "timer/uge",
    savedPrefix: "~",
    category: "E-handel",
  },
  {
    id: "02",
    title: "AI-assistent til kundeservice",
    before: "60+ gentagne mails om dagen fra kunder med standardspørgsmål.",
    after: "AI-assistent besvarer 75% automatisk. Resten eskaleres med fuld kontekst.",
    savedNumber: 15,
    savedLabel: "timer/uge",
    savedPrefix: "~",
    category: "Kundeservice",
  },
  {
    id: "03",
    title: "Bilag-automation for revisor",
    before: "3 dage om måneden på at indtaste bilag fra 40 kunder.",
    after: "AI læser bilagene, e-conomic opdateres automatisk.",
    savedNumber: 2,
    savedSuffix: "½ dag/md.",
    savedPrefix: "",
    savedLabel: "arbejdsdag/måned",
    category: "Regnskab",
  },
];

function CaseCard({
  caseData,
  delay,
}: {
  caseData: (typeof cases)[0];
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[16px] border overflow-hidden"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono font-medium"
            style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}
          >
            {caseData.id}
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs font-medium"
            style={{
              background: "var(--accent-muted)",
              color: "var(--accent-dark)",
              fontSize: "11px",
            }}
          >
            {caseData.category}
          </span>
        </div>

        {/* Saved counter */}
        <div className="text-right">
          <div
            className="font-semibold tabular-nums"
            style={{
              fontSize: "1.5rem",
              color: "var(--accent)",
              fontFamily: "var(--font-geist-sans)",
              lineHeight: 1,
            }}
          >
            {inView && (
              <>
                {caseData.savedPrefix}
                <Counter value={caseData.savedNumber} />
                {caseData.savedSuffix ?? ""}
              </>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            sparet {caseData.savedLabel}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        <h3
          className="mb-6 font-semibold"
          style={{
            fontSize: "var(--font-h3)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-geist-sans)",
            letterSpacing: "-0.01em",
          }}
        >
          {caseData.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Før */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(163,163,163,0.08)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p
              className="text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)", letterSpacing: "0.05em", fontSize: "10px" }}
            >
              FØR
            </p>
            <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {caseData.before}
            </p>
          </div>

          {/* Efter */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(6,182,212,0.05)",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <p
              className="text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--accent)", letterSpacing: "0.05em", fontSize: "10px" }}
            >
              EFTER
            </p>
            <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {caseData.after}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function CasesSection() {
  return (
    <section id="eksempler" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-wide">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">EKSEMPLER</p>
          <h2
            className="mb-6 max-w-2xl"
            style={{
              fontSize: "var(--font-h1)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
              color: "var(--text-primary)",
            }}
          >
            Fra manuelle timer til automatiske minutter.
          </h2>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Her er typen af løsninger jeg bygger — og den effekt de har.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <CaseCard key={c.id} caseData={c} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
