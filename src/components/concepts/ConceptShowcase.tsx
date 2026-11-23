import React, { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { buildWhatsAppUrl } from '../../config/site';

interface ConceptProps {
  preview?: boolean;
}

const PRODUCTS = [
  {
    id: 'tee-offwhite',
    name: 'Camiseta Heavyweight Marfim',
    category: 'Camisetas',
    price: 'R$ 169',
    swatch: 'linear-gradient(155deg, #e7e4dc 0%, #c6c2b7 100%)',
  },
  {
    id: 'regata-sage',
    name: 'Regata Dry Movimento',
    category: 'Regatas',
    price: 'R$ 139',
    swatch: 'linear-gradient(155deg, #b8c9a8 0%, #6f865d 100%)',
  },
  {
    id: 'moletom-grafite',
    name: 'Moletom Boxy Grafite',
    category: 'Moletons',
    price: 'R$ 329',
    swatch: 'linear-gradient(155deg, #4b5552 0%, #202725 100%)',
  },
  {
    id: 'tee-oliva',
    name: 'Camiseta Corte Studio',
    category: 'Camisetas',
    price: 'R$ 179',
    swatch: 'linear-gradient(155deg, #8a9b7d 0%, #3d5232 100%)',
  },
];

const CATEGORIES = ['Todas', 'Camisetas', 'Regatas', 'Moletons'];
const SIZES = ['P', 'M', 'G', 'GG'];

export const ConceptShowcase: React.FC<ConceptProps> = ({ preview = false }) => {
  const [activeCat, setActiveCat] = useState('Todas');
  const [selectedSize, setSelectedSize] = useState('M');
  const [bag, setBag] = useState<string[]>([]);

  const filtered =
    activeCat === 'Todas'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCat);

  const toggleBag = (id: string) => {
    setBag((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectedNames = PRODUCTS.filter((p) => bag.includes(p.id)).map(
    (p) => `${p.name} (Tam. ${selectedSize})`
  );

  return (
    <div className="c-showcase" style={{ padding: preview ? '12px' : '0' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: preview ? '6px 4px 10px' : '20px clamp(20px, 5vw, 72px)',
          borderBottom: '1px solid color-mix(in srgb, var(--cs-ink) 12%, transparent)',
        }}
      >
        <strong style={{ letterSpacing: '0.16em', fontSize: preview ? '11px' : '16px' }}>
          FORMA CLUB
        </strong>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: preview ? '4px 8px' : '8px 14px',
            borderRadius: '999px',
            background: 'var(--cs-surface)',
            fontSize: preview ? '9px' : '13px',
            fontWeight: 600,
          }}
        >
          <ShoppingBag size={preview ? 10 : 15} />
          Sua seleção {String(bag.length).padStart(2, '0')}
        </span>
      </header>

      <section
        style={{
          padding: preview
            ? '14px 4px 10px'
            : 'clamp(40px, 6vw, 84px) clamp(20px, 5vw, 72px) 32px',
          maxWidth: '1240px',
          marginInline: 'auto',
        }}
      >
        <span
          style={{
            fontSize: preview ? '8px' : '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--cs-accent)',
            fontWeight: 700,
          }}
        >
          Drop 04 · Essenciais de Movimento
        </span>
        <h2
          style={{
            margin: preview ? '4px 0 8px' : '12px 0 18px',
            fontSize: preview ? '18px' : 'clamp(32px, 4.4vw, 62px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            fontWeight: 700,
          }}
        >
          Menos ruído. Mais presença no dia a dia.
        </h2>

        {/* Filter Bar & Size Selector */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: preview ? '8px' : '26px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: preview ? '4px' : '8px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => !preview && setActiveCat(cat)}
                style={{
                  border: '1px solid color-mix(in srgb, var(--cs-ink) 16%, transparent)',
                  borderRadius: '999px',
                  padding: preview ? '3px 7px' : '8px 16px',
                  fontSize: preview ? '8px' : '13px',
                  fontWeight: 600,
                  cursor: preview ? 'default' : 'pointer',
                  background: activeCat === cat ? 'var(--cs-accent)' : 'transparent',
                  color:
                    activeCat === cat
                      ? 'var(--cs-bg)'
                      : 'var(--cs-ink)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {!preview && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--cs-muted)', marginRight: '4px' }}>
                Tamanho:
              </span>
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    border:
                      selectedSize === size
                        ? '1px solid var(--cs-accent)'
                        : '1px solid color-mix(in srgb, var(--cs-ink) 16%, transparent)',
                    background: selectedSize === size ? 'var(--cs-surface)' : 'transparent',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section
        style={{
          padding: preview ? '6px 4px' : '10px clamp(20px, 5vw, 72px) 64px',
          maxWidth: '1240px',
          marginInline: 'auto',
        }}
      >
        <div
          className="concept-grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: preview ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
            gap: preview ? '8px' : '22px',
          }}
        >
          {filtered.slice(0, preview ? 3 : 4).map((product) => {
            const added = bag.includes(product.id);
            return (
              <article
                key={product.id}
                style={{
                  borderRadius: preview ? '10px' : '18px',
                  background: 'var(--cs-surface)',
                  padding: preview ? '6px' : '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: preview ? '5px' : '12px',
                }}
              >
                <div
                  style={{
                    aspectRatio: '4 / 4.6',
                    borderRadius: preview ? '7px' : '12px',
                    background: product.swatch,
                    position: 'relative',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: preview ? '8px' : '14px', fontWeight: 600 }}>
                    {product.name}
                  </span>
                  <span style={{ fontSize: preview ? '8px' : '14px', color: 'var(--cs-accent)', fontWeight: 700 }}>
                    {product.price}
                  </span>
                </div>
                {!preview && (
                  <button
                    type="button"
                    onClick={() => toggleBag(product.id)}
                    style={{
                      marginTop: 'auto',
                      padding: '10px 14px',
                      borderRadius: '999px',
                      border: '1px solid color-mix(in srgb, var(--cs-ink) 18%, transparent)',
                      background: added ? 'var(--cs-accent)' : 'transparent',
                      color: added ? 'var(--cs-bg)' : 'var(--cs-ink)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    {added ? (
                      <>
                        <Check size={14} /> Selecionado ({selectedSize})
                      </>
                    ) : (
                      `Adicionar (${selectedSize})`
                    )}
                  </button>
                )}
              </article>
            );
          })}
        </div>

        {!preview && bag.length > 0 && (
          <div
            style={{
              marginTop: '28px',
              padding: '20px 24px',
              borderRadius: '18px',
              background: 'var(--cs-surface)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <strong>{bag.length} peça(s) na sua seleção</strong>
              <div style={{ fontSize: '14px', color: 'var(--cs-muted)' }}>
                {selectedNames.join(' · ')}
              </div>
            </div>
            <a
              href={buildWhatsAppUrl(
                `Olá! Testei o conceito de Coleção da DEV VIANA e curti esse fluxo de pedido direto no WhatsApp. Itens simulados: ${selectedNames.join(', ')}.`
              )}
              target="_blank"
              rel="noreferrer"
              className="dv-cta-pill"
            >
              Finalizar seleção no WhatsApp
            </a>
          </div>
        )}
      </section>
    </div>
  );
};
