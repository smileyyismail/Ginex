import { supabaseClient } from './supabase/client';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabaseClient.storage
    .from('ginex-assets')
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseClient.storage
    .from('ginex-assets')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImages(urls: string[]) {
  if (!urls || urls.length === 0) return;
  const paths = urls.map(url => {
    const parts = url.split('/ginex-assets/');
    return parts.length > 1 ? parts[1] : null;
  }).filter(Boolean) as string[];

  if (paths.length > 0) {
    const { error } = await supabaseClient.storage.from('ginex-assets').remove(paths);
    if (error) console.error('Failed to delete images:', error.message);
  }
}
