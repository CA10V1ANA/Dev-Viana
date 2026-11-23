import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Mail,
  Moon,
  Plus,
  Sun,
  UserRound,
} from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { BrandLogo } from './BrandLogo';
import { SITE } from '../config/site';

interface LayoutProps {
  children: React.ReactNode;
  hideChrome?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideChrome = false }) => {
  const { pathname, isNavigating } = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    return attr === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('dv-theme', theme);
    } catch {
      // ignore
    }
    requestAnimationFrame(() => {
      document.documentElement.setAttribute('data-theme-ready', 'true');
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (hideChrome) {
    return (
      <div className="dv-shell">
        {isNavigating && <div className="route-progress" aria-hidden="true" />}
        <div className="route-stage">{children}</div>
      </div>
    );
  }

  return (
    <div className="dv-shell">
      {isNavigating && <div className="route-progress" aria-hidden="true" />}

      <header className="site-header">
        <div className="dv-container site-header-inner">
          <Link to="/" className="brand-link" aria-label="DEV VIANA — Início">
            <BrandLogo variant="editorial" />
          </Link>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>
              Projetos
            </Link>
            <Link
              to="/services"
              aria-current={pathname === '/services' ? 'page' : undefined}
            >
              Serviços
            </Link>
            <Link
              to="/studio"
              aria-current={pathname === '/studio' ? 'page' : undefined}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              aria-current={pathname === '/contact' ? 'page' : undefined}
            >
              Contato
            </Link>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={
                theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
              }
              title={
                theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
              }
            >
              <span
                className={`theme-symbol ${
                  theme === 'light'
                    ? 'theme-symbol--active'
                    : 'theme-symbol--inactive'
                }`}
              >
                <Moon size={17} strokeWidth={1.6} />
              </span>
              <span
                className={`theme-symbol ${
                  theme === 'dark'
                    ? 'theme-symbol--active'
                    : 'theme-symbol--inactive'
                }`}
              >
                <Sun size={17} strokeWidth={1.6} />
              </span>
            </button>

            <Link to="/start-a-project" className="dv-cta-pill">
              Iniciar projeto
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      <main className="route-stage">{children}</main>

      <footer className="site-footer">
        <div className="dv-container">
          <div className="site-footer-top">
            <Link to="/" className="brand-link" aria-label="DEV VIANA — Início">
              <BrandLogo variant="editorial" compact />
            </Link>
            <nav className="site-footer-nav" aria-label="Rodapé">
              <Link to="/">Projetos</Link>
              <Link to="/services">Serviços</Link>
              <Link to="/studio">Sobre</Link>
              <Link to="/contact">Contato</Link>
              <Link to="/privacy">Privacidade</Link>
            </nav>
          </div>
          <div className="site-footer-bottom">
            <span>
              {SITE.tagline} ·{' '}
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--dv-accent)', fontWeight: 500 }}
              >
                {SITE.instagramHandle}
              </a>
            </span>
            <span>
              © {SITE.year} {SITE.brandName}
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile / Tablet Floating Bottom Pill Dock */}
      <nav className="mobile-navigation" aria-label="Navegação móvel">
        <Link
          to="/"
          className="mobile-nav-item"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <BrandLogo variant="symbol" />
          <span>Home</span>
        </Link>
        <Link
          to="/services"
          className="mobile-nav-item"
          aria-current={pathname === '/services' ? 'page' : undefined}
        >
          <Briefcase size={18} strokeWidth={1.5} />
          <span>Serviços</span>
        </Link>
        <Link to="/start-a-project" className="mobile-nav-start">
          <Plus size={18} strokeWidth={2.2} />
          <span>Iniciar</span>
        </Link>
        <Link
          to="/studio"
          className="mobile-nav-item"
          aria-current={pathname === '/studio' ? 'page' : undefined}
        >
          <UserRound size={18} strokeWidth={1.5} />
          <span>Sobre</span>
        </Link>
        <Link
          to="/contact"
          className="mobile-nav-item"
          aria-current={pathname === '/contact' ? 'page' : undefined}
        >
          <Mail size={18} strokeWidth={1.5} />
          <span>Contato</span>
        </Link>
      </nav>
    </div>
  );
};
