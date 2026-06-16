export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="h-16 mb-8 rounded-2xl animate-pulse" style={{ background: 'rgba(212,175,55,0.05)', width: '240px' }} />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden md:block w-64 space-y-4 flex-shrink-0">
            <div className="h-10 rounded-xl animate-pulse" style={{ background: 'rgba(212,175,55,0.06)' }} />
            <div className="h-40 rounded-2xl animate-pulse" style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(212,175,55,0.08)' }} />
            <div className="h-32 rounded-2xl animate-pulse" style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(212,175,55,0.08)' }} />
          </div>

          {/* Product grid skeleton */}
          <div className="flex-1">
            <div className="h-5 w-32 mb-6 rounded-lg animate-pulse" style={{ background: 'rgba(212,175,55,0.06)' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden animate-pulse"
                  style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.08)' }}
                >
                  <div className="aspect-square w-full" style={{ background: 'rgba(23,23,23,0.9)' }} />
                  <div className="p-6 space-y-4" style={{ background: '#111111' }}>
                    <div className="h-5 rounded-lg" style={{ background: 'rgba(212,175,55,0.06)', width: '75%' }} />
                    <div className="h-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    <div className="h-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', width: '83%' }} />
                    <div className="h-9 rounded-xl mt-4" style={{ background: 'rgba(212,175,55,0.06)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
