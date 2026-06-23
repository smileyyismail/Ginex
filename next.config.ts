import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cqrzlpbnzqluvukwzchp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/ginex-assets/**',
      },
    ],
  },
};

export default nextConfig;
