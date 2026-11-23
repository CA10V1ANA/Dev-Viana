import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';

interface ConceptProps {
  preview?: boolean;
}

const LISTINGS = [
  {
    id: 'apt-jardins',
    title: 'Apartamento Jardim Europa',
    type: 'Apartamento',
    meta: '185 m² · 3 suítes · Varanda integrada',
    price: 'R$ 2.850.000',
    tone: 'linear-gradient(155deg, #c7ccd0 0%, #7d8992 58%, #2c353d 100%)',
  },
  {
    id: 'casa-lago',
    title: 'Residência Vista do Parque',
    type: 'Casa',
    meta: '310 m² · 4 suítes · Jardim privativo',
    price: 'R$ 3.690.000',
    tone: 'linear-gradient(155deg, #d3cec5 0%, #928c82 58%, #3b3833 100%)',
  },
  {
    id: 'apt-vila',
    title: 'Cobertura Linear Vila Nova',
    type: 'Apartamento',
    meta: '240 m² · Pé-direito duplo · Sol da manhã',
    price: 'R$ 4.150.000',
    tone: 'linear-gradient(155deg, #b8c5cf 0%, #5b7488 58%, #1d2e3d 100%)',
  },
];

export const ConceptIdentity: React.FC<ConceptProps> = ({ preview = false }) => {
  const [filter, setFilter] = useState<'Todos' | 'Apartamento' | 'Casa'>('Todos');
  const [favorites, setFavorites] = useState<string[]>([]);

  const items = filter === 'Todos' ? LISTINGS : LISTINGS.filter((i) => i.type === filter);

  const toggleFav = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="c-identity" style={{ padding: preview ? '12px' : '0' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: preview ? '6px 4px 10px' : '22px clamp(20px, 5vw, 72px)',
          borderBottom: '1px solid color-mix(in srgb, var(--ci-ink) 12%, transparent)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: preview ? '11px' : '20px' }}>
          Henrique Costa
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: preview ? '9px' : '13px',
            color: 'var(--ci-accent)',
            fontWeight: 600,
          }}
        >
          <Heart size={preview ? 10 : 15} /> Favoritos ({favorites.length})
        </span>
      </header>

      <section
        style={{
          padding: preview
            ? '14px 4px 10px'
            : 'clamp(44px, 7vw, 90px) clamp(20px, 5vw, 72px) 32px',
          maxWidth: '1180px',
          marginInline: 'auto',
        }}
      >
        <span
          style={{
            fontSize: preview ? '8px' : '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ci-accent)',
            fontWeight: 600,
          }}
        >
          Consultoria Imobiliária Independente
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: preview ? '17px' : 'clamp(32px, 4.4vw, 60px)',
            lineHeight: 1.08,
            margin: preview ? '5px 0 8px' : '14px 0 18px',
            maxWidth: '720px',
          }}
        >
          Curadoria criteriosa para decisões que valem uma vida.
        </h2>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: preview ? '6px' : '22px' }}>
          {(['Todos', 'Apartamento', 'Casa'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => !preview && setFilter(tab)}
              style={{
                padding: preview ? '3px 8px' : '8px 16px',
                borderRadius: '999px',
                border: '1px solid color-mix(in srgb, var(--ci-ink) 16%, transparent)',
                background: filter === tab ? 'var(--ci-accent)' : 'transparent',
                color: filter === tab ? '#f8f8f6' : 'var(--ci-ink)',
                fontSize: preview ? '8px' : '13px',
                fontWeight: 600,
                cursor: preview ? 'default' : 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: preview ? '6px 4px' : '10px clamp(20px, 5vw, 72px) 64px',
          maxWidth: '1180px',
          marginInline: 'auto',
        }}
      >
        <div
          className="concept-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: preview ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
            gap: preview ? '8px' : '24px',
          }}
        >
          {items.slice(0, preview ? 2 : 3).map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <article
                key={item.id}
                style={{
                  borderRadius: preview ? '10px' : '18px',
                  overflow: 'hidden',
                  background: 'var(--ci-surface)',
                  border: '1px solid color-mix(in srgb, var(--ci-ink) 10%, transparent)',
                }}
              >
                <div
                  style={{
                    aspectRatio: '16 / 11',
                    background: item.tone,
                    position: 'relative',
                    padding: preview ? '6px' : '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      padding: preview ? '2px 6px' : '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(18, 22, 26, 0.55)',
                      color: '#fff',
                      fontSize: preview ? '7px' : '11px',
                    }}
                  >
                    {item.type}
                  </span>
                  {!preview && (
                    <button
                      type="button"
                      onClick={() => toggleFav(item.id)}
                      aria-label="Favoritar imóvel"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '999px',
                        border: 'none',
                        background: isFav ? 'var(--ci-accent)' : 'rgba(18,22,26,0.52)',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                  )}
                </div>
                <div style={{ padding: preview ? '8px' : '18px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: preview ? '10px' : '19px' }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: preview ? '8px' : '13px',
                      color: 'var(--ci-muted)',
                      marginTop: '4px',
                    }}
                  >
                    <MapPin size={preview ? 8 : 13} />
                    <span>{item.meta}</span>
                  </div>
                  <div
                    style={{
                      marginTop: preview ? '5px' : '12px',
                      fontWeight: 700,
                      fontSize: preview ? '9px' : '15px',
                      color: 'var(--ci-accent)',
                    }}
                  >
                    {item.price}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!preview && (
          <div
            style={{
              marginTop: '56px',
              paddingTop: '40px',
              borderTop: '1px solid color-mix(in srgb, var(--ci-ink) 12%, transparent)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              ['01 Escuta', 'Mapeamento do perfil, rotina e objetivos patrimoniais.'],
              ['02 Seleção', 'Apenas imóveis auditados com potencial real de valorização.'],
              ['03 Condução', 'Acompanhamento transparente da visita à escritura.'],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 8px', fontSize: '20px' }}>
                  {title}
                </h3>
                <p style={{ margin: 0, color: 'var(--ci-muted)', fontSize: '14px' }}>{desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
