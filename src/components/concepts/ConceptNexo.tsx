import React, { useState } from 'react';
import {
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Search,
  Users,
  Zap,
} from 'lucide-react';

interface ConceptProps {
  preview?: boolean;
}

const METRICS_30 = [
  { label: 'Receita mensal', value: 'R$ 48.900', delta: '+14%' },
  { label: 'Projetos ativos', value: '12', delta: '+3' },
  { label: 'Taxa de entrega', value: '98,4%', delta: '+2,1%' },
  { label: 'Tempo médio', value: '11 dias', delta: '-2d' },
];

const METRICS_7 = [
  { label: 'Receita semanal', value: 'R$ 13.400', delta: '+9%' },
  { label: 'Novos leads', value: '19', delta: '+6' },
  { label: 'Tarefas concluídas', value: '47', delta: '+18%' },
  { label: 'Tempo de resposta', value: '18 min', delta: '-6m' },
];

const CLIENTS = [
  { name: 'Clínica Verbena', project: 'Portal de Agendamento', status: 'Em produção' },
  { name: 'Studio Kora', project: 'Site Institucional', status: 'Revisão final' },
  { name: 'Nordic Roasters', project: 'Catálogo B2B', status: 'Em desenvolvimento' },
  { name: 'Atlas Logística', project: 'Painel de Entregas', status: 'Publicado' },
];

const BARS_30 = [42, 68, 54, 82, 76, 94, 88];
const BARS_7 = [58, 72, 64, 90, 81, 69, 96];

export const ConceptNexo: React.FC<ConceptProps> = ({ preview = false }) => {
  const [section, setSection] = useState<'overview' | 'projects' | 'clients' | 'agenda'>('overview');
  const [period, setPeriod] = useState<'30d' | '7d'>('30d');
  const [query, setQuery] = useState('');
  const [autoWelcome, setAutoWelcome] = useState(true);

  const metrics = period === '30d' ? METRICS_30 : METRICS_7;
  const bars = period === '30d' ? BARS_30 : BARS_7;
  const filteredClients = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.project.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="c-nexo nexo-shell"
      style={{
        display: 'grid',
        gridTemplateColumns: preview ? '120px 1fr' : '236px 1fr',
        minHeight: preview ? '100%' : 'calc(100vh - 64px)',
      }}
    >
      {/* Sidebar */}
      <aside
        className="nexo-sidebar"
        style={{
          background: 'var(--cn-sidebar)',
          borderRight: '1px solid var(--cn-border)',
          padding: preview ? '10px 8px' : '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: preview ? '6px' : '10px',
        }}
      >
        <div
          style={{
            fontWeight: 800,
            letterSpacing: '0.14em',
            fontSize: preview ? '10px' : '15px',
            padding: preview ? '4px 6px' : '6px 12px 18px',
            color: 'var(--cn-accent)',
          }}
        >
          NEXO
        </div>
        {[
          { id: 'overview', label: 'Visão geral', Icon: LayoutDashboard },
          { id: 'projects', label: 'Projetos', Icon: FolderKanban },
          { id: 'clients', label: 'Clientes', Icon: Users },
          { id: 'agenda', label: 'Agenda', Icon: CalendarDays },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => !preview && setSection(id as typeof section)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: preview ? '5px' : '10px',
              padding: preview ? '5px 6px' : '10px 12px',
              borderRadius: '10px',
              border: 'none',
              background:
                section === id
                  ? 'color-mix(in srgb, var(--cn-accent) 14%, transparent)'
                  : 'transparent',
              color: section === id ? 'var(--cn-accent)' : 'var(--cn-muted)',
              fontSize: preview ? '8px' : '14px',
              fontWeight: section === id ? 600 : 500,
              cursor: preview ? 'default' : 'pointer',
              textAlign: 'left',
            }}
          >
            <Icon size={preview ? 10 : 16} />
            <span>{label}</span>
          </button>
        ))}

        {!preview && (
          <div
            style={{
              marginTop: 'auto',
              padding: '14px',
              borderRadius: '14px',
              background: 'var(--cn-surface)',
              border: '1px solid var(--cn-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
              <Zap size={14} color="var(--cn-accent)" /> Boas-vindas automáticas
            </div>
            <p style={{ margin: '6px 0 12px', fontSize: '12px', color: 'var(--cn-muted)' }}>
              Envia resumo de onboarding no WhatsApp ao aprovar um projeto.
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={autoWelcome}
              onClick={() => setAutoWelcome((v) => !v)}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '999px',
                border: 'none',
                background: autoWelcome ? 'var(--cn-accent)' : 'var(--cn-border)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: autoWelcome ? '23px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s ease',
                }}
              />
            </button>
          </div>
        )}
      </aside>

      {/* Main Dashboard Area */}
      <div style={{ padding: preview ? '10px 12px' : '28px clamp(18px, 3vw, 40px)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: preview ? '10px' : '24px',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: preview ? '12px' : '24px', fontWeight: 700 }}>
              {section === 'overview' && 'Visão geral da operação'}
              {section === 'projects' && 'Projetos em andamento'}
              {section === 'clients' && 'Carteira de clientes'}
              {section === 'agenda' && 'Agenda da semana'}
            </h2>
            {!preview && (
              <span style={{ fontSize: '13px', color: 'var(--cn-muted)' }}>
                Exemplo interativo de sistema web sob medida desenvolvido pela DEV VIANA
              </span>
            )}
          </div>

          {!preview && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--cn-surface)',
                  border: '1px solid var(--cn-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                }}
              >
                <Search size={14} color="var(--cn-muted)" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cliente ou projeto..."
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '13px',
                    width: '180px',
                  }}
                />
              </label>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as '30d' | '7d')}
                aria-label="Selecionar período"
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--cn-border)',
                  background: 'var(--cn-surface)',
                  fontSize: '13px',
                }}
              >
                <option value="30d">Últimos 30 dias</option>
                <option value="7d">Últimos 7 dias</option>
              </select>
            </div>
          )}
        </div>

        {/* 4 KPI Cards */}
        <div
          className="concept-grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: preview ? '6px' : '16px',
            marginBottom: preview ? '10px' : '22px',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: 'var(--cn-surface)',
                border: '1px solid var(--cn-border)',
                borderRadius: preview ? '8px' : '14px',
                padding: preview ? '7px' : '16px',
              }}
            >
              <div style={{ fontSize: preview ? '7px' : '12px', color: 'var(--cn-muted)' }}>
                {m.label}
              </div>
              <div
                style={{
                  marginTop: preview ? '2px' : '6px',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '6px',
                }}
              >
                <strong style={{ fontSize: preview ? '10px' : '21px' }}>{m.value}</strong>
                <span
                  style={{
                    fontSize: preview ? '7px' : '11px',
                    color: 'var(--cn-accent)',
                    fontWeight: 600,
                  }}
                >
                  {m.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart + Clients Table */}
        <div
          className="concept-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: preview ? '8px' : '18px',
          }}
        >
          <div
            style={{
              background: 'var(--cn-surface)',
              border: '1px solid var(--cn-border)',
              borderRadius: preview ? '8px' : '16px',
              padding: preview ? '8px' : '20px',
            }}
          >
            <div style={{ fontSize: preview ? '8px' : '14px', fontWeight: 600, marginBottom: preview ? '8px' : '18px' }}>
              Ritmo de entregas ({period === '30d' ? '30 dias' : '7 dias'})
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                alignItems: 'end',
                gap: preview ? '5px' : '12px',
                height: preview ? '70px' : '170px',
              }}
            >
              {bars.map((val, i) => (
                <div
                  key={i}
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${val}%`,
                      borderRadius: preview ? '4px' : '8px',
                      background:
                        i === bars.length - 1
                          ? 'var(--cn-accent)'
                          : 'color-mix(in srgb, var(--cn-accent) 32%, transparent)',
                      transition: 'height 0.4s ease',
                    }}
                  />
                  {!preview && (
                    <span style={{ fontSize: '11px', color: 'var(--cn-muted)' }}>
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'var(--cn-surface)',
              border: '1px solid var(--cn-border)',
              borderRadius: preview ? '8px' : '16px',
              padding: preview ? '8px' : '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: preview ? '5px' : '12px',
            }}
          >
            <div style={{ fontSize: preview ? '8px' : '14px', fontWeight: 600 }}>
              Clientes recentes
            </div>
            {filteredClients.slice(0, preview ? 3 : 4).map((c) => (
              <div
                key={c.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: preview ? '4px' : '10px',
                  borderTop: '1px solid var(--cn-border)',
                  fontSize: preview ? '8px' : '13px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  {!preview && (
                    <div style={{ fontSize: '12px', color: 'var(--cn-muted)' }}>{c.project}</div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: preview ? '7px' : '11px',
                    padding: preview ? '2px 5px' : '4px 10px',
                    borderRadius: '999px',
                    background: 'color-mix(in srgb, var(--cn-accent) 12%, transparent)',
                    color: 'var(--cn-accent)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
