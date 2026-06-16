export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-24 px-4 flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden">
            <div className="aspect-[4/5] bg-zinc-200 w-full" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-zinc-200 rounded w-3/4" />
              <div className="h-4 bg-zinc-200 rounded w-full" />
              <div className="h-4 bg-zinc-200 rounded w-5/6" />
              <div className="h-10 bg-zinc-200 rounded-xl w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
