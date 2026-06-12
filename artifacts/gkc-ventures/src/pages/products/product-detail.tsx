import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { FormatPrice } from "@/components/shared/format-price";
import { getCategoryIcon } from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id, 10) : 0;
  const [, setLocation] = useLocation();
  const [imgError, setImgError] = useState(false);

  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: {
      enabled: !!productId,
      queryKey: getGetProductQueryKey(productId)
    }
  });

  const handleBuyNow = () => {
    setLocation(`/checkout?productId=${productId}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-none" />
              <Skeleton className="h-8 w-1/4 rounded-none" />
              <Skeleton className="h-24 w-full rounded-none" />
              <Skeleton className="h-16 w-full rounded-none mt-8" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-24 text-center">
          <h1 className="text-4xl font-display uppercase mb-4">Equipment Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested machinery could not be located in our inventory.</p>
          <button 
            onClick={() => setLocation('/products')}
            className="inline-flex items-center text-primary font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="mr-2" size={16} /> Return to Inventory
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-4 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <button onClick={() => setLocation('/products')} className="hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="mr-2" size={14} /> Inventory
          </button>
          <span className="mx-4">/</span>
          <span className="text-foreground">{product.category.replace("-", " ")}</span>
          <span className="mx-4">/</span>
          <span className="text-primary truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Image Gallery Column */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] bg-secondary flex items-center justify-center border border-border relative">
              {product.imageUrl && !imgError ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-muted-foreground transform scale-150">
                  {getCategoryIcon(product.category)}
                </div>
              )}
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge variant="secondary" className="uppercase font-bold tracking-wider rounded-none bg-background text-foreground text-sm px-4 py-1">
                  {product.condition} Condition
                </Badge>
                {product.featured && (
                  <Badge className="uppercase font-bold tracking-wider rounded-none bg-primary text-primary-foreground text-sm px-4 py-1 self-start">
                    Featured Model
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.brand || "Unspecified Brand"} {product.model ? `// ${product.model}` : ""}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display leading-[1.1] tracking-tighter uppercase mb-6">
              {product.name}
            </h1>

            <div className="mb-8 pb-8 border-b border-border">
              <FormatPrice ngn={product.priceNgn} usd={product.priceUsd} className="text-3xl md:text-4xl" />
            </div>

            <div className="prose prose-sm dark:prose-invert mb-8 text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10 text-sm border border-border bg-card p-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Category</span>
                <span className="font-medium">{product.category.replace("-", " ")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Year of Mfr</span>
                <span className="font-medium">{product.year || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2 pt-4 mt-2 border-t border-border">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Status</span>
                <span className={`font-medium flex items-center ${product.inStock ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                  {product.inStock ? (
                    <><Check size={16} className="mr-2" /> In Stock & Ready to Deploy</>
                  ) : (
                    <><AlertTriangle size={16} className="mr-2" /> Currently Unavailable</>
                  )}
                </span>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className={`w-full py-5 text-lg font-bold uppercase tracking-widest transition-colors ${
                  product.inStock 
                    ? "bg-primary text-primary-foreground hover:bg-foreground hover:text-background" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Initiate Purchase" : "Out of Stock"}
              </button>
              <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mt-4">
                Secure transaction processed via Flutterwave
              </p>
            </div>
          </div>

        </div>

        {/* Specs Section */}
        {product.specs && (
          <div className="mt-20 border-t border-border pt-16">
            <h2 className="text-3xl font-display uppercase tracking-tighter mb-8">Technical Specifications</h2>
            <div className="prose prose-lg dark:prose-invert max-w-4xl text-muted-foreground bg-card border border-border p-8 md:p-12">
              <div dangerouslySetInnerHTML={{ __html: product.specs.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
