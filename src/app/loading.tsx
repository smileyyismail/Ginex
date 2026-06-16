export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="flex flex-col items-center space-y-6">
        {/* Gold spinner */}
        <div
          className="w-12 h-12 rounded-full animate-spin"
          style={{
            border: '3px solid rgba(212,175,55,0.15)',
            borderTopColor: '#D4AF37',
            boxShadow: '0 0 20px rgba(212,175,55,0.2)',
          }}
        />
        {/* Logo wordmark */}
        <div className="text-center">
          <p className="text-xl font-black tracking-tighter font-heading text-white">
            GINEX<span style={{ color: '#D4AF37' }}>.</span>
          </p>
          <p className="text-xs text-[#A1A1AA] uppercase tracking-widest font-medium mt-1">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
