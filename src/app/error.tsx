'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 text-center max-w-md">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-4">Something went wrong!</h2>
        <p className="text-zinc-500 mb-8">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
