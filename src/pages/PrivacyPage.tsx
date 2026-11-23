import React from 'react';
import { SITE } from '../config/site';

export const PrivacyPage: React.FC = () => {
  return (
    <section
      className="dv-container"
      style={{ paddingBlock: 'clamp(56px, 7vw, 96px)' }}
    >
      <div style={{ maxWidth: '860px', marginInline: 'auto' }}>
        <span className="eyebrow">Privacidade</span>
        <h1
          style={{
            margin: '12px 0 18px',
            fontSize: 'clamp(32px, 3.8vw, 52px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
          }}
        >
          Política de Privacidade
        </h1>
        <p style={{ color: 'var(--dv-muted)', marginBottom: '36px' }}>
          Última atualização: {SITE.year} · {SITE.brandName} ({SITE.instagramHandle})
        </p>

        {[
          [
            '1. Como seus dados são tratados',
            'Este site foi construído com foco em simplicidade e respeito à sua privacidade. Não coletamos nem armazenamos dados pessoais em bancos externos sem a sua ação direta.',
          ],
          [
            '2. Formulários e redirecionamento para o WhatsApp',
            'As informações preenchidas na página de Contato ou no formulário de Briefing são usadas apenas para montar o texto da mensagem que você escolhe enviar diretamente pelo WhatsApp.',
          ],
          [
            '3. Preferências locais no navegador',
            'Utilizamos apenas o armazenamento local do seu navegador (localStorage/sessionStorage) para lembrar sua preferência de tema (claro ou escuro) e evitar repetir a animação de abertura na mesma sessão.',
          ],
          [
            '4. Contato sobre privacidade',
            `Em caso de dúvidas sobre esta política ou qualquer solicitação relacionada a seus dados, basta chamar pelo WhatsApp ou enviar e-mail para ${SITE.email}.`,
          ],
        ].map(([title, body]) => (
          <article
            key={title}
            style={{
              paddingBlock: '24px',
              borderTop: '1px solid var(--dv-line)',
            }}
          >
            <h2 style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: 600 }}>
              {title}
            </h2>
            <p style={{ margin: 0, color: 'var(--dv-muted)', lineHeight: 1.7 }}>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
