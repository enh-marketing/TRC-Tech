import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Match the URL scheme in the sitemap, e.g. /hire-talent/.
  trailingSlash: true,
  // Pin the workspace root: a stray package-lock.json in the home directory
  // above this project would otherwise be picked up by Turbopack.
  turbopack: { root: import.meta.dirname },
  // Concept 3 is shown to the client as concept 2 (the original concept 2 is archived),
  // so its old address forwards to the new one; links already shared keep working.
  async redirects() {
    return [{ source: "/home-option-3/", destination: "/home-option-2/", permanent: true }];
  },
};

export default nextConfig;
