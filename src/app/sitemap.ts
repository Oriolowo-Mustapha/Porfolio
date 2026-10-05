import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";

const BASE = "https://aphabase.dev";

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/roles", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/say-hello", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}