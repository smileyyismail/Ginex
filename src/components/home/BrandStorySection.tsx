import { ScrollReveal } from '@/components/common/ScrollReveal';

export function BrandStorySection() {
  return (
    <section className="relative py-36 md:py-48 bg-[#0A0A0A] overflow-hidden">

      {/* Full-bleed background treatment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

      {/* Left vertical rule */}
      <div
        className="absolute left-0 top-0 w-px h-full pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)' }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        {/* Eyebrow */}
        <ScrollReveal className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            The Ginex Philosophy
          </p>
        </ScrollReveal>

        {/* Divider line */}
        <ScrollReveal delay={100} className="flex justify-center mb-10">
          <div
            className="h-px w-20"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
        </ScrollReveal>

        {/* Main statement */}
        <ScrollReveal delay={200} direction="scale">
          <h2
            className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-[1.02]"
            style={{ letterSpacing: '-0.04em' }}
          >
            Every detail,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              perfected.
            </span>
          </h2>
        </ScrollReveal>

        {/* Philosophy text */}
        <ScrollReveal delay={350} className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
            We don&apos;t just source accessories - we curate experiences. Every product in the Ginex catalog has been hand-selected, rigorously tested, and verified to meet the exacting standards of those who demand only the best for their devices.
          </p>
        </ScrollReveal>

        {/* Three pillars */}
        <ScrollReveal delay={500} className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:divide-x sm:divide-[rgba(212,175,55,0.12)]">
          {[
            { number: '100%', label: 'Genuine Products', sub: 'Authenticated & verified' },
            { number: '50+', label: 'Premium Brands', sub: 'Curated from the best' },
            { number: '10K+', label: 'Happy Customers', sub: 'Across India' },
          ].map(({ number, label, sub }) => (
            <div key={label} className="text-center py-8 sm:py-0 px-8 first:border-t-0 border-t sm:border-t-0 border-[rgba(212,175,55,0.12)]">
              <div
                className="text-5xl md:text-6xl font-black font-heading mb-2"
                style={{ color: '#D4AF37' }}
              >
                {number}
              </div>
              <div className="text-white font-bold tracking-tight text-lg font-heading">{label}</div>
              <div className="text-[#A1A1AA] text-sm font-light mt-1">{sub}</div>
            </div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
}
