import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export const BrandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  logo_url: z.string().optional(),
});

const productStatuses = ['Display', 'Hide'] as const;
const productBadges = ['None', 'Trending', 'New', 'Best Seller'] as const;

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Category is required'),
  brand_id: z.string().min(1, 'Brand is required'),
  featured_image_url: z.string().min(1, 'Featured image is required'),
  badge: z.enum(productBadges).default('None'),
  status: z.enum(productStatuses).default('Display'),
});
