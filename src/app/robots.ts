import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * In preview, nothing is crawled. At launch, the site is open except the
 * internal design system and project docs.
 */
export default function robots(): MetadataRoute.Robots {
  if (site.preview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/", disallow: ["/design-system/", "/docs/"] } };
}
