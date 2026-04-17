"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, Hammer, Handshake } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Samtale",
    body: "30 minutter på Teams eller telefon. Gratis og uforpligtende. Vi finder ud af om jeg kan hjælpe — og om vi passer sammen.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Plan",
    body: "Jeg sender en skriftlig plan med scope, pris og tidsramme. Ingen overraskelser senere.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Bygning",
    body: "Du får adgang til at følge fremskridtet. Vi justerer undervejs. Typisk 2–6 uger afhængigt af opgavens størrelse.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Drift",
    body: "Løsningen overdrages. Valgfri drift-aftale hvis du vil have mig til at holde øje. Ellers er den din.",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="proces"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">PROCESSEN</p>
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
            Fra første samtale til kørende løsning.
          </h2>
        </AnimateIn>

        <div ref={ref} className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent, var(--border-strong), var(--border-strong), transparent)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col"
                >
                  {/* Step icon + number */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: i === 0 ? "var(--accent)" : "var(--bg-elevated)",
                        border: `1px solid ${i === 0 ? "var(--accent)" : "var(--border-subtle)"}`,
                        boxShadow: i === 0 ? "var(--shadow-glow-cyan)" : "none",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: i === 0 ? "white" : "var(--text-secondary)" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: "var(--text-muted)", letterSpacing: "0.02em" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="mb-3 font-semibold"
                    style={{
                      fontSize: "var(--font-h3)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-geist-sans)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-body-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
