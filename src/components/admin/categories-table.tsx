'use client';

import { createCategory, updateCategory, deleteCategory } from '@/actions/categories';
import { Category } from '@/lib/types';
import { SimpleAdminTable } from './SimpleAdminTable';

export function CategoriesTable({ initialData }: { initialData: Category[] }) {
  return (
    <SimpleAdminTable
      title="Category"
      description="Manage the product categories in your store."
      data={initialData}
      imageField="image_url"
      imageLabel="Category Image"
      storageFolder="categories"
      onCreate={createCategory}
      onUpdate={updateCategory}
      onDelete={deleteCategory}
    />
  );
}
