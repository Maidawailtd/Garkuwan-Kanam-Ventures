import { Link, useLocation } from "wouter";
import { useHealthCheck } from "@workspace/api-client-react";
import logoImg from "@assets/garkuwa_1781236104796.jpg";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Inventory" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-12 md:h-14 w-auto object-contain" />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-all duration-300 hover:text-primary relative py-2 ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-2" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/products" className="hidden md:flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all duration-300 shadow-lg shadow-primary/10">
            View Catalog
          </Link>
          
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 animate-in slide-in-from-top-4 duration-300 z-40">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-primary-foreground p-4 text-center font-bold uppercase tracking-widest text-sm"
            >
              View Catalog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { data: health } = useHealthCheck();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="space-y-8">
            <Link href="/" className="inline-flex">
              <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-16 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nigeria's premier force in heavy machinery and industrial equipment. We bridge the gap between global engineering excellence and local industrial needs.
            </p>
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-none inline-flex">
              <div className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">System Online</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-display text-sm font-bold uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Inventory Catalog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Company Profile</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display text-sm font-bold uppercase tracking-[0.2em] mb-8">Equipment</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/products?category=trucks" className="hover:text-primary transition-colors">Heavy Trucks</Link></li>
              <li><Link href="/products?category=mining-trucks" className="hover:text-primary transition-colors">Mining Solutions</Link></li>
              <li><Link href="/products?category=drilling-motors" className="hover:text-primary transition-colors">Drilling Systems</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Featured Stock</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display text-sm font-bold uppercase tracking-[0.2em] mb-8">Headquarters</h4>
            <ul className="space-y-6 text-sm text-muted-foreground">
              <li className="flex gap-4">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Lagos, Federal Republic of Nigeria</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+234 800 GARKUWAN</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-primary shrink-0" size={18} />
                <span>sales@garkuwan.com.ng</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
          <p>&copy; {new Date().getFullYear()} Garkuwan Kanam & Co Ventures. All Rights Reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
