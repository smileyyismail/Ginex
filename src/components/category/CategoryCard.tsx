import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative block h-80 overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.1)] bg-[#111111] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
    >
      {category.image_url ? (
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-50 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#0A0A0A]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/[0.92] via-black/40 to-black/10" />

      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-md border-r-2 border-t-2 border-[#D4AF37] opacity-0 transition-opacity duration-500 group-hover:opacity-50" />

      <div className="absolute bottom-0 left-0 z-10 w-full p-8">
        <h3 className="mb-2 font-heading text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
          {category.name}
        </h3>

        <div className="mb-3 h-px w-8 bg-gradient-to-r from-[#D4AF37] to-[rgba(212,175,55,0.3)] transition-all duration-500 group-hover:w-16" />

        <p className="flex items-center text-sm font-medium tracking-wide text-[#A1A1AA] transition-colors duration-300 group-hover:text-white">
          Explore Collection
          <ArrowRight className="ml-2 h-4 w-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </p>
      </div>
    </Link>
  );
}
