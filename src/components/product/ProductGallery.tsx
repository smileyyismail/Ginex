'use client';

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  productName: string;
  featuredImageUrl?: string;
  images?: string[];
}

export function ProductGallery({ productName, featuredImageUrl, images }: ProductGalleryProps) {
  const allImages = [
    ...(featuredImageUrl && featuredImageUrl !== 'null' ? [featuredImageUrl] : []),
    ...(images || []),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(idx);
      setIsTransitioning(false);
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
        </div>

        {/* Navigation arrows — only when multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
              aria-label="Next image"
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
            >
              {selectedIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {allImages.map((url, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="relative flex-shrink-0 transition-all duration-350"
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
              }}
              aria-label={`View image ${idx + 1}`}
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
