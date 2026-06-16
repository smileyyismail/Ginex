import Link from "next/link";
import { getProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Star } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const activeProducts = products?.filter(p => p.status === 'Active') || [];
  const bestSellers = activeProducts.filter(p => p.badge === 'Best Seller').slice(0, 4);
  const trending = activeProducts.filter(p => p.badge === 'Trending').slice(0, 4);
  const activeCategories = categories || [];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-zinc-50 overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-grid-zinc-100/[0.2] bg-[length:16px_16px]" />
        <div className="container mx-auto px-4 py-32 md:py-48 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-medium shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              New Collection Available Now
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 leading-[1.1]">
              Elevate Your Mobile <span className="text-zinc-400">Experience.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-light">
              Discover our curated collection of premium accessories designed to perfectly complement your devices.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 text-base rounded-full w-full sm:w-auto group">
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-24 bg-[#050505]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Best Sellers</h2>
                <p className="text-zinc-400">Our most loved products by the community.</p>
              </div>
              <Link href="/products?badge=best-seller" className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                View All Best Sellers &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {bestSellers.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Products */}
      {trending.length > 0 && (
        <section className="py-24 bg-black border-t border-zinc-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Trending Now</h2>
                <p className="text-zinc-400">What everyone is talking about right now.</p>
              </div>
              <Link href="/products?badge=trending" className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                View Trending &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {trending.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">Shop by Category</h2>
            <p className="text-zinc-500 text-lg">Find exactly what you're looking for by browsing our curated categories.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activeCategories.map(c => (
              <Link href={`/products?category=${c.slug}`} key={c.id} className="group relative h-80 rounded-3xl overflow-hidden bg-zinc-100 block">
                {c.image_url ? (
                  <img src={c.image_url} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-zinc-200"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{c.name}</h3>
                  <p className="text-white/80 text-sm flex items-center group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Get in Touch</h2>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Have questions about compatibility, bulk orders, or custom design requests? Connect directly with our support team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <div className="bg-[#111111] border border-zinc-800/50 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-6">
              <div className="w-14 h-14 rounded-full border border-emerald-500/30 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Email Support</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                Send us an email anytime and our accessories experts will reply within 24 business hours.
              </p>
              <a href="mailto:ginex.mobi@gmail.com" className="text-emerald-500 font-medium hover:text-emerald-400 transition-colors pt-2">
                ginex.mobi@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-[#111111] border border-zinc-800/50 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-6">
              <div className="w-14 h-14 rounded-full border border-emerald-500/30 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Call or WhatsApp</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                Speak directly to our representatives for immediate assistance or order inquiries.
              </p>
              <div className="flex flex-col space-y-2 pt-2">
                <a href="tel:+919392920252" className="text-emerald-500 font-medium hover:text-emerald-400 transition-colors">+91 9392920252</a>
                <a href="tel:+919751703635" className="text-emerald-500 font-medium hover:text-emerald-400 transition-colors">+91 9751703635</a>
              </div>
            </div>
          </div>

          <div className="text-center text-sm space-y-2">
            <p className="text-zinc-500"><span className="text-zinc-400 font-medium">Headquarters Address:</span> 37-157, Near Bus Stop, Jagadgiri Gutta, Hyderabad.</p>
            <p className="text-zinc-500"><span className="text-zinc-400 font-medium">Business Hours:</span> Mon - Sat: 9:00 AM - 8:00 PM (Closed Sundays)</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
