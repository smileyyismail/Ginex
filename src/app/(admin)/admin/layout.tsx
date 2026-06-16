export const dynamic = 'force-dynamic';

import { logout } from '@/actions/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="bg-white border-b border-zinc-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-xl tracking-tighter text-zinc-900">GINEX.</Link>
          <span className="text-sm font-medium px-2 py-1 bg-zinc-100 rounded text-zinc-600">Admin</span>
        </div>
        <form action={logout}>
          <Button type="submit" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium">
            Logout
          </Button>
        </form>
      </header>
      <main className="flex-1 p-6 md:p-8 container mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
