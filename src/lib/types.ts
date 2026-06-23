// ─── Enums / Literal Types ────────────────────────────────────────────────────
/** Controls visibility on the public storefront. */
type ProductStatus = 'Display' | 'Hide';

/** Promotional badge displayed on product cards. */
type ProductBadge = 'None' | 'Trending' | 'New' | 'Featured' | 'Best Seller';

/**
 * Flexible specification map.
 * Different product categories use different keys — no fixed structure is enforced.
 * Examples:
 *   Cable:      { "Model": "GX-25CL", "Connector": "USB-C to Lightning", "Charging Power": "35W" }
 *   Charger:    { "Output": "65W", "Ports": "USB-C + USB-A" }
 *   Power Bank: { "Capacity": "10000mAh", "Battery Type": "Lithium Polymer" }
 */
type ProductSpecifications = Record<string, string>;

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  /** Foreign key → categories.id. Required when creating/updating. */
  category_id: string;
  /** Foreign key → brands.id. Required when creating/updating. */
  brand_id: string;
  /** Primary display image URL. Required. */
  featured_image_url: string;
  /** Gallery images. Defaults to []. */
  images: string[];
  /** Flexible per-product specification key-value pairs. Defaults to {}. */
  specifications: ProductSpecifications;
  /** Feature bullet-point list. Defaults to []. */
  features: string[];
  /** Promotional badge. Defaults to 'None'. */
  badge: ProductBadge;
  /** Storefront visibility. 'Display' = public, 'Hide' = hidden. */
  status: ProductStatus;
  created_at?: string;
  updated_at?: string;
  // ─── Joined relations (populated by Supabase select joins) ───────────────
  category?: Pick<Category, 'id' | 'name' | 'slug' | 'image_url'>;
  brand?: Pick<Brand, 'id' | 'name' | 'slug' | 'logo_url'>;
}

// ─── Admin Form Types ─────────────────────────────────────────────────────────

/**
 * Shape of the controlled form state in the Admin product form.
 * All text fields are plain strings (as received from HTML inputs).
 * JSONB fields (specs, features, images) are managed separately as React state.
 */
export interface ProductFormState {
  name: string;
  slug: string;
  description: string;
  category_id: string;
  brand_id: string;
  featured_image_url: string;
  badge: ProductBadge;
  status: ProductStatus;
}
