'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { verifySession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';

export async function getBrands() {
  const { data, error } = await supabaseAdmin
    .from('brands')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function createBrand(formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const logo_url = formData.get('logo_url') as string;

    if (!name || !slug) return { success: false, error: 'Name and slug are required' };

    const { error } = await supabaseAdmin
      .from('brands')
      .insert([{ name, slug, description, logo_url }]);

    if (error) return { success: false, error: error.message };
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}

export async function updateBrand(id: string, formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const logo_url = formData.get('logo_url') as string;

    if (!name || !slug) return { success: false, error: 'Name and slug are required' };

    const { data: oldBrand } = await supabaseAdmin.from('brands').select('logo_url').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('brands')
      .update({ name, slug, description, logo_url })
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    
    if (oldBrand?.logo_url && oldBrand.logo_url !== logo_url) {
      await deleteImages([oldBrand.logo_url]);
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}

export async function deleteBrand(id: string) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const { data: oldBrand } = await supabaseAdmin.from('brands').select('logo_url').eq('id', id).single();

    const { error } = await supabaseAdmin
      .from('brands')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    
    if (oldBrand?.logo_url) {
      await deleteImages([oldBrand.logo_url]);
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Server error' };
  }
}
