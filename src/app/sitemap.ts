import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const lastModified = "2026-11-01";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/projets/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/cv`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
