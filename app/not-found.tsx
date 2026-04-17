import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Side ikke fundet",
};

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <p
        className="mb-4 font-mono font-medium"
        style={{
          fontSize: "var(--font-caption)",
          color: "var(--accent)",
          letterSpacing: "0.05em",
        }}
      >
        404
      </p>
      <h1
        className="mb-4 max-w-md"
        style={{
          fontSize: "var(--font-h1)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-geist-sans)",
          color: "var(--text-primary)",
        }}
      >
        Den side findes ikke.
      </h1>
      <p
        className="mb-10 max-w-sm"
        style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
      >
        Men det kunne den — hvis nogen havde bygget den.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] text-sm font-medium text-white"
        style={{ background: "var(--accent)" }}
      >
        Tilbage til forsiden
      </Link>
    </section>
  );
}
