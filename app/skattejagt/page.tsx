import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Skattejagt",
  robots: { index: false, follow: false },
};

export default function SkattejagtPage() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-secondary)", minHeight: "100vh" }}
    >
      <div className="container-wide pt-16 flex justify-center">
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
      </div>
    </section>
  );
}
