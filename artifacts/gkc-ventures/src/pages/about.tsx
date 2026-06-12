import { Layout } from "@/components/layout";
import { Shield, Award, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  const values = [
    { icon: <Shield className="text-primary" size={36} />, title: a.val1, desc: a.val1d },
    { icon: <Award className="text-primary" size={36} />, title: a.val2, desc: a.val2d },
    { icon: <Users className="text-primary" size={36} />, title: a.val3, desc: a.val3d },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,166,35,0.06),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block">{a.tagline}</span>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display uppercase tracking-tighter leading-[0.88] text-white mb-8">
              {a.title1} <br />
              <span className="text-primary">{a.title2}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6 max-w-2xl">
              {a.sub}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-10">
              <div>
                <div className="w-10 h-1 bg-primary mb-6" />
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tighter mb-5">{a.missionTitle}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{a.missionText}</p>
              </div>
              <div>
                <div className="w-10 h-1 bg-primary mb-6" />
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tighter mb-5">{a.visionTitle}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{a.visionText}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-card border border-border hover:border-primary transition-colors">
                  <div className="text-3xl md:text-4xl font-display text-primary mb-2">15+</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{a.yearsExp}</p>
                </div>
                <div className="p-6 bg-card border border-border hover:border-primary transition-colors">
                  <div className="text-3xl md:text-4xl font-display text-primary mb-2">500+</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{a.unitsDelivered}</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-3 bg-primary/6 rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1000&q=80"
                alt="Mining Operations"
                className="relative w-full aspect-[4/3] object-cover border border-border grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-secondary/90 to-transparent">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Caterpillar 777G · Active Site · Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{a.valuesLabel}</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter">{a.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-8 md:p-10 bg-background border border-border hover:border-primary transition-all duration-300 group">
                <div className="mb-7 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                <h4 className="text-lg font-display uppercase tracking-tight mb-4">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us strip */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="text-primary mx-auto mb-8" size={44} />
            <h2 className="text-2xl md:text-4xl font-display uppercase tracking-tighter mb-7 leading-tight">
              {a.driveTitle}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              {a.driveText}
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {["OEM Certified", "ISO 9001 Standards", "NCAA Compliant"].map((tag) => (
                <div key={tag} className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-12 bg-secondary border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-8">Our Equipment Partners</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["Caterpillar", "FAW", "Mercedes-Benz", "Iveco", "Komatsu"].map((b) => (
              <span key={b} className="text-muted-foreground/50 font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
