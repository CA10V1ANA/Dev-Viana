import { useEffect } from 'react';

/**
 * Observes all `[data-entrance]` elements and flips them from `pending` -> `visible`
 * once they enter the viewport, matching the staggered scroll-reveal choreography.
 */
export function useScrollReveal(dependencyKey: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-entrance]'));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((el) => el.setAttribute('data-entrance', 'visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-entrance', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.setAttribute('data-entrance', 'visible');
      } else {
        el.setAttribute('data-entrance', 'pending');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [dependencyKey]);
}
