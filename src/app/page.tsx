import { getPublicProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { SectionHeader } from "@/components/common/SectionHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { ContactSection } from "@/components/home/ContactSection";

export const revalidate = 3600;

export default async function Home() {
  const [activeProducts, categories] = await Promise.all([
    getPublicProducts(),
    getCategories()
  ]);

  const bestSellers = activeProducts.filter(p => p.badge === 'Best Seller').slice(0, 4);
  const trending = activeProducts.filter(p => p.badge === 'Trending').slice(0, 4);
  const activeCategories = categories || [];

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-brand selection:text-black">
      <Navbar />

      <HeroSection products={activeProducts} />

      {bestSellers.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Best Sellers" 
              subtitle="Our most loved products by the community." 
              actionLabel="View All Best Sellers" 
              actionUrl="/products?badge=best-seller" 
            />
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {trending.length > 0 && (
        <section className="py-24 bg-surface border-y border-border-subtle relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,var(--brand-glow)_0%,transparent_70%)] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader 
              title="Trending Now" 
              subtitle="What everyone is talking about right now." 
              actionLabel="View Trending" 
              actionUrl="/products?badge=trending" 
            />
            <ProductGrid products={trending} />
          </div>
        </section>
      )}

      <section className="py-24 bg-background" id="categories">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Shop by Category" 
            subtitle="Find exactly what you're looking for by browsing our curated categories." 
          />
          <CategoryGrid categories={activeCategories} />
        </div>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}
