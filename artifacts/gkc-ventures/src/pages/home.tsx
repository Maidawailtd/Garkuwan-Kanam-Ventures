import { useGetFeaturedProducts, useGetProductStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/shared/product-card";
import { Layout } from "@/components/layout";
import {
  ArrowRight, ShieldCheck, Gauge, Award, Globe, MessageCircle,
  Truck, Pickaxe, Drill, AlertTriangle, RefreshCw, CheckCircle2, Zap,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/i18n";

const BRANDS = ["Caterpillar", "FAW", "Mercedes-Benz", "Iveco", "Volvo", "Komatsu", "Liebherr", "Sandvik", "Atlas Copco", "Terex"];

function BrandMarquee() {
  return (
    <div className="py-4 bg-secondary border-y border-white/8 overflow-hidden">
      <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span key={i} className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/50 shrink-0">
            {brand}<span className="ml-12 text-primary/30">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

export default function Home() {
  const { data: featuredProducts, isLoading: featuredLoading, isError: featuredError, refetch: refetchFeatured } = useGetFeaturedProducts();
  const { data: stats, isLoading: statsLoading } = useGetProductStats();
  const { t } = useLanguage();

  const categoryCards = [
    { id: "trucks",          label: t.categories.trucks,   desc: t.categories.trucksDesc,   icon: <Truck size={28} className="text-primary" />,   img: "/attached_assets/generated_images/faw_heavy_cargo_transport_7f63.webp" },
    { id: "mining-trucks",   label: t.categories.mining,   desc: t.categories.miningDesc,   icon: <Pickaxe size={28} className="text-primary" />,  img: "/attached_assets/generated_images/caterpillar_777g_off_highway_19c6.webp" },
    { id: "drilling-motors", label: t.categories.drilling, desc: t.categories.drillingDesc, icon: <Drill size={28} className="text-primary" />,    img: "/attached_assets/generated_images/downhole_mud_motor_drilling_4cf9.webp" },
  ];

  return (
    <Layout>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-[90vh] flex flex-col">

        {/* Background grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-amber-500/6 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-400/4 rounded-full blur-[120px]" />
        </div>

        {/* Right-side image panel */}
        <div className="absolute right-0 top-0 bottom-0 w-[48%] z-0 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]/20 z-10" />
          <img
            src="/attached_assets/generated_images/caterpillar_785d_giant_mining_212d.webp"
            alt="Caterpillar 785D Mining Truck"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
          />
          {/* Floating spec card */}
          <div className="absolute bottom-14 right-10 z-20 bg-[#0d0d0d]/90 border border-white/10 backdrop-blur-sm p-5 min-w-[220px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-3">Featured Unit</p>
            <p className="text-white font-bold uppercase text-sm leading-tight mb-1">Caterpillar 785D</p>
            <p className="text-muted-foreground text-xs mb-3">150-Ton Mining Truck · 2024</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</span>
              <span className="text-amber-400 font-bold text-sm">₦5.25B</span>
            </div>
          </div>
          {/* OEM badge */}
          <div className="absolute top-10 right-10 z-20 flex items-center gap-2 bg-amber-500 text-black px-4 py-2">
            <CheckCircle2 size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">OEM Certified</span>
          </div>
        </div>

        {/* Left content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl py-20 md:py-28">
            <div className="max-w-[560px] lg:max-w-[600px]">

              {/* Pre-heading tag */}
              <div className="inline-flex items-center gap-2.5 mb-8">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400/80">{t.hero.badge}</span>
              </div>

              {/* Main headline */}
              <h1 className="font-display uppercase tracking-tighter leading-[0.85] mb-8 text-white" style={{ fontSize: "clamp(3rem,8vw,6.5rem)" }}>
                {t.hero.line1}{" "}
                <span className="text-amber-400">{t.hero.line2}</span>
                <br />
                {t.hero.line3}{" "}
                <span className="text-amber-400">{t.hero.line4}</span>
              </h1>

              {/* Subtext */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 border-l-2 border-amber-400/30 pl-5 max-w-md">
                {t.hero.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center bg-amber-400 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm shadow-2xl shadow-amber-400/20"
                >
                  {t.hero.cta1} <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={16} />
                </Link>
                <a
                  href="https://wa.me/2348039891568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/15 text-white/80 px-8 py-4 font-bold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all text-sm gap-2.5 backdrop-blur-sm"
                >
                  <MessageCircle size={15} /> {t.hero.cta2}
                </a>
              </div>

              {/* Mini stats row */}
              <div className="grid grid-cols-3 gap-0 border border-white/8 divide-x divide-white/8 bg-white/3 backdrop-blur-sm">
                {[
                  { num: "15+", label: "Years Active" },
                  { num: "500+", label: "Units Delivered" },
                  { num: "36", label: "States Covered" },
                ].map((s) => (
                  <div key={s.label} className="px-5 py-4 text-center">
                    <div className="text-2xl font-display text-amber-400 leading-none mb-1">{s.num}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications strip at bottom */}
        <div className="relative z-10 border-t border-white/8 bg-white/2 backdrop-blur-sm">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl py-4 flex flex-wrap items-center gap-6 md:gap-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30 shrink-0">Certifications</span>
            {["OEM Certified", "ISO 9001", "NCAA Compliant", "CAT Dealer Network"].map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Marquee ── */}
      <BrandMarquee />

      {/* ── Stats Bar ── */}
      <section className="py-10 md:py-14 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            {statsLoading
              ? Array(4).fill(0).map((_, i) => (
                  <div key={i} className="px-6 py-6 space-y-2">
                    <Skeleton className="h-10 w-16" /><Skeleton className="h-3 w-28" />
                  </div>
                ))
              : stats
              ? [
                  { value: stats.totalProducts, label: t.stats.units, hi: true },
                  { value: stats.byCategory.trucks || 0, label: t.stats.trucks },
                  { value: stats.byCategory["mining-trucks"] || 0, label: t.stats.mining },
                  { value: stats.byCategory["drilling-motors"] || 0, label: t.stats.drilling },
                ].map((item, i) => (
                  <div key={i} className="px-6 md:px-10 py-6 md:py-8 flex flex-col justify-center group hover:bg-card transition-colors">
                    <span className={`text-4xl md:text-5xl font-display leading-none mb-2 transition-colors ${item.hi ? "text-primary" : "text-foreground group-hover:text-primary"}`}>{item.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">{t.categories.heading}</span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter leading-none">{t.categories.sub}</h2>
            </div>
            <Link href="/products" className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-all pb-1.5 border-b-2 border-primary shrink-0">
              {t.featured.viewAll} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {categoryCards.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="group relative overflow-hidden aspect-[4/3] block">
                <div className="absolute inset-0 bg-secondary/85 group-hover:bg-secondary/65 transition-colors duration-500 z-10" />
                <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                {/* Amber accent line */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500 z-20" />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">
                  <div className="mb-4 w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-display uppercase tracking-tight text-white mb-2">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed max-w-xs">{cat.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t.categories.browse} <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Stock ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">{t.featured.label}</span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-4">{t.featured.heading}</h2>
              <p className="text-muted-foreground text-base">{t.featured.sub}</p>
            </div>
            <Link href="/products" className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-all pb-1.5 border-b-2 border-primary shrink-0">
              {t.featured.viewAll} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
          {featuredError ? (
            <div className="py-16 text-center border border-dashed border-border bg-card/40">
              <AlertTriangle className="mx-auto mb-4 text-destructive/60" size={40} />
              <p className="font-bold uppercase tracking-wider text-sm mb-2">{t.featured.error}</p>
              <button onClick={() => refetchFeatured()} className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                <RefreshCw size={12} /> Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLoading
                ? Array(3).fill(0).map((_, i) => (
                    <div key={i} className="space-y-4 border border-border bg-card overflow-hidden">
                      <Skeleton className="aspect-[4/3] w-full rounded-none" />
                      <div className="p-5 space-y-3"><Skeleton className="h-5 w-1/3" /><Skeleton className="h-7 w-3/4" /><Skeleton className="h-4 w-1/2" /></div>
                    </div>
                  ))
                : featuredProducts && featuredProducts.length > 0
                ? featuredProducts.map((product) => (
                    <div key={product.id} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                      <ProductCard product={product} />
                    </div>
                  ))
                : (
                    <div className="col-span-full py-16 text-center border border-dashed border-border bg-card/40">
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">{t.featured.empty}</p>
                      <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                        {t.featured.viewAll} <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Garkuwan ── */}
      <section className="py-16 md:py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter leading-[0.9] mb-6">
                {t.why.heading1} <br />
                <span className="text-primary">{t.why.heading2}</span> <br />
                in West Africa.
              </h2>
              <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-lg">{t.why.sub}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: <ShieldCheck size={18} />, title: t.why.v1, desc: t.why.v1d },
                  { icon: <Gauge size={18} />, title: t.why.v2, desc: t.why.v2d },
                  { icon: <Award size={18} />, title: t.why.v3, desc: t.why.v3d },
                  { icon: <Globe size={18} />, title: t.why.v4, desc: t.why.v4d },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-background border border-border hover:border-primary transition-colors group">
                    <div className="w-9 h-9 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-xs mb-1.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-5 bg-primary/6 -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-[4/5] overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80"
                  alt="Industrial Power"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  loading="lazy"
                />
                {/* Experience overlay card */}
                <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-secondary/95 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-5xl font-display text-primary leading-none mb-1">15+</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-white/60">Years of Industrial Excellence</div>
                    </div>
                    <Zap className="text-primary/40" size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="relative py-20 md:py-28 bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/4 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-amber-400/20 bg-amber-400/5">
            <Zap size={12} className="text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-400/80">Ready to Acquire</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display uppercase tracking-tighter mb-6 leading-tight">
            {t.cta.heading}
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">{t.cta.sub}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/2348039891568"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-2xl shadow-amber-400/20 flex items-center justify-center gap-2.5 text-sm"
            >
              <MessageCircle size={16} /> {t.cta.btn1}
            </a>
            <Link
              href="/contact"
              className="border border-white/15 text-white/80 px-10 py-4 font-bold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all text-sm"
            >
              {t.cta.btn2}
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
