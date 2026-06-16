'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/types';

export function HeroSection({ products = [] }: { products?: Product[] }) {
  // Find a featured product to display, or default to the first one with an image
  const heroProduct = products.find(p => p.featured_image_url && p.featured_image_url !== 'null') || null;

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-32">
      
      {/* Deep Space Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-brand/10 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* Typography Container */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        
        <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 backdrop-blur-md px-5 py-2 text-[10px] sm:text-xs font-bold text-brand tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_var(--brand-glow)]">
          <span className="flex h-2 w-2 rounded-full bg-brand mr-3 animate-pulse"></span>
          Next Generation Accessories
        </div>
        
        <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter text-text-primary leading-[0.85] mb-8 drop-shadow-2xl">
          Engineered <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary">
            For Perfection.
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto mb-12 drop-shadow-lg leading-relaxed">
          Experience the pinnacle of mobile protection and acoustics. Premium materials, flawless design.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/products" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto h-16 px-10 rounded-full bg-text-primary text-background font-bold text-lg tracking-wide hover:bg-brand hover:text-black transition-all duration-300 hover:shadow-[0_0_40px_var(--brand-glow)] flex items-center justify-center group">
              Shop The Collection
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* Massive Product Image Rising from Bottom */}
      {heroProduct && (
        <div className="relative z-10 w-full max-w-[1200px] h-[400px] sm:h-[500px] lg:h-[600px] mt-16 animate-in fade-in slide-in-from-bottom-32 duration-[1500ms] delay-300 flex justify-center">
          <Image 
            src={heroProduct.featured_image_url as string}
            alt={heroProduct.name}
            fill
            priority
            className="object-contain object-top drop-shadow-[0_0_50px_rgba(25,211,176,0.15)]"
          />
          {/* Gradient fade out at the very bottom into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-20" />
        </div>
      )}

    </section>
  );
}
