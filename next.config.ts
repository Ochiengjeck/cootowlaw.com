import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Self-hosted (cPanel) deployment: bundles the app into .next/standalone/server.js
  // plus a minimal node_modules, so cPanel's "Setup Node.js App" only needs to run
  // one startup file — no separate `next start` process management required.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/practice-areas/litigation-2",
        destination: "/practices/litigation",
        permanent: true,
      },
      {
        source: "/practice-areas/:slug",
        destination: "/practices/:slug",
        permanent: true,
      },
      { source: "/team/:slug", destination: "/people/:slug", permanent: true },
      { source: "/office/:slug", destination: "/offices/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
