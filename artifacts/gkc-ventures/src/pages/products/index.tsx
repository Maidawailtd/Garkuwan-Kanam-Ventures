import { useLocation, useSearch } from "wouter";
import { useListProducts, ListProductsCategory } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, ArrowUpDown, X, AlertTriangle, RefreshCw, CheckSquare, Square } from "lucide-react";
import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";

export default function Products() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const categoryParam = searchParams.get("category") as ListProductsCategory | undefined;
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");
  const [inStockOnly, setInStockOnly] = useState(false);

  const validCategory =
    categoryParam && ["trucks", "mining-trucks", "drilling-motors"].includes(categoryParam)
      ? categoryParam
      : undefined;

  const { data: products, isLoading, isError, refetch } = useListProducts(
    validCategory ? { category: validCategory } : {}
  );

  const categories = [
    { id: "", label: t.products.all },
    { id: "trucks", label: t.products.trucks },
    { id: "mining-trucks", label: t.products.mining },
    { id: "drilling-motors", label: t.products.drilling },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand?.toLowerCase().includes(lower) ||
          p.model?.toLowerCase().includes(lower)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.priceNgn - b.priceNgn;
      if (sortBy === "price-desc") return b.priceNgn - a.priceNgn;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [products, searchTerm, sortBy, inStockOnly]);

  const handleCategoryChange = (catId: string) => {
    setLocation(catId ? `/products?category=${catId}` : `/products`);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-secondary text-secondary-foreground py-14 md:py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">Garkuwan Inventory</span>
          <h1 className="text-3xl md:text-6xl font-display uppercase tracking-tighter mb-5 text-white leading-none">
            {t.products.pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">{t.products.pageSub}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8 md:py-12">
        {/* Filters Bar */}
        <div className="flex flex-col gap-5 mb-10 md:mb-14 pb-8 border-b border-border">
          {/* Row 1: Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = validCategory ? cat.id === validCategory : cat.id === "";
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 md:px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Search, Sort, In-Stock toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="text"
                  placeholder={t.products.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-card border border-border pl-11 pr-9 py-2.5 text-sm w-full sm:w-60 outline-none focus:border-primary transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "price-asc" | "price-desc" | "name")}
                  className="bg-card border border-border pl-10 pr-8 py-2.5 text-sm w-full sm:w-48 outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="name">{t.products.sortName}</option>
                  <option value="price-asc">{t.products.sortAsc}</option>
                  <option value="price-desc">{t.products.sortDesc}</option>
                </select>
              </div>
            </div>

            {/* In Stock Only toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`flex items-center gap-2.5 px-4 py-2.5 border text-[11px] font-bold uppercase tracking-wider transition-all ${
                inStockOnly
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {inStockOnly ? <CheckSquare size={15} /> : <Square size={15} />}
              {t.products.inStock}
            </button>
          </div>
        </div>

        {/* Results count */}
        {!isLoading && !isError && (
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
            {t.products.showing} {filteredAndSortedProducts.length} {t.products.results}
            {searchTerm && ` — "${searchTerm}"`}
          </p>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-20 text-center border border-dashed border-destructive/30 bg-destructive/5 mb-8">
            <AlertTriangle className="mx-auto mb-4 text-destructive/60" size={40} />
            <h3 className="text-lg font-display uppercase tracking-widest mb-2">{t.products.error}</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">{t.products.errorDesc}</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <RefreshCw size={13} /> {t.products.retry}
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
            {isLoading
              ? Array(8).fill(0).map((_, i) => (
                  <div key={i} className="border border-border bg-card overflow-hidden">
                    <Skeleton className="aspect-[4/3] w-full rounded-none" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-1/3 rounded-none" />
                      <Skeleton className="h-6 w-3/4 rounded-none" />
                      <Skeleton className="h-3 w-1/2 rounded-none" />
                      <div className="pt-3 flex justify-between">
                        <Skeleton className="h-7 w-1/3 rounded-none" />
                      </div>
                    </div>
                  </div>
                ))
              : filteredAndSortedProducts.length > 0
              ? filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="animate-in fade-in zoom-in-95 duration-400">
                    <ProductCard product={product} />
                  </div>
                ))
              : (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-border bg-card/30">
                    <SlidersHorizontal className="mx-auto mb-5 text-muted-foreground opacity-20" size={52} />
                    <h3 className="text-xl font-display uppercase tracking-widest mb-3">{t.products.noResults}</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">{t.products.noResultsDesc}</p>
                    <button
                      onClick={() => { setSearchTerm(""); setInStockOnly(false); handleCategoryChange(""); }}
                      className="bg-foreground text-background px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {t.products.reset}
                    </button>
                  </div>
                )}
          </div>
        )}
      </div>
    </Layout>
  );
}
