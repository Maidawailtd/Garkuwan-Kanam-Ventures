import { Layout } from "@/components/layout";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-24 border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9] text-white">
            Connect with <br/>
            <span className="text-primary">Our Experts.</span>
          </h1>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-display uppercase tracking-tighter mb-8">Headquarters</h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Location</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Garkuwan Kanam Industrial Complex,<br/>
                        Victoria Island, Lagos,<br/>
                        Federal Republic of Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Call Us</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Sales: 08039891568<br/>
                        WhatsApp: 08039891568
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Email</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        General: mglink@mail.com<br/>
                        Sales: mglink@mail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Business Hours</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Monday - Friday: 08:00 - 18:00<br/>
                        Saturday: 09:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-primary text-primary-foreground">
                <MessageSquare className="mb-6" size={32} />
                <h4 className="text-xl font-display uppercase mb-4">Urgent Inquiry?</h4>
                <p className="text-sm opacity-80 mb-6">Our procurement specialists are available for immediate consultation on large-scale fleet acquisitions.</p>
                <a 
                  href="https://wa.me/2348039891568" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary-foreground pb-1 hover:opacity-70 transition-opacity"
                >
                  Chat with Sales
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border p-8 md:p-12">
                <h2 className="text-3xl font-display uppercase tracking-tighter mb-10">Send a Message</h2>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <input type="text" className="w-full bg-background border border-border px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <input type="email" className="w-full bg-background border border-border px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                      <input type="text" className="w-full bg-background border border-border px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="+234..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                      <select className="w-full bg-background border border-border px-4 py-4 focus:border-primary outline-none transition-colors appearance-none">
                        <option>Equipment Inquiry</option>
                        <option>Technical Support</option>
                        <option>Logistics & Delivery</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea className="w-full bg-background border border-border px-4 py-4 focus:border-primary outline-none transition-colors min-h-[150px] resize-none" placeholder="How can we help your operation?"></textarea>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-all duration-300">
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-muted grayscale border-t border-border relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-muted-foreground mx-auto mb-4" size={48} />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Map Data Loading...</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
