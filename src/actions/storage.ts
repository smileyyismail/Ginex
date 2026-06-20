'use server';

import { createClient } from '@/lib/supabase/server';
import { uploadImageFile } from '@/lib/storage';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return uploadImageFile(file, folder);
}
