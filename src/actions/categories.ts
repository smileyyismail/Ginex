'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { verifySession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';

export async function getCategories() {
  const { data, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function createCategory(formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('image_url') as string;

    if (!name || !slug) return { success: false, error: 'Name and slug are required' };

    const { error } = await supabaseAdmin
      .from('categories')
      .insert([{ name, slug, description, image_url }]);

    if (error) return { success: false, error: error.message };
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('image_url') as string;

    if (!name || !slug) return { success: false, error: 'Name and slug are required' };

    const { data: oldCategory } = await supabaseAdmin.from('categories').select('image_url').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('categories')
      .update({ name, slug, description, image_url })
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    
    if (oldCategory?.image_url && oldCategory.image_url !== image_url) {
      await deleteImages([oldCategory.image_url]);
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}

export async function deleteCategory(id: string) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const { data: oldCategory } = await supabaseAdmin.from('categories').select('image_url').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    
    if (oldCategory?.image_url) {
      await deleteImages([oldCategory.image_url]);
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}
