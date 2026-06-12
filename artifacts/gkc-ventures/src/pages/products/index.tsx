import { useState } from "wouter/use-browser-location"; // not using this directly, using useLocation and URLSearchParams
import { useLocation } from "wouter";
import { useListProducts, ListProductsCategory } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category") as ListProductsCategory | undefined;

  // Validate category param
  const validCategory = categoryParam && ["trucks", "mining-trucks", "drilling-motors"].includes(categoryParam) 
    ? categoryParam 
    : undefined;

  const { data: products, isLoading } = useListProducts(
    validCategory ? { category: validCategory } : {}
  );

  const categories = [
    { id: "", label: "All Equipment" },
    { id: "trucks", label: "Trucks" },
    { id: "mining-trucks", label: "Mining Trucks" },
    { id: "drilling-motors", label: "Drilling Motors" }
  ];

  const handleCategoryChange = (catId: string) => {
    if (catId) {
      setLocation(`/products?category=${catId}`);
    } else {
      setLocation(`/products`);
    }
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-6 text-white">Equipment Inventory</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">Browse our complete selection of industrial machinery, from heavy transport to deep drilling equipment.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = validCategory ? cat.id === validCategory : cat.id === "";
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-widest border transition-colors ${
                  isActive 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-card text-foreground border-border hover:border-primary"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 border border-border p-4">
                <Skeleton className="h-48 w-full rounded-none" />
                <Skeleton className="h-6 w-3/4 rounded-none" />
                <Skeleton className="h-4 w-1/2 rounded-none" />
                <Skeleton className="h-8 w-1/3 mt-4 rounded-none" />
              </div>
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center border border-border bg-card">
              <p className="text-lg font-bold uppercase tracking-widest text-muted-foreground">No equipment found in this category.</p>
              <button 
                onClick={() => handleCategoryChange("")}
                className="mt-6 text-primary underline underline-offset-4 font-bold uppercase tracking-wider text-sm"
              >
                View all equipment
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
