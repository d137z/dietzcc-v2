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
      <div className="pt-20 md:pt-24" />
      <CasesSection />
      <ContactSection />
    </>
  );
}
