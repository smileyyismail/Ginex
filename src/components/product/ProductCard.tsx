import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.1)] bg-[#111111] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.18),0_0_0_1px_rgba(212,175,55,0.1)]"
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.6)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#111111]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 flex items-start justify-between">
          {product.category?.name ? (
            <span className="rounded-full border border-[rgba(212,175,55,0.15)] bg-black/70 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#A1A1AA] backdrop-blur">
              {product.category.name}
            </span>
          ) : (
            <span />
          )}

          {product.badge && product.badge !== 'None' && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-black shadow-[0_0_14px_rgba(212,175,55,0.5)]">
              <Sparkles className="h-2.5 w-2.5" />
              {product.badge}
            </span>
          )}
        </div>

        {product.featured_image_url && product.featured_image_url !== 'null' ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-full w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out group-hover:-rotate-1 group-hover:scale-110">
              <Image
                src={product.featured_image_url}
                alt={product.name}
                fill
                priority={priority}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-widest text-[#A1A1AA] opacity-40">
              No Image
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col border-t border-[rgba(212,175,55,0.08)] bg-[#111111] p-6">
        <h3 className="mb-2 font-heading text-lg font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
          {product.name}
        </h3>

        {product.description && (
          <p className="mb-4 line-clamp-2 text-sm font-light leading-relaxed text-[#A1A1AA]">
            {product.description}
          </p>
        )}

        {product.features && product.features.length > 0 && (
          <div className="mb-5 mt-auto flex flex-wrap gap-1.5">
            {product.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="rounded-md border border-[rgba(212,175,55,0.1)] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#A1A1AA]"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-[rgba(212,175,55,0.07)] pt-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA] transition-colors duration-300 group-hover:text-[#D4AF37]">
            View Details
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.04)] text-[#D4AF37] transition-all duration-300 group-hover:scale-110 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
