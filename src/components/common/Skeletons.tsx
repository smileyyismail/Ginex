export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.05)] bg-[#111111] animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative aspect-square w-full bg-[#1A1A1A]"></div>
          
          {/* Content Skeleton */}
          <div className="relative flex flex-1 flex-col border-t border-[rgba(212,175,55,0.05)] bg-[#111111] p-6">
            <div className="mb-3 h-5 w-3/4 rounded-md bg-[#222222]"></div>
            <div className="mb-2 h-4 w-full rounded-md bg-[#222222]"></div>
            <div className="mb-4 h-4 w-5/6 rounded-md bg-[#222222]"></div>
            
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-[rgba(212,175,55,0.05)]">
               <div className="h-3 w-1/3 rounded-md bg-[#222222]"></div>
               <div className="h-8 w-8 rounded-full bg-[#222222]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-80 rounded-[2rem] border border-[rgba(212,175,55,0.05)] bg-[#111111] animate-pulse relative p-8 flex flex-col justify-end"
        >
          <div className="mb-3 h-8 w-1/2 rounded-md bg-[#222222]"></div>
          <div className="h-px w-8 bg-[#222222] mb-3"></div>
          <div className="h-4 w-1/3 rounded-md bg-[#222222]"></div>
        </div>
      ))}
    </div>
  );
}
