'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient, verifyAdmin } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';
import { BrandSchema } from '@/lib/validations';

export async function getBrands() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function createBrand(formData: FormData) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

    const validatedFields = BrandSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      logo_url: (formData.get('logo_url') as string) || '',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, logo_url } = validatedFields.data;

    const { error } = await supabaseAdmin
      .from('brands')
      .insert([{ name, slug, description, logo_url }]);

    if (error) return { success: false, error: error.message };
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function updateBrand(id: string, formData: FormData) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

    const validatedFields = BrandSchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      logo_url: (formData.get('logo_url') as string) || '',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, logo_url } = validatedFields.data;

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
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function deleteBrand(id: string) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

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
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}
