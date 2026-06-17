import { MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

interface GoldCTAButtonProps {
  href: string;
  children: ReactNode;
  icon?: 'whatsapp' | 'phone';
  className?: string;
}

export function GoldCTAButton({ href, children, icon = 'whatsapp', className = '' }: GoldCTAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] px-8 py-4 text-sm font-black uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,175,55,0.55)] ${className}`}
    >
      {icon === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
      {children}
    </a>
  );
}
