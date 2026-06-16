import { MetadataRoute } from 'next';
import { getPublicProducts } from '@/actions/products';
import { Product } from '@/lib/types';

export const revalidate = 86400; // Cache sitemap for 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ginex.com';

  const defaultRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  try {
    const products = await getPublicProducts();
    const productRoutes = products
      .map((p: Product & { updated_at?: string }) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.updated_at || p.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    
    return [...defaultRoutes, ...productRoutes];
  } catch {
    return defaultRoutes;
  }
}
