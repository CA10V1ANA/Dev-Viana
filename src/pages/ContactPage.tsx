import React, { useState } from 'react';
import {
  ArrowUpRight,
  Clock,
  Instagram,
  Mail,
  MessageCircle,
  Plus,
  Send,
} from 'lucide-react';
import { SITE, buildWhatsAppUrl } from '../config/site';
import { Link } from '../lib/router';

export const ContactPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [sentNotice, setSentNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const text = [
      `Olá Caio! Vim pela página de Contato da DEV VIANA.`,
      `• Nome: ${name.trim()}`,
      contact.trim() ? `• Contato/Instagram: ${contact.trim()}` : '',
      `• Mensagem: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
    setSentNotice(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="page-banner page-banner--contact">
        <div
          className="orbital-ring"
          aria-hidden="true"
          style={{ width: '520px', height: '210px', right: '-8%', top: '12%' }}
        />
        <div className="dv-container page-banner-copy">
          <span className="eyebrow">Contato · DEV VIANA</span>
          <h1>Vamos conversar?</h1>
          <p>
            O canal principal de atendimento e orçamento é o WhatsApp. Me chama por lá ou mande uma
            mensagem direta no Instagram para começarmos sem burocracia.
          </p>
        </div>
      </section>

      {/* 4 Channel Cards */}
      <section className="dv-container" style={{ paddingBlock: 'clamp(44px, 6vw, 76px) 32px' }}>
        <div className="channels-grid">
          <a
            href={buildWhatsAppUrl(
              'Olá Caio! Vim pelo site da DEV VIANA e gostaria de conversar sobre um projeto.'
            )}
            target="_blank"
            rel="noreferrer"
            className="channel-card"
            data-entrance="pending"
            style={{
              borderColor: 'color-mix(in srgb, var(--dv-accent) 55%, transparent)',
            }}
          >
            <span style={{ color: 'var(--dv-accent)' }}>
              <MessageCircle size={22} strokeWidth={1.6} />
            </span>
            <span className="eyebrow">Canal principal</span>
            <strong style={{ fontSize: '18px' }}>WhatsApp</strong>
            <span style={{ fontSize: '14px', color: 'var(--dv-muted)' }}>
              Atendimento direto para tirar dúvidas, orçamentos e alinhamento de projetos.
            </span>
            <span className="text-link-accent" style={{ marginTop: 'auto', paddingTop: '8px' }}>
              Iniciar conversa <ArrowUpRight size={15} />
            </span>
          </a>

          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="channel-card"
            data-entrance="pending"
            style={{ ['--reveal-delay' as string]: '0.06s' }}
          >
            <span style={{ color: 'var(--dv-accent)' }}>
              <Instagram size={22} strokeWidth={1.6} />
            </span>
            <span className="eyebrow">Instagram</span>
            <strong style={{ fontSize: '18px' }}>{SITE.instagramHandle}</strong>
            <span style={{ fontSize: '14px', color: 'var(--dv-muted)' }}>
              Bastidores dos projetos, conteúdos de desenvolvimento e mensagens no direct.
            </span>
            <span className="text-link-accent" style={{ marginTop: 'auto', paddingTop: '8px' }}>
              Abrir perfil <ArrowUpRight size={15} />
            </span>
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="channel-card"
            data-entrance="pending"
            style={{ ['--reveal-delay' as string]: '0.12s' }}
          >
            <span style={{ color: 'var(--dv-accent)' }}>
              <Mail size={22} strokeWidth={1.6} />
            </span>
            <span className="eyebrow">E-mail</span>
            <strong style={{ fontSize: '18px', wordBreak: 'break-word' }}>{SITE.email}</strong>
            <span style={{ fontSize: '14px', color: 'var(--dv-muted)' }}>
              Caso prefira enviar materiais, referências ou propostas formais por escrito.
            </span>
          </a>

          <div
            className="channel-card"
            data-entrance="pending"
            style={{ ['--reveal-delay' as string]: '0.18s' }}
          >
            <span style={{ color: 'var(--dv-accent)' }}>
              <Clock size={22} strokeWidth={1.6} />
            </span>
            <span className="eyebrow">Prazo de resposta</span>
            <strong style={{ fontSize: '18px' }}>{SITE.responseTime}</strong>
            <span style={{ fontSize: '14px', color: 'var(--dv-muted)' }}>
              Retorno rápido em dias úteis, sempre com clareza sobre prazos e próximos passos.
            </span>
          </div>
        </div>
      </section>

      {/* Humanized Attendance Banner */}
      <section className="dv-container" style={{ paddingBlock: '12px 28px' }}>
        <div
          data-entrance="pending"
          style={{
            borderRadius: '20px',
            border: '1px solid var(--dv-line)',
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--dv-accent) 10%, var(--dv-card)), var(--dv-card))',
            padding: 'clamp(24px, 3.5vw, 38px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span className="eyebrow">Atendimento 100% humanizado</span>
            <h2 style={{ margin: '8px 0 8px', fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 500 }}>
              Você fala direto comigo — sem robôs e sem repasses.
            </h2>
            <p style={{ margin: 0, color: 'var(--dv-muted)', fontSize: '15px' }}>
              Cada conversa começa entendendo o que você realmente precisa resolver antes de falar em
              ferramentas ou pacotes.
            </p>
          </div>
          <Link to="/start-a-project" className="dv-cta-pill">
            Montar briefing guiado
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* Expandable Inline Message Drawer (sends formatted message to WhatsApp) */}
      <section className="dv-container" style={{ paddingBlock: '12px 56px' }}>
        <div
          style={{
            borderRadius: '20px',
            border: '1px solid var(--dv-line)',
            background: 'var(--dv-card)',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            style={{
              width: '100%',
              padding: '24px 28px',
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div>
              <span style={{ fontSize: '13px', color: 'var(--dv-muted)', display: 'block' }}>
                Prefere escrever por aqui primeiro?
              </span>
              <strong style={{ fontSize: '19px', fontWeight: 600 }}>
                Envie uma mensagem pronta para o WhatsApp
              </strong>
            </div>
            <span
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '999px',
                border: '1px solid var(--dv-line-strong)',
                display: 'grid',
                placeItems: 'center',
                transform: drawerOpen ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.25s ease',
                flexShrink: 0,
              }}
            >
              <Plus size={18} />
            </span>
          </button>

          {drawerOpen && (
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '0 28px 28px',
                borderTop: '1px solid var(--dv-line)',
                paddingTop: '24px',
                display: 'grid',
                gap: '16px',
                maxWidth: '720px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                  Nome *
                  <input
                    required
                    type="text"
                    className="dv-input"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                  Instagram ou E-mail (opcional)
                  <input
                    type="text"
                    className="dv-input"
                    placeholder="@seuinsta ou e-mail"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                Mensagem *
                <textarea
                  required
                  rows={4}
                  className="dv-input"
                  placeholder="Me conta brevemente sobre o projeto ou dúvida..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--dv-muted)' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                Entendo que ao clicar abaixo minha mensagem será aberta diretamente no WhatsApp da DEV VIANA.
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button type="submit" className="dv-cta-pill dv-cta-pill--lg">
                  <Send size={15} />
                  Enviar pelo WhatsApp
                </button>
                {sentNotice && (
                  <span style={{ fontSize: '13px', color: 'var(--dv-accent)', fontWeight: 500 }}>
                    Mensagem preparada no WhatsApp!
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3 Helper Cards */}
      <section className="dv-container" style={{ paddingBottom: 'clamp(56px, 7vw, 88px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
          }}
        >
          {[
            [
              'Ainda está só na ideia?',
              'Sem problema. Podemos conversar no WhatsApp para estruturar o escopo ideal juntos.',
            ],
            [
              'Já tem identidade visual?',
              'Eu aplico suas cores, tipografia e logo respeitando a consistência da sua marca.',
            ],
            [
              'Quer ver formatos antes?',
              'Confira os pacotes na aba Serviços ou explore os 4 sites conceituais na página inicial.',
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                borderRadius: '16px',
                border: '1px solid var(--dv-line)',
                padding: '20px 22px',
              }}
            >
              <strong style={{ display: 'block', marginBottom: '6px', fontSize: '16px' }}>
                {title}
              </strong>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--dv-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
