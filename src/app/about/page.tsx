import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about Ginex, our mission, vision, and why you should choose our premium mobile accessories.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans pb-24">
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-900">GINEX.</Link>
          <div className="space-x-6 text-sm font-medium">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
            <Link href="/products" className="text-zinc-600 hover:text-zinc-900 transition-colors">Products</Link>
            <Link href="/about" className="text-zinc-900 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8 text-center">About Ginex</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-sm space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-4 border-b pb-2">Company Overview</h2>
            <p className="text-zinc-600 leading-relaxed">
              Ginex is a premier provider of high-quality mobile accessories. We specialize in curating the finest cases, chargers, screen protectors, and audio devices to ensure your mobile experience is always top-notch. Our curated selection focuses on durability, aesthetics, and cutting-edge technology.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Our Mission</h2>
              <p className="text-zinc-600 leading-relaxed">
                To empower mobile users with premium, reliable accessories that protect their investments and enhance their daily digital interactions without compromising on style.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Our Vision</h2>
              <p className="text-zinc-600 leading-relaxed">
                To be the most trusted and recognized brand in the mobile accessories market, known for unparalleled quality and a commitment to customer satisfaction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-4 border-b pb-2">Why Choose Us?</h2>
            <ul className="space-y-4 text-zinc-600">
              <li className="flex gap-3">
                <span className="font-bold text-black">✓</span>
                <span><strong>Premium Quality:</strong> We source only the best materials and products from trusted manufacturers.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-black">✓</span>
                <span><strong>Curated Selection:</strong> Every product in our catalog is tested and verified for performance and durability.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-black">✓</span>
                <span><strong>Dedicated Support:</strong> We believe in building relationships, not just transactions. Our team is always here to help.</span>
              </li>
            </ul>
          </section>

          <section className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Contact Information</h2>
            <p className="text-zinc-600 mb-6">Have questions or want to discuss a bulk order? Reach out to us directly.</p>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-all hover:shadow-md"
            >
              Contact on WhatsApp
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}
