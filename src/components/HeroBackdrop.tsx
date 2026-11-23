import React from 'react';
import { SITE } from '../config/site';

/**
 * Serene misty mountain-horizon atmospheric backdrop inspired by editorial landscape photography.
 * Automatically harmonizes with Light (ivory + soft slate-teal mist) and Dark (deep midnight teal) themes.
 * If SITE.heroPhotoUrl is set, displays that custom photograph seamlessly underneath the gradient masks.
 */
export const HeroBackdrop: React.FC = () => {
  if (SITE.heroPhotoUrl) {
    return (
      <div className="home-hero-backdrop" aria-hidden="true">
        <img
          src={SITE.heroPhotoUrl}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%' }}
        />
      </div>
    );
  }

  return (
    <div className="home-hero-backdrop" aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="dvSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dv-paper)" stopOpacity="1" />
            <stop offset="48%" stopColor="var(--dv-accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--dv-accent-2)" stopOpacity="0.34" />
          </linearGradient>
          <radialGradient id="dvGlow" cx="50%" cy="62%" r="50%">
            <stop offset="0%" stopColor="var(--dv-accent)" stopOpacity="0.32" />
            <stop offset="65%" stopColor="var(--dv-accent-2)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dvRidgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dv-accent-2)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--dv-paper)" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="dvRidgeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dv-ink)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--dv-ink)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="dvRidgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dv-ink)" stopOpacity="0.36" />
            <stop offset="100%" stopColor="var(--dv-paper)" stopOpacity="0.12" />
          </linearGradient>
          <filter id="dvMistBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#dvSkyGrad)" />
        <ellipse cx="800" cy="560" rx="680" ry="320" fill="url(#dvGlow)" />

        {/* Subtle editorial orbital arc in sky */}
        <ellipse
          cx="800"
          cy="430"
          rx="620"
          ry="210"
          transform="rotate(-11 800 430)"
          fill="none"
          stroke="var(--dv-accent)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* Far misty mountain range */}
        <path
          d="M0 620 L140 530 L310 568 L510 470 L690 525 L880 448 L1090 515 L1290 462 L1470 520 L1600 485 L1600 900 L0 900 Z"
          fill="url(#dvRidgeFar)"
        />
        {/* Rolling mist layer */}
        <ellipse
          cx="780"
          cy="610"
          rx="900"
          ry="95"
          fill="var(--dv-paper)"
          fillOpacity="0.42"
          filter="url(#dvMistBlur)"
        />
        {/* Mid mountain ridge */}
        <path
          d="M0 695 L190 592 L370 640 L600 548 L820 622 L1040 540 L1250 612 L1450 564 L1600 605 L1600 900 L0 900 Z"
          fill="url(#dvRidgeMid)"
        />
        {/* Soft foreground valley silhouette */}
        <path
          d="M0 770 L240 688 L490 742 L770 666 L1020 734 L1320 676 L1600 728 L1600 900 L0 900 Z"
          fill="url(#dvRidgeNear)"
        />
      </svg>
    </div>
  );
};
