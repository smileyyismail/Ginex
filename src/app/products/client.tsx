'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export function ProductsGrid({ initialProducts, categories, brands }: { initialProducts: any[], categories: any[], brands: any[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory ? p.category_id === selectedCategory : true;
      const matchBrand = selectedBrand ? p.brand_id === selectedBrand : true;
      return matchSearch && matchCat && matchBrand;
    });
  }, [initialProducts, search, selectedCategory, selectedBrand]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 space-y-8 flex-shrink-0">
        <div>
          <Input 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 bg-white"
          />
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 tracking-tight">Categories</h3>
          <div className="space-y-2">
            <button 
              className={`block w-full text-left text-sm py-1 ${!selectedCategory ? 'font-semibold text-black' : 'text-zinc-500 hover:text-black'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
            {categories.map(c => (
              <button 
                key={c.id} 
                className={`block w-full text-left text-sm py-1 ${selectedCategory === c.id ? 'font-semibold text-black' : 'text-zinc-500 hover:text-black'}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 tracking-tight">Brands</h3>
          <div className="space-y-2">
            <button 
              className={`block w-full text-left text-sm py-1 ${!selectedBrand ? 'font-semibold text-black' : 'text-zinc-500 hover:text-black'}`}
              onClick={() => setSelectedBrand(null)}
            >
              All Brands
            </button>
            {brands.map(b => (
              <button 
                key={b.id} 
                className={`block w-full text-left text-sm py-1 ${selectedBrand === b.id ? 'font-semibold text-black' : 'text-zinc-500 hover:text-black'}`}
                onClick={() => setSelectedBrand(b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="mb-4 text-sm text-zinc-500 font-medium">
          Showing {filteredProducts.length} product(s)
        </div>
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
            No products match your criteria. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <Link href={`/products/${p.slug}`} key={p.id} className="group">
                <div className="bg-white border border-zinc-200 aspect-square rounded-2xl mb-4 overflow-hidden relative shadow-sm">
                  {p.featured_image_url ? (
                    <img src={p.featured_image_url} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">No Image</div>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 truncate">{p.name}</h3>
                <div className="flex justify-between items-center mt-1 text-sm text-zinc-500">
                  <span>{p.category?.name}</span>
                  <span className="font-medium text-zinc-400">{p.brand?.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
