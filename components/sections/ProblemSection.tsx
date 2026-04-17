"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowLeftRight, FileText, BarChart3 } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Mail, ArrowLeftRight, FileText, BarChart3];

function ProblemCard({ icon: Icon, title, body, delay }: { icon: React.ElementType; title: string; body: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group p-8 rounded-[16px] border cursor-default"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-sm)", transition: "transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out" }}
      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)"; }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
        className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-xl"
        style={{ background: "var(--accent-muted)" }}
      >
        <Icon size={18} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
      </motion.div>
      <h3 className="mb-3 font-semibold" style={{ fontSize: "var(--font-h4)", color: "var(--text-primary)", fontFamily: "var(--font-geist-sans)" }}>
        {title}
      </h3>
      <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>{body}</p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundImage: "url('/images/baggrund2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container-wide relative">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">{t.problem.eyebrow}</p>
          <h2 className="mb-6 max-w-2xl" style={{ fontSize: "var(--font-h1)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)", color: "var(--text-primary)" }}>
            {t.problem.headline}
          </h2>
          <p className="max-w-xl" style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {t.problem.sub}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.problem.cards.map((card, i) => (
            <ProblemCard key={i} icon={icons[i]} title={card.title} body={card.body} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
