"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";

const sectionIds = ["forside", "losninger", "eksempler", "om", "proces", "kontakt"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home, sectionId: "forside" },
    { href: "/losninger", label: t.nav.solutions, sectionId: "losninger" },
    { href: "/eksempler", label: t.nav.examples, sectionId: "eksempler" },
    { href: "/om", label: t.nav.about, sectionId: "om" },
    { href: "/proces", label: t.nav.process, sectionId: "proces" },
    { href: "/kontakt", label: t.nav.contact, sectionId: "kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (pathname !== "/") return;
      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let current = "forside";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerY) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(250,250,247,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" aria-label="Dietz Code & Control — til forsiden" className="-ml-6 lg:-ml-12">
              <Image
                src="/images/logo9.png"
                alt="Dietz Code & Control"
                width={600}
                height={600}
                className="h-[2.7rem] md:h-[3.15rem] w-auto object-contain object-left"
                style={{  }}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primær navigation">
              {navLinks.map((link) => {
                const isActive =
                  pathname === "/" && activeSection !== null
                    ? activeSection === link.sectionId
                    : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      background: isActive ? "var(--accent-muted)" : "transparent",
                    }}
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        if (link.sectionId === "forside") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.target as HTMLElement).style.color = "var(--text-primary)";
                        (e.target as HTMLElement).style.background = "var(--bg-secondary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.target as HTMLElement).style.color = "var(--text-secondary)";
                        (e.target as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop: CTA + language toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageToggle lang={lang} setLang={setLang} />
              <Link
                href="/kontakt"
                className="px-4 py-2 rounded-[10px] text-sm font-medium text-white transition-all duration-200"
                style={{ background: "var(--accent)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow-cyan)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Mobile: language toggle + menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageToggle lang={lang} setLang={setLang} />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--text-primary)" }}
                aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 10% 20%, rgba(6,182,212,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 90% 80%, rgba(251,146,60,0.10) 0%, transparent 60%),
                radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,181,253,0.08) 0%, transparent 70%),
                var(--bg-primary)
              `,
            }}
          >
            <div className="flex items-center justify-end h-16 px-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg"
                style={{ color: "var(--text-primary)" }}
                aria-label="Luk menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 gap-2" aria-label="Mobil navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 text-2xl font-semibold transition-colors duration-200"
                    style={{
                      color:
                        (pathname === "/" && activeSection !== null
                          ? activeSection === link.sectionId
                          : pathname === link.href)
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      fontFamily: "var(--font-geist-sans)",
                      letterSpacing: "-0.02em",
                    }}
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => {
                          if (link.sectionId === "forside") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 150);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-12">
              <Link
                href="/kontakt"
                className="block w-full py-4 text-center rounded-[10px] text-base font-medium text-white"
                style={{ background: "var(--accent)" }}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.ctaFull}
              </Link>
              <p className="text-center mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                martin@dietzcc.dk · +45 22 75 00 51
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="flex items-center rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}
      role="group"
      aria-label="Vælg sprog"
    >
      {(["da", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1.5 text-xs font-semibold transition-all duration-200"
          style={{
            background: lang === l ? "var(--accent)" : "transparent",
            color: lang === l ? "white" : "var(--text-muted)",
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
