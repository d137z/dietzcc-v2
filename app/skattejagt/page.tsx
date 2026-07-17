import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Skattejagt",
  robots: { index: false, follow: false },
};

export default function SkattejagtPage() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: 600, width: "100%" }}>
        <Image
          src="/images/skattejagt.png"
          alt="Skattejagt"
          width={548}
          height={734}
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
          priority
        />
      </div>
    </section>
  );
}
