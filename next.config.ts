import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
    // Keep visited/prefetched pages in the client router cache so switching sections is instant.
    staleTimes: { dynamic: 60, static: 300 },
  },
};

export default withNextIntl(nextConfig);
