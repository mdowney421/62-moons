import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/band", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
