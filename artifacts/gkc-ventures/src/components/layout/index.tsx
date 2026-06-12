import { Link, useLocation } from "wouter";
import { useHealthCheck } from "@workspace/api-client-react";
import logoImg from "@assets/garkuwa_1781236104796.jpg";
import { Menu, X, Phone, Mail, MapPin, MessageCircle, Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES } from "@/lib/i18n";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/products", label: t.nav.inventory },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 md:h-20 items-center justify-between mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] font-bold uppercase tracking-[0.15em]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 hover:text-primary relative py-2 whitespace-nowrap ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Language Switcher Desktop */}
          <div className="relative hidden sm:block" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 border border-border text-[10px] font-bold uppercase tracking-widest hover:border-primary transition-colors bg-background"
              aria-label={t.nav.language}
            >
              <Globe size={12} className="text-primary shrink-0" />
              <span className="hidden md:inline">{currentLang?.flag} {currentLang?.nativeName}</span>
              <span className="md:hidden">{currentLang?.flag}</span>
              <ChevronDown size={11} className={`transition-transform shrink-0 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border shadow-2xl z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide hover:bg-muted transition-colors flex items-center gap-2.5 ${
                      lang === l.code ? "text-primary bg-primary/5" : "text-foreground"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/products"
            className="hidden md:flex items-center justify-center bg-primary text-primary-foreground px-5 xl:px-7 py-2.5 font-bold uppercase tracking-widest text-[11px] hover:bg-foreground hover:text-background transition-all duration-300 whitespace-nowrap"
          >
            {t.nav.viewCatalog}
          </Link>

          <button
            className="lg:hidden text-foreground p-2 -mr-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 md:top-20 left-0 w-full bg-background border-b border-border shadow-2xl animate-in slide-in-from-top-2 duration-200 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col p-5 gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 text-sm font-bold uppercase tracking-widest border-l-2 transition-all rounded-r ${
                  location === link.href
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground border-transparent hover:border-primary hover:text-primary hover:bg-muted/30"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="pt-5 mt-3 border-t border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-4 flex items-center gap-2">
                <Globe size={12} className="text-primary" /> {t.nav.language}
              </p>
              <div className="grid grid-cols-2 gap-2 px-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setIsMenuOpen(false); }}
                    className={`py-2.5 px-3 text-[11px] font-bold uppercase tracking-wide border transition-colors flex items-center gap-2 ${
                      lang === l.code
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 bg-primary text-primary-foreground py-4 text-center font-bold uppercase tracking-widest text-sm"
            >
              {t.nav.viewCatalog}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { data: health } = useHealthCheck();
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-14 md:pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex">
              <img src={logoImg} alt="Garkuwan Kanam & Co Ventures" className="h-12 md:h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-3 p-2.5 bg-white/5 border border-white/10 w-fit">
              <div className={`w-2 h-2 rounded-full shrink-0 ${health?.status === "ok" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"}`} />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">System Online</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-5">{t.footer.navTitle}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">{t.footer.navHome}</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">{t.footer.navInventory}</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">{t.footer.navServices}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{t.footer.navAbout}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t.footer.navContact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-5">{t.footer.equipTitle}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products?category=trucks" className="hover:text-primary transition-colors">{t.footer.equipTrucks}</Link></li>
              <li><Link href="/products?category=mining-trucks" className="hover:text-primary transition-colors">{t.footer.equipMining}</Link></li>
              <li><Link href="/products?category=drilling-motors" className="hover:text-primary transition-colors">{t.footer.equipDrilling}</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">{t.footer.equipFeatured}</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-5">{t.footer.hqTitle}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3 items-start">
                <MapPin className="text-primary shrink-0 mt-0.5" size={15} />
                <span>Lagos, Federal Republic of Nigeria</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-primary shrink-0" size={15} />
                <span>08039891568</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-primary shrink-0" size={15} />
                <span>mglink@mail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} Garkuwan Kanam & Co Ventures. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">{t.footer.privacy}</span>
            <span className="hover:text-white transition-colors cursor-pointer">{t.footer.terms}</span>
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
      <main className="flex-1">{children}</main>
      <Footer />
      <a
        href="https://wa.me/2348039891568"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
