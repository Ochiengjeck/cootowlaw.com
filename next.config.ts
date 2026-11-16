import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
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
