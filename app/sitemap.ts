export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://guangli.vercel.app";
  return ["", "/studio", "/community", "/spots", "/about"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}