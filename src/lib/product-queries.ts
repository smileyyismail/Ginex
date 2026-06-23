import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';

const productListSelect = `
  id,
  name,
  slug,
  description,
  category_id,
  brand_id,
  featured_image_url,
  images,
  specifications,
  features,
  badge,
  status,
  created_at,
  updated_at,
  category:categories(id, name, slug, image_url),
  brand:brands(id, name, slug, logo_url)
`;

const productDetailSelect = `
  id,
  name,
  slug,
  description,
  category_id,
  brand_id,
  featured_image_url,
  images,
  specifications,
  features,
  badge,
  status,
  created_at,
  updated_at,
  category:categories(id, name, slug, image_url),
  brand:brands(id, name, slug, logo_url)
`;

export async function getProductRows() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select(productListSelect)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as Product[];
}

export async function getPublicProductRows() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select(productListSelect)
    .eq('status', 'Display')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as Product[];
}

export const getProductRowBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select(productDetailSelect)
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data as unknown as Product | null;
});
