import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

interface ConceptProps {
  preview?: boolean;
}

const GALLERY_STORIES = [
  {
    id: 'casa-marfim',
    title: 'Casa Marfim',
    location: 'São Paulo · Arquitetura Residencial',
    year: '2026',
    palette: 'linear-gradient(155deg, #c9b99f 0%, #8b7964 58%, #3f3830 100%)',
    caption: 'Luz natural filtrada por brises de madeira e pedra travertino.',
  },
  {
    id: 'atelier-sol',
    title: 'Atelier Sol & Pedra',
    location: 'Florianópolis · Direção Editorial',
    year: '2026',
    palette: 'linear-gradient(155deg, #b8c2ba 0%, #6f7c73 56%, #2a342e 100%)',
    caption: 'Composição limpa valorizando textura, silêncio e escala humana.',
  },
  {
    id: 'galeria-norte',
    title: 'Galeria Norte',
    location: 'Curitiba · Espaço Cultural',
    year: '2025',
    palette: 'linear-gradient(155deg, #d7cfc2 0%, #988e80 56%, #403b35 100%)',
    caption: 'Percurso expositivo pensado para leitura calma em qualquer tela.',
  },
  {
    id: 'refugio-serra',
    title: 'Refúgio da Serra',
    location: 'Campos do Jordão · Hospitalidade',
    year: '2025',
    palette: 'linear-gradient(155deg, #9fb0a8 0%, #556b65 55%, #1d2a27 100%)',
    caption: 'Fotografia autoral integrada a uma narrativa simples de reserva.',
  },
];

export const ConceptFrame: React.FC<ConceptProps> = ({ preview = false }) => {
  const [selected, setSelected] = useState<(typeof GALLERY_STORIES)[0] | null>(null);

  return (
    <div className="c-frame" style={{ padding: preview ? '14px' : '0' }}>
      {/* Editorial Top Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: preview ? '6px 4px 12px' : '22px clamp(20px, 5vw, 72px)',
          borderBottom: '1px solid color-mix(in srgb, var(--cf-ink) 12%, transparent)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: preview ? '12px' : '20px',
            letterSpacing: '0.06em',
          }}
        >
          ATELIER LUMINA
        </span>
        <div
          className="concept-hide-phone"
          style={{
            display: 'flex',
            gap: preview ? '10px' : '26px',
            fontSize: preview ? '9px' : '14px',
            color: 'var(--cf-muted)',
          }}
        >
          <span>Projetos</span>
          <span>Sobre</span>
          <span>Contato</span>
        </div>
      </header>

      {/* Editorial Hero */}
      <section
        style={{
          padding: preview
            ? '18px 6px 16px'
            : 'clamp(48px, 8vw, 108px) clamp(20px, 5vw, 72px) clamp(32px, 5vw, 64px)',
          maxWidth: '1240px',
          marginInline: 'auto',
        }}
      >
        <span
          style={{
            fontSize: preview ? '8px' : '11px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--cf-accent)',
          }}
        >
          Portfólio Editorial · Arquitetura &amp; Imagem
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: preview ? '18px' : 'clamp(34px, 4.8vw, 68px)',
            lineHeight: 1.06,
            margin: preview ? '6px 0 8px' : '16px 0 22px',
            maxWidth: '780px',
          }}
        >
          Espaços pensados para permanecer na memória.
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: '520px',
            fontSize: preview ? '9px' : '17px',
            color: 'var(--cf-muted)',
            lineHeight: 1.6,
          }}
        >
          Direção visual limpa, ritmo generoso e galerias em alta resolução que colocam o seu
          trabalho no centro da atenção.
        </p>
      </section>

      {/* Asymmetric 2-Column Gallery */}
      <section
        style={{
          padding: preview ? '6px 4px 12px' : '0 clamp(20px, 5vw, 72px) 72px',
          maxWidth: '1240px',
          marginInline: 'auto',
        }}
      >
        <div
          className="concept-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: preview ? '10px' : '28px',
          }}
        >
          {GALLERY_STORIES.slice(0, preview ? 2 : 4).map((story, idx) => (
            <figure
              key={story.id}
              onClick={() => !preview && setSelected(story)}
              style={{
                margin: 0,
                marginTop: !preview && idx % 2 === 1 ? '42px' : 0,
                cursor: preview ? 'default' : 'pointer',
              }}
            >
              <div
                style={{
                  aspectRatio: idx % 2 === 0 ? '4 / 3' : '4 / 4.4',
                  borderRadius: preview ? '8px' : '14px',
                  background: story.palette,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: preview ? '8px' : '22px',
                }}
              >
                {/* Architectural light frame motif */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: preview ? '10px' : '24px',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderRadius: preview ? '4px' : '8px',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    color: '#f7f5f0',
                    fontSize: preview ? '8px' : '12px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  {story.year}
                </span>
              </div>
              <figcaption
                style={{
                  marginTop: preview ? '6px' : '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: preview ? '10px' : '20px',
                    }}
                  >
                    {story.title}
                  </div>
                  {!preview && (
                    <div style={{ fontSize: '14px', color: 'var(--cf-muted)', marginTop: '3px' }}>
                      {story.location}
                    </div>
                  )}
                </div>
                {!preview && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      color: 'var(--cf-accent)',
                    }}
                  >
                    Ampliar <ArrowUpRight size={14} />
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {!preview && (
        <section
          style={{
            borderTop: '1px solid color-mix(in srgb, var(--cf-ink) 12%, transparent)',
            padding: '56px clamp(20px, 5vw, 72px)',
            background: 'var(--cf-surface)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.6vw, 34px)',
              maxWidth: '700px',
              margin: '0 auto 12px',
            }}
          >
            “Um bom portfólio não compete com a obra — ele abre espaço para ela respirar.”
          </p>
          <span style={{ fontSize: '14px', color: 'var(--cf-muted)' }}>
            Projeto conceitual de portfólio desenvolvido por DEV VIANA
          </span>
        </section>
      )}

      {/* Interactive Lightbox Modal */}
      {selected && !preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(12, 16, 14, 0.78)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            placeItems: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(760px, 100%)',
              borderRadius: '20px',
              background: 'var(--cf-bg)',
              color: 'var(--cf-ink)',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
            }}
          >
            <div
              style={{
                height: 'clamp(240px, 40vh, 380px)',
                background: selected.palette,
                position: 'relative',
                padding: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fechar visualização"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.35)',
                  background: 'rgba(0,0,0,0.35)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '26px 28px 30px' }}>
              <span style={{ fontSize: '12px', color: 'var(--cf-accent)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                {selected.location} · {selected.year}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '8px 0 10px' }}>
                {selected.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--cf-muted)', lineHeight: 1.65 }}>
                {selected.caption} Este modal demonstra a experiência de leitura ampliada ideal para
                arquitetos, fotógrafos, estúdios criativos e designers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
