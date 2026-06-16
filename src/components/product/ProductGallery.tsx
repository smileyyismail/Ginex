import Image from "next/image";

interface ProductGalleryProps {
  productName: string;
  featuredImageUrl?: string;
  images?: string[];
}

export function ProductGallery({ productName, featuredImageUrl, images }: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="bg-surface-elevated border border-border-subtle rounded-3xl aspect-square overflow-hidden flex items-center justify-center p-8 relative shadow-inner">
        {featuredImageUrl && featuredImageUrl !== 'null' && (
          <Image 
            src={featuredImageUrl} 
            alt={productName} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
          />
        )}
      </div>
      
      {images && images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {images.map((url: string, idx: number) => (
            <div key={idx} className="bg-surface-elevated border border-border-subtle rounded-xl aspect-square overflow-hidden flex items-center justify-center p-2 relative shadow-inner hover:border-brand/40 transition-colors cursor-pointer">
              <Image 
                src={url} 
                alt={`${productName} gallery ${idx + 1}`} 
                fill 
                sizes="10vw" 
                className="object-contain p-2" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
