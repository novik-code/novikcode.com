import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dentflow",
        destination: "/densflow",
        permanent: true,
      },
      {
        source: "/dentflow/:path*",
        destination: "/densflow/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
