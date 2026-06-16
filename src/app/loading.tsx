export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
