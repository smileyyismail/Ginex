'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "./products-table"
import { CategoriesTable } from "./categories-table"
import { BrandsTable } from "./brands-table"
import { Product, Category, Brand } from "@/lib/types"

export function AdminDashboardClient({ products, categories, brands }: { products: Product[], categories: Category[], brands: Brand[] }) {
  return (
    <Tabs defaultValue="products" className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1 font-light">Manage your catalog, categories, and brands.</p>
        </div>
        <TabsList className="grid w-full max-w-md grid-cols-3 p-1 bg-surface-elevated border border-border-subtle rounded-lg">
          <TabsTrigger value="products" className="rounded-md">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="categories" className="rounded-md">Categories ({categories.length})</TabsTrigger>
          <TabsTrigger value="brands" className="rounded-md">Brands ({brands.length})</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="products" className="mt-0">
        <ProductsTable initialData={products} categories={categories} brands={brands} />
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <CategoriesTable initialData={categories} />
      </TabsContent>
      
      <TabsContent value="brands" className="mt-0">
        <BrandsTable initialData={brands} />
      </TabsContent>
    </Tabs>
  )
}
