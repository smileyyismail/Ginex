interface ProductSpecsProps {
  specifications?: Record<string, string>;
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  return (
    <div className="mb-10 flex-1">
      <h3 className="text-xl font-bold tracking-tight text-text-primary mb-4 border-b border-border-subtle pb-3">Specifications</h3>
      <div className="space-y-4 text-sm pt-2">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row border-b border-border-subtle pb-4 sm:items-center">
            <span className="w-full sm:w-1/3 font-medium text-text-secondary mb-1 sm:mb-0 uppercase tracking-wider text-xs">{key}</span>
            <span className="w-full sm:w-2/3 text-text-primary font-medium">{value as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
