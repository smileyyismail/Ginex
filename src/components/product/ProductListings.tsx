'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Product, Category, Brand } from '@/lib/types';
import { ProductGrid } from './ProductGrid';

export function ProductListings({ initialProducts, categories, brands }: { initialProducts: Product[], categories: Category[], brands: Brand[] }) {
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
            className="mb-4 bg-surface-elevated border-border-subtle text-text-primary focus:ring-brand"
          />
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm">
          <h3 className="font-semibold text-lg mb-4 tracking-tight text-text-primary">Categories</h3>
          <div className="space-y-3">
            <button 
              className={`block w-full text-left text-sm py-1 transition-colors ${!selectedCategory ? 'font-semibold text-brand' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
            {categories.map(c => (
              <button 
                key={c.id} 
                className={`block w-full text-left text-sm py-1 transition-colors ${selectedCategory === c.id ? 'font-semibold text-brand' : 'text-text-secondary hover:text-text-primary'}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm">
          <h3 className="font-semibold text-lg mb-4 tracking-tight text-text-primary">Brands</h3>
          <div className="space-y-3">
            <button 
              className={`block w-full text-left text-sm py-1 transition-colors ${!selectedBrand ? 'font-semibold text-brand' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setSelectedBrand(null)}
            >
              All Brands
            </button>
            {brands.map(b => (
              <button 
                key={b.id} 
                className={`block w-full text-left text-sm py-1 transition-colors ${selectedBrand === b.id ? 'font-semibold text-brand' : 'text-text-secondary hover:text-text-primary'}`}
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
        <div className="mb-6 text-sm text-text-secondary font-medium tracking-wide">
          Showing <span className="text-text-primary font-bold">{filteredProducts.length}</span> product(s)
        </div>
        <ProductGrid products={filteredProducts} emptyMessage="No products match your criteria. Try adjusting your filters." />
      </div>
    </div>
  );
}
