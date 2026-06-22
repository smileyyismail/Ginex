'use server';

import { createClient, verifyAdmin } from '@/lib/supabase/server';
import { uploadImageFile } from '@/lib/storage';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const adminCheck = await verifyAdmin();
  if (!adminCheck.success) {
    throw new Error(adminCheck.error);
  }

  return uploadImageFile(file, folder);
}
