'use client';

import Link from "next/link";
import { Search, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-black tracking-tighter text-text-primary z-50 flex items-center">
          GINEX<span className="text-brand">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 text-sm font-semibold tracking-wide">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`relative py-2 transition-colors duration-300 ${isActive ? 'text-brand' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand shadow-[0_0_8px_var(--brand)] rounded-full"></span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Icons / Actions */}
        <div className="flex items-center space-x-6 z-50">
          <button aria-label="Search products" className="text-text-secondary hover:text-brand transition-colors hidden md:block">
            <Search className="w-5 h-5" />
          </button>
          
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-brand hover:bg-brand-hover text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_var(--brand-glow)]">
            <Phone className="w-4 h-4" />
            <span>Contact Us</span>
          </a>

          <button 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} 
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-md z-40 flex flex-col p-8 space-y-8 border-t border-border-subtle overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link 
                key={link.name}
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`text-3xl font-black tracking-tight border-b border-border-subtle pb-6 transition-colors ${isActive ? 'text-brand' : 'text-text-primary'}`}
              >
                {link.name}
              </Link>
            )
          })}
          
          <div className="pt-8 flex flex-col mt-auto">
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-brand text-black px-6 py-5 rounded-full text-lg font-bold tracking-wide hover:bg-brand-hover transition-colors w-full shadow-[0_0_20px_var(--brand-glow)]">
              <Phone className="w-6 h-6" />
              <span>Contact Us on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
