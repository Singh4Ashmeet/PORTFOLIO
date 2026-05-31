import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const siteUrl = "https://ashmeetsingh.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/resume",
    "/contact",
    "/blog",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route || "/"}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
