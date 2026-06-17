'use client';

import Link from 'next/link';
import { login } from '@/actions/auth';
import { useActionState } from 'react';

const initialState = { error: '' };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] px-4">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
      />
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />

      <div
        className="relative w-full max-w-md rounded-3xl p-8 sm:p-10"
        style={{
          background: 'rgba(17,17,17,0.95)',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="absolute left-0 top-0 h-px w-full rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
        />

        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-baseline gap-0.5" aria-label="Ginex Home">
            <span className="font-heading text-2xl font-black tracking-tight text-white">GINEX</span>
            <span
              className="text-3xl font-black leading-none text-[#D4AF37]"
              style={{ textShadow: '0 0 12px rgba(212,175,55,0.5)' }}
            >
              .
            </span>
          </Link>
          <h1 className="block font-heading text-2xl font-black tracking-tight text-white">Admin Login</h1>
          <p className="mt-1 text-sm font-light text-[#A1A1AA]">Sign in to manage Ginex</p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div
              className="rounded-xl p-3.5 text-sm"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#EF4444',
              }}
              role="alert"
            >
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold tracking-wide text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="admin@ginex.com"
              className="h-11 w-full rounded-xl border border-[rgba(212,175,55,0.15)] bg-[#171717]/90 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#A1A1AA] focus:border-[rgba(212,175,55,0.5)] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold tracking-wide text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              className="h-11 w-full rounded-xl border border-[rgba(212,175,55,0.15)] bg-[#171717]/90 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#A1A1AA] focus:border-[rgba(212,175,55,0.5)] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 h-12 w-full rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-sm font-black uppercase tracking-widest text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
