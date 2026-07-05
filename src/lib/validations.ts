import { z } from 'zod';

const slugSchema = z
  .string()
  .trim()
  .min(1, 'Slug is required')
  .max(120, 'Slug must be 120 characters or fewer')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must use lowercase letters, numbers, and hyphens');

const optionalTextSchema = z.string().trim().max(2000, 'Description is too long').optional();

const optionalManagedImageUrlSchema = z
  .string()
  .trim()
  .max(2048, 'Image URL is too long')
  .refine((value) => value === '' || isManagedStorageUrl(value), 'Image must come from Ginex asset storage')
  .optional();

function isManagedStorageUrl(value: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return false;

  try {
    const url = new URL(value);
    const allowedOrigin = new URL(supabaseUrl).origin;
    return (
      url.origin === allowedOrigin &&
      url.pathname.startsWith('/storage/v1/object/public/ginex-assets/')
    );
  } catch {
    return false;
  }
}

export const CategorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name must be 120 characters or fewer'),
  slug: slugSchema,
  description: optionalTextSchema,
  image_url: optionalManagedImageUrlSchema,
});

export const BrandSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name must be 120 characters or fewer'),
  slug: slugSchema,
  description: optionalTextSchema,
  logo_url: optionalManagedImageUrlSchema,
});

const productStatuses = ['Display', 'Hide'] as const;
const productBadges = ['None', 'Trending', 'New', 'Featured', 'Best Seller'] as const;

export const ProductSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(160, 'Name must be 160 characters or fewer'),
  slug: slugSchema,
  description: z.string().trim().max(500, 'Description must be 500 characters or fewer').optional(),
  category_id: z.uuid('Category is required'),
  brand_id: z.uuid('Brand is required'),
  featured_image_url: optionalManagedImageUrlSchema,
  badge: z.enum(productBadges).default('None'),
  status: z.enum(productStatuses).default('Display'),
});

export function isManagedGinexAssetUrl(value: string) {
  return isManagedStorageUrl(value);
}
