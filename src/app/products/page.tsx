import { getPublicProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { getBrands } from "@/actions/brands";
import { ProductListings } from "@/components/product/ProductListings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const revalidate = 3600;

export const metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of premium mobile accessories — cases, chargers, cables, and more.',
};

export default async function ProductsPage() {
  const [activeProducts, categories, brands] = await Promise.all([
    getPublicProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans">
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-[rgba(212,175,55,0.1)]" style={{ background: '#0A0A0A' }}>
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
        />
        <div className="container mx-auto px-4 py-14 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-[#A1A1AA] mb-4 flex items-center gap-2 uppercase tracking-widest font-medium" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#D4AF37] transition-colors duration-200">Home</a>
            <span className="text-[rgba(212,175,55,0.4)]">/</span>
            <span className="text-[#D4AF37]">Products</span>
          </nav>

          <div className="flex items-center gap-4">
            <span
              className="w-1.5 h-10 rounded-full flex-shrink-0"
              style={{
                background: 'linear-gradient(180deg, #F4D03F, #D4AF37)',
                boxShadow: '0 0 12px rgba(212,175,55,0.6)',
              }}
            />
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white font-heading">
                Collection
              </h1>
              <p className="text-[#A1A1AA] text-base mt-1 font-light">
                Discover our full range of premium mobile accessories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="container mx-auto px-4 py-12">
        <ProductListings
          initialProducts={activeProducts}
          categories={categories || []}
          brands={brands || []}
        />
      </div>

      <Footer />
    </main>
  );
}
