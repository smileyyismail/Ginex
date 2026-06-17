'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProduct, updateProduct, deleteProduct, getProduct } from '@/actions/products';
import { uploadImage } from '@/actions/storage';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { Product, Category, Brand, ProductFormState } from '@/lib/types';
import { useObjectUrl, useObjectUrls } from './use-object-url';

const DEFAULT_FORM: ProductFormState = {
  name: '',
  slug: '',
  description: '',
  category_id: '',
  brand_id: '',
  featured_image_url: '',
  badge: 'None',
  status: 'Display',
};

export function ProductsTable({
  initialData,
  categories,
  brands,
}: {
  initialData: Product[];
  categories: Category[];
  brands: Brand[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ProductFormState>(DEFAULT_FORM);
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const featuredPreviewUrl = useObjectUrl(featuredFile);
  const galleryPreviewUrls = useObjectUrls(galleryFiles);

  async function handleEditClick(id: string) {
    try {
      const productRow = initialData.find((p) => p.id === id);
      if (!productRow) {
        toast.error('Product not found');
        return;
      }

      const fullProduct = await getProduct(productRow.slug);
      if (!fullProduct) {
        toast.error('Product not found');
        return;
      }

      // Always derive slug from name so editing the name updates the slug too
      const derivedSlug = fullProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      setFormData({
        name: fullProduct.name,
        slug: derivedSlug,
        description: fullProduct.description || '',
        category_id: fullProduct.category_id || '',
        brand_id: fullProduct.brand_id || '',
        featured_image_url: fullProduct.featured_image_url || '',
        badge: (fullProduct.badge as ProductFormState['badge']) || 'None',
        status: (fullProduct.status as ProductFormState['status']) || 'Display',
      });
      setSpecs(
        fullProduct.specifications && typeof fullProduct.specifications === 'object'
          ? (fullProduct.specifications as Record<string, string>)
          : {},
      );
      setFeatures(Array.isArray(fullProduct.features) ? (fullProduct.features as string[]) : []);
      setEditingId(fullProduct.id);
      setFeaturedFile(null);
      setExistingGalleryImages(Array.isArray(fullProduct.images) ? (fullProduct.images as string[]) : []);
      setGalleryFiles([]);
      setIsOpen(true);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  function handleOpenCreate() {
    setFormData(DEFAULT_FORM);
    setSpecs({});
    setFeatures([]);
    setEditingId(null);
    setFeaturedFile(null);
    setExistingGalleryImages([]);
    setGalleryFiles([]);
    setIsOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload featured image if a new file was selected
      let uploadedFeaturedUrl = formData.featured_image_url;
      if (featuredFile) {
        uploadedFeaturedUrl = await uploadImage(featuredFile, 'products');
      }

      // Upload any new gallery files
      const newGalleryUrls = await Promise.all(galleryFiles.map((file) => uploadImage(file, 'products')));
      const finalGalleryImages = [...existingGalleryImages, ...newGalleryUrls];

      // Always recompute slug from name at save time
      const slugFromName = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const form = new FormData();
      form.append('name', formData.name);
      form.append('slug', slugFromName);
      form.append('description', formData.description);
      form.append('category_id', formData.category_id);
      form.append('brand_id', formData.brand_id);
      form.append('featured_image_url', uploadedFeaturedUrl);
      form.append('badge', formData.badge);
      form.append('status', formData.status);

      if (editingId) {
        const res = await updateProduct(editingId, form, finalGalleryImages, specs, features);
        if (res?.error) { toast.error(res.error); return; }
        toast.success('Product updated');
      } else {
        const res = await createProduct(form, finalGalleryImages, specs, features);
        if (res?.error) { toast.error(res.error); return; }
        toast.success('Product created');
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await deleteProduct(id);
        if (res?.error) toast.error(res.error);
        else {
          toast.success('Product deleted');
          router.refresh();
        }
      } catch (err) {
        toast.error((err as Error).message || 'An error occurred');
      }
    }
  }

  function addSpec() {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs({ ...specs, [newSpecKey.trim()]: newSpecValue.trim() });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  }

  function removeSpec(key: string) {
    const updated = { ...specs };
    delete updated[key];
    setSpecs(updated);
  }

  function addFeature() {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, i) => i !== index));
  }

  function removeGalleryImage(index: number) {
    setExistingGalleryImages(existingGalleryImages.filter((_, i) => i !== index));
  }

  function removeGalleryFile(index: number) {
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Products</h2>
          <p className="text-text-secondary text-sm mt-1">Manage your product catalog and inventory.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button onClick={handleOpenCreate} />}>
            Add Product
          </DialogTrigger>

          <DialogContent className="max-w-5xl md:max-w-5xl w-full max-h-[90vh] overflow-y-auto p-0">
            <div className="p-6 border-b sticky top-0 bg-surface z-10">
              <DialogTitle className="text-2xl">{editingId ? 'Edit Product' : 'New Product'}</DialogTitle>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Row 1: Product Name (slug auto-generated) */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Product Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData({ ...formData, name, slug });
                  }}
                  required
                />
                {formData.slug && (
                  <p className="mt-1.5 text-xs text-text-secondary">
                    <span className="font-medium text-text-primary/50">URL: </span>
                    <span className="font-mono">/products/{formData.slug}</span>
                  </p>
                )}
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="h-28"
                />
              </div>

              {/* Row 3: Category, Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Category</label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(val) => setFormData({ ...formData, category_id: val ?? '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category">
                        {formData.category_id
                          ? categories.find((c) => c.id === formData.category_id)?.name
                          : 'Select Category'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Brand</label>
                  <Select
                    value={formData.brand_id}
                    onValueChange={(val) => setFormData({ ...formData, brand_id: val ?? '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand">
                        {formData.brand_id
                          ? brands.find((b) => b.id === formData.brand_id)?.name
                          : 'Select Brand'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Status, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => setFormData({ ...formData, status: val as ProductFormState['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Display">Display</SelectItem>
                      <SelectItem value="Hide">Hide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Product Badge</label>
                  <Select
                    value={formData.badge}
                    onValueChange={(val) => setFormData({ ...formData, badge: val as ProductFormState['badge'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Badge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Trending">Trending</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Best Seller">Best Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 5: Thumbnail Image */}
              <div className="p-4 border rounded-xl bg-surface-elevated/50">
                <label className="text-sm font-semibold mb-1.5 block">Featured Thumbnail</label>
                {featuredFile && featuredPreviewUrl ? (
                  <div className="mb-3">
                    <Image
                      unoptimized
                      src={featuredPreviewUrl}
                      alt="Featured Preview"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-lg border bg-surface shadow-sm"
                    />
                  </div>
                ) : formData.featured_image_url && formData.featured_image_url !== 'null' ? (
                  <div className="mb-3">
                    <Image
                      src={formData.featured_image_url}
                      alt="Featured"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-lg border bg-surface shadow-sm"
                    />
                  </div>
                ) : null}
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-surface"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) setFeaturedFile(e.target.files[0]);
                  }}
                />
              </div>

              {/* Row 6: Gallery Images */}
              <div className="p-4 border rounded-xl bg-surface-elevated/50">
                <label className="text-sm font-semibold mb-1.5 block">Gallery Images</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {existingGalleryImages.map((url, idx) => (
                    <div key={url} className="relative group">
                      <Image
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded-lg border bg-surface shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        aria-label={`Remove gallery image ${idx + 1}`}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {galleryFiles.map((file, idx) => (
                    <div key={`${file.name}-${idx}`} className="relative group">
                      {galleryPreviewUrls[idx] && (
                        <Image
                          unoptimized
                          src={galleryPreviewUrls[idx]}
                          alt={`Gallery Preview ${idx + 1}`}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-cover rounded-lg border bg-zinc-200 shadow-sm"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeGalleryFile(idx)}
                        aria-label={`Remove pending gallery image ${idx + 1}`}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="bg-surface"
                  onChange={(e) => {
                    if (e.target.files) {
                      setGalleryFiles([...galleryFiles, ...Array.from(e.target.files)]);
                    }
                  }}
                />
              </div>

              {/* Row 7: Specifications */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Specifications</label>
                <p className="text-xs text-text-secondary mb-3">
                  Add any specifications relevant to this product (e.g. Model, Connector, Output Power).
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Key (e.g. Connector)"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }}
                  />
                  <Input
                    placeholder="Value (e.g. USB-C to Lightning)"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }}
                  />
                  <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-surface-elevated p-2 rounded-md border">
                      <span className="text-sm truncate">
                        <span className="font-semibold text-text-primary">{key}:</span> {value}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove specification ${key}`}
                        className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                        onClick={() => removeSpec(key)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 8: Features */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Features</label>
                <p className="text-xs text-text-secondary mb-3">
                  Add bullet-point features shown on the product detail page.
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g. 35W PD Fast Charging"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                  />
                  <Button type="button" onClick={addFeature} variant="secondary">Add</Button>
                </div>
                <div className="space-y-2">
                  {features.map((feature, idx) => (
                    <div
                      key={`feature-${idx}-${feature.slice(0, 10)}`}
                      className="flex justify-between items-center bg-surface-elevated p-2 rounded-md border"
                    >
                      <span className="text-sm truncate pr-4">{feature}</span>
                      <button
                        type="button"
                        aria-label={`Remove feature ${idx + 1}`}
                        className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                        onClick={() => removeFeature(idx)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6 mt-6 border-t">
                <Button type="submit" disabled={loading} className="px-8 py-6 text-lg">
                  {loading ? 'Saving Product...' : 'Save Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <div className="bg-surface rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-surface-elevated/50">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>
                    {prod.featured_image_url && prod.featured_image_url !== 'null' ? (
                      <Image
                        src={prod.featured_image_url}
                        alt={prod.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-cover rounded border"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-surface-elevated rounded border flex items-center justify-center text-xs text-text-secondary">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-text-primary">{prod.name}</TableCell>
                  <TableCell className="text-text-secondary">{prod.category?.name || 'N/A'}</TableCell>
                  <TableCell className="text-text-secondary">{prod.brand?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {prod.badge && prod.badge !== 'None' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
                        {prod.badge}
                      </span>
                    ) : (
                      <span className="text-text-secondary text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        prod.status === 'Display'
                          ? 'bg-brand/20 text-brand'
                          : 'bg-surface-elevated text-text-secondary'
                      }`}
                    >
                      {prod.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(prod.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(prod.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {initialData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-text-secondary">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
