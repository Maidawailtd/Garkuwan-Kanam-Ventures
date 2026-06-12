import { useGetFeaturedProducts, useGetProductStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/shared/product-card";
import { Layout } from "@/components/layout";
import { ArrowRight, ShieldCheck, Gauge, Award, Globe, MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredProducts, isLoading: featuredLoading } = useGetFeaturedProducts();
  const { data: stats, isLoading: statsLoading } = useGetProductStats();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1600&q=80" 
            alt="Industrial Background" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-20 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Garkuwan Kanam & Co Ventures
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] tracking-tighter mb-10 text-white uppercase italic">
              Built for <br/>
              <span className="text-primary not-italic">Scale.</span><br/>
              Driven by <br/>
              <span className="text-primary not-italic">Power.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12 border-l-2 border-primary/30 pl-8">
              Nigeria's premier gateway to world-class heavy machinery. From deep-well drilling to large-scale mining operations, we deliver the force that builds nations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/products" className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 text-sm shadow-2xl shadow-primary/20">
                Explore Inventory <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={18} />
              </Link>
              <a href="https://wa.me/2348039891568" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-white/20 text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-500 text-sm gap-3">
                <MessageCircle size={18} /> Chat with Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Stats Bar */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x-0 lg:divide-x divide-border">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="px-6 space-y-2">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))
            ) : stats ? (
              <>
                <div className="lg:px-10 flex flex-col justify-center">
                  <span className="text-4xl md:text-5xl font-display text-primary leading-none mb-2">{stats.totalProducts}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Units in Stock</span>
                </div>
                <div className="lg:px-10 flex flex-col justify-center">
                  <span className="text-4xl md:text-5xl font-display text-secondary leading-none mb-2">{stats.byCategory.trucks || 0}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Heavy Trucks</span>
                </div>
                <div className="lg:px-10 flex flex-col justify-center">
                  <span className="text-4xl md:text-5xl font-display text-secondary leading-none mb-2">{stats.byCategory["mining-trucks"] || 0}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Mining Units</span>
                </div>
                <div className="lg:px-10 flex flex-col justify-center">
                  <span className="text-4xl md:text-5xl font-display text-secondary leading-none mb-2">{stats.byCategory["drilling-motors"] || 0}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Drilling Systems</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Why Garkuwan Section */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-tight mb-8">
                The Trusted <br/>
                <span className="text-primary">Industrial Partner</span> <br/>
                in West Africa.
              </h2>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                Garkuwan Kanam & Co Ventures isn't just a supplier. We are an industrial force providing verified, heavy-duty machinery for the most demanding environments on the continent.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Verified Stock</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Every unit undergoes a 150-point industrial inspection before listing.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                    <Gauge className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2">High Efficiency</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Optimized machinery designed for maximum uptime and output.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Certified Brands</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Direct partnerships with Caterpillar, FAW, and Mercedes-Benz.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                    <Globe className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Regional Reach</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Full logistics support across all 36 states in Nigeria and beyond.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-[4/5] overflow-hidden border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80" 
                  alt="Industrial Power" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stock */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Curated Selection</span>
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-6">Featured Stock</h2>
              <p className="text-muted-foreground">Premium machinery, inspected and ready for immediate deployment to your site.</p>
            </div>
            <Link href="/products" className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-all pb-2 border-b-2 border-primary">
              Full Inventory <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
              ))
            ) : featuredProducts?.map((product) => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center text-primary-foreground">
          <h2 className="text-4xl md:text-7xl font-display uppercase tracking-tighter mb-10 leading-none">
            Ready to Power <br/> Your Operation?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-12">
            Consult with our industrial experts today. We provide full technical documentation and logistical support for every acquisition.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/2348039891568" target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground px-12 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
              <MessageCircle size={20} /> WhatsApp Sales
            </a>
            <Link href="/contact" className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground px-12 py-5 font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
