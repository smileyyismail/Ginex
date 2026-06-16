export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  brand_id?: string;
  featured_image_url?: string;
  badge?: string;
  status?: string;
  specifications?: Record<string, string>;
  features?: string[];
  images?: string[];
  category?: Category;
  brand?: Brand;
  created_at?: string;
}
