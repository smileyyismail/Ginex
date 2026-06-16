import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Ginex Mobile Accessories',
    default: 'Ginex | Premium Mobile Accessories',
  },
  description: "Curated collection of high-quality mobile accessories, cases, and chargers.",
  openGraph: {
    title: 'Ginex | Premium Mobile Accessories',
    description: 'Explore our curated collection of high-quality cases, chargers, and more.',
    url: 'https://ginex.com',
    siteName: 'Ginex',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
