import React from 'react';

interface BrandMarkProps {
  /** 'editorial' = </> + DEV VIANA (primary minimal mark); 'monogram' = DV monogram; 'symbol' = </> icon only */
  variant?: 'editorial' | 'monogram' | 'symbol';
  compact?: boolean;
  onDark?: boolean;
}

export const BrandLogo: React.FC<BrandMarkProps> = ({
  variant = 'editorial',
  compact = false,
  onDark = false,
}) => {
  if (variant === 'symbol') {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 40 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12.5 7L4 16L12.5 25"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <path
          d="M27.5 7L36 16L27.5 25"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <path
          d="M22.5 4.5L17.5 27.5"
          stroke={onDark ? '#4ec4cf' : 'var(--dv-accent)'}
          strokeWidth="3.5"
          strokeLinecap="square"
        />
      </svg>
    );
  }

  if (variant === 'monogram') {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          width="110"
          height="64"
          viewBox="0 0 180 104"
          fill="none"
          aria-label="Monograma DV — Dev Viana"
        >
          {/* D stroke */}
          <path
            d="M16 14H56C82 14 96 30 96 52C96 74 82 90 56 90H16V14ZM36 32V72H54C68 72 76 64 76 52C76 40 68 32 54 32H36Z"
            fill={onDark ? '#f4f1ec' : 'var(--dv-ink)'}
          />
          {/* Code {/} inside D */}
          <text
            x="43"
            y="58"
            fill={onDark ? '#4ec4cf' : 'var(--dv-accent-2)'}
            fontFamily="monospace"
            fontSize="18"
            fontWeight="700"
          >
            {'{/}'}
          </text>
          {/* V stroke */}
          <path
            d="M84 22L116 90H136L168 14H144L126 62L104 14H80L84 22Z"
            fill={onDark ? '#4ec4cf' : 'var(--dv-accent-2)'}
          />
        </svg>
        <div
          style={{
            letterSpacing: '0.2em',
            fontSize: '15px',
            fontWeight: 700,
            color: onDark ? '#f4f1ec' : 'var(--dv-ink)',
          }}
        >
          DEV{' '}
          <span style={{ color: onDark ? '#4ec4cf' : 'var(--dv-accent-2)' }}>
            VIANA
          </span>
        </div>
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '0.24em',
            color: onDark ? 'rgba(244,241,236,0.72)' : 'var(--dv-muted)',
          }}
        >
          &lt; DESENVOLVENDO SOLUÇÕES /&gt;
        </div>
      </div>
    );
  }

  // Primary Editorial Minimalist Identity: </> + DEV VIANA + hairline with teal accent square
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? '9px' : '11px',
      }}
    >
      <svg
        width={compact ? 26 : 30}
        height={compact ? 22 : 24}
        viewBox="0 0 40 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12.5 7L4 16L12.5 25"
          stroke={onDark ? '#f4f1ec' : 'var(--dv-ink)'}
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <path
          d="M27.5 7L36 16L27.5 25"
          stroke={onDark ? '#f4f1ec' : 'var(--dv-ink)'}
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <path
          d="M22.8 4L17.2 28"
          stroke={onDark ? '#4ec4cf' : 'var(--dv-accent)'}
          strokeWidth="3.6"
          strokeLinecap="square"
        />
      </svg>
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          lineHeight: 1,
          gap: '4px',
        }}
      >
        <span
          style={{
            fontSize: compact ? '14px' : '15px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: onDark ? '#f4f1ec' : 'var(--dv-ink)',
          }}
        >
          DEV
          <span style={{ color: onDark ? '#4ec4cf' : 'var(--dv-accent)' }}>
            VIANA
          </span>
        </span>
        {!compact && (
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              width: '100%',
            }}
          >
            <span
              style={{
                flex: 1,
                height: '1px',
                background: onDark
                  ? 'rgba(244,241,236,0.28)'
                  : 'var(--dv-line-strong)',
              }}
            />
            <span
              style={{
                width: '4px',
                height: '4px',
                background: onDark ? '#4ec4cf' : 'var(--dv-accent)',
              }}
            />
            <span
              style={{
                flex: 1,
                height: '1px',
                background: onDark
                  ? 'rgba(244,241,236,0.28)'
                  : 'var(--dv-line-strong)',
              }}
            />
          </span>
        )}
      </span>
    </span>
  );
};
