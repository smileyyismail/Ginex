'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createBrand, updateBrand, deleteBrand } from '@/actions/brands';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';
import Image from 'next/image';
import { Brand } from '@/lib/types';

export function BrandsTable({ initialData }: { initialData: Brand[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', logo_url: '' });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    try {
      let uploadedLogoUrl = formData.logo_url;
      if (file) {
        uploadedLogoUrl = await uploadImage(file, 'brands');
      }

      const form = new FormData();
      form.append('name', formData.name);
      form.append('slug', formData.slug);
      form.append('description', formData.description);
      form.append('logo_url', uploadedLogoUrl);

      if (editingId) {
        const res = await updateBrand(editingId, form);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Brand updated");
      } else {
        const res = await createBrand(form);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Brand created");
      }
      setIsOpen(false);
      setEditingId(null);
      setFile(null);
    } catch (err) {
      toast.error((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this brand?")) {
      try {
        const res = await deleteBrand(id);
        if (res?.error) toast.error(res.error);
        else toast.success("Brand deleted");
      } catch (err) {
        toast.error((err as Error).message || 'An error occurred');
      }
    }
  }

  function handleOpenCreate() {
    setFormData({ name: '', slug: '', description: '', logo_url: '' });
    setEditingId(null);
    setFile(null);
    setIsOpen(true);
  }

  function handleEditClick(brand: Brand) {
    setFormData({ name: brand.name, slug: brand.slug, description: brand.description || '', logo_url: brand.logo_url || '' });
    setEditingId(brand.id);
    setFile(null);
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Brands</h2>
          <p className="text-text-secondary text-sm mt-1">Manage the brands associated with your products.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button onClick={handleOpenCreate} />}>
            Add Brand
          </DialogTrigger>
          <DialogContent className="max-w-2xl md:max-w-2xl w-full">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingId ? 'Edit Brand' : 'New Brand'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Brand Name</label>
                  <Input 
                    name="name" 
                    value={formData.name}
                    placeholder="e.g. Apple"
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
                    placeholder="e.g. apple"
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block">Brand Logo</label>
                <div className="flex items-center gap-6 p-4 border rounded-xl bg-surface-elevated">
                  {file ? (
                    <div className="h-16 w-16 flex-shrink-0 bg-surface border rounded-lg flex items-center justify-center overflow-hidden relative">
                      <Image unoptimized src={URL.createObjectURL(file)} alt="Logo Preview" fill className="object-contain" />
                    </div>
                  ) : formData.logo_url ? (
                    <div className="h-16 w-16 flex-shrink-0 bg-surface border rounded-lg flex items-center justify-center overflow-hidden relative">
                      <Image src={formData.logo_url} alt="Logo" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 bg-surface border border-dashed rounded-lg flex items-center justify-center text-xs text-text-secondary">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <Input 
                      type="file" 
                      accept="image/*"
                      className="bg-surface"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                    <p className="text-xs text-text-secondary mt-2">Recommended size: 256x256px or larger, transparent PNG.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block">Description</label>
                <Textarea 
                  name="description" 
                  value={formData.description}
                  placeholder="A short description of this brand..."
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="h-24"
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={loading} className="px-8">
                  {loading ? 'Saving...' : 'Save Brand'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-surface rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-elevated/50">
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  {brand.logo_url ? (
                    <Image src={brand.logo_url} alt={brand.name} width={32} height={32} className="h-8 w-8 object-contain" />
                  ) : (
                    <div className="h-8 w-8 bg-surface-elevated rounded-full flex items-center justify-center text-xs text-text-secondary">N/A</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell className="text-text-secondary">{brand.slug}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(brand)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(brand.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-text-secondary">No brands found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
