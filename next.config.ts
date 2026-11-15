import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHost = 'cqrzlpbnzqluvukwzchp.supabase.co';
if (supabaseUrl) {
  try {
    supabaseHost = new URL(supabaseUrl).hostname;
  } catch {
    // Keep fallback host
  }
}
const isDevelopment = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const scriptSrc = ["'self'", "'unsafe-inline'", isDevelopment ? "'unsafe-eval'" : '']
      .filter(Boolean)
      .join(' ');
    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: https://${supabaseHost}`,
      "font-src 'self' data:",
      `connect-src 'self' https://${supabaseHost}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHost,
        port: '',
        pathname: '/storage/v1/object/public/ginex-assets/**',
      },
    ],
  },
};

export default nextConfig;
