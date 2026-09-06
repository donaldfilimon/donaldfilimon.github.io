import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // No editorial modification date is tracked; build time is not lastmod.
  return [{ url: site.url, priority: 1 }];
}
