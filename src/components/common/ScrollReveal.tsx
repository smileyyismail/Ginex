'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none';
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const initialTransform =
    direction === 'up' ? 'translateY(40px)'
    : direction === 'left' ? 'translateX(-40px)'
    : direction === 'right' ? 'translateX(40px)'
    : direction === 'scale' ? 'translateY(20px) scale(0.97)'
    : 'none';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    el.style.opacity = '0';
    el.style.transform = initialTransform;

    let revealTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = window.setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0,0) scale(1)';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (revealTimer) window.clearTimeout(revealTimer);
    };
  }, [delay, initialTransform, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 1,
        transform: 'translate(0,0) scale(1)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {children}
    </div>
  );
}
