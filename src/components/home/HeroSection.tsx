'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/types';

export function HeroSection({ products = [] }: { products?: Product[] }) {
  const featuredProduct = products.find(p => p.badge === 'Best Seller') || products[0];

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pt-6 pb-16">

      {/* Background ambient glows */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.1) 0%, transparent 55%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 120% 60% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)' }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

      {/* Vertical lines — decorative */}
      <div
        className="absolute left-[15%] top-0 w-px h-full pointer-events-none hidden xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)' }}
      />
      <div
        className="absolute right-[15%] top-0 w-px h-full pointer-events-none hidden xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)' }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left animate-slide-up">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(212,175,55,0.06)',
                borderColor: 'rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
            >
              <span
                className="flex h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: '#D4AF37', boxShadow: '0 0 6px #D4AF37' }}
              />
              Premium Mobile Accessories
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tighter text-white leading-[1.02] font-heading"
              style={{ letterSpacing: '-0.04em' }}
            >
              Crafted for
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 40%, #FFFFFF 70%, #D4AF37 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Perfection.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Experience the pinnacle of mobile protection and performance. Premium materials, flawless design, uncompromising quality — built for those who demand the best.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto h-14 px-9 rounded-full text-black font-black tracking-wider text-sm uppercase transition-all duration-500 flex items-center justify-center gap-2.5 group hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                    boxShadow: '0 4px 24px rgba(212,175,55,0.4)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(212,175,55,0.6)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(212,175,55,0.4)';
                  }}
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              <Link href="#categories" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto h-14 px-9 rounded-full font-semibold tracking-wider text-sm uppercase text-[#A1A1AA] transition-all duration-300 flex items-center justify-center hover:text-white hover:border-[rgba(212,175,55,0.4)]"
                  style={{
                    border: '1px solid rgba(212,175,55,0.2)',
                    background: 'rgba(212,175,55,0.03)',
                  }}
                >
                  Browse Categories
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 border-t border-[rgba(212,175,55,0.08)]">
              {[
                { value: '10K+', label: 'Products Delivered' },
                { value: '100%', label: 'Genuine' },
                { value: '5 ★', label: 'Rated' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-black font-heading" style={{ color: '#D4AF37' }}>
                    {value}
                  </div>
                  <div className="text-xs text-[#A1A1AA] uppercase tracking-widest font-medium mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product Visual ── */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end animate-slide-up delay-200">
            <div className="relative w-full aspect-square max-w-[560px]">

              {/* Outer rings */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(212,175,55,0.06)',
                  boxShadow: '0 0 100px rgba(212,175,55,0.08), inset 0 0 100px rgba(212,175,55,0.04)',
                }}
              />
              <div
                className="absolute inset-6 rounded-full pointer-events-none"
                style={{ border: '1px solid rgba(212,175,55,0.04)' }}
              />

              {/* Main image */}
              <div
                className="absolute inset-10 rounded-[3.5rem] overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #111111, #0D0D0D)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.12)',
                }}
              >
                <Image
                  src="/images/hero-graphic-v2.png"
                  alt="Premium Mobile Accessories by Ginex"
                  fill
                  priority
                  className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-[3000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(212,175,55,0.07) 0%, transparent 50%)' }}
                />
              </div>

              {/* Floating badge */}
              {featuredProduct && (
                <div
                  className="absolute bottom-14 -left-2 sm:left-2 rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-float shadow-2xl"
                  style={{
                    background: 'rgba(10,10,10,0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: '#D4AF37' }}>Best Seller</p>
                    <p className="text-white text-xs font-bold truncate max-w-[130px] mt-0.5">{featuredProduct.name}</p>
                  </div>
                </div>
              )}

              {/* Top-right quality badge */}
              <div
                className="absolute top-14 -right-2 sm:right-2 rounded-xl px-3 py-2.5 flex items-center gap-2 animate-float shadow-xl"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212,175,55,0.35)',
                  animationDelay: '1s',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <span className="text-[#D4AF37] font-black text-sm">100%</span>
                <span className="text-white/80 text-[11px] font-semibold">Genuine</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
}
