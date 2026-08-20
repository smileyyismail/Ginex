import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const BUCKET = 'ginex-assets';

async function main() {
  const { data: products } = await supabase.from('products').select('name, featured_image_url, images');
  const { data: allFiles } = await supabase.storage.from(BUCKET).list('products', { limit: 1000 });
  const fileNames = new Set(allFiles?.map(f => f.name));
  
  let missingFiles = 0;
  
  for (const p of products!) {
     const urls = [p.featured_image_url, ...(p.images || [])];
     for (const url of urls) {
         if (!url) continue;
         const oldPath = url.split(`/${BUCKET}/`)[1];
         const file = decodeURIComponent(oldPath.substring(oldPath.lastIndexOf('/') + 1));
         
         if (!fileNames.has(file)) {
             console.log(`Missing file in DB: ${file} (URL: ${url})`);
             missingFiles++;
         }
     }
  }
  console.log(`Total missing files: ${missingFiles}`);
}
main();
