import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Dietz Code & Control — Automation, Integrationer & AI til SMV'er",
    template: "%s | Dietz Code & Control",
  },
  description:
    "Jeg bygger AI-assistenter, integrationer og automationer der fjerner manuelle opgaver fra din hverdag — til små og mellemstore virksomheder i Danmark.",
  keywords: [
    "automation",
    "AI-assistent",
    "integration",
    "SMV",
    "Danmark",
    "e-conomic",
    "HubSpot",
    "Shopify",
    "workflow",
  ],
  authors: [{ name: "Martin Dietz" }],
  creator: "Martin Dietz",
  publisher: "Dietz Code & Control",
  metadataBase: new URL("https://dietzcc.dk"),
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://dietzcc.dk",
    siteName: "Dietz Code & Control",
    title: "Dietz Code & Control — Automation, Integrationer & AI til SMV'er",
    description:
      "Jeg bygger AI-assistenter, integrationer og automationer der fjerner manuelle opgaver fra din hverdag.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dietz Code & Control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dietz Code & Control — Automation & AI til SMV'er",
    description:
      "Jeg bygger AI-assistenter, integrationer og automationer der fjerner manuelle opgaver fra din hverdag.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "Dietz Code & Control",
              url: "https://dietzcc.dk",
              description:
                "Automation, integrationer og AI-løsninger til små og mellemstore virksomheder i Danmark.",
              founder: { "@type": "Person", name: "Martin Dietz" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kolding",
                addressCountry: "DK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+45-22-75-00-51",
                email: "martin@dietzcc.dk",
                contactType: "customer service",
                availableLanguage: "Danish",
              },
            }),
          }}
        />
        <a href="#main-content" className="skip-link">
          Spring til indhold
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
