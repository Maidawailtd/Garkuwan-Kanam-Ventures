import { Link, useLocation } from "wouter";
import { useHealthCheck } from "@workspace/api-client-react";
import logoImg from "@assets/garkuwa_1781236104796.jpg";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/products", label: "Equipment" },
    { href: "/products?category=trucks", label: "Trucks" },
    { href: "/products?category=mining-trucks", label: "Mining" },
    { href: "/products?category=drilling-motors", label: "Drilling" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-14 w-auto object-contain" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/products" className="hidden md:flex items-center justify-center bg-foreground text-background px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
            View Inventory
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { data: health } = useHealthCheck();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex mb-6">
              <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-6">
              A dominant, trusted force in Nigeria's heavy equipment market. We move earth and drill wells. Industrial power meets professional credibility.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
              API Status: {health?.status || 'checking...'}
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-6">Inventory</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Equipment</Link></li>
              <li><Link href="/products?category=trucks" className="hover:text-primary transition-colors">Heavy Trucks</Link></li>
              <li><Link href="/products?category=mining-trucks" className="hover:text-primary transition-colors">Mining Trucks</Link></li>
              <li><Link href="/products?category=drilling-motors" className="hover:text-primary transition-colors">Drilling Motors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Lagos, Nigeria</li>
              <li>+234 800 GARKUWAN</li>
              <li>sales@garkuwan.com.ng</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Garkuwan Kanam & Co Ventures.</p>
          <p>Industrial Grade Only</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
