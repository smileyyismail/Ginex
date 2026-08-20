'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient, verifyAdmin } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';
import { ProductSchema, isManagedGinexAssetUrl } from '@/lib/validations';
import { getSafeMutationError, withAdminAuth } from '@/lib/supabase/action-utils';
import type { Product } from '@/lib/types';

// ─── Public Queries ───────────────────────────────────────────────────────────

/** Fetches all products with joined category (admin list). */
export async function getProducts(): Promise<Product[]> {
  const adminCheck = await verifyAdmin();
  if (!adminCheck.success) throw new Error('Unauthorized');

  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, category:categories(id, name, slug, image_url)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

/** Fetches only Display-status products for the public storefront. */
export async function getPublicProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug, image_url)')
    .eq('status', 'Display')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

/** Fetches a single product by slug with full category data. */
export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data as Product | null;
}

export async function getProductForAdmin(slug: string): Promise<Product | null> {
  const adminCheck = await verifyAdmin();
  if (!adminCheck.success) throw new Error('Unauthorized');

  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error('Unable to load product');
  return data as Product | null;
}

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

export async function createProduct(
  formData: FormData,
  images: string[],
  specs: Record<string, string>,
  features: string[],
) {
  return withAdminAuth(async () => {
    const validatedFields = ProductSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      category_id: formData.get('category_id') as string,
      featured_image_url: (formData.get('featured_image_url') as string) || '',
      badge: (formData.get('badge') as string) || 'None',
      status: (formData.get('status') as string) || 'Display',
    });

    if (!validatedFields.success) {
      return { success: false as const, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, category_id, badge, status } = validatedFields.data;

    // Duplicate name check
    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id')
      .ilike('name', name.trim())
      .maybeSingle();
    if (existing) {
      return { success: false as const, error: `A product named "${name.trim()}" already exists. Please use a different name.` };
    }

    // JSONB safety guards
    const safeSpecs = specs && typeof specs === 'object' && !Array.isArray(specs) ? specs : {};
    const safeFeatures = Array.isArray(features) ? features.filter((f) => typeof f === 'string') : [];
    const safeImages = Array.isArray(images)
      ? images.filter((i) => typeof i === 'string' && i.length > 0 && isManagedGinexAssetUrl(i))
      : [];

    if (safeImages.length === 0) {
      return { success: false as const, error: 'At least one product image is required' };
    }

    const finalFeaturedUrl = safeImages[0];

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert([{
        name,
        slug,
        description,
        category_id,
        featured_image_url: finalFeaturedUrl,
        images: safeImages,
        badge,
        status,
        specifications: safeSpecs,
        features: safeFeatures,
      }])
      .select('id, name, slug, description, category_id, featured_image_url, badge, status, specifications, features, images, created_at, updated_at')
      .single();

    if (error) return { success: false as const, error: getSafeMutationError(error, 'Unable to create product') };

    // Revalidate all affected public pages
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${slug}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');

    return { success: true as const, data: product };
  });
}

export async function updateProduct(
  id: string,
  formData: FormData,
  images: string[],
  specs: Record<string, string>,
  features: string[],
) {
  return withAdminAuth(async () => {
    const validatedFields = ProductSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      category_id: formData.get('category_id') as string,
      featured_image_url: (formData.get('featured_image_url') as string) || '',
      badge: (formData.get('badge') as string) || 'None',
      status: (formData.get('status') as string) || 'Display',
    });

    if (!validatedFields.success) {
      return { success: false as const, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, category_id, badge, status } = validatedFields.data;

    // Duplicate name check (exclude the product being edited)
    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id')
      .ilike('name', name.trim())
      .neq('id', id)
      .maybeSingle();
    if (existing) {
      return { success: false as const, error: `A product named "${name.trim()}" already exists. Please use a different name.` };
    }

    // JSONB safety guards
    const safeSpecs = specs && typeof specs === 'object' && !Array.isArray(specs) ? specs : {};
    const safeFeatures = Array.isArray(features) ? features.filter((f) => typeof f === 'string') : [];
    const safeImages = Array.isArray(images)
      ? images.filter((i) => typeof i === 'string' && i.length > 0 && isManagedGinexAssetUrl(i))
      : [];

    if (safeImages.length === 0) {
      return { success: false as const, error: 'At least one product image is required' };
    }

    const finalFeaturedUrl = safeImages[0];

    // Fetch old product to diff images for deletion
    const { data: oldProduct } = await supabaseAdmin
      .from('products')
      .select('slug, featured_image_url, images')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('products')
      .update({
        name,
        slug,
        description,
        category_id,
        featured_image_url: finalFeaturedUrl,
        images: safeImages,
        badge,
        status,
        specifications: safeSpecs,
        features: safeFeatures,
      })
      .eq('id', id);

    if (error) return { success: false as const, error: getSafeMutationError(error, 'Unable to update product') };

    // Clean up replaced/removed images from storage
    const urlsToDelete: string[] = [];
    if (oldProduct && finalFeaturedUrl !== oldProduct.featured_image_url && oldProduct.featured_image_url && !safeImages.includes(oldProduct.featured_image_url)) {
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
    if (oldProduct && oldProduct.slug !== slug) {
      revalidatePath(`/products/${oldProduct.slug}`);
    }
    revalidatePath(`/products/${slug}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');

    return { success: true as const };
  });
}

export async function deleteProduct(id: string) {
  return withAdminAuth(async () => {
    const { data: oldProduct } = await supabaseAdmin
      .from('products')
      .select('slug, featured_image_url, images')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) return { success: false as const, error: getSafeMutationError(error, 'Unable to delete product') };

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
    if (oldProduct?.slug) {
      revalidatePath(`/products/${oldProduct.slug}`);
    }
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');

    return { success: true as const };
  });
}
