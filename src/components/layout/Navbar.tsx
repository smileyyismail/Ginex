'use client';

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-[rgba(212,175,55,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-baseline gap-0.5 z-50 group"
          aria-label="Ginex Home"
        >
          <span className="text-2xl font-black tracking-tighter text-white font-heading transition-all duration-300 group-hover:text-[#F4D03F]">
            GINEX
          </span>
          <span
            className="text-[#D4AF37] text-3xl font-black leading-none"
            style={{ textShadow: '0 0 12px rgba(212,175,55,0.6)' }}
          >
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wider">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative py-2 uppercase text-xs tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-[#D4AF37]'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                      boxShadow: '0 0 8px rgba(212,175,55,0.8)',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <a
            href="https://wa.me/919392920252"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(212,175,55,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)';
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(212,175,55,0.2)] text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.5)] transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-20 z-40 flex flex-col transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(24px)' }}
      >
        {/* Gold line at top */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        />

        <div className="flex flex-col p-8 space-y-1 flex-1">
          {navLinks.map((link, i) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-5 border-b border-[rgba(212,175,55,0.1)] transition-all duration-300 group ${
                  isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-2xl font-black tracking-tight font-heading">
                  {link.name}
                </span>
                <span className={`text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  →
                </span>
              </Link>
            );
          })}

          <div className="pt-10 mt-auto">
            <a
              href="https://wa.me/919392920252"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl text-base font-bold uppercase tracking-widest text-black transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              }}
            >
              <Phone className="w-5 h-5" />
              <span>Contact Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
