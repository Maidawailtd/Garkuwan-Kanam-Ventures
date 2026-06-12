import { Layout } from "@/components/layout";
import { Wrench, Settings, ShieldCheck, Truck, Clock, Headphones } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      title: "Preventive Maintenance",
      description: "Scheduled servicing to ensure your heavy machinery operates at peak performance and avoids costly downtime.",
      icon: <Clock className="text-primary" size={32} />,
    },
    {
      title: "Genuine Spare Parts",
      description: "Access to a comprehensive inventory of authentic parts for Caterpillar, FAW, and Mercedes-Benz equipment.",
      icon: <Settings className="text-primary" size={32} />,
    },
    {
      title: "On-Site Repairs",
      description: "Our mobile technical team is ready to deploy to your site for immediate mechanical and electrical repairs.",
      icon: <Wrench className="text-primary" size={32} />,
    },
    {
      title: "Fleet Management",
      description: "Comprehensive tracking and optimization services for large-scale industrial fleets across Nigeria.",
      icon: <Truck className="text-primary" size={32} />,
    },
    {
      title: "Technical Certification",
      description: "Official inspection and certification services to ensure your equipment meets all Nigerian industrial standards.",
      icon: <ShieldCheck className="text-primary" size={32} />,
    },
    {
      title: "24/7 Field Support",
      description: "Round-the-clock technical assistance for critical operations in mining and drilling sectors.",
      icon: <Headphones className="text-primary" size={32} />,
    },
  ];

  return (
    <Layout>
      <section className="bg-secondary text-secondary-foreground py-24 border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Industrial Support</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9] text-white">
            Maintenance <br/>
            <span className="text-primary">& Support.</span>
          </h1>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div key={index} className="p-10 bg-card border border-border hover:border-primary transition-all duration-300 group">
                <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-8">Need Immediate Support?</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12">
            Our technical response team is standing by to assist with your machinery needs. We provide support across all 36 states in Nigeria.
          </p>
          <Link href="/contact" className="inline-flex bg-secondary text-secondary-foreground px-12 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Contact Technical Team
          </Link>
        </div>
      </section>
    </Layout>
  );
}
