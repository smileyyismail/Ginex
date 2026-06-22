import { ProductSectionHeader } from './ProductSectionHeader';

interface ProductSpecsProps {
  specifications?: Record<string, string>;
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  const entries = Object.entries(specifications);

  return (
    <div className="mb-10">
      <ProductSectionHeader title="Specifications" />
      <div className="space-y-0 overflow-hidden rounded-xl" style={{ border: '1px solid rgba(212,175,55,0.1)' }}>
        {entries.map(([key, value], idx) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center px-4 py-3.5 text-sm transition-colors duration-200 hover:bg-[rgba(212,175,55,0.04)]"
            style={{
              background: idx % 2 === 0 ? 'rgba(10,10,10,0.5)' : 'transparent',
              borderBottom: idx < entries.length - 1 ? '1px solid rgba(212,175,55,0.08)' : 'none',
            }}
          >
            <span className="w-full sm:w-2/5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1 sm:mb-0 opacity-80">
              {key}
            </span>
            <span className="w-full sm:w-3/5 text-white font-medium">
              {value as string}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
