import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { DIRECTIONS } from '../config/site';
import { Link } from '../lib/router';
import { ConceptFrame } from '../components/concepts/ConceptFrame';
import { ConceptShowcase } from '../components/concepts/ConceptShowcase';
import { ConceptIdentity } from '../components/concepts/ConceptIdentity';
import { ConceptNexo } from '../components/concepts/ConceptNexo';

interface ConceptPageProps {
  slug: 'frame' | 'showcase' | 'identity' | 'decor';
}

export const ConceptPage: React.FC<ConceptPageProps> = ({ slug }) => {
  const dir = DIRECTIONS.find((d) => d.slug === slug) ?? DIRECTIONS[0];

  return (
    <div>
      <div className="concept-toolbar">
        <Link
          to={`/#${dir.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Voltar aos projetos
        </Link>

        <span className="concept-toolbar-title">
          {dir.conceptName} · {dir.label}
        </span>

        <Link
          to={`/start-a-project?type=${dir.projectTypeParam}`}
          className="dv-cta-pill"
        >
          Quero um site assim
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="concept-full">
        {slug === 'frame' && <ConceptFrame />}
        {slug === 'showcase' && <ConceptShowcase />}
        {slug === 'identity' && <ConceptIdentity />}
        {slug === 'decor' && <ConceptNexo />}
      </div>
    </div>
  );
};
