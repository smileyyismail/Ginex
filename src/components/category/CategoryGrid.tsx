import { Category } from "@/lib/types";
import { CategoryCard } from "./CategoryCard";
import { EmptyState } from "../common/EmptyState";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return <EmptyState title="No Categories Found" description="Check back later for updates." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((c) => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </div>
  );
}
