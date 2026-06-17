'use server';

import { verifySession } from '@/lib/session';
import { uploadImageFile } from '@/lib/storage';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const session = await verifySession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return uploadImageFile(file, folder);
}
