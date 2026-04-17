"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

const headline = "Lad software gøre det kedelige arbejde.";
const words = headline.split(" ");

export default function HeroSection() {
  return (
    <section
      id="forside"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "calc(100% + 300px)",
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            transform: "translateX(-300px)",
          }}
        />
      </div>

      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(6,182,212,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,181,253,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(254,215,170,0.10) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: "480px",
            height: "480px",
            top: "10%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-1 28s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "380px",
            height: "380px",
            top: "30%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float-2 34s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "320px",
            height: "320px",
            bottom: "15%",
            left: "30%",
            background: "radial-gradient(circle, rgba(196,181,253,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-3 22s ease-in-out infinite",
          }}
        />
      </div>

      <div className="container-wide relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider border"
              style={{
                background: "var(--accent-muted)",
                color: "var(--accent-dark)",
                borderColor: "rgba(6,182,212,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              AUTOMATION · INTEGRATIONER · AI
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <h1
            className="mb-6"
            style={{
              fontSize: "var(--font-display)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Underrubrik */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-xl"
            style={{
              fontSize: "var(--font-body)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Jeg bygger AI-assistenter, integrationer og automationer, der fjerner manuelle
            opgaver fra din hverdag — til små og mellemstore virksomheder i Danmark.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] text-sm font-medium text-white transition-all duration-200"
              style={{ background: "var(--accent)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--accent-hover)";
                el.style.boxShadow = "var(--shadow-glow-cyan)";
                el.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--accent)";
                el.style.boxShadow = "none";
                el.style.transform = "scale(1)";
              }}
            >
              Book en gratis snak
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/losninger"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-[10px] text-sm font-medium transition-all duration-200 border"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border-strong)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
              }}
            >
              Se hvad jeg kan bygge
            </Link>
          </motion.div>

          {/* Trust markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <MapPin size={12} style={{ color: "var(--accent)" }} />
              Baseret i Kolding
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--border-subtle)" }}
            >
              ·
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock size={12} style={{ color: "var(--accent)" }} />
              Svarer typisk inden for 24 timer
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-xs tracking-wider"
          style={{ color: "var(--text-muted)", letterSpacing: "0.05em", fontSize: "11px" }}
        >
          SCROLL
        </span>
        <div className="flex flex-col gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-0.5 h-1.5 rounded-full mx-auto"
              style={{
                background: "var(--accent)",
                animation: `pulse-dot 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
