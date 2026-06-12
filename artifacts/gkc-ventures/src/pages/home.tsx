import { useGetFeaturedProducts, useGetProductStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/shared/product-card";
import { Layout } from "@/components/layout";
import { ArrowRight, ChevronRight, HardHat, ShieldCheck, Factory } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredProducts, isLoading: featuredLoading } = useGetFeaturedProducts();
  const { data: stats, isLoading: statsLoading } = useGetProductStats();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden border-b border-border">
        {/* Background visual noise/texture via CSS or just raw color */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-24 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              Heavy Equipment Division
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] tracking-tighter mb-8 text-white uppercase">
              Industrial <br/>
              <span className="text-primary">Power.</span><br/>
              Absolute <br/>
              <span className="text-primary">Dominance.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 border-l-4 border-primary pl-6">
              Nigeria's trusted force for heavy machinery. We supply Caterpillar mining trucks, FAW cargo transport, and professional borehole drilling equipment. Built for scale. Built to last.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/products" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-5 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-lg">
                Explore Inventory <ArrowRight className="ml-3" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Value Props Bar */}
        <div className="border-t border-border/20 bg-background/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-4">
                <HardHat className="text-primary w-8 h-8" />
                <span>Heavy Duty Certified</span>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-primary w-8 h-8" />
                <span>Verified Documentation</span>
              </div>
              <div className="flex items-center gap-4">
                <Factory className="text-primary w-8 h-8" />
                <span>Industrial Scale Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-16 w-24 rounded-none" />
                  <Skeleton className="h-4 w-32 rounded-none" />
                </div>
              ))
            ) : stats ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl font-display text-primary">{stats.totalProducts}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total Units in Stock</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl font-display text-foreground">{stats.byCategory.trucks || 0}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Heavy Trucks</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl font-display text-foreground">{stats.byCategory["mining-trucks"] || 0}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Mining Equipment</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl font-display text-foreground">{stats.byCategory["drilling-motors"] || 0}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Drilling Motors</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">Equipment Categories</h2>
              <p className="text-muted-foreground max-w-xl">Filter our extensive inventory by industrial category.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products?category=trucks" className="group block relative aspect-[4/3] bg-muted overflow-hidden border border-border">
              <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10 transition-opacity group-hover:opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <h3 className="text-3xl font-display text-white uppercase tracking-tighter mb-2">Trucks</h3>
                <div className="flex items-center text-primary font-bold uppercase tracking-wider text-sm">
                  View Category <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
            <Link href="/products?category=mining-trucks" className="group block relative aspect-[4/3] bg-muted overflow-hidden border border-border">
              <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10 transition-opacity group-hover:opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <h3 className="text-3xl font-display text-white uppercase tracking-tighter mb-2">Mining</h3>
                <div className="flex items-center text-primary font-bold uppercase tracking-wider text-sm">
                  View Category <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
            <Link href="/products?category=drilling-motors" className="group block relative aspect-[4/3] bg-muted overflow-hidden border border-border">
              <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10 transition-opacity group-hover:opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <h3 className="text-3xl font-display text-white uppercase tracking-tighter mb-2">Drilling</h3>
                <div className="flex items-center text-primary font-bold uppercase tracking-wider text-sm">
                  View Category <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">Featured Stock</h2>
              <p className="text-muted-foreground max-w-xl">Premium machinery, inspected and ready for immediate deployment.</p>
            </div>
            <Link href="/products" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors pb-2 border-b-2 border-primary">
              View All Equipment <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <Skeleton className="h-8 w-3/4 rounded-none" />
                  <Skeleton className="h-4 w-1/2 rounded-none" />
                </div>
              ))
            ) : featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {featuredProducts?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground uppercase font-bold tracking-widest">
                No featured products currently available.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
