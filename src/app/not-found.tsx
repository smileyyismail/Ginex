import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans flex flex-col justify-between">
      <Navbar />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        {/* Glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div
          className="relative max-w-lg rounded-3xl p-8 sm:p-12"
          style={{
            background: 'rgba(17,17,17,0.95)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Subtle top gold gradient line */}
          <div
            className="absolute left-0 top-0 h-px w-full rounded-t-3xl"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
          />

          <span className="font-heading text-7xl sm:text-8xl font-black tracking-tight text-white/10 select-none">
            404
          </span>

          <h1 className="font-heading -mt-6 mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mx-auto mb-8 max-w-sm text-sm font-light leading-relaxed text-[#A1A1AA]">
            The product or page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#D4AF37]"
            >
              <Search className="h-4 w-4" />
              <span>Browse Catalog</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-6 py-3 text-xs font-black uppercase tracking-widest text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)]"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
