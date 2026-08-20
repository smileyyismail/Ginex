'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  productName: string;
  featuredImageUrl?: string;
  images?: string[];
}

export function ProductGallery({ productName, featuredImageUrl, images }: ProductGalleryProps) {
  const allImages =
    images && images.length > 0
      ? images
      : featuredImageUrl && featuredImageUrl !== 'null'
      ? [featuredImageUrl]
      : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Keep a ref to the pending transition timer so we can cancel it on rapid clicks
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimer.current !== undefined) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    // Cancel any in-flight transition before starting a new one
    if (transitionTimer.current !== undefined) {
      clearTimeout(transitionTimer.current);
    }
    setIsTransitioning(true);
    transitionTimer.current = setTimeout(() => {
      setSelectedIndex(idx);
      setIsTransitioning(false);
      transitionTimer.current = undefined;
    }, 200);
  };

  const prev = () => handleSelect((selectedIndex - 1 + allImages.length) % allImages.length);
  const next = () => handleSelect((selectedIndex + 1) % allImages.length);

  const selectedImage = allImages[selectedIndex];

  if (allImages.length === 0) {
    return (
      <div
        className="aspect-square rounded-3xl flex items-center justify-center"
        style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.1)' }}
      >
        <span className="text-[#A1A1AA] text-sm uppercase tracking-widest opacity-50">No Image</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Viewer */}
      <div
        className="relative overflow-hidden flex items-center justify-center group"
        style={{
          aspectRatio: '1 / 1',
          background: 'linear-gradient(145deg, #0A0A0A, #0D0D0D)',
          borderRadius: '2rem',
          border: '1px solid rgba(212,175,55,0.15)',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Ambient center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
          aria-hidden="true"
        />

        {/* Decorative corners */}
        {[
          'top-4 left-4 border-t border-l rounded-tl-lg',
          'top-4 right-4 border-t border-r rounded-tr-lg',
          'bottom-4 left-4 border-b border-l rounded-bl-lg',
          'bottom-4 right-4 border-b border-r rounded-br-lg',
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 pointer-events-none opacity-25 group-hover:opacity-60 transition-opacity duration-500 ${pos}`}
            style={{ borderColor: '#D4AF37' }}
            aria-hidden="true"
          />
        ))}

        {/* Image */}
        <div
          className="relative w-[78%] h-[78%] z-10"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.96)' : 'scale(1)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {selectedImage && (
            <Image
              key={selectedImage}
              src={selectedImage}
              alt={productName}
              fill
              priority={selectedIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.8))' }}
            />
          )}
        </div>

        {/* Navigation arrows — only when multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all duration-300 hover:scale-110 z-20"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
              aria-label={`Previous image (${selectedIndex === 0 ? allImages.length : selectedIndex} of ${allImages.length})`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all duration-300 hover:scale-110 z-20"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
              aria-label={`Next image (${selectedIndex === allImages.length - 1 ? 1 : selectedIndex + 2} of ${allImages.length})`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Image count indicator */}
            <div
              className="absolute bottom-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full z-20"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#D4AF37',
              }}
              aria-live="polite"
              aria-label={`Image ${selectedIndex + 1} of ${allImages.length}`}
            >
              {selectedIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div
          className="flex gap-2.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {allImages.map((url, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === selectedIndex}
              aria-label={`View image ${idx + 1}`}
              onClick={() => handleSelect(idx)}
              className="relative flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-[14px]"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#0A0A0A',
                border: idx === selectedIndex
                  ? '2px solid #D4AF37'
                  : '1px solid rgba(212,175,55,0.12)',
                boxShadow: idx === selectedIndex
                  ? '0 0 16px rgba(212,175,55,0.35)'
                  : 'none',
                opacity: idx === selectedIndex ? 1 : 0.55,
                transform: idx === selectedIndex ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
            >
              <Image
                src={url}
                alt={`${productName} view ${idx + 1}`}
                fill
                sizes="72px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
