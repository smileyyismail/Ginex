'use client';

import { login } from '@/actions/auth';
import { useActionState } from 'react';

const initialState = { error: '' };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md w-full p-8 bg-white shadow-sm border border-zinc-200 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Admin Login</h2>
          <p className="text-zinc-500 text-sm mt-2">Sign in to manage Ginex</p>
        </div>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {state.error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-700">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-700">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-black text-white p-2.5 rounded-lg hover:bg-zinc-800 transition-colors font-medium mt-4 disabled:opacity-50"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
