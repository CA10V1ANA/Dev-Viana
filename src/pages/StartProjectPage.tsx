import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Copy,
  Crown,
  FileText,
  Gem,
  HelpCircle,
  Hourglass,
  Image as ImageIcon,
  LockKeyhole,
  MessageCircle,
  Package,
  Rocket,
  Settings,
  Star,
  UserRound,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';
import { SITE, buildWhatsAppUrl } from '../config/site';
import { Link, useRouter } from '../lib/router';

const CONCEPT_OPTIONS = [
  { id: 'portfolio', label: 'Portfólio', Icon: ImageIcon },
  { id: 'colecao', label: 'Coleção', Icon: Package },
  { id: 'personal', label: 'Personal', Icon: UserRound },
  { id: 'sob-medida', label: 'Sob medida', Icon: Settings },
  { id: 'indefinido', label: 'Ainda não sei', Icon: HelpCircle },
] as const;

const LEVEL_OPTIONS = [
  { id: 'essencial', label: 'Essencial', Icon: Star },
  { id: 'completo', label: 'Completo', Icon: Crown },
  { id: 'premium', label: 'Premium', Icon: Gem },
  { id: 'indefinido', label: 'Ainda não sei', Icon: HelpCircle },
] as const;

const TIMING_OPTIONS = [
  { id: 'o-quanto-antes', label: 'O quanto antes', Icon: Clock3 },
  { id: '30-dias', label: '30 dias', Icon: CalendarDays },
  { id: '60-dias', label: '60 dias', Icon: CalendarDays },
  { id: 'sem-pressa', label: 'Sem pressa', Icon: Hourglass },
  { id: 'indefinido', label: 'Ainda não sei', Icon: HelpCircle },
] as const;

const BUDGET_OPTIONS = [
  { id: 'ate-2000', label: 'Até R$ 2.000' },
  { id: '2000-4000', label: 'R$ 2.000–4.000' },
  { id: '4000-mais', label: 'R$ 4.000+' },
  { id: 'indefinido', label: 'Ainda não sei' },
] as const;

const JOURNEY_STEPS = [
  {
    title: '1. Entendemos o seu momento',
    description:
      'Conversamos sobre sua ideia, seus objetivos e o que você precisa neste momento.',
    Icon: MessageCircle,
  },
  {
    title: '2. Organizamos a melhor direção',
    description:
      'Com base no seu contexto, indicamos a solução ideal e o caminho mais estratégico.',
    Icon: Compass,
  },
  {
    title: '3. Alinhamos escopo, prazo e proposta',
    description:
      'Você recebe uma proposta clara, sem surpresas, com todos os detalhes.',
    Icon: FileText,
  },
  {
    title: '4. Começamos com clareza',
    description:
      'Com tudo definido, iniciamos o projeto e mantemos você por perto em cada etapa.',
    Icon: Rocket,
  },
] as const;

interface FormErrors {
  goals?: string;
  name?: string;
  email?: string;
  consent?: string;
}

const BriefHeroVisual: React.FC = () => {
  if (SITE.briefHeroPhotoUrl) {
    return (
      <img
        src={SITE.briefHeroPhotoUrl}
        alt="Ambiente de planejamento e criação de projetos — DEV VIANA"
        loading="eager"
      />
    );
  }

  return (
    <div className="brief-hero-media" aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="briefStudioBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--dv-surface)" stopOpacity="1" />
            <stop offset="52%" stopColor="var(--dv-accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--dv-accent-2)" stopOpacity="0.24" />
          </linearGradient>
          <radialGradient id="briefSun" cx="50%" cy="22%" r="60%">
            <stop offset="0%" stopColor="var(--dv-accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#briefStudioBg)" />
        <ellipse cx="800" cy="210" rx="740" ry="340" fill="url(#briefSun)" />
        {/* Architectural studio light beams & editorial grid lines */}
        <path
          d="M0 240 L680 0 L920 0 L1600 220 L1600 900 L0 900 Z"
          fill="var(--dv-ink)"
          fillOpacity="0.04"
        />
        <ellipse
          cx="800"
          cy="340"
          rx="620"
          ry="180"
          transform="rotate(-10 800 340)"
          fill="none"
          stroke="var(--dv-accent)"
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />
        <ellipse
          cx="800"
          cy="340"
          rx="440"
          ry="120"
          transform="rotate(-10 800 340)"
          fill="none"
          stroke="var(--dv-ink)"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const StartProjectPage: React.FC = () => {
  const { search } = useRouter();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const initialConcept = useMemo(() => {
    const q = params.get('type');
    return CONCEPT_OPTIONS.some((o) => o.id === q) ? (q as string) : 'indefinido';
  }, [params]);

  const initialLevel = useMemo(() => {
    const q = params.get('plan');
    return LEVEL_OPTIONS.some((o) => o.id === q) ? (q as string) : 'indefinido';
  }, [params]);

  const [concept, setConcept] = useState<string>(initialConcept);
  const [projectLevel, setProjectLevel] = useState<string>(initialLevel);
  const [goals, setGoals] = useState('');
  const [timing, setTiming] = useState<string>('indefinido');
  const [budget, setBudget] = useState<string>('indefinido');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const goalsRef = useRef<HTMLTextAreaElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);

  // Sync concept radio with URL query param ?type=...
  useEffect(() => {
    const nextParams = new URLSearchParams(window.location.search);
    if (concept && concept !== 'indefinido') {
      nextParams.set('type', concept);
    } else {
      nextParams.delete('type');
    }
    const qs = nextParams.toString();
    window.history.replaceState({}, '', `/start-a-project${qs ? `?${qs}` : ''}`);
  }, [concept]);

  const buildBriefMessage = () => {
    const conceptLabel =
      CONCEPT_OPTIONS.find((o) => o.id === concept)?.label ?? 'Ainda não sei';
    const levelLabel =
      LEVEL_OPTIONS.find((o) => o.id === projectLevel)?.label ?? 'Ainda não sei';
    const timingLabel =
      TIMING_OPTIONS.find((o) => o.id === timing)?.label ?? 'Ainda não sei';
    const budgetLabel =
      BUDGET_OPTIONS.find((o) => o.id === budget)?.label ?? 'Ainda não sei';

    return [
      `Olá Caio! Acabei de preencher o briefing no site da DEV VIANA:`,
      ``,
      `1. Tipo de projeto: ${conceptLabel}`,
      `2. Nível desejado: ${levelLabel}`,
      `3. Objetivo do site: ${goals.trim()}`,
      `4. Prazo desejado: ${timingLabel}`,
      `5. Faixa de investimento: ${budgetLabel}`,
      description.trim()
        ? `6. Conteúdo / referências / observações: ${description.trim()}`
        : '',
      ``,
      `7. Dados de contato:`,
      `• Nome: ${name.trim()}`,
      `• E-mail: ${email.trim()}`,
      phone.trim() ? `• WhatsApp: ${phone.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (goals.trim().length < 20) {
      nextErrors.goals = 'Conte um pouco mais: use pelo menos 20 caracteres.';
    }
    if (!name.trim()) {
      nextErrors.name = 'Informe seu nome.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!consent) {
      nextErrors.consent = 'Autorize o contato para continuar.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.goals) goalsRef.current?.focus();
      else if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.consent) consentRef.current?.focus();
      return;
    }

    const summary = buildBriefMessage();
    setSubmittedSummary(summary);
    window.open(buildWhatsAppUrl(summary), '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = async () => {
    if (!submittedSummary) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(submittedSummary);
      } else {
        throw new Error('Clipboard unavailable');
      }
    } catch {
      const ta = document.createElement('textarea');
      ta.value = submittedSummary;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(ta);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="brief-page">
      {/* A. HERO SECTION */}
      <section className="brief-hero" aria-labelledby="brief-title">
        <BriefHeroVisual />
        <div className="brief-hero-copy">
          <h1 id="brief-title">
            Vamos iniciar
            <em>seu projeto?</em>
          </h1>
          <p>
            Conte sua ideia, seu momento e o que você precisa. Vamos entender seu contexto e
            desenhar o melhor caminho para o seu site.
          </p>
          <ul className="brief-promises">
            <li>
              <UsersRound size={24} strokeWidth={1.6} aria-hidden="true" />
              <span>Atendimento humanizado</span>
            </li>
            <li>
              <Zap size={24} strokeWidth={1.6} aria-hidden="true" />
              <span>Resposta com atenção</span>
            </li>
          </ul>
        </div>
      </section>

      {/* B. MAIN CONTENT WRAPPER */}
      <div className="brief-content">
        {/* C. BRIEFING PANEL & 7-STEP FORM */}
        <section className="brief-panel" aria-labelledby="brief-form-title">
          <h2 id="brief-form-title" data-entrance="pending">
            Conte sua ideia
          </h2>
          <p className="brief-intro">
            Preencha o briefing abaixo para que possamos entender o seu projeto.
          </p>

          <form
            className="inquiry-form brief-form"
            noValidate
            aria-label="Formulário de projeto"
            onSubmit={handleSubmit}
          >
            <fieldset className="submission-fields">
              {/* Step 1 — Tipo de projeto */}
              <fieldset className="brief-fieldset">
                <legend>1. Tipo de projeto</legend>
                <div
                  className="brief-options brief-options-tall"
                  style={{ ['--brief-columns' as string]: 5 }}
                >
                  {CONCEPT_OPTIONS.map(({ id, label, Icon }) => {
                    const selected = concept === id;
                    return (
                      <label key={id} data-selected={selected ? 'true' : 'false'}>
                        <input
                          type="radio"
                          name="concept"
                          value={id}
                          checked={selected}
                          onChange={() => setConcept(id)}
                        />
                        <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Step 2 — Nível desejado */}
              <fieldset className="brief-fieldset">
                <legend>2. Nível desejado</legend>
                <div
                  className="brief-options"
                  style={{ ['--brief-columns' as string]: 4 }}
                >
                  {LEVEL_OPTIONS.map(({ id, label, Icon }) => {
                    const selected = projectLevel === id;
                    return (
                      <label key={id} data-selected={selected ? 'true' : 'false'}>
                        <input
                          type="radio"
                          name="projectLevel"
                          value={id}
                          checked={selected}
                          onChange={() => setProjectLevel(id)}
                        />
                        <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Step 3 — Objetivo do site * */}
              <div className="bs-field form-field">
                <label htmlFor="inquiry-goals">
                  3. Objetivo do site <span>*</span>
                </label>
                <textarea
                  ref={goalsRef}
                  id="inquiry-goals"
                  name="goals"
                  rows={3}
                  maxLength={1000}
                  required
                  aria-invalid={errors.goals ? 'true' : 'false'}
                  placeholder="Ex.: apresentar meu trabalho, vender produtos, atrair mais clientes..."
                  value={goals}
                  onChange={(e) => {
                    setGoals(e.target.value);
                    if (errors.goals && e.target.value.trim().length >= 20) {
                      setErrors((prev) => ({ ...prev, goals: undefined }));
                    }
                  }}
                />
                {errors.goals && <div className="bs-field-error">{errors.goals}</div>}
              </div>

              {/* Step 4 — Prazo desejado (opcional) */}
              <fieldset className="brief-fieldset">
                <legend>4. Prazo desejado (opcional)</legend>
                <div
                  className="brief-options"
                  style={{ ['--brief-columns' as string]: 5 }}
                >
                  {TIMING_OPTIONS.map(({ id, label, Icon }) => {
                    const selected = timing === id;
                    return (
                      <label key={id} data-selected={selected ? 'true' : 'false'}>
                        <input
                          type="radio"
                          name="timing"
                          value={id}
                          checked={selected}
                          onChange={() => setTiming(id)}
                        />
                        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Step 5 — Faixa de investimento (opcional) */}
              <fieldset className="brief-fieldset">
                <legend>5. Faixa de investimento (opcional)</legend>
                <div
                  className="brief-options"
                  style={{ ['--brief-columns' as string]: 4 }}
                >
                  {BUDGET_OPTIONS.map(({ id, label }) => {
                    const selected = budget === id;
                    return (
                      <label key={id} data-selected={selected ? 'true' : 'false'}>
                        <input
                          type="radio"
                          name="budget"
                          value={id}
                          checked={selected}
                          onChange={() => setBudget(id)}
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="brief-help">
                  Prazo e investimento são referências para a conversa, não uma contratação.
                  Confirmamos tudo na proposta.
                </p>
              </fieldset>

              {/* Step 6 — Conteúdo / referências / observações (opcional) */}
              <div className="bs-field form-field brief-notes">
                <label htmlFor="inquiry-description">
                  6. Conteúdo / referências / observações <small>(opcional)</small>
                </label>
                <textarea
                  id="inquiry-description"
                  name="description"
                  rows={3}
                  maxLength={500}
                  placeholder="Conte mais sobre sua ideia, referências que gosta ou qualquer detalhe importante..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <small className="character-count" aria-live="off">
                  {description.length}/500
                </small>
              </div>

              {/* Step 7 — Seus dados de contato */}
              <fieldset className="brief-fieldset">
                <legend>7. Seus dados de contato</legend>
                <div className="brief-contact-fields">
                  <div className="bs-field form-field">
                    <label htmlFor="inquiry-name">
                      Nome <span>*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="inquiry-name"
                      type="text"
                      name="name"
                      maxLength={100}
                      autoComplete="name"
                      required
                      aria-invalid={errors.name ? 'true' : 'false'}
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name && e.target.value.trim()) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                    />
                    {errors.name && <div className="bs-field-error">{errors.name}</div>}
                  </div>

                  <div className="bs-field form-field">
                    <label htmlFor="inquiry-email">
                      E-mail <span>*</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="inquiry-email"
                      type="email"
                      name="email"
                      maxLength={254}
                      autoComplete="email"
                      required
                      aria-invalid={errors.email ? 'true' : 'false'}
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email && e.target.value.includes('@')) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                    />
                    {errors.email && <div className="bs-field-error">{errors.email}</div>}
                  </div>

                  <div className="bs-field form-field">
                    <label htmlFor="inquiry-phone">
                      WhatsApp <small>(opcional)</small>
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      inputMode="tel"
                      name="phone"
                      maxLength={30}
                      autoComplete="tel"
                      placeholder="(11) 91234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Consent */}
              <div className="bs-field form-field brief-consent">
                <label className="consent-label" htmlFor="inquiry-consent">
                  <input
                    ref={consentRef}
                    id="inquiry-consent"
                    type="checkbox"
                    className="bs-checkbox"
                    name="consent"
                    required
                    aria-invalid={errors.consent ? 'true' : 'false'}
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent && e.target.checked) {
                        setErrors((prev) => ({ ...prev, consent: undefined }));
                      }
                    }}
                  />
                  <span>
                    Concordo em receber contato sobre este projeto.{' '}
                    <Link to="/privacy">Política de privacidade</Link>.
                  </span>
                </label>
                {errors.consent && (
                  <div className="bs-field-error">{errors.consent}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="bs-button button sky-button">
                  <span>Enviar briefing</span>
                  <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
                </button>
              </div>

              {/* Privacy Reassurance */}
              <p className="brief-privacy">
                <LockKeyhole size={16} strokeWidth={1.6} aria-hidden="true" />
                <span>Usaremos seus dados apenas para falar sobre seu projeto.</span>
              </p>
            </fieldset>
          </form>
        </section>

        {/* D. "COMO FUNCIONA" SECTION */}
        <section className="brief-journey" aria-labelledby="brief-journey-title">
          <h2 id="brief-journey-title">Como funciona</h2>
          <ol>
            {JOURNEY_STEPS.map(({ title, description: desc, Icon }, idx) => (
              <li
                key={title}
                data-entrance="pending"
                style={{ ['--reveal-delay' as string]: `${idx * 100}ms` }}
              >
                <span className="brief-journey-icon" aria-hidden="true">
                  <Icon strokeWidth={1.5} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                {idx < JOURNEY_STEPS.length - 1 && (
                  <ChevronRight
                    className="brief-journey-arrow"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Confirmation Dialog Modal */}
      {submittedSummary && (
        <div
          className="submission-dialog-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submission-dialog-title"
          onClick={() => setSubmittedSummary(null)}
        >
          <div className="submission-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-12px' }}>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setSubmittedSummary(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--dv-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="submission-seal" aria-hidden="true">
              <Check size={28} strokeWidth={2} />
            </div>
            <h3
              id="submission-dialog-title"
              style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 500 }}
            >
              Briefing pronto no WhatsApp!
            </h3>
            <p style={{ margin: '0 0 22px', color: 'var(--dv-muted)', fontSize: '15px' }}>
              Abrimos uma conversa com o seu briefing organizado para a <strong>DEV VIANA</strong>.
              Se preferir, você pode abrir novamente ou copiar o resumo abaixo.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={buildWhatsAppUrl(submittedSummary)}
                target="_blank"
                rel="noreferrer"
                className="dv-cta-pill dv-cta-pill--lg"
                style={{ width: '100%' }}
              >
                <MessageCircle size={17} />
                Abrir conversa no WhatsApp
              </a>
              <button
                type="button"
                onClick={handleCopySummary}
                className="dv-btn-secondary"
                style={{ width: '100%' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Resumo copiado!' : 'Copiar resumo do briefing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
