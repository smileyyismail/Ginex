import { verifyAdmin } from '@/lib/supabase/server';

export async function withAdminAuth<T>(action: () => Promise<{ success: boolean; data?: T; error?: string }>) {
  try {
    const adminCheck = await verifyAdmin();
    if (!adminCheck.success) return { success: false, error: adminCheck.error };
    
    return await action();
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Server error' };
  }
}
