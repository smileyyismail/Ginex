import Link from "next/link";
import Image from "next/image";

import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col rounded-[2rem] overflow-hidden bg-surface border border-border-subtle hover:border-brand/30 transition-all duration-500 h-full hover:shadow-[0_10px_40px_var(--brand-glow)] hover:-translate-y-1">
      {/* Top Image Section */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-surface-elevated/80 to-surface p-8 flex items-center justify-center overflow-hidden">
        {/* Top Right Badge */}
        {product.badge && product.badge !== 'None' && (
          <div className="absolute top-4 right-4 z-10 bg-brand/10 text-brand border border-brand/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md">
            {product.badge}
          </div>
        )}
        
        {/* Bottom Left Category Badge */}
        {product.category?.name && (
          <div className="absolute bottom-4 left-4 z-10 bg-surface/80 border border-border-subtle text-text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-md group-hover:text-brand transition-colors">
            {product.category.name}
          </div>
        )}
        
        {/* Image */}
        {product.featured_image_url && product.featured_image_url !== 'null' ? (
          <Image 
            src={product.featured_image_url} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        ) : (
          <div className="w-full h-full bg-surface-elevated rounded-xl" />
        )}
      </div>
      
      {/* Bottom Content Section */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <h3 className="font-bold text-xl sm:text-2xl text-text-primary tracking-tight leading-snug group-hover:text-brand transition-colors duration-300">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 font-light">
            {product.description}
          </p>
        )}
        
        {/* Features List */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-2 pt-2">
            {product.features.slice(0, 3).map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center text-xs text-text-secondary font-light">
                <span className="w-1 h-1 bg-brand rounded-sm mr-3 flex-shrink-0 shadow-[0_0_8px_var(--brand)]"></span>
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="pt-6 mt-auto">
          <div className="w-full bg-surface-elevated group-hover:bg-brand group-hover:text-black group-hover:border-brand text-text-primary text-center border border-border-subtle rounded-full py-3.5 text-sm font-semibold transition-all duration-300 shadow-sm">
            View Full Specifications
          </div>
        </div>
      </div>
    </Link>
  );
}
