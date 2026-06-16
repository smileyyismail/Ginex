import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group relative h-80 rounded-[2rem] overflow-hidden bg-surface-elevated border border-border-subtle block hover:border-brand/40 transition-colors duration-500 hover:shadow-[0_10px_40px_var(--brand-glow)] hover:-translate-y-1">
      {category.image_url ? (
        <Image src={category.image_url} alt={category.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen" />
      ) : (
        <div className="absolute inset-0 bg-surface-elevated"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-bold text-text-primary mb-2 tracking-tight group-hover:text-brand transition-colors duration-300">{category.name}</h3>
        <div className="w-8 h-0.5 bg-brand/50 mb-3 group-hover:w-16 transition-all duration-500"></div>
        <p className="text-text-secondary text-sm flex items-center group-hover:text-text-primary transition-colors duration-300 font-medium tracking-wide">
          Explore Collection <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </p>
      </div>
    </Link>
  );
}
