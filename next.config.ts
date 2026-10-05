import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The standalone /skills route was removed when its content moved into
      // /roles and then /about. Kept permanent so the old URL still resolves for
      // inbound links and anything already indexed.
      { source: "/skills", destination: "/roles", permanent: true },
    ];
  },
};

export default nextConfig;
