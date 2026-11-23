import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE, buildWhatsAppUrl } from '../config/site';
import { BrandLogo } from '../components/BrandLogo';
import { Link } from '../lib/router';

export const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Editorial Hero */}
      <section className="page-banner page-banner--about">
        <div
          className="orbital-ring"
          aria-hidden="true"
          style={{ width: '580px', height: '240px', left: '-10%', bottom: '-18%' }}
        />
        <div className="dv-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: 'clamp(28px, 5vw, 64px)',
              alignItems: 'center',
            }}
          >
            <div className="page-banner-copy">
              <span className="eyebrow">Sobre · {SITE.instagramHandle}</span>
              <h1 className="editorial-serif">
                Prazer, sou o Caio Viana. Eu transformo ideias em sites claros e bem construídos.
              </h1>
              <p>
                A <strong>DEV VIANA</strong> nasceu da vontade de criar projetos digitais autorais,
                diretos e humanos — sem cara de template pronto e sem jargão desnecessário.
              </p>
            </div>

            {/* Dedicated Institutional Brand Monogram Card (uses the DV Monogram version in its own piece) */}
            <div
              data-entrance="pending"
              style={{
                borderRadius: '24px',
                border: '1px solid var(--dv-line)',
                background: 'var(--dv-card)',
                padding: 'clamp(32px, 5vw, 54px) 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '20px',
                boxShadow: 'var(--dv-shadow)',
              }}
            >
              <BrandLogo variant="monogram" />
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--dv-muted)', maxWidth: '300px' }}>
                Código limpo, design editorial e foco real em resolver problemas de pessoas e
                negócios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / 2-Column Philosophy */}
      <section className="dv-container" style={{ paddingBlock: 'clamp(56px, 7vw, 96px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
          }}
          data-entrance="pending"
        >
          <div>
            <span className="eyebrow">Visão</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(26px, 2.8vw, 38px)',
                margin: '12px 0 0',
                lineHeight: 1.18,
              }}
            >
              Benefício primeiro. Tecnologia como meio, não como enfeite.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--dv-muted)', fontSize: '16px' }}>
            <p style={{ margin: 0 }}>
              Quando alguém entra no seu site, não quer decifrar qual biblioteca foi usada — quer
              entender rápido como você resolve o problema dela, sentir confiança e conseguir falar
              com você sem atrito.
            </p>
            <p style={{ margin: 0 }}>
              Por isso eu cuido tanto da engenharia por baixo do capô quanto do respiro visual, da
              tipografia e da experiência no celular. Cada decisão tem um motivo prático.
            </p>
          </div>
        </div>
      </section>

      {/* How I Work — 3 Steps */}
      <section
        style={{
          borderTop: '1px solid var(--dv-line)',
          borderBottom: '1px solid var(--dv-line)',
          background: 'color-mix(in srgb, var(--dv-surface) 50%, var(--dv-paper))',
          paddingBlock: 'clamp(56px, 7vw, 96px)',
        }}
      >
        <div className="dv-container">
          <div data-entrance="pending" style={{ marginBottom: '34px' }}>
            <span className="eyebrow">Processo</span>
            <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, letterSpacing: '-0.035em' }}>
              Como eu trabalho em cada projeto.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '22px',
            }}
          >
            {[
              [
                '01 Imersão',
                'Conversamos pelo WhatsApp para entender seu objetivo, seu público e o que precisa ficar evidente na primeira dobra.',
              ],
              [
                '02 Direção',
                'Defino a arquitetura das páginas, a identidade visual aplicada e o fluxo de conversão antes de escrever o código final.',
              ],
              [
                '03 Construção',
                'Desenvolvo com código limpo, animações leves e testes em celular. Você acompanha por link de prévia até a publicação.',
              ],
            ].map(([title, desc], idx) => (
              <article
                key={title}
                data-entrance="pending"
                style={{
                  ['--reveal-delay' as string]: `${idx * 0.08}s`,
                  borderRadius: '20px',
                  border: '1px solid var(--dv-line)',
                  background: 'var(--dv-card)',
                  padding: '28px',
                }}
              >
                <span className="eyebrow">{title.slice(0, 2)}</span>
                <h3 style={{ margin: '10px 0 10px', fontSize: '22px', fontWeight: 500 }}>
                  {title.slice(3)}
                </h3>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--dv-muted)' }}>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Conversation CTA */}
      <section className="home-closing">
        <div className="dv-container home-closing-inner" data-entrance="pending">
          <div>
            <span className="eyebrow">Vamos conversar?</span>
            <h2 style={{ marginTop: '8px' }}>
              Quer trocar uma ideia sobre o seu próximo site ou projeto?
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={buildWhatsAppUrl(
                'Olá Caio! Li a página Sobre da DEV VIANA e queria conversar sobre um projeto.'
              )}
              target="_blank"
              rel="noreferrer"
              className="dv-cta-pill dv-cta-pill--lg"
            >
              <MessageCircle size={17} />
              Chamar no WhatsApp
              <ArrowUpRight size={17} />
            </a>
            <Link to="/start-a-project" className="dv-btn-secondary">
              Montar briefing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
