'use client';

import { MessageCircle, Phone } from 'lucide-react';

interface GoldCTAButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: 'whatsapp' | 'phone';
  className?: string;
}

export function GoldCTAButton({ href, children, icon = 'whatsapp', className = '' }: GoldCTAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm text-black transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
        boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(212,175,55,0.55)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)';
      }}
    >
      {icon === 'whatsapp' ? <MessageCircle className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
      {children}
    </a>
  );
}
