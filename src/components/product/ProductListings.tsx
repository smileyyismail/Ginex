'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product, Category, Brand } from '@/lib/types';
import { ProductGrid } from './ProductGrid';

export function ProductListings({ initialProducts, categories, brands }: { initialProducts: Product[], categories: Category[], brands: Brand[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory ? p.category_id === selectedCategory : true;
      const matchBrand = selectedBrand ? p.brand_id === selectedBrand : true;
      return matchSearch && matchCat && matchBrand;
    });
  }, [initialProducts, search, selectedCategory, selectedBrand]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: '#D4AF37' }}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 text-sm rounded-xl text-white placeholder-[#A1A1AA] outline-none transition-all duration-300"
          style={{
            background: 'rgba(23,23,23,0.8)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
          onFocus={e => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)';
            (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
          }}
          onBlur={e => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)';
            (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Categories */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(212,175,55,0.1)' }}
      >
        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 font-heading" style={{ color: '#D4AF37' }}>
          Categories
        </h3>
        <div className="space-y-1">
          <button
            className="block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200"
            style={{
              color: !selectedCategory ? '#D4AF37' : '#A1A1AA',
              background: !selectedCategory ? 'rgba(212,175,55,0.08)' : 'transparent',
              fontWeight: !selectedCategory ? 700 : 400,
            }}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              className="block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 hover:bg-[rgba(212,175,55,0.05)] hover:text-white"
              style={{
                color: selectedCategory === c.id ? '#D4AF37' : '#A1A1AA',
                background: selectedCategory === c.id ? 'rgba(212,175,55,0.08)' : 'transparent',
                fontWeight: selectedCategory === c.id ? 700 : 400,
              }}
              onClick={() => setSelectedCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(212,175,55,0.1)' }}
      >
        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 font-heading" style={{ color: '#D4AF37' }}>
          Brands
        </h3>
        <div className="space-y-1">
          <button
            className="block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200"
            style={{
              color: !selectedBrand ? '#D4AF37' : '#A1A1AA',
              background: !selectedBrand ? 'rgba(212,175,55,0.08)' : 'transparent',
              fontWeight: !selectedBrand ? 700 : 400,
            }}
            onClick={() => setSelectedBrand(null)}
          >
            All Brands
          </button>
          {brands.map(b => (
            <button
              key={b.id}
              className="block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 hover:bg-[rgba(212,175,55,0.05)] hover:text-white"
              style={{
                color: selectedBrand === b.id ? '#D4AF37' : '#A1A1AA',
                background: selectedBrand === b.id ? 'rgba(212,175,55,0.08)' : 'transparent',
                fontWeight: selectedBrand === b.id ? 700 : 400,
              }}
              onClick={() => setSelectedBrand(b.id)}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">

      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all duration-300 w-full justify-center"
          style={{
            border: '1px solid rgba(212,175,55,0.25)',
            background: isMobileFilterOpen ? 'rgba(212,175,55,0.1)' : 'rgba(17,17,17,0.8)',
            color: '#D4AF37',
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        {isMobileFilterOpen && (
          <div className="mt-4">
            <FilterContent />
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <FilterContent />
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-[#A1A1AA] font-medium tracking-wide">
            Showing{' '}
            <span
              className="font-black text-lg font-heading"
              style={{ color: '#D4AF37' }}
            >
              {filteredProducts.length}
            </span>{' '}
            product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No products match your criteria. Try adjusting your filters."
        />
      </div>
    </div>
  );
}
