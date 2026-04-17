import type { Metadata } from "next";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Processen — Fra idé til kørende løsning",
  description:
    "Sådan arbejder jeg: fra den første gratis samtale til overlevering og drift. Fire trin, ingen overraskelser.",
};

export default function ProcesPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="container-wide pt-16">
          <p className="eyebrow mb-4">PROCESSEN</p>
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
            Fra første samtale til kørende løsning.
          </h1>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Jeg tror på at god software starter med en god samtale. Her er de fire trin alle
            projekter gennemgår — uanset om det er en lille automatisering eller et større system.
          </p>
        </div>
      </section>
      <ProcessSection />

      {/* FAQ-agtig uddybning */}
      <section
        className="section-padding"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="container-wide">
          <div className="max-w-2xl">
            <h2
              className="mb-12"
              style={{
                fontSize: "var(--font-h2)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
                color: "var(--text-primary)",
              }}
            >
              Praktiske detaljer
            </h2>

            <div className="flex flex-col gap-8">
              {[
                {
                  q: "Hvad koster det?",
                  a: "Det afhænger fuldstændigt af opgaven. En simpel automatisering kan koste 5–15.000 kr. Et større system med mange integrationer kan koste 30.000+ kr. Jeg sender altid en skriftlig plan med fast pris — ingen timepris-overraskelser.",
                },
                {
                  q: "Hvor hurtigt kan I starte?",
                  a: "Typisk inden for 1–2 uger fra aftalen er på plads. Selve byggetiden afhænger af opgaven: 2–6 uger er normalt.",
                },
                {
                  q: "Hvad sker der efter overdragelsen?",
                  a: "Du ejer løsningen. Vil du have nogen til at holde øje, kan vi aftale en drift-aftale. Den er valgfri og ikke en forudsætning for at gå i gang.",
                },
                {
                  q: "Hvad hvis jeg ikke er teknisk?",
                  a: "Det er faktisk det normale. Jeg forklarer hvad der sker på et niveau der giver mening for dig — ikke for en udvikler.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b pb-8" style={{ borderColor: "var(--border-subtle)" }}>
                  <h3
                    className="mb-3 font-semibold"
                    style={{
                      fontSize: "var(--font-h4)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
