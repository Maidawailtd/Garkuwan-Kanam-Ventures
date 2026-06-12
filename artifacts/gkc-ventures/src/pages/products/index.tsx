import { useLocation, useSearch } from "wouter";
import { useListProducts, ListProductsCategory } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useState, useMemo } from "react";

export default function Products() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const categoryParam = searchParams.get("category") as ListProductsCategory | undefined;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");

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

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.brand?.toLowerCase().includes(lowerSearch) ||
        p.model?.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.priceNgn - b.priceNgn;
      if (sortBy === "price-desc") return b.priceNgn - a.priceNgn;
      return a.name.localeCompare(b.name);
    });
    
    return result;
  }, [products, searchTerm, sortBy]);

  const handleCategoryChange = (catId: string) => {
    if (catId) {
      setLocation(`/products?category=${catId}`);
    } else {
      setLocation(`/products`);
    }
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Garkuwan Inventory</span>
          <h1 className="text-4xl md:text-7xl font-display uppercase tracking-tighter mb-6 text-white leading-none">Industrial <br/> Catalog</h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Every unit in our inventory is industry-certified and field-ready. 
            Filter by category or use the search tool to find specific models.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12">
        {/* Advanced Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 items-start lg:items-center justify-between border-b border-border pb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = validCategory ? cat.id === validCategory : cat.id === "";
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                      : "bg-card text-foreground border-border hover:border-primary"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search models..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card border border-border pl-12 pr-10 py-3 text-sm w-full sm:w-64 outline-none focus:border-primary transition-all uppercase font-bold tracking-widest placeholder:normal-case placeholder:font-normal"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-card border border-border pl-12 pr-10 py-3 text-sm w-full sm:w-48 outline-none focus:border-primary transition-all uppercase font-bold tracking-widest appearance-none"
              >
                <option value="name">Sort: Name</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!isLoading && (
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Showing {filteredAndSortedProducts.length} Results
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="space-y-6 p-6 border border-border bg-card/50">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <Skeleton className="h-6 w-3/4 rounded-none" />
                <Skeleton className="h-4 w-1/2 rounded-none" />
                <div className="pt-4 flex justify-between">
                  <Skeleton className="h-8 w-1/3 rounded-none" />
                  <Skeleton className="h-8 w-1/4 rounded-none" />
                </div>
              </div>
            ))
          ) : filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="animate-in fade-in zoom-in-95 duration-500">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-border bg-card/30">
              <SlidersHorizontal className="mx-auto mb-6 text-muted-foreground opacity-20" size={64} />
              <h3 className="text-xl font-display uppercase tracking-widest mb-4">No Equipment Matches</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  handleCategoryChange("");
                }}
                className="bg-foreground text-background px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
