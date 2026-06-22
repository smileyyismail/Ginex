import Link from "next/link";
import { getBrands } from "@/actions/brands";
import { getCategories } from "@/actions/categories";
import { getPublicProducts } from "@/actions/products";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductListings } from "@/components/product/ProductListings";

export const revalidate = 3600;

export const metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of premium mobile accessories - cases, chargers, cables, and more.',
};

import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/common/Skeletons';

async function ProductsContent({ filters }: { filters: { category?: string; brand?: string; badge?: string; q?: string } }) {
  const [activeProducts, categories, brands] = await Promise.all([
    getPublicProducts(),
    getCategories(),
    getBrands(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: activeProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `https://ginex.com/products/${product.slug}`,
        image: product.featured_image_url,
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 py-12">
        <ProductListings
          initialProducts={activeProducts}
          categories={categories || []}
          brands={brands || []}
          initialCategory={filters.category}
          initialBrand={filters.brand}
          initialBadge={filters.badge}
          initialSearch={filters.q}
        />
      </div>
    </>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; badge?: string; q?: string }>;
}) {
  const filters = await searchParams;

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans">
      <Navbar />

      <div className="relative overflow-hidden border-b border-[rgba(212,175,55,0.1)] bg-[#0A0A0A]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[300px] w-[400px]"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 mx-auto px-4 py-14">
          <nav
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A1A1AA]"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors duration-200 hover:text-[#D4AF37]">
              Home
            </Link>
            <span className="text-[rgba(212,175,55,0.4)]">/</span>
            <span className="text-[#D4AF37]">Products</span>
          </nav>

          <div className="flex items-center gap-4">
            <span
              className="h-10 w-1.5 flex-shrink-0 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #F4D03F, #D4AF37)',
                boxShadow: '0 0 12px rgba(212,175,55,0.6)',
              }}
            />
            <div>
              <h1 className="font-heading text-5xl font-black tracking-tight text-white md:text-6xl">
                Collection
              </h1>
              <p className="mt-1 text-base font-light text-[#A1A1AA]">
                Discover our full range of premium mobile accessories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-12"><ProductGridSkeleton count={8} /></div>}>
        <ProductsContent filters={filters} />
      </Suspense>

      <Footer />
    </main>
  );
}
