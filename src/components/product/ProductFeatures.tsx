interface ProductFeaturesProps {
  features?: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold tracking-tight text-text-primary mb-4 border-b border-border-subtle pb-3">Key Features</h3>
      <ul className="space-y-4 text-text-secondary pt-2">
        {features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start">
            <span className="w-1.5 h-1.5 bg-brand rounded-full mr-3 mt-2 flex-shrink-0 shadow-[0_0_8px_var(--brand)]"></span>
            <span className="leading-relaxed font-light">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
