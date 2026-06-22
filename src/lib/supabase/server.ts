import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (adminEmail && user.email === adminEmail) {
    return { success: true, user };
  }

  if (user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin') {
    return { success: true, user };
  }

  // If no admin configuration matches, deny access
  return { success: false, error: 'Forbidden: Admin privileges required. Please set ADMIN_EMAIL in your environment variables.' };
}
