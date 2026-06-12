import { Layout } from "@/components/layout";
import { Wrench, Settings, ShieldCheck, Truck, Clock, Headphones } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  const services = [
    { icon: <Clock size={32} />, title: s.s1, desc: s.s1d },
    { icon: <Settings size={32} />, title: s.s2, desc: s.s2d },
    { icon: <Wrench size={32} />, title: s.s3, desc: s.s3d },
    { icon: <Truck size={32} />, title: s.s4, desc: s.s4d },
    { icon: <ShieldCheck size={32} />, title: s.s5, desc: s.s5d },
    { icon: <Headphones size={32} />, title: s.s6, desc: s.s6d },
  ];

  const brands = ["Caterpillar", "FAW", "Mercedes-Benz", "Iveco", "Komatsu", "Sandvik"];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.05),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block">{s.tagline}</span>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display uppercase tracking-tighter leading-[0.88] text-white">
              {s.title1} <br />
              <span className="text-primary">{s.title2}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { num: "36", label: "States Covered" },
              { num: "24/7", label: "Field Support" },
              { num: "6", label: "Service Lines" },
              { num: "150pt", label: "Inspection Standard" },
            ].map((item) => (
              <div key={item.label} className="px-4 md:px-8 py-4 text-center">
                <div className="text-2xl md:text-3xl font-display text-primary mb-1">{item.num}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-8 md:p-10 bg-card border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="text-primary mb-7 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tighter">Our Service Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Contact Us", desc: "Reach out via WhatsApp, phone, or email to describe your machinery needs." },
              { step: "02", title: "Site Assessment", desc: "Our technical team visits or remotely evaluates the scope and requirements." },
              { step: "03", title: "Service Plan", desc: "We prepare a detailed service plan with timeline and transparent costing." },
              { step: "04", title: "Execution", desc: "Our certified technicians execute the work to OEM specification standards." },
            ].map((p) => (
              <div key={p.step} className="relative p-6 bg-background border border-border">
                <div className="text-5xl font-display text-primary/15 mb-4 leading-none">{p.step}</div>
                <h4 className="font-bold uppercase tracking-wider text-sm mb-3">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Coverage */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-7">Brands We Service</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {brands.map((b) => (
              <span key={b} className="text-muted-foreground/50 font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-6 leading-tight">{s.ctaTitle}</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-10 leading-relaxed">{s.ctaText}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-sm"
            >
              {s.ctaBtn}
            </Link>
            <a
              href="https://wa.me/2348039891568"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-primary-foreground/30 text-primary-foreground px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300 text-sm"
            >
              WhatsApp: 08039891568
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
