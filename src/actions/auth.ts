'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  // Use the admin client to bypass RLS and query the admin_users table
  const { data: user, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password', password) // Plaintext comparison as per requirements
    .single();

  if (error || !user) {
    return { error: 'Invalid credentials' };
  }

  // Create encrypted session cookie
  await createSession(user.id, user.email);

  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
