import { getProduct } from "@/actions/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductSpecs } from '@/components/product/ProductSpecs';
import { ProductFeatures } from '@/components/product/ProductFeatures';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    if (!product || product.status !== 'Display') return { title: 'Product Not Found' };
    return {
      title: `${product.name} | Ginex`,
      description: product.description || `Buy ${product.name} at Ginex.`,
      openGraph: {
        images: [product.featured_image_url],
      }
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

  if (!product || product.status !== 'Display') {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.featured_image_url,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand?.name || 'Ginex',
    },
  };

  return (
    <main className="min-h-screen bg-background font-sans pb-24 selection:bg-brand selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/products" className="text-sm font-semibold text-text-secondary hover:text-brand transition-colors tracking-wide">&larr; Back to Products</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface p-8 md:p-12 rounded-[2.5rem] border border-border-subtle shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Images */}
          <ProductGallery 
            productName={product.name} 
            featuredImageUrl={product.featured_image_url} 
            images={product.images} 
          />

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex gap-3 mb-6">
              {product.brand?.name && <span className="bg-surface-elevated text-brand border border-border-subtle px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{product.brand.name}</span>}
              {product.category?.name && <span className="bg-surface-elevated text-text-secondary border border-border-subtle px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{product.category.name}</span>}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary mb-6">{product.name}</h1>
            
            <div className="prose prose-invert text-text-secondary mb-8 max-w-none font-light text-lg leading-relaxed">
              <p>{product.description}</p>
            </div>
            
            <ProductSpecs specifications={product.specifications} />
            <ProductFeatures features={product.features} />

            <div className="pt-10 border-t border-border-subtle mt-auto">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center bg-brand text-black px-8 py-5 rounded-full font-bold hover:bg-brand-hover transition-all hover:shadow-[0_0_25px_var(--brand-glow)] w-full text-lg tracking-wide"
              >
                Inquire on WhatsApp
              </a>
              <p className="text-sm text-text-secondary mt-4 text-center font-light">
                Contact us directly to discuss bulk orders, pricing, and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
