import type { NextConfig } from "next";

// Do NOT enable `output: "export"`: the contact form relies on a Server Action.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // The root layout is app/[lang]/layout.tsx, so 404s are rendered by app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
