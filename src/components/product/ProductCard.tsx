'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden h-full transition-all duration-500"
      style={{
        background: '#111111',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-8px) scale(1.01)';
        el.style.borderColor = 'rgba(212,175,55,0.45)';
        el.style.boxShadow = '0 30px 70px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.1)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0) scale(1)';
        el.style.borderColor = 'rgba(212,175,55,0.1)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top gold line — appears on hover via inner glow */}
      <div
        className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
      />

      {/* Image Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '1 / 1',
          background: 'linear-gradient(145deg, #0D0D0D, #111111)',
        }}
      >
        {/* Ambient glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 60%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20 pointer-events-none">
          {product.category?.name ? (
            <span
              className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.15)',
                color: '#A1A1AA',
              }}
            >
              {product.category.name}
            </span>
          ) : <span />}

          {product.badge && product.badge !== 'None' && (
            <span
              className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#000',
                boxShadow: '0 0 14px rgba(212,175,55,0.5)',
              }}
            >
              <Sparkles className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Image */}
        {product.featured_image_url && product.featured_image_url !== 'null' ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div
              className="relative w-full h-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
            >
              <Image
                src={product.featured_image_url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#A1A1AA] text-xs uppercase tracking-widest font-medium opacity-40">No Image</span>
          </div>
        )}
      </div>

      {/* Content Panel */}
      <div
        className="relative flex flex-col flex-1 p-6"
        style={{
          background: '#111111',
          borderTop: '1px solid rgba(212,175,55,0.08)',
        }}
      >
        {/* Product name */}
        <h3 className="font-bold text-lg text-white tracking-tight leading-tight font-heading mb-2 group-hover:text-[#D4AF37] transition-colors duration-400">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 font-light mb-4">
            {product.description}
          </p>
        )}

        {/* Feature Pills */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
            {product.features.slice(0, 2).map((feature: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-1 rounded-md font-semibold tracking-wide text-[#A1A1AA]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.1)',
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* CTA Row */}
        <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: '1px solid rgba(212,175,55,0.07)' }}>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA] group-hover:text-[#D4AF37] transition-colors duration-300">
            View Details
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:rotate-45"
            style={{
              border: '1px solid rgba(212,175,55,0.2)',
              background: 'rgba(212,175,55,0.04)',
              color: '#D4AF37',
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
