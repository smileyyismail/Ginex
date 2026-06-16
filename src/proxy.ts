import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('session')?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.id) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If authenticated user tries to access /login, redirect to /admin
  if (pathname === '/login') {
    const sessionCookie = request.cookies.get('session')?.value;
    const session = await decrypt(sessionCookie);

    if (session?.id) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware only runs on necessary routes
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
