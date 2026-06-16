'use client';

import { Shield, Zap, Star, Headphones } from 'lucide-react';

export function WhyChooseSection() {
  const reasons = [
    {
      icon: <Shield className="w-7 h-7" style={{ color: '#D4AF37' }} />,
      title: 'Premium Quality',
      description: 'Every product is rigorously tested and sourced from trusted manufacturers using only the finest materials.',
    },
    {
      icon: <Zap className="w-7 h-7" style={{ color: '#D4AF37' }} />,
      title: 'Cutting-Edge Tech',
      description: 'We carry the latest in mobile accessory innovation — fast charging, military-grade protection, and more.',
    },
    {
      icon: <Star className="w-7 h-7" style={{ color: '#D4AF37' }} />,
      title: 'Curated Selection',
      description: 'Every item in our catalog is handpicked, verified for performance, and selected for its lasting durability.',
    },
    {
      icon: <Headphones className="w-7 h-7" style={{ color: '#D4AF37' }} />,
      title: 'Expert Support',
      description: 'Our team of accessories specialists is always here to guide you to the perfect product for your needs.',
    },
  ];

  return (
    <section className="py-28 bg-[#111111] border-y border-[rgba(212,175,55,0.1)] relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section label */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(212,175,55,0.06)',
              borderColor: 'rgba(212,175,55,0.25)',
              color: '#D4AF37',
            }}
          >
            Why Choose Ginex
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading">
            Built on Trust &amp; Excellence
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto font-light">
            We believe great accessories should be as reliable as the devices they protect.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="rounded-2xl p-8 flex flex-col gap-5 transition-all duration-500 group cursor-default"
              style={{
                background: 'rgba(10,10,10,0.8)',
                border: '1px solid rgba(212,175,55,0.1)',
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(212,175,55,0.4)';
                el.style.boxShadow = '0 20px 50px rgba(212,175,55,0.1), inset 0 1px 0 rgba(212,175,55,0.1)';
                el.style.transform = 'translateY(-6px)';
                el.style.background = 'rgba(17,17,17,0.95)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(212,175,55,0.1)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
                el.style.background = 'rgba(10,10,10,0.8)';
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.08)',
                }}
              >
                {reason.icon}
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-heading tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>

              {/* Gold line reveal */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-500 mt-auto"
                style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
