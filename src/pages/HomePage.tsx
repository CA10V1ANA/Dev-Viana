import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers,
  LayoutDashboard,
  Pause,
  Play,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import { DIRECTIONS, DirectionItem } from '../config/site';
import { Link, useRouter } from '../lib/router';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { BrandLogo } from '../components/BrandLogo';
import { ConceptFrame } from '../components/concepts/ConceptFrame';
import { ConceptShowcase } from '../components/concepts/ConceptShowcase';
import { ConceptIdentity } from '../components/concepts/ConceptIdentity';
import { ConceptNexo } from '../components/concepts/ConceptNexo';

const DIRECTION_ICONS: Record<DirectionItem['id'], React.ReactNode> = {
  portfolio: <Layers size={30} strokeWidth={1.3} />,
  colecao: <ShoppingBag size={30} strokeWidth={1.3} />,
  personal: <UserRound size={30} strokeWidth={1.3} />,
  'sob-medida': <LayoutDashboard size={30} strokeWidth={1.3} />,
};

function renderConceptPreview(slug: DirectionItem['slug']) {
  switch (slug) {
    case 'frame':
      return <ConceptFrame preview />;
    case 'showcase':
      return <ConceptShowcase preview />;
    case 'identity':
      return <ConceptIdentity preview />;
    case 'decor':
      return <ConceptNexo preview />;
  }
}

export const HomePage: React.FC = () => {
  const { hash } = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync initial slide if user returned from /concepts/<slug> via /#<slug>
  useEffect(() => {
    if (!hash) return;
    const cleanHash = hash.replace('#', '');
    const found = DIRECTIONS.findIndex((d) => d.slug === cleanHash || d.id === cleanHash);
    if (found >= 0) {
      setActiveIndex(found);
      requestAnimationFrame(() => {
        const el = slideRefs.current[found];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    }
  }, [hash]);

  const scrollToSlide = (idx: number) => {
    const safeIdx = (idx + DIRECTIONS.length) % DIRECTIONS.length;
    setActiveIndex(safeIdx);
    const track = trackRef.current;
    const slide = slideRefs.current[safeIdx];
    if (track && slide) {
      const targetLeft =
        slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    const slug = DIRECTIONS[safeIdx].slug;
    window.history.replaceState({}, '', `/#${slug}`);
  };

  // Detect manual horizontal scroll snap
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        slideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
          const dist = Math.abs(center - slideCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });
        setActiveIndex(closestIdx);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Optional auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % DIRECTIONS.length;
        const track = trackRef.current;
        const slide = slideRefs.current[next];
        if (track && slide) {
          const targetLeft =
            slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
          track.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
        return next;
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <>
      {/* 1. HERO */}
      <section className="home-hero">
        <HeroBackdrop />
        <div className="home-hero-copy">
          <div className="home-hero-brand-mobile">
            <BrandLogo variant="editorial" compact />
          </div>
          <span className="eyebrow">DEV VIANA · Desenvolvimento Web</span>
          <h1>
            Seu projeto merece um site <em>à altura.</em>
          </h1>
          <p>
            Eu desenho e desenvolvo sites, páginas de apresentação e aplicações web claras,
            rápidas e feitas sob medida para transformar visitantes em clientes.
          </p>
        </div>

        <a href="#work" className="home-hero-explore">
          <span>EXPLORAR</span>
          <ArrowDown size={16} strokeWidth={1.6} />
        </a>
      </section>

      {/* 2. FOUR DIRECTIONS INTRO */}
      <section id="work" className="home-projects-intro">
        <div
          className="orbital-ring"
          aria-hidden="true"
          style={{ width: '640px', height: '270px', top: '8%', left: '-12%' }}
        />
        <div
          className="orbital-ring"
          aria-hidden="true"
          style={{ width: '560px', height: '230px', bottom: '4%', right: '-10%' }}
        />

        <div className="dv-container">
          <div data-entrance="pending">
            <span className="eyebrow">Direções de projeto</span>
            <h2>Quatro formas de construir sua presença digital.</h2>
          </div>

          <div className="directions-grid">
            {DIRECTIONS.map((dir, index) => (
              <button
                key={dir.id}
                type="button"
                data-entrance="pending"
                style={{ ['--reveal-delay' as string]: `${index * 0.08}s` }}
                className={`direction-card ${
                  activeIndex === index ? 'direction-card--active' : ''
                }`}
                onClick={() => {
                  scrollToSlide(index);
                  document
                    .getElementById('showcase')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="direction-icon-box">{DIRECTION_ICONS[dir.id]}</span>
                <h3>{dir.label}</h3>
                <p>{dir.shortDesc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY PROJECT TAB BAR */}
      <div id="showcase" className="showcase-index">
        <div className="dv-container">
          <div className="project-tabs" role="tablist" aria-label="Categorias de projetos">
            {DIRECTIONS.map((dir, idx) => (
              <button
                key={dir.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                onClick={() => scrollToSlide(idx)}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. PEEKING HORIZONTAL CONCEPT CAROUSEL */}
      <section className="project-carousel-section" aria-label="Demonstrações conceituais">
        <div className="project-carousel-viewport">
          <button
            type="button"
            className="project-float project-float--prev"
            aria-label="Projeto anterior"
            onClick={() => scrollToSlide(activeIndex - 1)}
          >
            <ArrowLeft size={18} strokeWidth={1.6} />
          </button>

          <div ref={trackRef} className="project-carousel-track">
            {DIRECTIONS.map((dir, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={dir.id}
                  id={dir.slug}
                  ref={(el) => {
                    slideRefs.current[idx] = el;
                  }}
                  className={`project-slide ${!isActive ? 'project-slide--inactive' : ''}`}
                  onClick={() => {
                    if (!isActive) scrollToSlide(idx);
                  }}
                >
                  <article className="project-band">
                    <div className="project-band-header">
                      <div className="project-band-title">
                        <span className="eyebrow">{dir.category}</span>
                        <h3>{dir.conceptName}</h3>
                        <p>{dir.conceptSubtitle}</p>
                      </div>

                      <div className="project-band-meta">
                        <span className="project-capabilities">{dir.capabilities}</span>
                        <div className="project-band-actions">
                          <span className="project-disclosure">Site conceitual</span>
                          <Link to={dir.href} className="text-link-accent">
                            Explorar conceito
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Pure-CSS Laptop + Mobile Device Pair rendering the live concept */}
                    <div className="device-pair">
                      <div className="device-laptop">
                        <div className="laptop-display">
                          <div className="device-viewport">
                            {renderConceptPreview(dir.slug)}
                          </div>
                        </div>
                        <div className="laptop-base" aria-hidden="true" />
                      </div>

                      <div className="device-phone" aria-hidden="true">
                        <div className="device-viewport">
                          {renderConceptPreview(dir.slug)}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="project-float project-float--next"
            aria-label="Próximo projeto"
            onClick={() => scrollToSlide(activeIndex + 1)}
          >
            <ArrowRight size={18} strokeWidth={1.6} />
          </button>
        </div>

        <div className="project-playback">
          <div className="carousel-dots" role="tablist" aria-label="Slides">
            {DIRECTIONS.map((dir, idx) => (
              <button
                key={dir.id}
                type="button"
                aria-label={`Ver ${dir.label}`}
                className={`carousel-dot ${
                  activeIndex === idx ? 'carousel-dot--active' : ''
                }`}
                onClick={() => scrollToSlide(idx)}
              />
            ))}
          </div>
          <button
            type="button"
            className="playback-toggle"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pausar apresentação' : 'Reproduzir apresentação'}
            title={isPlaying ? 'Pausar' : 'Avanço automático'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </section>

      {/* 5. CLOSING CONVERSION STRIP */}
      <section className="home-closing">
        <div className="dv-container home-closing-inner" data-entrance="pending">
          <div>
            <span className="eyebrow">Próximo passo</span>
            <h2 style={{ marginTop: '8px' }}>
              Gostou? Conheça os formatos de trabalho e serviços.
            </h2>
          </div>
          <Link to="/services" className="dv-cta-pill dv-cta-pill--lg">
            Conhecer serviços
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
};
