'use client';

import { login } from '@/actions/auth';
import { useActionState } from 'react';

const initialState = { error: '' };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4 relative overflow-hidden">

      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

      <div
        className="relative max-w-md w-full p-8 sm:p-10 rounded-3xl"
        style={{
          background: 'rgba(17,17,17,0.95)',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Gold top line */}
        <div
          className="absolute top-0 left-0 w-full h-px rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
        />

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-baseline gap-0.5 mb-6">
            <span className="text-2xl font-black tracking-tighter text-white font-heading">GINEX</span>
            <span className="text-[#D4AF37] text-3xl font-black leading-none" style={{ textShadow: '0 0 12px rgba(212,175,55,0.5)' }}>.</span>
          </a>
          <h2 className="text-2xl font-black tracking-tighter text-white font-heading block">Admin Login</h2>
          <p className="text-[#A1A1AA] text-sm mt-1 font-light">Sign in to manage Ginex</p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Error */}
          {state?.error && (
            <div
              className="text-sm p-3.5 rounded-xl"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#EF4444',
              }}
            >
              {state.error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@ginex.com"
              className="w-full h-11 px-4 rounded-xl text-sm text-white placeholder-[#A1A1AA] outline-none transition-all duration-300"
              style={{
                background: 'rgba(23,23,23,0.9)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
              onFocus={e => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(212,175,55,0.08)';
              }}
              onBlur={e => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl text-sm text-white placeholder-[#A1A1AA] outline-none transition-all duration-300"
              style={{
                background: 'rgba(23,23,23,0.9)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
              onFocus={e => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(212,175,55,0.08)';
              }}
              onBlur={e => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-sm text-black transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
            }}
            onMouseEnter={e => {
              if (!isPending) (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(212,175,55,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)';
            }}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
