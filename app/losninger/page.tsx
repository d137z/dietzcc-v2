import type { Metadata } from "next";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Løsninger — AI, Automation & Integrationer",
  description:
    "AI-assistenter, e-mail-automation, systemintegrationer, dokumenthåndtering, workflow-automation og custom software til din virksomhed.",
};

export default function LosningerPage() {
  return (
    <>
      {/* Page hero */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container-wide pt-16">
          <p className="eyebrow mb-4">LØSNINGER</p>
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
            Hvad jeg kan bygge til dig.
          </h1>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Jeg specialiserer mig i at bygge software, der fjerner manuelle opgaver. Her er de
            kategorier jeg oftest arbejder i — men er din opgave anderledes, er det stadig værd at
            tage en snak.
          </p>
        </div>
      </section>
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
