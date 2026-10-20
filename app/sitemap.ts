import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = ["", "/services", "/clients", "/about", "/contact", "/terms", "/privacy", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    priority: route === "" ? 1 : route.match(/terms|privacy|cookies/) ? 0.3 : 0.8,
  }));
}
