import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const BUCKET = 'ginex-assets';

async function main() {
  const { data: products } = await supabase.from('products').select('id, name, featured_image_url, images');
  const { data: allFiles } = await supabase.storage.from(BUCKET).list('products', { limit: 1000 });
  const fileNames = new Set(allFiles?.map(f => f.name));
  
  for (const p of products!) {
     let changed = false;
     
     if (p.featured_image_url) {
        const file = decodeURIComponent(p.featured_image_url.split(`/${BUCKET}/`)[1].substring(9)); 
        if (!fileNames.has(file)) {
            console.log(`WARNING: Featured image missing for ${p.name}`);
        }
     }

     const newImages = [];
     for (const url of p.images || []) {
         const file = decodeURIComponent(url.split(`/${BUCKET}/`)[1].substring(9));
         if (fileNames.has(file)) {
             newImages.push(url);
         } else {
             console.log(`Removing missing image URL for ${p.name}: ${file}`);
             changed = true;
         }
     }
     
     if (changed) {
         await supabase.from('products').update({ images: newImages }).eq('id', p.id);
         console.log(`Updated ${p.name}`);
     }
  }
}
main();
