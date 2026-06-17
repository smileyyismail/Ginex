import { ScrollReveal } from '@/components/common/ScrollReveal';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const contactCards = [
  {
    icon: <Mail className="h-5 w-5 text-[#D4AF37]" />,
    label: 'Email',
    value: 'ginex.mobi@gmail.com',
    href: 'mailto:ginex.mobi@gmail.com',
    delay: 200,
  },
  {
    icon: <Phone className="h-5 w-5 text-[#D4AF37]" />,
    label: 'Phone',
    value: '+91 9392920252',
    href: 'tel:+919392920252',
    delay: 300,
  },
  {
    icon: <MapPin className="h-5 w-5 text-[#D4AF37]" />,
    label: 'Location',
    value: 'Jagadgiri Gutta, Hyderabad',
    href: 'https://www.google.com/maps/search/?api=1&query=Jagadgiri%20Gutta%20Hyderabad',
    delay: 400,
  },
];

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
      />
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <ScrollReveal className="mb-20 text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Get In Touch
          </p>
          <h2 className="font-heading mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
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
          <p className="mx-auto max-w-md text-lg font-light leading-relaxed text-[#A1A1AA]">
            Questions about compatibility, bulk pricing, or custom orders? Our specialists reply within minutes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mb-16 flex justify-center">
          <a
            href="https://wa.me/919392920252"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-10 py-6 shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(212,175,55,0.6)]"
          >
            <div className="h-8 w-8 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-black" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-heading text-lg font-black leading-tight tracking-tight text-black">Chat on WhatsApp</div>
              <div className="text-sm font-medium text-black/70">+91 9392920252 - Instant response</div>
            </div>
            <ArrowRight className="ml-2 h-5 w-5 text-black/60 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </ScrollReveal>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-3">
          {contactCards.map(({ icon, label, value, href, delay }) => (
            <ScrollReveal key={label} delay={delay} direction="up">
              <a
                href={href}
                target={label === 'Location' ? '_blank' : undefined}
                rel={label === 'Location' ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-[rgba(212,175,55,0.1)] bg-[#111111]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.07)] transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA]">{label}</p>
                  <p className="truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                    {value}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="mt-14 text-center">
          <p className="text-sm font-light text-[#A1A1AA]">
            <span className="font-semibold text-white">Business Hours:</span>{' '}
            Monday - Saturday - 9:00 AM - 8:00 PM
            <span className="mx-3 text-[rgba(212,175,55,0.3)]">|</span>
            <span className="text-[#A1A1AA]">Closed Sundays</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
