import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col rounded-3xl overflow-hidden bg-[#0a0a0a] border border-zinc-800 hover:border-zinc-700 transition-all h-full">
      {/* Top Image Section */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-zinc-200 to-zinc-400 p-8 flex items-center justify-center overflow-hidden">
        {/* Top Right Badge */}
        {product.badge && product.badge !== 'None' && (
          <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            {product.badge}
          </div>
        )}
        
        {/* Bottom Left Category Badge */}
        {product.category?.name && (
          <div className="absolute bottom-4 left-4 z-10 bg-[#1a1a1a] border border-zinc-800 text-emerald-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
            {product.category.name}
          </div>
        )}
        
        {/* Image */}
        {product.featured_image_url ? (
          <img 
            src={product.featured_image_url} 
            alt={product.name} 
            className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply" 
          />
        ) : (
          <div className="w-full h-full bg-zinc-300 rounded-xl" />
        )}
      </div>
      
      {/* Bottom Content Section */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <h3 className="font-bold text-2xl text-white tracking-tight">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}
        
        {/* Features List */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-2 pt-2">
            {product.features.slice(0, 3).map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center text-xs text-zinc-500">
                <span className="w-1 h-1 bg-emerald-500 rounded-sm mr-3 flex-shrink-0"></span>
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="pt-6 mt-auto">
          <div className="w-full bg-[#161616] group-hover:bg-[#1a1a1a] text-white text-center border border-zinc-800 rounded-xl py-3.5 text-sm font-semibold transition-colors">
            View Full Specifications
          </div>
        </div>
      </div>
    </Link>
  );
}
