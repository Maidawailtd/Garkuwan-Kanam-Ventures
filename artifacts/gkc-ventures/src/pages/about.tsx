import { Layout } from "@/components/layout";
import { Shield, Award, Users, TrendingUp, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-24 md:py-32 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[grid-line_rgba(255,255,255,0.1)_1px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Legacy</span>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9] text-white mb-8">
              Industrial <br/>
              <span className="text-primary">Excellence</span> <br/>
              Since Inception.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-8">
              Garkuwan Kanam & Co Ventures stands as a pillar of reliability in Nigeria's heavy equipment sector, bridging the gap between global engineering and local industrial demand.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display uppercase tracking-tighter mb-6">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower Nigeria's industrial landscape by providing access to high-performance, verified heavy machinery that drives economic growth and infrastructural development. We believe in the power of quality engineering to transform landscapes.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-display uppercase tracking-tighter mb-6">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the undisputed first choice for heavy equipment acquisition in West Africa, recognized for our uncompromising standards of quality, professional integrity, and technical expertise.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-6 bg-card border border-border">
                  <div className="text-3xl font-display text-primary mb-2">15+</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Years Experience</p>
                </div>
                <div className="p-6 bg-card border border-border">
                  <div className="text-3xl font-display text-primary mb-2">500+</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Units Delivered</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1000&q=80" 
                alt="Mining Operations" 
                className="relative w-full h-full object-cover border border-border grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center mb-20">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">How We Work</span>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter">Our Core Values</h2>
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 bg-background border border-border hover:border-primary transition-colors group">
              <Shield className="text-primary mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-xl font-display uppercase tracking-tight mb-4">Integrity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Transparency in every transaction. We provide full history and verification for every piece of equipment we sell.</p>
            </div>
            <div className="p-10 bg-background border border-border hover:border-primary transition-colors group">
              <Award className="text-primary mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-xl font-display uppercase tracking-tight mb-4">Quality</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">We only stock industry-leading brands known for their durability and performance in harsh industrial environments.</p>
            </div>
            <div className="p-10 bg-background border border-border hover:border-primary transition-colors group">
              <Users className="text-primary mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-xl font-display uppercase tracking-tight mb-4">Partnership</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Our relationship doesn't end at delivery. We provide ongoing support to ensure your machinery stays operational.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Philosophy */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="text-primary mx-auto mb-8" size={48} />
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-8 leading-tight">
              Driving the Future of <br/> Nigerian Industry.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              From the oil fields of the Delta to the mining sites of the North, our equipment is the backbone of Nigerian industry. We take pride in being the silent force behind the country's most significant infrastructure projects.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="text-primary" size={20} />
                <span>OEM Certified</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="text-primary" size={20} />
                <span>NCAA Compliant</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="text-primary" size={20} />
                <span>ISO 9001 Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
