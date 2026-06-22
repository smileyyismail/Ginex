import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-heading', weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ginex.com'),
  title: {
    template: '%s | Ginex Mobile Accessories',
    default: 'Ginex | Premium Mobile Accessories & Chargers',
  },
  description: "Explore the Ginex catalog of high-quality mobile accessories, premium cases, fast chargers, and durable cables designed for modern devices.",
  keywords: ['mobile accessories', 'phone cases', 'fast chargers', 'USB-C cables', 'premium tech accessories', 'Ginex', 'mobile catalog'],
  openGraph: {
    title: 'Ginex | Premium Mobile Accessories & Chargers',
    description: 'Explore the Ginex catalog of high-quality mobile accessories, premium cases, fast chargers, and durable cables designed for modern devices.',
    url: 'https://ginex.com',
    siteName: 'Ginex',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ginex | Premium Mobile Accessories',
    description: 'Curated collection of high-quality mobile accessories, cases, and chargers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ginex',
    url: 'https://ginex.com',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+91-9392920252', contactType: 'customer service' },
      { '@type': 'ContactPoint', telephone: '+91-9751703635', contactType: 'customer service' }
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ginex',
    url: 'https://ginex.com',
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
