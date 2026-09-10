import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "en-GB", "vi-VN"],
    defaultLocale: "en-US",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/catalogue/bondi-lougne-collection",
        destination: "/catalogue/bondi-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/mobley-dinning-collection",
        destination: "/catalogue/mobley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/retangle-table",
        destination: "/catalogue/rectangular-table",
        permanent: true,
      },
      {
        source: "/catalogue/brooksc-lounge-collection",
        destination: "/catalogue/brooks-lounge-collection",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/DHT_Company_Profile_2026.pdf",
        permanent: false,
      },
      {
        source: "/company-profile",
        destination: "/DHT_Company_Profile_2026.pdf",
        permanent: false,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb',
    },
  },
};

export default nextConfig;
