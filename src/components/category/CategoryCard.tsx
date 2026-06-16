'use client';

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
      className="group relative h-80 rounded-[2rem] overflow-hidden block transition-all duration-500 hover:-translate-y-1"
      style={{
        background: '#111111',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(212,175,55,0.4)';
        el.style.boxShadow = '0 20px 60px rgba(212,175,55,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(212,175,55,0.1)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Category Image */}
      {category.image_url ? (
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #111111, #0A0A0A)' }}
        />
      )}

      {/* Gradient overlay — dark to bottom */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }}
      />

      {/* Top-right gold corner */}
      <div
        className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
        style={{
          borderTop: '2px solid #D4AF37',
          borderRight: '2px solid #D4AF37',
          borderTopRightRadius: '6px',
        }}
      />

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <h3 className="text-2xl font-black text-white tracking-tight font-heading mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
          {category.name}
        </h3>

        {/* Gold expanding underline */}
        <div
          className="h-px w-8 group-hover:w-16 transition-all duration-500 mb-3"
          style={{ background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))' }}
        />

        <p className="text-[#A1A1AA] text-sm flex items-center group-hover:text-white transition-colors duration-300 font-medium tracking-wide">
          Explore Collection
          <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </p>
      </div>
    </Link>
  );
}
