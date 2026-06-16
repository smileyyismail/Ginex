import Link from "next/link";
import { getProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { getBrands } from "@/actions/brands";
import { ProductsGrid } from "./client";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  const activeProducts = allProducts?.filter(p => p.status === 'Active') || [];

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-900">GINEX.</Link>
          <div className="space-x-6 text-sm font-medium">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
            <Link href="/products" className="text-zinc-900 transition-colors">Products</Link>
            <Link href="/about" className="text-zinc-600 hover:text-zinc-900 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-8">Collection</h1>
        <ProductsGrid 
          initialProducts={activeProducts} 
          categories={categories || []} 
          brands={brands || []} 
        />
      </div>
    </main>
  );
}
