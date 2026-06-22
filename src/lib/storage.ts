import 'server-only';

import { supabaseAdmin } from './supabase/admin';

const STORAGE_BUCKET = 'ginex-assets';
const ALLOWED_FOLDERS = new Set(['products', 'categories', 'brands']);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function validateImageUpload(file: File, folder: string) {
  if (!ALLOWED_FOLDERS.has(folder)) {
    throw new Error('Invalid upload folder');
  }

  if (!file || file.size === 0) {
    throw new Error('Image file is required');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image must be 5MB or smaller');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image uploads are allowed');
  }
}

export async function uploadImageFile(file: File, folder: string): Promise<string> {
  validateImageUpload(file, folder);

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'webp';
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImages(urls: string[]) {
  if (!urls || urls.length === 0) return;

  const paths = urls
    .map((url) => {
      const parts = url.split(`/${STORAGE_BUCKET}/`);
      return parts.length > 1 ? parts[1] : null;
    })
    .filter((path): path is string => Boolean(path));

  if (paths.length === 0) return;

  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).remove(paths);

  if (error) {
    console.error('Failed to delete images:', error.message);
  }
}
