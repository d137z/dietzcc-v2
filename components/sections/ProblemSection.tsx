"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowLeftRight, FileText, BarChart3 } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const cards = [
  {
    icon: Mail,
    title: "Gentagne mails",
    body: "Du besvarer de samme spørgsmål igen og igen. En AI-assistent kan klare 80% af dem.",
  },
  {
    icon: ArrowLeftRight,
    title: "Data mellem systemer",
    body: "Dine programmer taler ikke sammen. Nogen sidder og copy-paster. Det kan automatiseres.",
  },
  {
    icon: FileText,
    title: "Dokumenter og bilag",
    body: "Fakturaer, kontrakter, ordrer. AI kan læse dem, udtrække data og sende videre.",
  },
  {
    icon: BarChart3,
    title: "Rapporter og opfølgning",
    body: "Ugentlige rapporter der bygges i hånden. Kunder der glemmes. Alt sammen noget software kan tage sig af.",
  },
];

function ProblemCard({
  icon: Icon,
  title,
  body,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group p-8 rounded-[16px] border cursor-default"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        transition: "transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out",
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-md)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
      }}
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
      <h3
        className="mb-3 font-semibold"
        style={{
          fontSize: "var(--font-h4)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {body}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">PROBLEMET</p>
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
            Hver uge forsvinder timer på opgaver, der aldrig burde kræve et menneske.
          </h2>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Manuelle mails. Data der skal flyttes fra ét system til et andet. Bilag der skal læses.
            Tilbud der skal sendes. Du kender det.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <ProblemCard
              key={card.title}
              {...card}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
