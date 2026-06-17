'use client';

import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-[rgba(212,175,55,0.15)] bg-[#0A0A0A]/95 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link
          href="/"
          className="group relative z-50 flex items-baseline gap-0.5"
          aria-label="Ginex Home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="font-heading text-2xl font-black tracking-tight text-white transition-all duration-300 group-hover:text-[#F4D03F]">
            GINEX
          </span>
          <span
            className="text-3xl font-black leading-none text-[#D4AF37]"
            style={{ textShadow: '0 0 12px rgba(212,175,55,0.6)' }}
          >
            .
          </span>
        </Link>

        <div className="hidden items-center gap-10 text-sm font-semibold tracking-wider md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#A1A1AA] hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
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

        <div className="z-50 hidden items-center gap-4 md:flex">
          <a
            href="https://wa.me/919392920252"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)]"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Contact Us</span>
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className="z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(212,175,55,0.2)] text-[#A1A1AA] transition-all duration-300 hover:border-[rgba(212,175,55,0.5)] hover:text-[#D4AF37] md:hidden"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 top-20 z-40 flex flex-col transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(24px)' }}
      >
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        />

        <div className="flex flex-1 flex-col space-y-1 p-8">
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex min-h-14 items-center justify-between border-b border-[rgba(212,175,55,0.1)] py-5 transition-all duration-300 ${
                  isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="font-heading text-2xl font-black tracking-tight">
                  {link.name}
                </span>
                <ArrowRight
                  className={`h-5 w-5 text-[#D4AF37] transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            );
          })}

          <div className="mt-auto pt-10">
            <a
              href="https://wa.me/919392920252"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-6 py-4 text-base font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              <span>Contact Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
