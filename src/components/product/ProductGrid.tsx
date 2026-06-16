import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "../common/EmptyState";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = "No products found." }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
