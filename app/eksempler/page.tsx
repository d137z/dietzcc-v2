import type { Metadata } from "next";
import CasesSection from "@/components/sections/CasesSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Eksempler — Konkrete resultater fra virkelige opgaver",
  description:
    "Se eksempler på automationer og AI-løsninger jeg har bygget — og hvilken effekt de har haft for virksomhederne.",
};

export default function EksemplerPage() {
  return (
    <>
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-wide pt-16">
          <p className="eyebrow mb-4">EKSEMPLER</p>
          <h1
            className="mb-6 max-w-3xl"
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
          </h1>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Her er eksempler på den type løsninger jeg bygger — og hvad de konkret har betydet for
            de virksomheder, der bruger dem.
          </p>
        </div>
      </section>
      <CasesSection />
      <ContactSection />
    </>
  );
}
