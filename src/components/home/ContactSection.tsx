export function ContactSection() {
  return (
    <section className="py-24 bg-background border-t border-border-subtle relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--brand-glow)_0%,transparent_70%)] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary">Get in Touch</h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about compatibility, bulk orders, or custom design requests? Connect directly with our support team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Card */}
          <div className="bg-surface border border-border-subtle rounded-[2rem] p-12 text-center flex flex-col items-center justify-center space-y-6 hover:border-brand/30 transition-all duration-500 hover:shadow-[0_10px_40px_var(--brand-glow)] group">
            <div className="w-16 h-16 rounded-full border border-brand/30 bg-brand/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary">Email Support</h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto font-light">
              Send us an email anytime and our accessories experts will reply within 24 business hours.
            </p>
            <a href="mailto:ginex.mobi@gmail.com" className="text-brand font-medium hover:text-brand-hover transition-colors pt-2 tracking-wide">
              ginex.mobi@gmail.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-surface border border-border-subtle rounded-[2rem] p-12 text-center flex flex-col items-center justify-center space-y-6 hover:border-brand/30 transition-all duration-500 hover:shadow-[0_10px_40px_var(--brand-glow)] group">
            <div className="w-16 h-16 rounded-full border border-brand/30 bg-brand/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary">Call or WhatsApp</h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto font-light">
              Speak directly to our representatives for immediate assistance or order inquiries.
            </p>
            <div className="flex flex-col space-y-2 pt-2">
              <a href="tel:+919392920252" className="text-brand font-medium hover:text-brand-hover transition-colors tracking-wide">+91 9392920252</a>
              <a href="tel:+919751703635" className="text-brand font-medium hover:text-brand-hover transition-colors tracking-wide">+91 9751703635</a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm space-y-3 pt-8 border-t border-border-subtle">
          <p className="text-text-secondary"><span className="text-text-primary font-medium">Headquarters Address:</span> 37-157, Near Bus Stop, Jagadgiri Gutta, Hyderabad.</p>
          <p className="text-text-secondary"><span className="text-text-primary font-medium">Business Hours:</span> Mon - Sat: 9:00 AM - 8:00 PM (Closed Sundays)</p>
        </div>
      </div>
    </section>
  );
}
