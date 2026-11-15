import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'ginex-assets';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  console.log('Fetching products...');
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products.`);

  for (const p of products) {
    const modelNumber = p.name.split(' ')[0];
    console.log(`\nProcessing product: ${p.name} (Model: ${modelNumber})`);
    
    // Some products might have null images array
    const additionalImages = Array.isArray(p.images) ? p.images : [];
    
    // We collect all valid image URLs
    const allUrls = [p.featured_image_url, ...additionalImages].filter(Boolean) as string[];
    
    if (allUrls.length === 0) {
      console.log('No images found, skipping.');
      continue;
    }

    let newFeaturedUrl = p.featured_image_url;
    const newImagesUrls: string[] = [];
    
    let counter = 1;

    for (let i = 0; i < allUrls.length; i++) {
      const url = allUrls[i];
      
      // We only process URLs that belong to our Supabase storage bucket
      if (!url.includes(`/${BUCKET}/`)) {
        console.log(`Skipping non-bucket URL: ${url}`);
        if (i === 0) newFeaturedUrl = url;
        else newImagesUrls.push(url);
        continue;
      }

      // Extract the path inside the bucket (e.g. products/filename.jpg)
      const oldPath = url.split(`/${BUCKET}/`)[1];
      const folderMatch = oldPath.match(/^(.*?)\/[^\/]+$/);
      let folder = 'products'; // Default fallback
      if (folderMatch) {
          folder = folderMatch[1];
      }
      
      const oldFilename = oldPath.substring(oldPath.lastIndexOf('/') + 1);
      const ext = path.extname(oldFilename);
      
      const newFilename = `${modelNumber} (${counter})${ext}`;
      const newPath = `${folder}/${newFilename}`;

      if (oldPath === newPath) {
        console.log(`File already named correctly: ${newPath}`);
        if (i === 0) newFeaturedUrl = url;
        else newImagesUrls.push(url);
        counter++;
        continue;
      }

      console.log(`Moving: ${oldPath} -> ${newPath}`);
      const { error: moveError } = await supabase.storage.from(BUCKET).move(oldPath, newPath);
      
      if (moveError) {
        // If file already exists, we might want to just proceed and use it
        if (moveError.message.toLowerCase().includes('already exists') || moveError.message.toLowerCase().includes('duplicate')) {
            console.log(`⚠️ File already exists at destination, proceeding to use it anyway...`);
        } else if (moveError.message.toLowerCase().includes('not found')) {
            console.log(`⚠️ Source file not found in storage: ${oldPath}. Maybe already renamed?`);
        } else {
            console.error(`❌ Error moving ${oldPath} to ${newPath}:`, moveError.message);
            // On unexpected error, keep the original URL
            if (i === 0) newFeaturedUrl = url;
            else newImagesUrls.push(url);
            continue;
        }
      }

      // Get the new public URL
      const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(newPath);
      
      if (i === 0) {
        newFeaturedUrl = publicUrl;
      } else {
        newImagesUrls.push(publicUrl);
      }
      
      counter++;
    }

    // Now update the product record in the database
    const { error: updateError } = await supabase
      .from('products')
      .update({
        featured_image_url: newFeaturedUrl,
        images: newImagesUrls
      })
      .eq('id', p.id);
      
    if (updateError) {
      console.error(`❌ Error updating product ${p.id} in database:`, updateError);
    } else {
      console.log(`✅ Updated database record for ${modelNumber}.`);
    }
  }
  
  console.log('\n🎉 Finished renaming all images!');
}

main();
