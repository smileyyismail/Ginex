interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`rounded-3xl p-16 text-center flex flex-col items-center justify-center ${className}`}
      style={{
        background: 'rgba(17,17,17,0.8)',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      {/* Gold glow icon ring */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'rgba(212,175,55,0.06)',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 0 30px rgba(212,175,55,0.1)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-heading">{title}</h3>
      {description && (
        <p className="text-[#A1A1AA] max-w-sm mx-auto font-light leading-relaxed text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
