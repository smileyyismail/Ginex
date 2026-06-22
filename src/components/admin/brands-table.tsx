'use client';

import { createBrand, updateBrand, deleteBrand } from '@/actions/brands';
import { Brand } from '@/lib/types';
import { SimpleAdminTable } from './SimpleAdminTable';

export function BrandsTable({ initialData }: { initialData: Brand[] }) {
  return (
    <SimpleAdminTable
      title="Brand"
      description="Manage the brands associated with your products."
      data={initialData}
      imageField="logo_url"
      imageLabel="Brand Logo"
      storageFolder="brands"
      onCreate={createBrand}
      onUpdate={updateBrand}
      onDelete={deleteBrand}
    />
  );
}
