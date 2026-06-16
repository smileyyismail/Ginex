import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionUrl?: string;
  actionLabel?: string;
}

export function SectionHeader({ title, subtitle, actionUrl, actionLabel }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-border-subtle pb-6">
      <div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary mb-2 flex items-center">
          <span className="w-2 h-8 bg-brand rounded-full mr-4 shadow-[0_0_10px_var(--brand)]"></span>
          {title}
        </h2>
        {subtitle && <p className="text-text-secondary text-lg font-light max-w-2xl">{subtitle}</p>}
      </div>
      {actionUrl && actionLabel && (
        <Link href={actionUrl} className="group flex items-center text-sm font-semibold text-text-secondary hover:text-brand transition-colors uppercase tracking-wider">
          {actionLabel} 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
