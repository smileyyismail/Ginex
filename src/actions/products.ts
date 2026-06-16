'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { verifySession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';

export async function getProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, category:categories(name), brand:brands(name)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getPublicProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, category:categories(name), brand:brands(name)')
    .eq('status', 'Display')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getProduct(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
}

export async function createProduct(formData: FormData, images: string[], specs: Record<string, string>, features: string[]) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category_id = formData.get('category_id') as string;
    const brand_id = formData.get('brand_id') as string;
    const featured_image_url = formData.get('featured_image_url') as string;
    const badge = formData.get('badge') as string;
    const status = formData.get('status') as string;

    if (!name || !slug || !category_id || !brand_id || !featured_image_url) {
      return { success: false, error: 'Missing required fields' };
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert([{ 
        name, slug, description, category_id, brand_id, 
        featured_image_url, images: images || [], badge, status,
        specifications: specs,
        features: features || []
      }])
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    revalidatePath('/admin');
    return { success: true, data: product };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function updateProduct(id: string, formData: FormData, images: string[], specs: Record<string, string>, features: string[]) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category_id = formData.get('category_id') as string;
    const brand_id = formData.get('brand_id') as string;
    const featured_image_url = formData.get('featured_image_url') as string;
    const badge = formData.get('badge') as string;
    const status = formData.get('status') as string;

    if (!name || !slug || !category_id || !brand_id || !featured_image_url) {
      return { success: false, error: 'Missing required fields' };
    }

    const { data: oldProduct } = await supabaseAdmin.from('products').select('featured_image_url, images').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('products')
      .update({ 
        name, slug, description, category_id, brand_id, 
        featured_image_url, images: images || [], badge, status,
        specifications: specs,
        features: features || []
      })
      .eq('id', id);

    if (error) return { success: false, error: error.message };

    const urlsToDelete = [];
    if (oldProduct && featured_image_url !== oldProduct.featured_image_url) {
      urlsToDelete.push(oldProduct.featured_image_url);
    }
    
    if (oldProduct && oldProduct.images) {
       const removedUrls = oldProduct.images.filter((url: string) => !images.includes(url));
       urlsToDelete.push(...removedUrls);
    }

    if (urlsToDelete.length > 0) {
      await deleteImages(urlsToDelete);
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath(`/products/${slug}`);
    
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function deleteProduct(id: string) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const { data: oldProduct } = await supabaseAdmin.from('products').select('featured_image_url, images').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };

    const urlsToDelete = [];
    if (oldProduct?.featured_image_url) urlsToDelete.push(oldProduct.featured_image_url);
    if (oldProduct?.images) urlsToDelete.push(...oldProduct.images);

    if (urlsToDelete.length > 0) {
      await deleteImages(urlsToDelete);
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
    
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}
