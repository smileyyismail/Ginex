'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Brand, Category, Product } from '@/lib/types';
import { ProductGrid } from './ProductGrid';

interface ProductListingsProps {
  initialProducts: Product[];
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
  initialBrand?: string;
  initialBadge?: string;
  initialSearch?: string;
}

interface FilterContentProps {
  idPrefix: string;
  search: string;
  selectedCategory: string | null;
  selectedBrand: string | null;
  selectedBadge: string | null;
  categories: Category[];
  brands: Brand[];
  badgeOptions: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onBrandChange: (value: string | null) => void;
  onBadgeChange: (value: string | null) => void;
}

function normalizeQueryValue(value?: string | null) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function filterButtonClass(isActive: boolean) {
  return [
    'block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
    isActive
      ? 'bg-[rgba(212,175,55,0.08)] font-bold text-[#D4AF37]'
      : 'text-[#A1A1AA] hover:bg-[rgba(212,175,55,0.05)] hover:text-white',
  ].join(' ');
}

function FilterContent({
  idPrefix,
  search,
  selectedCategory,
  selectedBrand,
  selectedBadge,
  categories,
  brands,
  badgeOptions,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onBadgeChange,
}: FilterContentProps) {
  const searchId = `${idPrefix}-search`;

  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor={searchId} className="sr-only">
          Search products
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]" />
        <input
          id={searchId}
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-10 w-full rounded-xl border border-[rgba(212,175,55,0.15)] bg-[#171717]/80 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#A1A1AA] focus:border-[rgba(212,175,55,0.5)] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)]"
        />
      </div>

      <FilterGroup title="Categories">
        <button
          type="button"
          className={filterButtonClass(!selectedCategory)}
          aria-pressed={!selectedCategory}
          onClick={() => onCategoryChange(null)}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={filterButtonClass(selectedCategory === category.id)}
            aria-pressed={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Brands">
        <button
          type="button"
          className={filterButtonClass(!selectedBrand)}
          aria-pressed={!selectedBrand}
          onClick={() => onBrandChange(null)}
        >
          All Brands
        </button>
        {brands.map((brand) => (
          <button
            type="button"
            key={brand.id}
            className={filterButtonClass(selectedBrand === brand.id)}
            aria-pressed={selectedBrand === brand.id}
            onClick={() => onBrandChange(brand.id)}
          >
            {brand.name}
          </button>
        ))}
      </FilterGroup>

      {badgeOptions.length > 0 && (
        <FilterGroup title="Highlights">
          <button
            type="button"
            className={filterButtonClass(!selectedBadge)}
            aria-pressed={!selectedBadge}
            onClick={() => onBadgeChange(null)}
          >
            All Highlights
          </button>
          {badgeOptions.map((badge) => (
            <button
              type="button"
              key={badge}
              className={filterButtonClass(selectedBadge === normalizeQueryValue(badge))}
              aria-pressed={selectedBadge === normalizeQueryValue(badge)}
              onClick={() => onBadgeChange(normalizeQueryValue(badge))}
            >
              {badge}
            </button>
          ))}
        </FilterGroup>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[rgba(212,175,55,0.1)] bg-[#111111]/80 p-5">
      <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function ProductListings({
  initialProducts,
  categories,
  brands,
  initialCategory,
  initialBrand,
  initialBadge,
  initialSearch = '',
}: ProductListingsProps) {
  const initialCategoryId =
    categories.find((category) => category.slug === initialCategory || category.id === initialCategory)?.id ?? null;
  const initialBrandId = brands.find((brand) => brand.slug === initialBrand || brand.id === initialBrand)?.id ?? null;

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryId);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrandId);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(
    initialBadge ? normalizeQueryValue(initialBadge) : null
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const badgeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          initialProducts
            .map((product) => product.badge)
            .filter((badge): badge is NonNullable<typeof badge> => Boolean(badge && badge !== 'None'))
        )
      ),
    [initialProducts]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return initialProducts.filter((product) => {
      const matchSearch = normalizedSearch
        ? [product.name, product.description, product.category?.name, product.brand?.name]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(normalizedSearch))
        : true;
      const matchCategory = selectedCategory ? product.category_id === selectedCategory : true;
      const matchBrand = selectedBrand ? product.brand_id === selectedBrand : true;
      const matchBadge = selectedBadge ? normalizeQueryValue(product.badge) === selectedBadge : true;

      return matchSearch && matchCategory && matchBrand && matchBadge;
    });
  }, [initialProducts, search, selectedCategory, selectedBrand, selectedBadge]);

  const filterProps = {
    search,
    selectedCategory,
    selectedBrand,
    selectedBadge,
    categories,
    brands,
    badgeOptions,
    onSearchChange: setSearch,
    onCategoryChange: setSelectedCategory,
    onBrandChange: setSelectedBrand,
    onBadgeChange: setSelectedBadge,
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen((isOpen) => !isOpen)}
          aria-expanded={isMobileFilterOpen}
          aria-controls="mobile-product-filters"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[rgba(212,175,55,0.25)] px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-[#D4AF37] transition-all duration-300"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        {isMobileFilterOpen && (
          <div id="mobile-product-filters" className="mt-4">
            <FilterContent idPrefix="mobile" {...filterProps} />
          </div>
        )}
      </div>

      <aside className="hidden w-64 flex-shrink-0 md:block" aria-label="Product filters">
        <FilterContent idPrefix="desktop" {...filterProps} />
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center gap-3" aria-live="polite">
          <span className="text-sm font-medium tracking-wide text-[#A1A1AA]">
            Showing{' '}
            <span className="font-heading text-lg font-black text-[#D4AF37]">
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
