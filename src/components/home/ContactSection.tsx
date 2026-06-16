'use client';

import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="relative py-36 bg-[#0A0A0A] overflow-hidden">

      {/* Background treatment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
      />
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-heading leading-tight mb-6">
            Ready to experience
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #fff 80%, #D4AF37 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              premium?
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-md mx-auto font-light leading-relaxed">
            Questions about compatibility, bulk pricing, or custom orders? Our specialists reply within minutes.
          </p>
        </ScrollReveal>

        {/* Primary WhatsApp CTA — full attention */}
        <ScrollReveal delay={150} className="flex justify-center mb-16">
          <a
            href="https://wa.me/919392920252"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-4 px-10 py-6 rounded-full transition-all duration-500 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(212,175,55,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(212,175,55,0.4)';
            }}
          >
            {/* WhatsApp SVG icon */}
            <div className="w-8 h-8 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-black font-black text-lg leading-tight tracking-tight font-heading">Chat on WhatsApp</div>
              <div className="text-black/70 text-sm font-medium">+91 9392920252 · Instant response</div>
            </div>
            <ArrowRight className="w-5 h-5 text-black/60 group-hover:translate-x-1 transition-transform duration-300 ml-2" />
          </a>
        </ScrollReveal>

        {/* Secondary contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            {
              icon: <Mail className="w-5 h-5" style={{ color: '#D4AF37' }} />,
              label: 'Email',
              value: 'ginex.mobi@gmail.com',
              href: 'mailto:ginex.mobi@gmail.com',
              delay: 200,
            },
            {
              icon: <Phone className="w-5 h-5" style={{ color: '#D4AF37' }} />,
              label: 'Phone',
              value: '+91 9392920252',
              href: 'tel:+919392920252',
              delay: 300,
            },
            {
              icon: <MapPin className="w-5 h-5" style={{ color: '#D4AF37' }} />,
              label: 'Location',
              value: 'Jagadgiri Gutta, Hyderabad',
              href: '#',
              delay: 400,
            },
          ].map(({ icon, label, value, href, delay }) => (
            <ScrollReveal key={label} delay={delay} direction="up">
              <a
                href={href}
                className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-400"
                style={{
                  background: 'rgba(17,17,17,0.8)',
                  border: '1px solid rgba(212,175,55,0.1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(212,175,55,0.4)';
                  el.style.boxShadow = '0 10px 30px rgba(212,175,55,0.1)';
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(212,175,55,0.1)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(212,175,55,0.07)',
                    border: '1px solid rgba(212,175,55,0.18)',
                  }}
                >
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] mb-0.5">{label}</p>
                  <p className="text-white text-sm font-semibold truncate group-hover:text-[#D4AF37] transition-colors duration-300">{value}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Hours strip */}
        <ScrollReveal delay={500} className="mt-14 text-center">
          <p className="text-[#A1A1AA] text-sm font-light">
            <span className="text-white font-semibold">Business Hours:</span>{' '}
            Monday – Saturday · 9:00 AM – 8:00 PM
            <span className="mx-3 text-[rgba(212,175,55,0.3)]">|</span>
            <span className="text-[#A1A1AA]">Closed Sundays</span>
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
