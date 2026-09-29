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
        source: "/catalogue/amalfi",
        destination: "/catalogue/amalfi-lounge-collection",
        permanent: true,
      },
      {
        source: "/collections/amalfi",
        destination: "/catalogue/amalfi-lounge-collection",
        permanent: true,
      },
      {
        source: "/collections/:slug",
        destination: "/catalogue/:slug",
        permanent: true,
      },
      {
        source: "/catalogue/bondi-lougne-collection",
        destination: "/catalogue/bondi-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/bondi-lougne",
        destination: "/catalogue/bondi-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/mobley-dinning-collection",
        destination: "/catalogue/mobley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/mobley-dinning",
        destination: "/catalogue/mobley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/wesley-dinning-collection",
        destination: "/catalogue/wesley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/wesley-dinning",
        destination: "/catalogue/wesley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/retangle-table",
        destination: "/catalogue/rectangular-table",
        permanent: true,
      },
      {
        source: "/catalogue/rectangle-table",
        destination: "/catalogue/rectangular-table",
        permanent: true,
      },
      {
        source: "/catalogue/bondi-lounge",
        destination: "/catalogue/bondi-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/mobley-dining",
        destination: "/catalogue/mobley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/wesley-dining",
        destination: "/catalogue/wesley-dining-collection",
        permanent: true,
      },
      {
        source: "/catalogue/brooks-lounge-collection",
        destination: "/catalogue/brooksc-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/brooks-lounge",
        destination: "/catalogue/brooksc-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/brooksc-lounge",
        destination: "/catalogue/brooksc-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/balmora-lounge-collection",
        destination: "/catalogue/balemora-lounge-collection",
        permanent: true,
      },
      {
        source: "/catalogue/siena-table",
        destination: "/catalogue/seina-table",
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
