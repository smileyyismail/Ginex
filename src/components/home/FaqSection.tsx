'use client';

import { ScrollReveal } from '@/components/common/ScrollReveal';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer bulk pricing for wholesale orders?",
    answer: "Yes, we offer competitive wholesale pricing for bulk orders. Please contact us directly via WhatsApp or email with your requirements, and our team will provide a customized quote tailored to your business needs."
  },
  {
    question: "Are all your products genuine and branded?",
    answer: "Absolutely. We source exclusively from authorized distributors and verified manufacturers. Every product we sell is 100% genuine, rigorously quality-tested, and backed by our Ginex Promise."
  },
  {
    question: "How fast is your shipping process?",
    answer: "We understand that time is money. Most orders are processed and dispatched within 24 hours. Depending on your location, standard delivery takes 2-4 business days. Expedited shipping options are also available."
  },
  {
    question: "What is your return and replacement policy?",
    answer: "We stand by our products with a hassle-free 7-day return policy for unused items in their original packaging. In the rare event you receive a defective unit, our support team will instantly process a replacement."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#111111] py-28" style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(212,175,55,0.04) 0%, transparent 60%)' }}
      />
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <ScrollReveal className="mb-16 text-center" direction="up">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Have Questions?
          </p>
          <h2 className="font-heading mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 100} direction="up">
                <div 
                  className={`overflow-hidden rounded-2xl border transition-all duration-500 ${isOpen ? 'border-[rgba(212,175,55,0.4)] bg-[#161616] shadow-[0_10px_30px_rgba(212,175,55,0.12)]' : 'border-[rgba(212,175,55,0.1)] bg-[#0A0A0A] hover:border-[rgba(212,175,55,0.25)]'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <span className={`font-heading text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-500 ${isOpen ? 'rotate-180 bg-[rgba(212,175,55,0.15)] text-[#D4AF37]' : 'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] group-hover:bg-[rgba(212,175,55,0.1)] group-hover:text-[#D4AF37]'}`}>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pt-2 text-sm font-light leading-relaxed text-[#A1A1AA]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
