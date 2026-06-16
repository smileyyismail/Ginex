'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCategory, updateCategory, deleteCategory } from '@/actions/categories';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';

export function CategoriesTable({ initialData }: { initialData: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    try {
      let uploadedImageUrl = formData.image_url;
      if (file) {
        uploadedImageUrl = await uploadImage(file, 'categories');
      }

      const form = new FormData();
      form.append('name', formData.name);
      form.append('slug', formData.slug);
      form.append('description', formData.description);
      form.append('image_url', uploadedImageUrl);

      if (editingId) {
        const res = await updateCategory(editingId, form);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Category updated");
      } else {
        const res = await createCategory(form);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Category created");
      }
      setIsOpen(false);
      setEditingId(null);
      setFile(null);
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await deleteCategory(id);
        if (res?.error) toast.error(res.error);
        else toast.success("Category deleted");
      } catch (err: any) {
        toast.error(err.message || 'An error occurred');
      }
    }
  }

  function handleOpenCreate() {
    setFormData({ name: '', slug: '', description: '', image_url: '' });
    setEditingId(null);
    setFile(null);
    setIsOpen(true);
  }

  function handleEditClick(category: any) {
    setFormData({ name: category.name, slug: category.slug, description: category.description || '', image_url: category.image_url || '' });
    setEditingId(category.id);
    setFile(null);
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Categories</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage the product categories in your store.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button onClick={handleOpenCreate} />}>
            Add Category
          </DialogTrigger>
          <DialogContent className="max-w-2xl md:max-w-2xl w-full">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingId ? 'Edit Category' : 'New Category'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Category Name</label>
                  <Input 
                    name="name" 
                    value={formData.name}
                    placeholder="e.g. Phone Cases"
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
                    placeholder="e.g. phone-cases"
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block">Category Image</label>
                <div className="flex items-center gap-6 p-4 border rounded-xl bg-zinc-50">
                  {file ? (
                    <div className="h-16 w-16 flex-shrink-0 bg-white border rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={URL.createObjectURL(file)} alt="Category Preview" className="max-h-full max-w-full object-cover" />
                    </div>
                  ) : formData.image_url ? (
                    <div className="h-16 w-16 flex-shrink-0 bg-white border rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={formData.image_url} alt="Category Image" className="max-h-full max-w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 bg-white border border-dashed rounded-lg flex items-center justify-center text-xs text-zinc-400">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <Input 
                      type="file" 
                      accept="image/*"
                      className="bg-white"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                    <p className="text-xs text-zinc-500 mt-2">Recommended size: 800x800px or larger.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block">Description</label>
                <Textarea 
                  name="description" 
                  value={formData.description}
                  placeholder="A short description of this category..."
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="h-24"
                />
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={loading} className="px-8">
                  {loading ? 'Saving...' : 'Save Category'}
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
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                  {cat.image_url ? (
                    <img src={cat.image_url} alt={cat.name} className="h-8 w-8 object-cover rounded" />
                  ) : (
                    <div className="h-8 w-8 bg-zinc-100 rounded flex items-center justify-center text-xs text-zinc-400">N/A</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell className="text-zinc-500">{cat.slug}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(cat)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-zinc-500">No categories found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
