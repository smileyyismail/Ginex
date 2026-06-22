import React from 'react';

interface ProductSectionHeaderProps {
  title: string;
}

export function ProductSectionHeader({ title }: ProductSectionHeaderProps) {
  return (
    <h3
      className="text-base font-bold uppercase tracking-widest mb-4 pb-3 flex items-center gap-3 font-heading"
      style={{
        color: '#D4AF37',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      <span
        className="w-1 h-4 rounded-full"
        style={{ background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.6)' }}
      />
      {title}
    </h3>
  );
}
