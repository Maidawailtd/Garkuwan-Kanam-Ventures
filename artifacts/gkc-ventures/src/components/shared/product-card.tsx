import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { FormatPrice } from "./format-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Truck, Pickaxe, Drill } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function getCategoryIcon(category: string) {
  switch (category) {
    case "trucks": return <Truck className="w-10 h-10 text-muted-foreground opacity-40" />;
    case "mining-trucks": return <Pickaxe className="w-10 h-10 text-muted-foreground opacity-40" />;
    case "drilling-motors": return <Drill className="w-10 h-10 text-muted-foreground opacity-40" />;
    default: return <Truck className="w-10 h-10 text-muted-foreground opacity-40" />;
  }
}

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const { t } = useLanguage();

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full flex flex-col border-border rounded-none bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        {/* Image */}
        <div className="aspect-[4/3] bg-muted relative flex items-center justify-center overflow-hidden">
          {product.imageUrl && !imgError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              {getCategoryIcon(product.category)}
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                {product.category.replace(/-/g, " ")}
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Badge
              variant="secondary"
              className="uppercase font-bold tracking-wider rounded-none bg-background/90 text-foreground backdrop-blur-sm text-[10px] px-2 py-0.5"
            >
              {product.condition === "new" ? t.common.new_
                : product.condition === "used" ? t.common.used
                : product.condition === "refurbished" ? t.common.refurbished
                : product.condition}
            </Badge>
            {product.featured && (
              <Badge className="uppercase font-bold tracking-wider rounded-none bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                {t.common.featured}
              </Badge>
            )}
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/75 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-display text-lg md:text-xl text-foreground rotate-[-12deg] uppercase border-4 border-foreground px-3 py-1">
                {t.common.outOfStock}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 md:p-5 flex-grow">
          <div className="text-[10px] font-bold text-primary mb-1.5 uppercase tracking-widest">
            {product.brand} {product.model}
          </div>
          <h3 className="font-display text-base md:text-lg leading-tight mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-muted-foreground border-t border-border pt-3 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider opacity-60">Year</span>
              <span className="font-semibold text-foreground text-sm">{product.year || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider opacity-60">Type</span>
              <span className="font-semibold text-foreground text-sm capitalize">{product.category.replace(/-/g, " ")}</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-4 md:px-5 pb-4 md:pb-5 pt-0 flex justify-between items-end border-t border-border mt-auto bg-card">
          <div className="pt-3">
            <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-1 text-muted-foreground">Price</span>
            <FormatPrice ngn={product.priceNgn} usd={product.priceUsd} className="text-lg" />
          </div>
          <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 ${
            product.inStock
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-muted text-muted-foreground border border-border"
          }`}>
            {product.inStock ? t.common.inStock : t.common.outOfStock}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
