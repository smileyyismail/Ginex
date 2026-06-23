import { getProduct } from "@/actions/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductSpecs } from '@/components/product/ProductSpecs';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { GoldCTAButton } from '@/components/common/GoldCTAButton';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { ArrowLeft, BadgeCheck, Headphones, Package } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    if (!product || product.status !== 'Display') return { title: 'Product Not Found' };
    return {
      title: `${product.name} | Ginex`,
      description: product.description || `Buy ${product.name} at Ginex — premium mobile accessories.`,
      openGraph: { images: [(product.images as string[])?.[0] || product.featured_image_url] }
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  if (!product || product.status !== 'Display') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: (product.images as string[])?.[0] || product.featured_image_url,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand?.name || 'Ginex' },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <div className="container mx-auto px-4 pt-8 pb-16">

        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            All Products
            <span className="mx-2 text-[rgba(212,175,55,0.3)]">/</span>
            <span className="text-[#D4AF37] max-w-[200px] truncate">{product.name}</span>
          </Link>
        </div>

        {/* Main Product Card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden relative"
          style={{
            background: '#111111',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '2.5rem',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          }}
        >
          {/* Gold top shimmer line */}
          <div
            className="absolute top-0 left-0 w-full h-px z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.8) 50%, rgba(212,175,55,0.6) 70%, transparent 100%)' }}
          />

          {/* Left — Gallery */}
          <div
            className="p-8 lg:p-12"
            style={{ borderRight: '1px solid rgba(212,175,55,0.08)' }}
          >
            <ScrollReveal direction="left">
              <ProductGallery
                productName={product.name}
                featuredImageUrl={product.featured_image_url}
                images={product.images}
              />
            </ScrollReveal>
          </div>

          {/* Right — Product Info */}
          <div className="p-8 lg:p-12 flex flex-col">
            <ScrollReveal direction="right">

              {/* Brand + Category pills */}
              <div className="flex flex-wrap gap-2 mb-7">
                {product.brand?.name && (
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))',
                      border: '1px solid rgba(212,175,55,0.35)',
                      color: '#D4AF37',
                    }}
                  >
                    {product.brand.name}
                  </span>
                )}
                {product.category?.name && (
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      color: '#A1A1AA',
                    }}
                  >
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1
                className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter text-white mb-6 font-heading leading-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                {product.name}
              </h1>

              {/* Description */}
              {product.description && (
                <p
                  className="text-[#A1A1AA] text-base leading-relaxed font-light mb-8 pb-8"
                  style={{ borderBottom: '1px solid rgba(212,175,55,0.08)' }}
                >
                  {product.description}
                </p>
              )}

              {/* Specs & Features */}
              <ProductSpecs specifications={product.specifications} />
              <ProductFeatures features={product.features} />

            </ScrollReveal>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-6" style={{ borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
              {[
                { icon: <BadgeCheck className="w-4 h-4" />, label: '100% Genuine' },
                { icon: <Package className="w-4 h-4" />, label: 'Quality Tested' },
                { icon: <Headphones className="w-4 h-4" />, label: 'Expert Support' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(212,175,55,0.07)',
                      border: '1px solid rgba(212,175,55,0.18)',
                      color: '#D4AF37',
                    }}
                  >
                    {icon}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A1A1AA]">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8 mt-auto">
              <GoldCTAButton
                href="https://wa.me/919392920252"
                icon="whatsapp"
                className="w-full py-5 rounded-2xl text-base"
              >
                Inquire on WhatsApp
              </GoldCTAButton>
              <p className="text-[11px] text-[#A1A1AA] mt-4 text-center font-light leading-relaxed">
                Chat with our accessories specialists for pricing, availability &amp; bulk orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
