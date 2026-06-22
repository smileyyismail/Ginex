'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';
import type { ProductStatus, ProductBadge } from '@/lib/types';
import { ProductSchema } from '@/lib/validations';

// ─── Public Queries ───────────────────────────────────────────────────────────

/** Fetches all products with joined category & brand name (admin list). */
export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug, image_url), brand:brands(id, name, slug, logo_url)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

/** Fetches only Display-status products for the public storefront. */
export async function getPublicProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug, image_url), brand:brands(id, name, slug, logo_url)')
    .eq('status', 'Display')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

/** Fetches a single product by slug with full category & brand data. */
export async function getProduct(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
}

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

export async function createProduct(
  formData: FormData,
  images: string[],
  specs: Record<string, string>,
  features: string[],
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const validatedFields = ProductSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      category_id: formData.get('category_id') as string,
      brand_id: formData.get('brand_id') as string,
      featured_image_url: formData.get('featured_image_url') as string,
      badge: (formData.get('badge') as string) || 'None',
      status: (formData.get('status') as string) || 'Display',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, category_id, brand_id, featured_image_url, badge, status } = validatedFields.data;

    // Duplicate name check
    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id')
      .ilike('name', name.trim())
      .maybeSingle();
    if (existing) {
      return { success: false, error: `A product named "${name.trim()}" already exists. Please use a different name.` };
    }

    // JSONB safety guards
    const safeSpecs = specs && typeof specs === 'object' && !Array.isArray(specs) ? specs : {};
    const safeFeatures = Array.isArray(features) ? features.filter((f) => typeof f === 'string') : [];
    const safeImages = Array.isArray(images) ? images.filter((i) => typeof i === 'string') : [];

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert([{
        name,
        slug,
        description,
        category_id,
        brand_id,
        featured_image_url,
        images: safeImages,
        badge,
        status,
        specifications: safeSpecs,
        features: safeFeatures,
      }])
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    // Revalidate all affected public pages
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/admin');

    return { success: true, data: product };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function updateProduct(
  id: string,
  formData: FormData,
  images: string[],
  specs: Record<string, string>,
  features: string[],
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const validatedFields = ProductSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      category_id: formData.get('category_id') as string,
      brand_id: formData.get('brand_id') as string,
      featured_image_url: formData.get('featured_image_url') as string,
      badge: (formData.get('badge') as string) || 'None',
      status: (formData.get('status') as string) || 'Display',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, category_id, brand_id, featured_image_url, badge, status } = validatedFields.data;

    // Duplicate name check (exclude the product being edited)
    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id')
      .ilike('name', name.trim())
      .neq('id', id)
      .maybeSingle();
    if (existing) {
      return { success: false, error: `A product named "${name.trim()}" already exists. Please use a different name.` };
    }

    // JSONB safety guards
    const safeSpecs = specs && typeof specs === 'object' && !Array.isArray(specs) ? specs : {};
    const safeFeatures = Array.isArray(features) ? features.filter((f) => typeof f === 'string') : [];
    const safeImages = Array.isArray(images) ? images.filter((i) => typeof i === 'string') : [];

    // Fetch old product to diff images for deletion
    const { data: oldProduct } = await supabaseAdmin
      .from('products')
      .select('featured_image_url, images')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('products')
      .update({
        name,
        slug,
        description,
        category_id,
        brand_id,
        featured_image_url,
        images: safeImages,
        badge,
        status,
        specifications: safeSpecs,
        features: safeFeatures,
      })
      .eq('id', id);

    if (error) return { success: false, error: error.message };

    // Clean up replaced/removed images from storage
    const urlsToDelete: string[] = [];
    if (oldProduct && featured_image_url !== oldProduct.featured_image_url && oldProduct.featured_image_url) {
      urlsToDelete.push(oldProduct.featured_image_url);
    }
    if (oldProduct?.images) {
      const removedUrls = (oldProduct.images as string[]).filter((url) => !safeImages.includes(url));
      urlsToDelete.push(...removedUrls);
    }
    if (urlsToDelete.length > 0) {
      await deleteImages(urlsToDelete);
    }

    // Revalidate all affected pages
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${slug}`);
    revalidatePath('/admin');

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { data: oldProduct } = await supabaseAdmin
      .from('products')
      .select('slug, featured_image_url, images')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };

    // Clean up all images from storage
    const urlsToDelete: string[] = [];
    if (oldProduct?.featured_image_url) urlsToDelete.push(oldProduct.featured_image_url);
    if (oldProduct?.images) urlsToDelete.push(...(oldProduct.images as string[]));
    if (urlsToDelete.length > 0) {
      await deleteImages(urlsToDelete);
    }

    // Revalidate all affected pages
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/admin');

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}
