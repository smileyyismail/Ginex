import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/types';

export function HeroSection({ products = [] }: { products?: Product[] }) {
  const featuredProduct = products.find((product) => product.badge === 'Best Seller') || products[0];

  return (
    <section className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pb-16 pt-6">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px]"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.1) 0%, transparent 55%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px]"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 120% 60% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)' }}
      />
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />

      <div
        className="pointer-events-none absolute left-[15%] top-0 hidden h-full w-px xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-[15%] top-0 hidden h-full w-px xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)' }}
      />

      <div className="container relative z-10 mx-auto w-full px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="animate-slide-up max-w-2xl flex-1 space-y-8 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(212,175,55,0.06)',
                borderColor: 'rgba(212,175,55,0.25)',
                color: '#D4AF37',
              }}
            >
              <span
                className="flex h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: '#D4AF37', boxShadow: '0 0 6px #D4AF37' }}
              />
              Premium Mobile Accessories
            </div>

            <h1 className="font-heading text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
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

            <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-[#A1A1AA] md:text-xl lg:mx-0">
              Experience the pinnacle of mobile protection and performance. Premium materials, flawless design,
              uncompromising quality - built for those who demand the best.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <Link
                href="/products"
                className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-9 text-sm font-black uppercase tracking-wider text-black shadow-[0_4px_24px_rgba(212,175,55,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] sm:w-auto"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#categories"
                className="flex h-14 w-full items-center justify-center rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.03)] px-9 text-sm font-semibold uppercase tracking-wider text-[#A1A1AA] transition-all duration-300 hover:border-[rgba(212,175,55,0.4)] hover:text-white sm:w-auto"
              >
                Browse Categories
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 border-t border-[rgba(212,175,55,0.08)] pt-8 lg:justify-start">
              {[
                { value: '10K+', label: 'Products Delivered' },
                { value: '100%', label: 'Genuine' },
                { value: '5 Star', label: 'Rated' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-heading text-2xl font-black text-[#D4AF37]">{value}</div>
                  <div className="mt-0.5 text-xs font-medium uppercase tracking-widest text-[#A1A1AA]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="delay-200 animate-slide-up flex w-full max-w-lg flex-1 justify-center lg:max-w-none lg:justify-end">
            <div className="relative aspect-square w-full max-w-[560px]">
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(212,175,55,0.06)',
                  boxShadow: '0 0 100px rgba(212,175,55,0.08), inset 0 0 100px rgba(212,175,55,0.04)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-6 rounded-full"
                style={{ border: '1px solid rgba(212,175,55,0.04)' }}
              />

              <div
                className="absolute inset-10 overflow-hidden rounded-[3.5rem]"
                style={{
                  background: 'linear-gradient(145deg, #111111, #0D0D0D)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  boxShadow:
                    '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.12)',
                }}
              >
                <Image
                  src="/images/hero-graphic-v2.png"
                  alt="Premium Mobile Accessories by Ginex"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 560px"
                  className="object-cover object-center scale-105 transition-transform duration-[3000ms] ease-out hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(212,175,55,0.07) 0%, transparent 50%)' }}
                />
              </div>

              {featuredProduct && (
                <div
                  className="animate-float absolute bottom-14 -left-2 flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-2xl sm:left-2"
                  style={{
                    background: 'rgba(10,10,10,0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#D4AF37]">Best Seller</p>
                    <p className="mt-0.5 max-w-[130px] truncate text-xs font-bold text-white">{featuredProduct.name}</p>
                  </div>
                </div>
              )}

              <div
                className="animate-float absolute -right-2 top-14 flex items-center gap-2 rounded-xl px-3 py-2.5 shadow-xl sm:right-2"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212,175,55,0.35)',
                  animationDelay: '1s',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <span className="text-sm font-black text-[#D4AF37]">100%</span>
                <span className="text-[11px] font-semibold text-white/80">Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-[#D4AF37]" />
      </div>
    </section>
  );
}
