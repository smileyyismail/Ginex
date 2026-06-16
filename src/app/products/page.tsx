import { getPublicProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { getBrands } from "@/actions/brands";
import { ProductListings } from "@/components/product/ProductListings";
import { Navbar } from "@/components/layout/Navbar";

export const revalidate = 3600;

export default async function ProductsPage() {
  const [activeProducts, categories, brands] = await Promise.all([
    getPublicProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-brand selection:text-black">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary mb-8 flex items-center">
          <span className="w-2 h-8 bg-brand rounded-full mr-4 shadow-[0_0_10px_var(--brand)]"></span>
          Collection
        </h1>
        <ProductListings 
          initialProducts={activeProducts} 
          categories={categories || []} 
          brands={brands || []} 
        />
      </div>
    </main>
  );
}
