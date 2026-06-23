import { getPublicProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { SectionHeader } from "@/components/common/SectionHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { ContactSection } from "@/components/home/ContactSection";
import { BrandTrustBar } from "@/components/home/BrandTrustBar";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { TrustSection } from "@/components/home/TrustSection";

export const revalidate = 3600;

import { Suspense } from 'react';

async function HomeContent() {
  const [activeProducts, categories] = await Promise.all([
    getPublicProducts(),
    getCategories()
  ]);

  const bestSellers = activeProducts.filter(p => p.badge === 'Best Seller').slice(0, 4);
  const trending = activeProducts.filter(p => p.badge === 'Trending').slice(0, 4);
  const activeCategories = categories || [];

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
        image: (product.images as string[])?.[0] || product.featured_image_url,
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* 1 · Hero */}
      <HeroSection products={activeProducts} />

      {/* 2 · Brand Trust Stats Strip */}
      <BrandTrustBar />

      {/* 3 · Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-28 bg-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Best Sellers"
              subtitle="Our most loved products, trusted by thousands of customers."
              actionLabel="View All Best Sellers"
              actionUrl="/products?badge=best-seller"
            />
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* 4 · Brand Story / Philosophy */}
      <BrandStorySection />

      {/* 5 · Trending Now */}
      {trending.length > 0 && (
        <section
          className="py-28 relative overflow-hidden"
          style={{ background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}
        >
          <div
            className="absolute top-0 left-0 w-full h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top center, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              title="Trending Now"
              subtitle="The accessories everyone's talking about."
              actionLabel="View All Trending"
              actionUrl="/products?badge=trending"
            />
            <ProductGrid products={trending} />
          </div>
        </section>
      )}

      {/* 6 · The Ginex Promise (Trust pillars) */}
      <TrustSection />

      {/* 7 · Shop by Category */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)' }}
        id="categories"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Shop by Category"
            subtitle="Discover premium accessories curated for every need."
          />
          <CategoryGrid categories={activeCategories} />
        </div>
      </section>

      {/* 8 · Premium Contact CTA */}
      <ContactSection />
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full animate-spin" style={{ border: '3px solid rgba(212,175,55,0.15)', borderTopColor: '#D4AF37' }} />
        </div>
      }>
        <HomeContent />
      </Suspense>
      <Footer />
    </main>
  );
}
