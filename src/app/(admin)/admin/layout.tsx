export const dynamic = 'force-dynamic';

import { logout } from '@/actions/auth';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-brand selection:text-black">
      <header className="bg-surface/80 backdrop-blur-xl border-b border-border-subtle h-16 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl tracking-tighter text-text-primary">
            GINEX<span className="text-brand">.</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-brand/10 border border-brand/20 rounded-md text-brand">Admin</span>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm font-semibold tracking-wide text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 px-4 py-2 rounded-md">
            Logout
          </button>
        </form>
      </header>
      <main className="flex-1 p-6 md:p-8 container mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
