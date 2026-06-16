'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProduct, updateProduct, deleteProduct, getProduct } from '@/actions/products';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';
import { X } from 'lucide-react';

export function ProductsTable({ initialData, categories, brands }: { initialData: any[], categories: any[], brands: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ 
    name: '', slug: '', description: '', category_id: '', brand_id: '', 
    featured_image_url: '', badge: 'None', status: 'Active' 
  });
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  async function handleEditClick(id: string) {
    try {
      const fullProduct = await getProduct(initialData.find(p => p.id === id).slug);
      
      setFormData({ 
        name: fullProduct.name, slug: fullProduct.slug, description: fullProduct.description || '', 
        category_id: fullProduct.category_id, brand_id: fullProduct.brand_id, 
        featured_image_url: fullProduct.featured_image_url, 
        badge: fullProduct.badge || 'None', status: fullProduct.status 
      });
      setSpecs(fullProduct.specifications || {});
      setFeatures(fullProduct.features || []);
      setEditingId(fullProduct.id);
      setFeaturedFile(null);
      setExistingGalleryImages(fullProduct.images || []);
      setGalleryFiles([]);
      setIsOpen(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function handleOpenCreate() {
    setFormData({ 
      name: '', slug: '', description: '', category_id: '', brand_id: '', 
      featured_image_url: '', badge: 'None', status: 'Active' 
    });
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
      let uploadedFeaturedUrl = formData.featured_image_url;
      if (featuredFile) {
        uploadedFeaturedUrl = await uploadImage(featuredFile, `products`);
      }

      const newGalleryUrls = await Promise.all(
        galleryFiles.map(file => uploadImage(file, 'products'))
      );

      const finalGalleryImages = [...existingGalleryImages, ...newGalleryUrls];

      const form = new FormData();
      form.append('name', formData.name);
      form.append('slug', formData.slug);
      form.append('description', formData.description);
      form.append('category_id', formData.category_id);
      form.append('brand_id', formData.brand_id);
      form.append('featured_image_url', uploadedFeaturedUrl);
      form.append('badge', formData.badge);
      form.append('status', formData.status);

      if (editingId) {
        const res = await updateProduct(editingId, form, finalGalleryImages, specs, features); 
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Product updated");
      } else {
        const res = await createProduct(form, finalGalleryImages, specs, features);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Product created");
      }
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id);
        if (res?.error) toast.error(res.error);
        else toast.success("Product deleted");
      } catch (err: any) {
        toast.error(err.message || 'An error occurred');
      }
    }
  }

  function addSpec() {
    if (newSpecKey && newSpecValue) {
      setSpecs({ ...specs, [newSpecKey]: newSpecValue });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  }

  function removeSpec(key: string) {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  }

  function addFeature() {
    if (newFeature) {
      setFeatures([...features, newFeature]);
      setNewFeature('');
    }
  }

  function removeFeature(index: number) {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  }

  function removeGalleryImage(index: number) {
    const newImages = [...existingGalleryImages];
    newImages.splice(index, 1);
    setExistingGalleryImages(newImages);
  }

  function removeGalleryFile(index: number) {
    const newFiles = [...galleryFiles];
    newFiles.splice(index, 1);
    setGalleryFiles(newFiles);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Products</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage your product catalog and inventory.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl md:max-w-5xl w-full max-h-[90vh] overflow-y-auto p-0">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <DialogTitle className="text-2xl">{editingId ? 'Edit Product' : 'New Product'}</DialogTitle>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Row 1: Product Name, URL Slug */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Product Name</label>
                  <Input 
                    name="name" 
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setFormData({...formData, name, slug: editingId ? formData.slug : slug});
                    }}
                    required 
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">URL Slug</label>
                  <Input 
                    name="slug" 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required 
                  />
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Description</label>
                <Textarea 
                  name="description" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="h-28"
                />
              </div>

              {/* Row 3: Category, Brand */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Category</label>
                  <Select value={formData.category_id} onValueChange={(val) => setFormData({...formData, category_id: val as string})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category">
                        {formData.category_id ? categories.find(c => c.id === formData.category_id)?.name : "Select Category"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Brand</label>
                  <Select value={formData.brand_id} onValueChange={(val) => setFormData({...formData, brand_id: val as string})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand">
                        {formData.brand_id ? brands.find(b => b.id === formData.brand_id)?.name : "Select Brand"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Status, Badge */}
              <div className="grid grid-cols-2 gap-6 items-center">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Status</label>
                  <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val as string})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Product Badge</label>
                  <Select value={formData.badge} onValueChange={(val) => setFormData({...formData, badge: val as string})}>
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
              <div className="p-4 border rounded-xl bg-zinc-50/50">
                <label className="text-sm font-semibold mb-1.5 block">Featured Thumbnail</label>
                {featuredFile ? (
                  <div className="mb-3">
                    <img src={URL.createObjectURL(featuredFile)} alt="Featured Preview" className="h-20 w-20 object-cover rounded-lg border bg-white shadow-sm" />
                  </div>
                ) : formData.featured_image_url ? (
                  <div className="mb-3">
                    <img src={formData.featured_image_url} alt="Featured" className="h-20 w-20 object-cover rounded-lg border bg-white shadow-sm" />
                  </div>
                ) : null}
                <Input 
                  type="file" 
                  accept="image/*"
                  className="bg-white"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) setFeaturedFile(e.target.files[0]);
                  }}
                />
              </div>

              {/* Row 6: Gallery Images */}
              <div className="p-4 border rounded-xl bg-zinc-50/50">
                <label className="text-sm font-semibold mb-1.5 block">Gallery Images</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {existingGalleryImages.map((url, idx) => (
                    <div key={url} className="relative group">
                      <img src={url} alt={`Gallery ${idx}`} className="h-16 w-16 object-cover rounded-lg border bg-white shadow-sm" />
                      <button 
                        type="button" 
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {galleryFiles.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img src={URL.createObjectURL(file)} alt={`Gallery Preview ${idx}`} className="h-16 w-16 object-cover rounded-lg border bg-zinc-200 shadow-sm" />
                      <button 
                        type="button" 
                        onClick={() => removeGalleryFile(idx)}
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
                  className="bg-white"
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      setGalleryFiles([...galleryFiles, ...newFiles]);
                    }
                  }}
                />
              </div>

              {/* Row 7: Specifications */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Specifications</label>
                <div className="flex gap-2 mb-3">
                  <Input placeholder="Key (e.g. Color)" value={newSpecKey} onChange={e => setNewSpecKey(e.target.value)} />
                  <Input placeholder="Value (e.g. Black)" value={newSpecValue} onChange={e => setNewSpecValue(e.target.value)} />
                  <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-zinc-50 p-2 rounded-md border">
                      <span className="text-sm truncate"><span className="font-semibold text-zinc-700">{key}:</span> {value}</span>
                      <button type="button" className="text-red-500 hover:text-red-700 p-1" onClick={() => removeSpec(key)}><X className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 8: Features */}
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Features</label>
                <div className="flex gap-2 mb-3">
                  <Input placeholder="e.g. Multi-point connection for seamless device switching" value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} />
                  <Button type="button" onClick={addFeature} variant="secondary">Add</Button>
                </div>
                <div className="space-y-2">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-50 p-2 rounded-md border">
                      <span className="text-sm truncate pr-4">{feature}</span>
                      <button type="button" className="text-red-500 hover:text-red-700 p-1 flex-shrink-0" onClick={() => removeFeature(idx)}><X className="w-4 h-4"/></button>
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
      
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>
                  {prod.featured_image_url ? (
                    <img src={prod.featured_image_url} alt={prod.name} className="h-10 w-10 object-cover rounded border" />
                  ) : (
                    <div className="h-10 w-10 bg-zinc-100 rounded border flex items-center justify-center text-xs text-zinc-400">N/A</div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-zinc-900">{prod.name}</TableCell>
                <TableCell className="text-zinc-600">{prod.category?.name || 'N/A'}</TableCell>
                <TableCell className="text-zinc-600">{prod.brand?.name || 'N/A'}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${prod.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'}`}>
                    {prod.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(prod.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(prod.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-zinc-500">No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
