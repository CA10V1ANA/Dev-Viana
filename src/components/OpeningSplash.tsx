import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';

export const OpeningSplash: React.FC = () => {
  const [phase, setPhase] = useState<'active' | 'leaving' | 'done'>(() => {
    try {
      if (sessionStorage.getItem('dv-splash-seen') === '1') {
        return 'done';
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 'done';
      }
    } catch {
      return 'done';
    }
    return 'active';
  });

  useEffect(() => {
    if (phase !== 'active') return;
    const t1 = window.setTimeout(() => {
      setPhase('leaving');
    }, 1150);
    const t2 = window.setTimeout(() => {
      setPhase('done');
      try {
        sessionStorage.setItem('dv-splash-seen', '1');
      } catch {
        // ignore storage restrictions
      }
    }, 1850);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`opening-splash ${phase === 'leaving' ? 'opening-splash--leaving' : ''}`}
      role="status"
      aria-label="Preparando sua experiência"
    >
      <div className="opening-stage">
        <svg className="opening-orbit" viewBox="0 0 320 320" fill="none" aria-hidden="true">
          <ellipse
            cx="160"
            cy="160"
            rx="140"
            ry="74"
            transform="rotate(-18 160 160)"
            stroke="rgba(244,241,236,0.14)"
            strokeWidth="1"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="140"
            ry="74"
            transform="rotate(-18 160 160)"
            stroke="#4ec4cf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opening-orbit-ring"
          />
        </svg>
        <BrandLogo variant="editorial" onDark />
        <span className="opening-caption">Preparando sua experiência</span>
      </div>
    </div>
  );
};
