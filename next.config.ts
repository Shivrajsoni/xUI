import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/**": ["@/components/xui/**/*"],
  },
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    // All demo images are self-hosted under /public — no remote hosts allowed.
    remotePatterns: [],
    // Demo avatars/cover art are first-party SVGs. Allow them through the
    // optimizer with a strict CSP so they can't execute scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    viewTransition: true,
  },
  reactStrictMode: true,
};

export default withMDX(config);
