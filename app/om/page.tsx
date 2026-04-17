import type { Metadata } from "next";
import WhyMeSection from "@/components/sections/WhyMeSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Om mig — Martin Dietz, Automationsteknolog",
  description:
    "Jeg er Martin Dietz — automationsteknolog og industritekniker baseret i Kolding. Jeg bygger skræddersyet software til små og mellemstore virksomheder i Danmark.",
};

export default function OmPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container-wide pt-16">
          <p className="eyebrow mb-4">OM MIG</p>
          <h1
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
            Jeg er Martin Dietz.
          </h1>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Automationsteknolog og industritekniker med base i Kolding. Jeg har arbejdet med
            maskiner, styresystemer og software — og nu hjælper jeg virksomheder med at automatisere
            det, der ikke burde kræve et menneske.
          </p>
          <p
            className="max-w-xl mt-4"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Jeg driver Dietz Code &amp; Control som én-mands virksomhed. Det betyder du altid
            ved præcis hvem du taler med — og hvem der laver arbejdet.
          </p>
        </div>
      </section>
      <WhyMeSection />
      <ContactSection />
    </>
  );
}
