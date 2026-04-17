"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Zap, Target, MessageSquare, Lock } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const bullets = [
  {
    icon: Zap,
    title: "Hurtig fra idé til løsning",
    body: "Jeg træffer beslutninger selv. Ingen komitémøder.",
  },
  {
    icon: Target,
    title: "Teknisk baggrund, forretningsforståelse",
    body: "Uddannet automationsteknolog og industritekniker. Jeg forstår både koden og hverdagen i en dansk SMV.",
  },
  {
    icon: MessageSquare,
    title: "Én person — hele vejen",
    body: "Du taler med mig i mødet, mig når der bygges, og mig når der skal vedligeholdes. Ingen udskiftninger midt i projektet.",
  },
  {
    icon: Lock,
    title: "Ærlig pris, intet abonnement-bøvl",
    body: "Fast pris på projekter. Valgfri drift-aftale bagefter — ikke tvunget.",
  },
];

export default function WhyMeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="om" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Venstre — billede */}
          <AnimateIn>
            <div className="relative">
              {/* Cyan ring / glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                  transform: "scale(1.2)",
                }}
                aria-hidden="true"
              />

              {/* Portrait */}
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden"
                style={{
                  border: "3px solid rgba(6,182,212,0.3)",
                  boxShadow: "0 0 60px rgba(6,182,212,0.15)",
                }}
              >
                <Image
                  src="/images/martin.jpg"
                  alt="Martin Dietz — Dietz Code & Control"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 md:right-0 px-4 py-3 rounded-2xl"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-geist-sans)" }}>
                  Kolding, Danmark
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Automationsteknolog
                </p>
              </motion.div>
            </div>
          </AnimateIn>

          {/* Højre — tekst */}
          <div ref={ref}>
            <AnimateIn>
              <p className="eyebrow mb-4">HVORFOR MIG</p>
              <h2
                className="mb-4"
                style={{
                  fontSize: "var(--font-h1)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-geist-sans)",
                  color: "var(--text-primary)",
                }}
              >
                Direkte linje til den, der bygger din løsning.
              </h2>
              <p
                className="mb-10"
                style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
              >
                Ingen projektledere. Ingen sælgere. Ingen tvivl om hvem der laver arbejdet.
              </p>
            </AnimateIn>

            <div className="flex flex-col gap-6">
              {bullets.map((bullet, i) => {
                const Icon = bullet.icon;
                return (
                  <motion.div
                    key={bullet.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                      style={{ background: "var(--accent-muted)" }}
                    >
                      <Icon size={16} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{
                          fontSize: "var(--font-h4)",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-geist-sans)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {bullet.title}
                      </h4>
                      <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {bullet.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
