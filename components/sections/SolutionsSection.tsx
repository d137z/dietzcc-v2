"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Mail,
  Network,
  FileSearch,
  Workflow,
  Code2,
  ArrowRight,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = [Bot, Mail, Network, FileSearch, Workflow, Code2];
const serviceMockups = ["chat", "email", "integration", "docs", "workflow", "code"];

// Minimalist SVG mockups
function ChatMockup() {
  return (
    <div
      className="rounded-xl p-4 mt-4"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <div
            className="px-3 py-2 rounded-xl rounded-tr-sm text-xs max-w-[75%]"
            style={{ background: "var(--accent)", color: "white", fontSize: "11px" }}
          >
            Hvad er jeres leveringstid?
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="px-3 py-2 rounded-xl rounded-tl-sm text-xs max-w-[80%]"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", fontSize: "11px", border: "1px solid var(--border-subtle)" }}
          >
            Leveringstid er typisk 2-3 hverdage. Ekspres: 1 dag.
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="px-2.5 py-1.5 rounded-xl rounded-tl-sm text-xs flex items-center gap-1.5"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>AI svarer...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailMockup() {
  return (
    <div
      className="rounded-xl mt-4 overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
        <span className="ml-2 text-xs" style={{ color: "var(--text-muted)", fontSize: "10px" }}>Indbakke</span>
      </div>
      {[
        { from: "kunde@firma.dk", subject: "Tilbud ønskes", tag: "Tilbud", auto: true },
        { from: "support@shop.dk", subject: "Ordrestatus?", tag: "Support", auto: true },
        { from: "info@partner.dk", subject: "Samarbejde", tag: "Salg", auto: false },
      ].map((mail, i) => (
        <div key={i} className="px-4 py-2.5 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: "var(--accent-muted)", color: "var(--accent-dark)", fontSize: "9px" }}>
            {mail.from[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)", fontSize: "10px" }}>{mail.from}</p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)", fontSize: "10px" }}>{mail.subject}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: "var(--accent-muted)", color: "var(--accent-dark)", fontSize: "9px" }}>{mail.tag}</span>
            {mail.auto && <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: "#dcfce7", color: "#15803d", fontSize: "9px" }}>Auto</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function IntegrationMockup() {
  return (
    <div className="mt-4 flex items-center justify-around">
      {[
        { name: "e-conomic", color: "#0EA5E9" },
        { name: "Shopify", color: "#96BF48" },
        { name: "HubSpot", color: "#FF7A59" },
      ].map((sys, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
            style={{ background: sys.color }}
          >
            {sys.name[0]}
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>{sys.name}</span>
          {i < 2 && (
            <div className="absolute" style={{ position: "relative" }}>
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col items-center gap-2 relative">
        <div className="hidden sm:flex absolute top-5 right-0 items-center" style={{ width: "150px", left: "-80px" }}>
          <div className="h-px flex-1" style={{ background: "var(--accent)", opacity: 0.4 }} />
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs z-10"
          style={{ background: "var(--accent)" }}
        >
          D
        </div>
        <span className="text-xs" style={{ color: "var(--accent)", fontSize: "9px", fontWeight: 500 }}>Dietz</span>
      </div>
    </div>
  );
}

function DocsMockup() {
  return (
    <div
      className="rounded-xl mt-4 p-3"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-7 rounded flex items-center justify-center" style={{ background: "var(--accent-muted)" }}>
          <FileSearch size={12} style={{ color: "var(--accent)" }} />
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--text-primary)", fontSize: "10px" }}>faktura_2024_03.pdf</span>
        <span className="ml-auto text-xs" style={{ color: "var(--success)", fontSize: "9px" }}>✓ Læst</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: "Beløb", value: "12.450 kr" },
          { label: "Dato", value: "15/03/2024" },
          { label: "Kunde", value: "Firma A/S" },
          { label: "System", value: "e-conomic →" },
        ].map((item) => (
          <div key={item.label} className="px-2 py-1.5 rounded-lg" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>{item.label}</p>
            <p className="text-xs font-medium" style={{ color: "var(--text-primary)", fontSize: "10px" }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowMockup() {
  const steps = ["Modtag ordre", "Tjek lager", "Send faktura", "Notificer"];
  return (
    <div className="mt-4 flex flex-col gap-1.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
            style={{ background: i === 1 ? "var(--accent)" : "var(--border-strong)", fontSize: "9px" }}
          >
            {i + 1}
          </div>
          <div
            className="flex-1 px-3 py-2 rounded-lg text-xs flex items-center justify-between"
            style={{
              background: i === 1 ? "var(--accent-muted)" : "var(--bg-elevated)",
              border: `1px solid ${i === 1 ? "rgba(6,182,212,0.3)" : "var(--border-subtle)"}`,
              color: i === 1 ? "var(--accent-dark)" : "var(--text-secondary)",
              fontSize: "10px",
            }}
          >
            {step}
            {i === 1 && <span className="text-xs" style={{ color: "var(--accent)", fontSize: "9px" }}>Kører...</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeMockup() {
  return (
    <div
      className="rounded-xl mt-4 overflow-hidden"
      style={{ background: "var(--graphite)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="px-4 py-2 flex items-center gap-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
      </div>
      <div className="px-4 py-3 font-mono" style={{ fontSize: "10px", lineHeight: 1.8 }}>
        <div style={{ color: "#7c3aed" }}>async function <span style={{ color: "#06B6D4" }}>processOrder</span>(order) {"{"}</div>
        <div style={{ color: "#a3a3a3", paddingLeft: "1rem" }}>const invoice = <span style={{ color: "#10b981" }}>await</span> createInvoice(order);</div>
        <div style={{ color: "#a3a3a3", paddingLeft: "1rem" }}>await updateInventory(order.items);</div>
        <div style={{ color: "#a3a3a3", paddingLeft: "1rem" }}>await notify(order.customer);</div>
        <div style={{ color: "#7c3aed" }}>{"}"}</div>
      </div>
    </div>
  );
}

const mockupMap: Record<string, React.ComponentType> = {
  chat: ChatMockup,
  email: EmailMockup,
  integration: IntegrationMockup,
  docs: DocsMockup,
  workflow: WorkflowMockup,
  code: CodeMockup,
};

function ServiceCard({
  icon: Icon,
  title,
  body,
  mockup,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  mockup: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const MockupComponent = mockupMap[mockup];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 rounded-[16px] border flex flex-col"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        transition: "transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out",
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-md)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
      }}
    >
      <div
        className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl"
        style={{ background: "var(--accent-muted)" }}
      >
        <Icon size={18} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
      </div>
      <h3
        className="mb-3 font-semibold"
        style={{
          fontSize: "var(--font-h4)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-geist-sans)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        className="flex-1"
        style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}
      >
        {body}
      </p>
      {MockupComponent && <MockupComponent />}
    </motion.div>
  );
}

export default function SolutionsSection() {
  const { t } = useLanguage();
  const services = t.solutions.services.map((s, i) => ({
    icon: serviceIcons[i],
    title: s.title,
    body: s.body,
    mockup: serviceMockups[i],
  }));

  return (
    <section id="losninger" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/hero-bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.27,
        }}
      />
      <div className="container-wide relative">
        <AnimateIn className="mb-16">
          <p className="eyebrow mb-4">{t.solutions.eyebrow}</p>
          <h2
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
            {t.solutions.headline}
          </h2>
          <p
            className="max-w-xl"
            style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            {t.solutions.sub}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} delay={i * 0.1} />
          ))}
        </div>

        <AnimateIn className="mt-12 text-center">
          <Link
            href="/eksempler"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            {t.solutions.link}
            <ArrowRight size={14} />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
