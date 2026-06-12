import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-10">
              <AlertTriangle className="text-primary" size={48} />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display uppercase tracking-tighter leading-none mb-6">404</h1>
            <h2 className="text-2xl md:text-4xl font-display uppercase tracking-widest mb-8">Route Not Found</h2>
            
            <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto leading-relaxed">
              The industrial path you're seeking doesn't exist or has been relocated. Return to safe ground.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                <Home size={18} /> Return Home
              </Link>
              <Link href="/products" className="w-full sm:w-auto flex items-center justify-center gap-3 border border-border px-10 py-5 font-bold uppercase tracking-widest hover:bg-card transition-all duration-300">
                <ArrowLeft size={18} /> Back to Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
