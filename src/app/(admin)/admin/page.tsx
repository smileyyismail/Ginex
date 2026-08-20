import { getProducts } from '@/actions/products';
import { getCategories } from '@/actions/categories';
import { AdminDashboardClient } from '@/components/admin/dashboard-client';

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <AdminDashboardClient 
      products={products || []} 
      categories={categories || []} 
    />
  );
}
