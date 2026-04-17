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
      <div className="pt-20 md:pt-24" />
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
