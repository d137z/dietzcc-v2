import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Kontakt — Book en gratis samtale",
  description:
    "Tag kontakt til Martin Dietz — skriv lidt om hvad du kæmper med, og jeg vender tilbage inden for 24 timer.",
};

export default function KontaktPage() {
  return (
    <>
      <div className="pt-16">
        <ContactSection />
      </div>
    </>
  );
}
