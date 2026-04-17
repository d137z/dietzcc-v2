"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Zap, Target, MessageSquare, Lock } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { useLanguage } from "@/contexts/LanguageContext";

const bulletIcons = [Zap, Target, MessageSquare, Lock];

export default function WhyMeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { t } = useLanguage();

  return (
    <section id="om" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/images/baggrund5.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.27 }} />
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Venstre — billede */}
          <AnimateIn>
            <div className="relative">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden">
                <Image src="/images/martin.jpg" alt="Martin Dietz — Dietz Code & Control" fill className="object-cover" priority />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 md:right-0 px-4 py-3 rounded-2xl"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-md)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-geist-sans)" }}>{t.whyme.badge1}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.whyme.badge2}</p>
              </motion.div>
            </div>
          </AnimateIn>

          {/* Højre — tekst */}
          <div ref={ref}>
            <AnimateIn>
              <p className="eyebrow mb-4">{t.whyme.eyebrow}</p>
              <h2 className="mb-4" style={{ fontSize: "var(--font-h1)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)", color: "var(--text-primary)" }}>
                {t.whyme.headline}
              </h2>
              <p className="mb-10" style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {t.whyme.sub}
              </p>
            </AnimateIn>

            <div className="flex flex-col gap-6">
              {t.whyme.bullets.map((bullet, i) => {
                const Icon = bulletIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5" style={{ background: "var(--accent-muted)" }}>
                      <Icon size={16} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ fontSize: "var(--font-h4)", color: "var(--text-primary)", fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.01em" }}>
                        {bullet.title}
                      </h4>
                      <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>{bullet.body}</p>
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
