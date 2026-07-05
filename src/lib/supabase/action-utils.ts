import { verifyAdmin } from '@/lib/supabase/server';

export async function withAdminAuth<T>(action: () => Promise<{ success: boolean; data?: T; error?: string }>) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };
    
    return await action();
  } catch (err) {
    console.error('Admin action failed:', err);
    return { success: false, error: 'Server error' };
  }
}

export function getSafeMutationError(error: { code?: string; message?: string }, fallback = 'Unable to save changes') {
  if (error.code === '23505') return 'A record with this slug or name already exists';
  if (error.code === '23503') return 'Selected category or brand no longer exists';
  if (error.code === '23514') return 'Submitted data failed validation';

  console.error('Database mutation failed:', error.message || error);
  return fallback;
}
