import { ScrollReveal } from '@/components/common/ScrollReveal';
import { BadgeCheck, Gem, HeartHandshake, Microscope } from 'lucide-react';

const promises = [
  {
    icon: <BadgeCheck className="h-8 w-8 text-[#D4AF37]" />,
    number: '100%',
    title: 'Genuine Products',
    description:
      'Every item we carry is sourced directly from authorized distributors and verified for authenticity. No counterfeits, no compromises - ever.',
  },
  {
    icon: <Gem className="h-8 w-8 text-[#D4AF37]" />,
    number: '50+',
    title: 'Premium Brands',
    description:
      "We partner with the world's most respected mobile accessory brands, selecting only those who share our uncompromising commitment to quality.",
  },
  {
    icon: <Microscope className="h-8 w-8 text-[#D4AF37]" />,
    number: '5 Star',
    title: 'Quality Tested',
    description:
      'Every product is physically tested by our in-house specialists before it makes it to our shelves. We stake our reputation on every sale.',
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-[#D4AF37]" />,
    number: '24/7',
    title: 'Expert Support',
    description:
      'Our accessories specialists are always on hand to help you find the right product - via WhatsApp, email, or phone.',
  },
];

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-4">
        <ScrollReveal className="mb-20 text-center" direction="up">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Our Commitment
          </p>
          <h2 className="font-heading mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            The Ginex Promise
          </h2>
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
          <p className="mx-auto max-w-lg text-lg font-light leading-relaxed text-[#A1A1AA]">
            Four pillars that define everything we do.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {promises.map((promise, index) => (
            <ScrollReveal key={promise.title} delay={index * 120} direction="up">
              <div className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.1)] bg-[#111111]/90 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.12),inset_0_1px_0_rgba(212,175,55,0.15)]">
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.08)] shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-transform duration-500 group-hover:scale-110">
                  {promise.icon}
                </div>

                <div className="font-heading mb-1 text-4xl font-black text-[#D4AF37] transition-colors duration-300 group-hover:text-[#F4D03F]">
                  {promise.number}
                </div>

                <h3 className="font-heading mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {promise.title}
                </h3>

                <p className="flex-1 text-sm font-light leading-relaxed text-[#A1A1AA]">
                  {promise.description}
                </p>

                <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.2)] to-transparent transition-all duration-700 group-hover:w-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
