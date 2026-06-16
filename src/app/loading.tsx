export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-medium tracking-wide animate-pulse">Loading Ginex...</p>
      </div>
    </div>
  );
}
