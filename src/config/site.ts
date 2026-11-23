export const SITE = {
  brandName: 'DEV VIANA',
  ownerName: 'Caio Viana',
  tagline: 'Desenvolvendo soluções.',
  instagramHandle: '@caioviana.dev',
  instagramUrl: 'https://instagram.com/caioviana.dev',
  // Substitua pelo seu número com DDI (55) + DDD + número, apenas dígitos. Ex: '5511999999999'
  whatsappNumber: '5500999999999',
  whatsappDisplay: 'Chamar no WhatsApp',
  email: 'contato@caioviana.dev',
  responseTime: 'Em até 24 horas',
  year: 2026,
  // Caso queira usar uma foto própria no Hero ou na página de Briefing, coloque em public/images/ e informe aqui:
  heroPhotoUrl: '' as string,
  briefHeroPhotoUrl: '' as string,
};

export function buildWhatsAppUrl(message: string): string {
  const clean = SITE.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export interface DirectionItem {
  id: 'portfolio' | 'colecao' | 'personal' | 'sob-medida';
  slug: 'frame' | 'showcase' | 'identity' | 'decor';
  label: string;
  shortDesc: string;
  conceptName: string;
  conceptSubtitle: string;
  category: string;
  capabilities: string;
  href: string;
  projectTypeParam: string;
}

export const DIRECTIONS: DirectionItem[] = [
  {
    id: 'portfolio',
    slug: 'frame',
    label: 'Portfólio',
    shortDesc: 'Apresente seu trabalho com direção editorial, galeria limpa e foco visual.',
    conceptName: 'Atelier Lumina',
    conceptSubtitle: 'Estúdio de Arquitetura & Fotografia',
    category: 'Portfólio Editorial',
    capabilities: 'Direção editorial · Galeria com lightbox · Carregamento rápido',
    href: '/concepts/frame',
    projectTypeParam: 'portfolio',
  },
  {
    id: 'colecao',
    slug: 'showcase',
    label: 'Coleção',
    shortDesc: 'Vitrine digital para marcas e produtos com filtros claros e pedido via WhatsApp.',
    conceptName: 'FORMA CLUB',
    conceptSubtitle: 'Moda Minimalista & Catálogo Interativo',
    category: 'Coleção & Catálogo',
    capabilities: 'Filtros ao vivo · Seleção de tamanhos · Pedido direto no WhatsApp',
    href: '/concepts/showcase',
    projectTypeParam: 'colecao',
  },
  {
    id: 'personal',
    slug: 'identity',
    label: 'Personal',
    shortDesc: 'Página de autoridade para profissionais independentes, consultores e especialistas.',
    conceptName: 'Henrique Costa',
    conceptSubtitle: 'Consultoria Imobiliária & Curadoria',
    category: 'Presença Pessoal',
    capabilities: 'Curadoria filtrável · Favoritos locais · Contato direto',
    href: '/concepts/identity',
    projectTypeParam: 'personal',
  },
  {
    id: 'sob-medida',
    slug: 'decor',
    label: 'Sob Medida',
    shortDesc: 'Sistemas web, painéis de gestão, integrações e fluxos criados para a sua operação.',
    conceptName: 'NEXO',
    conceptSubtitle: 'Plataforma de Gestão & Operações',
    category: 'Aplicação Web Sob Medida',
    capabilities: 'Painel interativo · KPIs em tempo real · Automações sob medida',
    href: '/concepts/decor',
    projectTypeParam: 'sob-medida',
  },
];
