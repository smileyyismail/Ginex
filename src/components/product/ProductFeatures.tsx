import { ProductSectionHeader } from './ProductSectionHeader';

interface ProductFeaturesProps {
  features?: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <ProductSectionHeader title="Key Features" />
      <ul className="space-y-3">
        {features.map((feature: string, idx: number) => (
          <li
            key={idx}
            className="flex items-start gap-3 group px-1 py-1 rounded-lg transition-colors duration-200 hover:bg-[rgba(212,175,55,0.03)]"
          >
            {/* Gold checkmark circle */}
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-black text-[10px] font-black transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                boxShadow: '0 0 8px rgba(212,175,55,0.3)',
              }}
            >
              ✓
            </span>
            <span className="text-[#A1A1AA] leading-relaxed font-light text-sm group-hover:text-white transition-colors duration-200">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
