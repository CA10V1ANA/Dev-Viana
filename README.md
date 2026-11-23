# DEV VIANA — Site Institucional & Portfólio

Site institucional, vitrine interativa de projetos conceituais e fluxo de briefing integrado ao **WhatsApp** para **DEV VIANA (`@caioviana.dev`)**.

## Principais recursos
- **Tema Claro e Escuro** com transição suave e persistência local (`localStorage`).
- **Splash de abertura orbital**, scroll-reveal escalonado e transições entre rotas via **View Transitions API**.
- **Navegação responsiva**: cabeçalho fixo no desktop e dock flutuante inferior de 5 abas no mobile/tablet (`<= 1100px`).
- **Carrossel horizontal com preview ao vivo** em mockups CSS de notebook e celular + **4 sites conceituais interativos** (`/concepts/frame`, `/concepts/showcase`, `/concepts/identity`, `/concepts/decor`).
- **Páginas internas completas**: Serviços (`/services`), Sobre (`/studio`), Contato (`/contact`), Iniciar Projeto / Briefing (`/start-a-project`) e Privacidade (`/privacy`).

## Configuração rápida
Edite [`src/config/site.ts`](./src/config/site.ts) para definir seu número do WhatsApp (`whatsappNumber`), e-mail e imagens opcionais de capa.

## Como rodar localmente
```bash
npm install
npm run dev
```

## Build de produção
```bash
npm run build
```
