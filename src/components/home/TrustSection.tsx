'use client';

import { ScrollReveal } from '@/components/common/ScrollReveal';
import { BadgeCheck, Gem, Microscope, HeartHandshake } from 'lucide-react';

const promises = [
  {
    icon: <BadgeCheck className="w-8 h-8" style={{ color: '#D4AF37' }} />,
    number: '100%',
    title: 'Genuine Products',
    description:
      'Every item we carry is sourced directly from authorized distributors and verified for authenticity. No counterfeits, no compromises — ever.',
  },
  {
    icon: <Gem className="w-8 h-8" style={{ color: '#D4AF37' }} />,
    number: '50+',
    title: 'Premium Brands',
    description:
      'We partner with the world\'s most respected mobile accessory brands, selecting only those who share our uncompromising commitment to quality.',
  },
  {
    icon: <Microscope className="w-8 h-8" style={{ color: '#D4AF37' }} />,
    number: '5★',
    title: 'Quality Tested',
    description:
      'Every product is physically tested by our in-house specialists before it makes it to our shelves. We stake our reputation on every sale.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8" style={{ color: '#D4AF37' }} />,
    number: '24/7',
    title: 'Expert Support',
    description:
      'Our accessories specialists are always on hand to help you find the right product — via WhatsApp, email, or phone.',
  },
];

export function TrustSection() {
  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">

      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-4">

        {/* Header */}
        <ScrollReveal className="text-center mb-20" direction="up">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Our Commitment
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-heading leading-tight mb-6">
            The Ginex Promise
          </h2>
          <div
            className="mx-auto h-px w-16 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
          <p className="text-[#A1A1AA] text-lg max-w-lg mx-auto font-light leading-relaxed">
            Four pillars that define everything we do.
          </p>
        </ScrollReveal>

        {/* Cards — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 120} direction="up">
              <div
                className="group relative rounded-[2rem] p-8 flex flex-col h-full transition-all duration-500 cursor-default overflow-hidden"
                style={{
                  background: 'rgba(17,17,17,0.9)',
                  border: '1px solid rgba(212,175,55,0.1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(212,175,55,0.45)';
                  el.style.boxShadow = '0 30px 60px rgba(212,175,55,0.12), inset 0 1px 0 rgba(212,175,55,0.15)';
                  el.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(212,175,55,0.1)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Gold inner glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]"
                  style={{ background: 'radial-gradient(ellipse at top, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
                />

                {/* Icon box */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    boxShadow: '0 0 20px rgba(212,175,55,0.08)',
                  }}
                >
                  {p.icon}
                </div>

                {/* Big number */}
                <div
                  className="text-4xl font-black font-heading mb-1 transition-colors duration-300 group-hover:text-[#F4D03F]"
                  style={{ color: '#D4AF37' }}
                >
                  {p.number}
                </div>

                <h3 className="text-xl font-bold text-white font-heading tracking-tight mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {p.title}
                </h3>

                <p className="text-[#A1A1AA] text-sm leading-relaxed font-light flex-1">
                  {p.description}
                </p>

                {/* Bottom gold line reveal */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-700 mt-6"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.2), transparent)' }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
