'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] px-4">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.07) 0%, transparent 60%)' }}
      />

      <div
        className="relative p-8 sm:p-12 rounded-3xl text-center max-w-md w-full"
        style={{
          background: 'rgba(17,17,17,0.9)',
          border: '1px solid rgba(239,68,68,0.2)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-white mb-3 font-heading">
          Something went wrong
        </h2>
        <p className="text-[#A1A1AA] mb-8 font-light text-sm leading-relaxed">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <button
          onClick={() => reset()}
          className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
            color: '#000000',
            boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(212,175,55,0.5)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)';
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
