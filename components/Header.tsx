"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Forside", sectionId: "forside" },
  { href: "/losninger", label: "Løsninger", sectionId: "losninger" },
  { href: "/eksempler", label: "Eksempler", sectionId: "eksempler" },
  { href: "/om", label: "Om mig", sectionId: "om" },
  { href: "/proces", label: "Proces", sectionId: "proces" },
  { href: "/kontakt", label: "Kontakt", sectionId: "kontakt" },
];

const sectionIds = navLinks.map((l) => l.sectionId);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(250,250,247,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Dietz Code & Control — til forsiden"
            >
              <Image
                src="/images/logo.png"
                alt="Dietz Code & Control"
                width={600}
                height={200}
                className="h-40 w-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
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

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
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
                Book en snak →
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-primary)" }}
              aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="flex items-center justify-between h-16 px-6">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Dietz Code & Control"
                  width={120}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </Link>
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
              >
                Book en gratis snak →
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
