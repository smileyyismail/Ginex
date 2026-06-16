import { getProducts } from '@/actions/products';
import { getCategories } from '@/actions/categories';
import { getBrands } from '@/actions/brands';
import { AdminDashboardClient } from '@/components/admin/dashboard-client';

export default async function AdminDashboard() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <AdminDashboardClient 
      products={products || []} 
      categories={categories || []} 
      brands={brands || []} 
    />
  );
}
