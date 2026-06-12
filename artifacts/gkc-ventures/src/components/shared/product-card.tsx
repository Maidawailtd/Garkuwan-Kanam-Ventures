import { Link } from "wouter";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { FormatPrice } from "./format-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Truck, Pickaxe, Drill } from "lucide-react";

export function getCategoryIcon(category: string) {
  switch (category) {
    case "trucks": return <Truck className="w-12 h-12 text-muted-foreground opacity-50" />;
    case "mining-trucks": return <Pickaxe className="w-12 h-12 text-muted-foreground opacity-50" />;
    case "drilling-motors": return <Drill className="w-12 h-12 text-muted-foreground opacity-50" />;
    default: return <Truck className="w-12 h-12 text-muted-foreground opacity-50" />;
  }
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full flex flex-col border-border rounded-none bg-card hover:border-primary transition-colors duration-300">
        <div className="aspect-[4/3] bg-muted relative flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            getCategoryIcon(product.category)
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="uppercase font-bold tracking-wider rounded-none bg-background/90 text-foreground backdrop-blur-sm">
              {product.condition}
            </Badge>
            {product.featured && (
              <Badge className="uppercase font-bold tracking-wider rounded-none bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-display text-2xl text-foreground rotate-[-15deg] uppercase border-4 border-foreground p-2">Out of Stock</span>
            </div>
          )}
        </div>
        <CardContent className="p-6 flex-grow">
          <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">{product.brand} {product.model}</div>
          <h3 className="font-display text-xl leading-tight mb-4 text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground border-t border-border pt-4">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider opacity-70">Year</span>
              <span className="font-medium text-foreground">{product.year || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider opacity-70">Category</span>
              <span className="font-medium text-foreground">{product.category.replace("-", " ")}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-end border-t border-border mt-auto bg-card">
          <div className="pt-4">
            <span className="text-xs uppercase tracking-wider opacity-70 block mb-1 text-muted-foreground">Price</span>
            <FormatPrice ngn={product.priceNgn} usd={product.priceUsd} className="text-xl" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
