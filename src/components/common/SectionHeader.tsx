import Link from "next/link";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionUrl?: string;
  actionLabel?: string;
}

export function SectionHeader({ title, subtitle, actionUrl, actionLabel }: SectionHeaderProps) {
  return (
    <ScrollReveal className="mb-14">
      <div
        className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}
      >
        <div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter text-white mb-3 flex items-center gap-4 font-heading" style={{ letterSpacing: '-0.03em' }}>
            <span
              className="w-1.5 h-10 rounded-full flex-shrink-0"
              style={{
                background: 'linear-gradient(180deg, #F4D03F, #D4AF37)',
                boxShadow: '0 0 16px rgba(212,175,55,0.7)',
              }}
            />
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#A1A1AA] text-base max-w-xl font-light leading-relaxed pl-6">
              {subtitle}
            </p>
          )}
        </div>
        {actionUrl && actionLabel && (
          <Link
            href={actionUrl}
            className="group flex items-center text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap flex-shrink-0 hover:text-[#D4AF37]"
            style={{ color: '#A1A1AA' }}
          >
            {actionLabel}
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        )}
      </div>
    </ScrollReveal>
  );
}
