import { getProduct } from "@/actions/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    if (!product || product.status !== 'Active') return { title: 'Product Not Found' };
    return {
      title: `${product.name} | Ginex`,
      description: product.description || `Buy ${product.name} at Ginex.`,
      openGraph: {
        images: [product.featured_image_url],
      }
    };
  } catch (e) {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product;
  try {
    product = await getProduct(slug);
  } catch (error) {
    notFound();
  }

  if (!product || product.status !== 'Active') {
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
    <main className="min-h-screen bg-zinc-50 font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-900">GINEX.</Link>
          <div className="space-x-6 text-sm font-medium">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
            <Link href="/products" className="text-zinc-900 transition-colors">Products</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/products" className="text-sm font-medium text-zinc-500 hover:text-black transition-colors">&larr; Back to Products</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl aspect-square overflow-hidden flex items-center justify-center p-8">
               {product.featured_image_url && (
                 <img src={product.featured_image_url} alt={product.name} className="object-contain w-full h-full mix-blend-multiply" />
               )}
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((url: string, idx: number) => (
                  <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl aspect-square overflow-hidden flex items-center justify-center p-2">
                    <img src={url} alt={`${product.name} gallery ${idx + 1}`} className="object-contain w-full h-full mix-blend-multiply" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4">
              {product.brand?.name && <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-xs font-semibold">{product.brand.name}</span>}
              {product.category?.name && <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-xs font-semibold">{product.category.name}</span>}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-6">{product.name}</h1>
            
            <div className="prose text-zinc-600 mb-8 max-w-none">
              <p className="leading-relaxed">{product.description}</p>
            </div>
            
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-10 flex-1">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4 border-b pb-2">Specifications</h3>
                <div className="space-y-3 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-zinc-100 pb-3">
                      <span className="w-1/3 font-medium text-zinc-500">{key}</span>
                      <span className="w-2/3 text-zinc-900">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4 border-b pb-2">Key Features</h3>
                <ul className="space-y-2 text-zinc-700 list-disc list-inside">
                  {product.features.map((feature: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-8 border-t border-zinc-200 mt-auto">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-zinc-800 transition-all hover:shadow-lg w-full md:w-auto"
              >
                Inquire on WhatsApp
              </a>
              <p className="text-sm text-zinc-500 mt-4 text-center md:text-left">
                Contact us directly to discuss bulk orders, pricing, and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
