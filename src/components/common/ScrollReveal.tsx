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
      // Skip animation entirely — element is already visible from SSR render
      return;
    }

    // Set hidden state immediately before first paint to avoid FOVC.
    // This runs synchronously in the effect before the browser paints
    // the next frame, so users see the hidden → revealed transition
    // instead of visible → hidden → revealed.
    el.style.opacity = '0';
    el.style.transform = initialTransform;

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = setTimeout(() => {
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
      if (revealTimer !== undefined) clearTimeout(revealTimer);
    };
  }, [delay, initialTransform, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // SSR render: fully visible for no-JS and prefers-reduced-motion users.
        // JS will override opacity/transform synchronously in the effect.
        opacity: 1,
        transform: 'translate(0,0) scale(1)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
