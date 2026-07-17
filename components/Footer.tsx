"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { openCookieConsent } from "@/components/CookieConsent";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  if (pathname === "/skattejagt") return null;

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/losninger", label: t.nav.solutions },
    { href: "/eksempler", label: t.nav.examples },
    { href: "/om", label: t.nav.about },
    { href: "/proces", label: t.nav.process },
    { href: "/kontakt", label: t.nav.contact },
  ];
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border-subtle)", background: "var(--bg-secondary)" }}
    >
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* Venstre */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
                style={{ background: "var(--accent)" }}
              >
                D
              </span>
              <span
                className="font-semibold text-sm"
                style={{ fontFamily: "var(--font-geist-sans)", color: "var(--text-primary)" }}
              >
                Dietz Code &amp; Control
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Automation · Integrationer · AI
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Kolding, Danmark
            </p>
          </div>

          {/* Midten */}
          <div>
            <p
              className="text-xs font-medium mb-4 uppercase tracking-wider"
              style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}
            >
              {t.footer.navigation}
            </p>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  <span style={{ color: "var(--accent)", fontSize: "10px" }}>•</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Højre */}
          <div>
            <p
              className="text-xs font-medium mb-4 uppercase tracking-wider"
              style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}
            >
              {t.footer.contact}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:martin@dietzcc.dk"
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                martin@dietzcc.dk
              </a>
              <a
                href="tel:+4522750051"
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                +45 22 75 00 51
              </a>
              <a
                href="https://www.linkedin.com/company/110111783/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                <ExternalLink size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-t text-xs"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <p>{t.footer.copyright}</p>
          <button
            onClick={openCookieConsent}
            className="transition-colors duration-150 hover:underline underline-offset-2"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
          >
            {t.footer.cookieSettings}
          </button>
        </div>
      </div>
    </footer>
  );
}
