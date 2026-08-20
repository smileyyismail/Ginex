'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "./products-table"
import { CategoriesTable } from "./categories-table"
import { Product, Category } from "@/lib/types"

export function AdminDashboardClient({ products, categories }: { products: Product[], categories: Category[] }) {
  return (
    <Tabs defaultValue="products" className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1 font-light">Manage your catalog and categories.</p>
        </div>
        <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-surface-elevated border border-border-subtle rounded-lg">
          <TabsTrigger value="products" className="rounded-md">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="categories" className="rounded-md">Categories ({categories.length})</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="products" className="mt-0">
        <ProductsTable initialData={products} categories={categories} />
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <CategoriesTable initialData={categories} />
      </TabsContent>
    </Tabs>
  )
}
