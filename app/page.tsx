import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import CasesSection from "@/components/sections/CasesSection";
import WhyMeSection from "@/components/sections/WhyMeSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dietz Code & Control — Automation, Integrationer & AI til SMV'er",
  description:
    "Jeg bygger AI-assistenter, integrationer og automationer der fjerner manuelle opgaver fra din hverdag — til små og mellemstore virksomheder i Danmark.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <CasesSection />
      <WhyMeSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
