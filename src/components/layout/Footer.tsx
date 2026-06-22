import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function FooterLinkColumn({ title, links }: { title: string, links: {label: string, href: string}[] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-heading flex items-center gap-2">
        <span className="w-4 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        {title}
      </h4>
      <ul className="space-y-3 text-sm font-light">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="hover:text-[#D4AF37] transition-colors duration-300 inline-flex items-center gap-1.5 group">
              <span className="w-0 h-px bg-[#D4AF37] group-hover:w-3 transition-all duration-300" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] text-[#A1A1AA] border-t border-[rgba(212,175,55,0.12)] overflow-hidden">

      {/* Subtle top gold line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #F4D03F 50%, #D4AF37 70%, transparent 100%)' }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-baseline gap-0.5 group">
              <span className="text-2xl font-black tracking-tighter text-white font-heading group-hover:text-[#F4D03F] transition-colors duration-300">
                GINEX
              </span>
              <span
                className="text-[#D4AF37] text-3xl font-black leading-none"
                style={{ textShadow: '0 0 12px rgba(212,175,55,0.6)' }}
              >
                .
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light max-w-xs">
              Premium mobile accessories designed to elevate your everyday digital experience. Quality you can trust.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  ),
                  label: 'Facebook', href: '#',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  ),
                  label: 'Twitter', href: '#',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  ),
                  label: 'Instagram', href: '#',
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-[rgba(212,175,55,0.15)] text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkColumn 
            title="Quick Links"
            links={[
              { label: 'Home', href: '/' },
              { label: 'All Products', href: '/products' },
              { label: 'About Us', href: '/about' },
            ]}
          />

          {/* Customer Service */}
          <FooterLinkColumn 
            title="Customer Service"
            links={[
              { label: 'Contact Us', href: '/about' },
              { label: 'FAQs', href: '#' },
              { label: 'Shipping & Returns', href: '#' },
              { label: 'Privacy Policy', href: '#' },
            ]}
          />

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-heading flex items-center gap-2">
              <span
                className="w-4 h-px"
                style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
              />
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)] group-hover:border-[rgba(212,175,55,0.5)] transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300 leading-relaxed">
                  37-157, Near Bus Stop,<br />Jagadgiri Gutta, Hyderabad.
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)] group-hover:border-[rgba(212,175,55,0.5)] transition-all duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919392920252" className="hover:text-[#D4AF37] transition-colors duration-300">+91 9392920252</a>
                  <a href="tel:+919751703635" className="hover:text-[#D4AF37] transition-colors duration-300">+91 9751703635</a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)] group-hover:border-[rgba(212,175,55,0.5)] transition-all duration-300">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <a
                  href="mailto:ginex.mobi@gmail.com"
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                >
                  ginex.mobi@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(212,175,55,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#A1A1AA]">
            &copy; {currentYear} <span className="text-white font-semibold">Ginex</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {['VISA', 'MASTERCARD', 'AMEX', 'UPI'].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md border border-[rgba(212,175,55,0.15)] text-[#A1A1AA] text-[9px] font-bold tracking-widest"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
