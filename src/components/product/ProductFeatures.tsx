interface ProductFeaturesProps {
  features?: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h3
        className="text-base font-bold uppercase tracking-widest mb-4 pb-3 flex items-center gap-3 font-heading"
        style={{
          color: '#D4AF37',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <span
          className="w-1 h-4 rounded-full"
          style={{ background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.6)' }}
        />
        Key Features
      </h3>
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
