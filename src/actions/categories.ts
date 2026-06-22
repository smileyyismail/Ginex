'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient, verifyAdmin } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { deleteImages } from '@/lib/storage';
import { CategorySchema } from '@/lib/validations';

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function createCategory(formData: FormData) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

    const validatedFields = CategorySchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      image_url: (formData.get('image_url') as string) || '',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, image_url } = validatedFields.data;

    const { error } = await supabaseAdmin
      .from('categories')
      .insert([{ name, slug, description, image_url }]);

    if (error) return { success: false, error: error.message };
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

    const validatedFields = CategorySchema.safeParse({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || '',
      image_url: (formData.get('image_url') as string) || '',
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.issues[0].message };
    }

    const { name, slug, description, image_url } = validatedFields.data;

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
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}

export async function deleteCategory(id: string) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };

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
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}
