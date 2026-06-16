'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "./products-table"
import { CategoriesTable } from "./categories-table"
import { BrandsTable } from "./brands-table"

export function AdminDashboardClient({ products, categories, brands }: { products: any[], categories: any[], brands: any[] }) {
  return (
    <Tabs defaultValue="products" className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Manage your catalog, categories, and brands.</p>
        </div>
        <TabsList className="grid w-full max-w-md grid-cols-3 p-1 bg-zinc-100 rounded-lg">
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
