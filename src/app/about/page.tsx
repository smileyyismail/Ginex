import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoldCTAButton } from "@/components/common/GoldCTAButton";
import { Shield, Target, CheckCircle } from "lucide-react";

export const metadata = {
  title: 'About Us',
  description: 'Learn more about Ginex, our mission, vision, and why you should choose our premium mobile accessories.',
};

const whyChoose = [
  {
    icon: <Shield className="w-5 h-5" style={{ color: '#D4AF37' }} />,
    title: 'Premium Quality',
    body: 'We source only the best materials and products from trusted manufacturers — quality you can feel.',
  },
  {
    icon: <CheckCircle className="w-5 h-5" style={{ color: '#D4AF37' }} />,
    title: 'Curated Selection',
    body: 'Every product in our catalog is tested and verified for performance, durability, and compatibility.',
  },
  {
    icon: <Target className="w-5 h-5" style={{ color: '#D4AF37' }} />,
    title: 'Dedicated Support',
    body: 'We believe in building relationships, not just transactions. Our team is always here to help.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-[rgba(212,175,55,0.1)]">
        <div
          className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
        />
        <div className="container mx-auto px-4 py-14 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border text-xs font-bold uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(212,175,55,0.06)',
              borderColor: 'rgba(212,175,55,0.25)',
              color: '#D4AF37',
            }}
          >
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white font-heading mb-4">
            About <span style={{ color: '#D4AF37' }}>Ginex</span>
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto font-light">
            Premium mobile accessories designed with precision, built for those who demand excellence.
          </p>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-16 max-w-4xl">

        {/* Main Card */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'rgba(17,17,17,0.9)',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Gold top line */}
          <div
            className="absolute top-0 left-0 w-full h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }}
          />

          <div className="p-8 md:p-12 space-y-12">

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4 font-heading flex items-center gap-3">
                <span
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
                />
                Company Overview
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed font-light text-lg pl-5">
                Ginex is a premier provider of high-quality mobile accessories. We specialize in curating the finest cases, chargers, screen protectors, and audio devices to ensure your mobile experience is always top-notch. Our curated selection focuses on durability, aesthetics, and cutting-edge technology.
              </p>
            </section>

            {/* Mission + Vision */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Our Mission',
                  body: 'To empower mobile users with premium, reliable accessories that protect their investments and enhance their daily digital interactions without compromising on style.',
                },
                {
                  title: 'Our Vision',
                  body: 'To be the most trusted and recognized brand in the mobile accessories market, known for unparalleled quality and a commitment to customer satisfaction.',
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 transition-all duration-300 group"
                  style={{
                    background: 'rgba(10,10,10,0.6)',
                    border: '1px solid rgba(212,175,55,0.1)',
                  }}
                >
                  <h3 className="text-lg font-bold font-heading mb-3 text-[#D4AF37]">
                    {title}
                  </h3>
                  <p className="text-[#A1A1AA] leading-relaxed font-light text-sm">{body}</p>
                </div>
              ))}
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6 font-heading flex items-center gap-3">
                <span
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
                />
                Why Choose Us?
              </h2>
              <ul className="space-y-4 pl-5">
                {whyChoose.map(({ icon, title, body }) => (
                  <li key={title} className="flex gap-4 items-start p-4 rounded-xl">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                      style={{
                        background: 'rgba(212,175,55,0.08)',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <strong className="text-white block mb-1 font-bold font-heading">{title}</strong>
                      <span className="text-[#A1A1AA] font-light text-sm leading-relaxed">{body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact CTA */}
            <section
              className="rounded-2xl p-8 text-center relative overflow-hidden"
              style={{
                background: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2 font-heading">Get In Touch</h2>
                <p className="text-[#A1A1AA] font-light mb-8 max-w-md mx-auto text-sm">
                  Have questions or want to discuss a bulk order? Reach out to us directly.
                </p>
                <GoldCTAButton href="https://wa.me/919392920252" icon="whatsapp">
                  Contact on WhatsApp
                </GoldCTAButton>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
