import 'server-only';

import { supabaseAdmin } from './supabase/admin';
import { isManagedGinexAssetUrl } from './validations';

const STORAGE_BUCKET = 'ginex-assets';
const ALLOWED_FOLDERS = new Set(['products', 'categories', 'brands']);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', new Set(['jpg', 'jpeg'])],
  ['image/png', new Set(['png'])],
  ['image/webp', new Set(['webp'])],
]);

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

function hasValidImageSignature(bytes: Uint8Array, mimeType: string) {
  if (mimeType === 'image/jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (mimeType === 'image/png') {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }

  if (mimeType === 'image/webp') {
    const header = String.fromCharCode(...bytes.slice(0, 12));
    return header.startsWith('RIFF') && header.slice(8, 12) === 'WEBP';
  }

  return false;
}

async function validateImageUpload(file: File, folder: string) {
  if (!ALLOWED_FOLDERS.has(folder)) {
    throw new Error('Invalid upload folder');
  }

  if (!file || file.size === 0) {
    throw new Error('Image file is required');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image must be 5MB or smaller');
  }

  const allowedExtensions = ALLOWED_IMAGE_TYPES.get(file.type);
  const fileExt = getFileExtension(file.name);

  if (!allowedExtensions || !allowedExtensions.has(fileExt)) {
    throw new Error('Only JPEG, PNG, and WebP image uploads are allowed');
  }

  const headerBytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!hasValidImageSignature(headerBytes, file.type)) {
    throw new Error('Image file type could not be verified');
  }

  return { fileExt, contentType: file.type };
}

export async function uploadImageFile(file: File, folder: string): Promise<string> {
  const { fileExt, contentType } = await validateImageUpload(file, folder);

  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error('Image upload failed:', error.message);
    throw new Error('Unable to upload image');
  }

  const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImages(urls: string[]) {
  if (!urls || urls.length === 0) return;

  const paths = urls
    .filter(isManagedGinexAssetUrl)
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
