import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dietzcc.dk";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/losninger`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/eksempler`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/om`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/proces`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}
