const fs = require('fs');

const NEW_UPLOAD_FUNC = `export async function uploadImageFile(file: File, folder: string): Promise<string> {
  const { fileExt, contentType } = await validateImageUpload(file, folder);

  let baseName = file.name.substring(0, file.name.lastIndexOf('.'));
  if (!baseName) baseName = 'image';
  
  // Basic sanitization: keep letters, numbers, spaces, hyphens, underscores, parenthesis
  baseName = baseName.replace(/[^a-zA-Z0-9 \\-_()]/g, '').trim();
  if (!baseName) baseName = 'image';

  let fileName = \`\${baseName}.\${fileExt}\`;
  let filePath = \`\${folder}/\${fileName}\`;
  let attempt = 0;

  while (true) {
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      const errStr = error.message ? error.message.toLowerCase() : '';
      if (
        errStr.includes('already exists') || 
        errStr.includes('duplicate') || 
        (error as any).statusCode === '409' || 
        (error as any).statusCode === 409 ||
        errStr.includes('conflict')
      ) {
        attempt++;
        fileName = \`\${baseName} (\${attempt}).\${fileExt}\`;
        filePath = \`\${folder}/\${fileName}\`;
        continue;
      }
      console.error('Image upload failed:', error.message);
      throw new Error('Unable to upload image');
    }
    break;
  }

  const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}`;

let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

// Replace the function
const startPattern = 'export async function uploadImageFile(file: File, folder: string): Promise<string> {';
const startIndex = content.indexOf(startPattern);
if (startIndex !== -1) {
  // Find the end of the function (the first '}' that is at the root level, but here it's before export async function deleteImages)
  const nextFuncPattern = 'export async function deleteImages(urls: string[]) {';
  const nextFuncIndex = content.indexOf(nextFuncPattern);
  if (nextFuncIndex !== -1) {
    const originalFunc = content.substring(startIndex, nextFuncIndex);
    content = content.replace(originalFunc, NEW_UPLOAD_FUNC + '\n\n');
    fs.writeFileSync('src/lib/storage.ts', content);
    console.log('Successfully updated uploadImageFile');
  } else {
    console.log('Could not find deleteImages function');
  }
} else {
  console.log('Could not find uploadImageFile function');
}
