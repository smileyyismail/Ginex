import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
});

export const brandSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  category_id: z.string().uuid(),
  brand_id: z.string().uuid(),
  featured_image_url: z.string().url(),
  is_featured: z.boolean().default(false),
  status: z.enum(['Active', 'Inactive']).default('Active'),
});
