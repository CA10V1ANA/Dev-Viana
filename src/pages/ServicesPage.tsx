import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Gauge,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';
import { Link } from '../lib/router';

const PILLARS = [
  {
    title: 'Design próprio',
    icon: Sparkles,
    summary: 'Nada de template engessado ou cara de material genérico.',
    detail:
      'Cada interface nasce a partir do posicionamento real da sua marca, respeitando hierarquia visual, leitura limpa e respiro em telas desktop e mobile.',
  },
  {
    title: 'Desempenho',
    icon: Gauge,
    summary: 'Carregamento rápido e navegação fluida desde o primeiro clique.',
    detail:
      'Código limpo, otimização de imagens, boas práticas de SEO técnico e animações leves que elevam a percepção de valor sem travar o celular do cliente.',
  },
  {
    title: 'Clareza',
    icon: Compass,
    summary: 'Texto direto que explica o benefício antes da tecnologia.',
    detail:
      'Estruturo a página para que quem chega entenda em segundos o que você faz, confie no seu trabalho e encontre o botão certo para falar com você.',
  },
  {
    title: 'Acompanhamento',
    icon: Code2,
    summary: 'Contato direto comigo do planejamento à publicação.',
    detail:
      'Sem intermediários. Você acompanha cada etapa pelo WhatsApp com prévias reais navegáveis, ajustes objetivos e suporte na entrada no ar.',
  },
];

const PACKAGES = [
  {
    number: '01',
    id: 'essencial',
    name: 'Essencial',
    badge: 'Presença direta',
    summary:
      'Ideal para profissionais e negócios que precisam de uma página forte, rápida e pronta para converter visitas do Instagram em conversas no WhatsApp.',
    highlights: [
      'Landing page ou página única sob medida',
      'Layout responsivo pensado primeiro para celular',
      'Integração direta com WhatsApp e redes sociais',
    ],
    allDeliverables: [
      'Direção visual exclusiva alinhada à sua identidade',
      'Estrutura pensada para conversão e leitura rápida',
      'Animações sutis de entrada e microinterações',
      'Otimização básica de SEO e compartilhamento (Open Graph)',
      'Configuração de domínio e publicação em nuvem',
      '15 dias de acompanhamento pós-entrega',
    ],
    featured: false,
  },
  {
    number: '02',
    id: 'completo',
    name: 'Completo',
    badge: 'Mais escolhido',
    summary:
      'Site institucional ou portfólio multipáginas com narrativa completa, demonstrações de projetos e fluxo estruturado de captação pelo WhatsApp.',
    highlights: [
      'Site completo com múltiplas abas e páginas internas',
      'Tema claro/escuro opcional e transições suaves',
      'Formulário de briefing integrado ao WhatsApp',
    ],
    allDeliverables: [
      'Tudo do pacote Essencial',
      'Até 5 páginas estruturadas (Home, Serviços, Sobre, Contato, Briefing)',
      'Vitrine de projetos ou catálogo filtrável',
      'FAQ interativo e seções expansíveis sob medida',
      'Otimização avançada de performance (Core Web Vitals)',
      '30 dias de acompanhamento e ajustes finos pós-entrega',
    ],
    featured: true,
  },
  {
    number: '03',
    id: 'premium',
    name: 'Premium',
    badge: 'Experiência autoral',
    summary:
      'Para marcas, estúdios e empresas que buscam uma experiência digital marcante com interações exclusivas, conteúdo gerenciável e integrações.',
    highlights: [
      'Arquitetura sob medida com recursos interativos dedicados',
      'Painel editável (CMS) ou área de catálogo dinâmica',
      'Performance, SEO técnico e integrações personalizadas',
    ],
    allDeliverables: [
      'Tudo do pacote Completo',
      'Protótipo interativo e direção de movimento personalizada',
      'Painel para atualizar projetos, textos ou catálogo com autonomia',
      'Integrações com APIs, agendamentos ou CRM',
      'Treinamento gravado de uso e documentação da entrega',
      '45 dias de acompanhamento prioritário via WhatsApp',
    ],
    featured: false,
  },
];

const FAQS = [
  {
    q: 'Como funciona o atendimento e o orçamento?',
    a: 'Todo o atendimento é feito diretamente comigo pelo WhatsApp. Você pode preencher o briefing rápido aqui no site ou mandar uma mensagem contando sua ideia — em até 24 horas eu retorno com os próximos passos e uma proposta clara.',
  },
  {
    q: 'Qual o prazo médio de entrega?',
    a: 'Uma página Essencial costuma ficar pronta entre 7 e 12 dias úteis. Sites Completos levam em média de 2 a 4 semanas, e projetos Sob Medida variam conforme o escopo combinado antes do início.',
  },
  {
    q: 'Eu preciso já ter todos os textos e fotos prontos?',
    a: 'Não precisa chegar com tudo perfeito. Eu ajudo a organizar a estrutura, lapidar os textos para ficarem claros e naturais, e oriento quais fotos ou prints reais fazem mais diferença.',
  },
  {
    q: 'O site vai funcionar bem no celular (especialmente vindo do Instagram)?',
    a: 'Sim. Como grande parte do público acessa direto pelo link da bio no Instagram, eu projeto e testo cada tela priorizando legibilidade, velocidade e conforto no toque em celulares.',
  },
  {
    q: 'Vocês usam templates prontos ou Wix?',
    a: 'Não. Os projetos são desenvolvidos com código moderno sob medida (React, TypeScript e CSS autoral), garantindo visual exclusivo, carregamento rápido e total liberdade de evolução.',
  },
  {
    q: 'Como funciona a publicação e o domínio?',
    a: 'Eu cuido da publicação e te ajudo a conectar o seu domínio (ex.: suamarca.com.br) com certificado HTTPS ativo, sem complicação técnica para você.',
  },
  {
    q: 'Posso pedir alterações depois que o site estiver no ar?',
    a: 'Sim. Todos os pacotes incluem um período de acompanhamento pós-entrega para ajustes finos. Depois disso, você pode solicitar melhorias pontuais ou um plano leve de evolução sempre que precisar.',
  },
  {
    q: 'Você também desenvolve sistemas web e painéis sob medida?',
    a: 'Sim! Além de sites e portfólios, desenvolvo aplicações web personalizadas — dashboards, áreas de cliente, catálogos com gestão e automações conectadas ao seu fluxo de trabalho.',
  },
  {
    q: 'Qual a forma de pagamento?',
    a: 'Normalmente dividimos em 50% na aprovação da proposta para reservar a agenda e 50% na entrega final publicada, com pagamento via Pix ou transferência.',
  },
];

export const ServicesPage: React.FC = () => {
  const [openPillar, setOpenPillar] = useState<number | null>(0);
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const togglePlan = (id: string) => {
    setExpandedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="page-banner page-banner--services">
        <div
          className="orbital-ring"
          aria-hidden="true"
          style={{ width: '520px', height: '220px', right: '-8%', top: '10%' }}
        />
        <div className="dv-container page-banner-copy">
          <span className="eyebrow">Serviços · DEV VIANA</span>
          <h1>Sites e aplicações pensados para gerar resultado real.</h1>
          <p>
            Escolha o formato ideal para o seu momento — com atendimento direto pelo WhatsApp,
            processo transparente e entrega limpa do início ao ar.
          </p>
        </div>
      </section>

      {/* 4 Expandable Pillars */}
      <section className="dv-container" style={{ paddingBlock: 'clamp(48px, 6vw, 84px)' }}>
        <div data-entrance="pending" style={{ marginBottom: '28px' }}>
          <span className="eyebrow">Pilares de entrega</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 400, letterSpacing: '-0.035em' }}>
            O que acompanha todo projeto que eu desenvolvo.
          </h2>
        </div>

        <div className="pillars-grid">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const expanded = openPillar === idx;
            return (
              <button
                key={pillar.title}
                type="button"
                className="pillar-card"
                aria-expanded={expanded}
                onClick={() => setOpenPillar(expanded ? null : idx)}
                data-entrance="pending"
                style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'var(--dv-accent-soft)',
                      color: 'var(--dv-accent)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: 'var(--dv-muted)',
                      transform: expanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
                  {pillar.title}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--dv-muted)' }}>
                  {pillar.summary}
                </p>
                {expanded && (
                  <p
                    style={{
                      margin: '14px 0 0',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--dv-line)',
                      fontSize: '14px',
                      color: 'var(--dv-ink)',
                    }}
                  >
                    {pillar.detail}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 Package Tier Cards */}
      <section
        className="dv-container"
        style={{ paddingBlock: 'clamp(28px, 4vw, 56px) clamp(56px, 7vw, 96px)' }}
      >
        <div data-entrance="pending" style={{ marginBottom: '32px' }}>
          <span className="eyebrow">Formatos</span>
          <h2 style={{ margin: '10px 0 8px', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, letterSpacing: '-0.035em' }}>
            Pacotes claros para cada fase do seu negócio.
          </h2>
          <p style={{ margin: 0, color: 'var(--dv-muted)', maxWidth: '620px' }}>
            Os valores são definidos de forma transparente no WhatsApp conforme a complexidade e o
            prazo do seu projeto.
          </p>
        </div>

        <div className="plans-grid">
          {PACKAGES.map((pkg, idx) => {
            const isOpen = !!expandedPlans[pkg.id];
            const waMsg = `Olá Caio! Vi a página de serviços da DEV VIANA e tenho interesse no pacote ${pkg.number} ${pkg.name}. Podemos conversar sobre o meu projeto?`;

            return (
              <article
                key={pkg.id}
                className={`plan-card ${pkg.featured ? 'plan-card--featured' : ''}`}
                data-entrance="pending"
                style={{ ['--reveal-delay' as string]: `${idx * 0.08}s` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="eyebrow">{pkg.number}</span>
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: pkg.featured ? 'var(--dv-accent-soft)' : 'var(--dv-surface)',
                      color: pkg.featured ? 'var(--dv-accent)' : 'var(--dv-muted)',
                      fontWeight: 600,
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Mini CSS Device Preview */}
                <div
                  aria-hidden="true"
                  style={{
                    height: '112px',
                    borderRadius: '14px',
                    background:
                      'linear-gradient(155deg, color-mix(in srgb, var(--dv-accent) 12%, var(--dv-surface)), var(--dv-surface))',
                    border: '1px solid var(--dv-line)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 16px 0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '66%',
                      height: '78%',
                      borderRadius: '8px 8px 0 0',
                      border: '3px solid var(--dv-ink)',
                      borderBottom: 'none',
                      background: 'var(--dv-paper)',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <span style={{ width: '40%', height: '5px', borderRadius: '99px', background: 'var(--dv-accent)' }} />
                    <span style={{ width: '82%', height: '4px', borderRadius: '99px', background: 'var(--dv-line-strong)' }} />
                    <span style={{ width: '64%', height: '4px', borderRadius: '99px', background: 'var(--dv-line)' }} />
                  </div>
                  <div
                    style={{
                      width: '22%',
                      height: '66%',
                      borderRadius: '10px 10px 0 0',
                      border: '3px solid var(--dv-ink)',
                      borderBottom: 'none',
                      background: 'var(--dv-paper)',
                      padding: '6px 5px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <span style={{ width: '70%', height: '4px', borderRadius: '99px', background: 'var(--dv-accent)' }} />
                    <span style={{ width: '90%', height: '3px', borderRadius: '99px', background: 'var(--dv-line-strong)' }} />
                  </div>
                </div>

                <header>
                  <h3 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 500, letterSpacing: '-0.03em' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '15px', color: 'var(--dv-muted)' }}>
                    {pkg.summary}
                  </p>
                </header>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pkg.highlights.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px' }}>
                      <Check size={16} color="var(--dv-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Inline Expandable Checklist */}
                <div style={{ borderTop: '1px solid var(--dv-line)', paddingTop: '14px' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => togglePlan(pkg.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--dv-accent)',
                      cursor: 'pointer',
                    }}
                  >
                    {isOpen ? 'Ocultar entregas' : 'Ver todas as entregas'}
                    <ChevronDown
                      size={15}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>

                  {isOpen && (
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: '14px 0 0',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--dv-muted)',
                      }}
                    >
                      {pkg.allDeliverables.map((del) => (
                        <li key={del} style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ color: 'var(--dv-accent)' }}>•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  <a
                    href={buildWhatsAppUrl(waMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className={pkg.featured ? 'dv-cta-pill dv-cta-pill--lg' : 'dv-btn-secondary'}
                    style={{ width: '100%' }}
                  >
                    <MessageCircle size={16} />
                    Falar no WhatsApp
                    <ArrowUpRight size={15} />
                  </a>
                  <Link
                    to={`/start-a-project?plan=${pkg.id}`}
                    style={{
                      textAlign: 'center',
                      fontSize: '13px',
                      color: 'var(--dv-muted)',
                      paddingBlock: '4px',
                    }}
                  >
                    Ou montar briefing detalhado →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sob Medida Section */}
      <section
        style={{
          borderTop: '1px solid var(--dv-line)',
          borderBottom: '1px solid var(--dv-line)',
          background: 'color-mix(in srgb, var(--dv-surface) 55%, var(--dv-paper))',
          paddingBlock: 'clamp(52px, 6vw, 88px)',
        }}
      >
        <div className="dv-container" data-entrance="pending">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '32px' }}>
            <div>
              <span className="eyebrow">Sob Medida</span>
              <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, letterSpacing: '-0.035em' }}>
                Precisa de algo além de um site institucional?
              </h2>
            </div>
            <Link to="/start-a-project?type=sob-medida" className="dv-btn-secondary">
              Conversar sobre projeto sob medida
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              [
                'Plataformas & Painéis',
                'Sistemas internos, áreas de cliente, agendamentos e dashboards feitos para a sua rotina real.',
              ],
              [
                'Integrações & Automações',
                'Conexão entre site, WhatsApp, planilhas, APIs externas e fluxos que economizam tempo.',
              ],
              [
                'Catálogos & E-commerce',
                'Vitrines interativas com filtros rápidos, seleção de produtos e fechamento direto ou checkout.',
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  borderRadius: '18px',
                  border: '1px solid var(--dv-line)',
                  background: 'var(--dv-card)',
                  padding: '24px',
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: '19px', fontWeight: 600 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--dv-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9-Item FAQ Accordion */}
      <section className="dv-container" style={{ paddingBlock: 'clamp(56px, 7vw, 96px)' }}>
        <div data-entrance="pending" style={{ marginBottom: '28px' }}>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, letterSpacing: '-0.035em' }}>
            Perguntas comuns antes de começar.
          </h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      flexShrink: 0,
                      color: 'var(--dv-accent)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>
                {isOpen && <div className="faq-answer">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="home-closing">
        <div className="dv-container home-closing-inner" data-entrance="pending">
          <div>
            <span className="eyebrow">Vamos tirar do papel?</span>
            <h2 style={{ marginTop: '8px' }}>
              Me conta sua ideia no WhatsApp e eu te mostro o melhor caminho.
            </h2>
          </div>
          <a
            href={buildWhatsAppUrl(
              'Olá Caio! Vim pelo site da DEV VIANA e gostaria de conversar sobre um projeto.'
            )}
            target="_blank"
            rel="noreferrer"
            className="dv-cta-pill dv-cta-pill--lg"
          >
            <MessageCircle size={17} />
            Chamar no WhatsApp
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
};
