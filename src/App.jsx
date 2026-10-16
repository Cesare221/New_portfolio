import { useState, useRef, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Stack from './components/Stack.jsx';
import MatrixRain from './components/ui/matrix-rain.jsx';
import ProjectCard, { Section } from './components/ProjectCard.jsx';
import { NAV_LINKS, PERSONAL, PROJECTS } from './data/portfolio.js';
import {
  FaGithub, FaLinkedin, FaWhatsapp,
} from 'react-icons/fa';
import { Menu, X, ArrowUpRight, Copy, Check, Mail, Pause, Play } from 'lucide-react';

import OrbCursor                  from './components/ui/OrbCursor.jsx';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────


function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ));

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [copied, setCopied] = useState(false);
  const [allProjectsVisible, setAllProjectsVisible] = useState(false);
  const [matrixPaused, setMatrixPaused] = useState(false);
  const projectToggleRef = useRef(null);
  const restoreProjectToggleRef = useRef(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (restoreProjectToggleRef.current && !allProjectsVisible) {
        restoreProjectToggleRef.current = false;
        projectToggleRef.current?.focus({ preventScroll: true });
        projectToggleRef.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [allProjectsVisible]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef  = useRef(null);
  const menuButtonRef = useRef(null);

  // Fecha o menu móvel ao pressionar Escape
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false);
      menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
  const desktopMedia = window.matchMedia('(min-width: 1024px)');

  const handleViewportChange = () => {
    if (desktopMedia.matches) {
      setMenuOpen(false);
    }
  };

  desktopMedia.addEventListener('change', handleViewportChange);

  return () => {
    desktopMedia.removeEventListener('change', handleViewportChange);
  };
}, []);

  // GSAP — scroll reveals + header + active section
  useGSAP(() => {
    if (!prefersReducedMotion) {

    // Scroll reveal
    gsap.utils.toArray('.gsap-reveal').forEach((el) => {
      gsap.from(el, {
        y: 48, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    });

    // Hero — palavra por palavra
    gsap.utils.toArray('.hero-word').forEach((word, i) => {
      gsap.from(word, { yPercent: 110, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.1 + i * 0.14 });
    });
    gsap.from('.hero-sub', {
      opacity: 0,
      y: 12,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3,
    });
    
    gsap.from('.hero-actions', {
      opacity: 0,
      y: 8,
      duration: 0.45,
      delay: 0.45,
      ease: 'power3.out',
    });

    // Revelação rápida do título profissional
    gsap.from('.hero-letter', {
      opacity: 0,
      duration: 0.25,
      stagger: {
        amount: 1.45,
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-letter',
        start: 'top 90%',
        once: true,
      },
    });
  } //Fim da condição das animações

    // Header scroll
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        setScrolled(self.direction === 1 && self.progress > 0);
        setShowBackToTop(self.scroll() > 400);
      }
    });
    
    // Active section highlighting
    gsap.utils.toArray('section[id]').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        end: 'bottom 30%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(section.id);
          }
        },
      });
    });

  }, { 
    scope: containerRef, 
    dependencies: [prefersReducedMotion],
    revertOnUpdate: true,
  });

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };


  const scrollTo = (href) => {
  setMenuOpen(false);

  const target = document.querySelector(href);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'instant' : 'smooth',
    block: 'start',
  });
};

  // ── Background helpers ───────────────────────────────────────────
  const bgCanvas  = 'bg-background';
  const borderDim = 'border-hairline dark:border-white/[0.07]';

  return (
  <ReactLenis root options={{
    smoothWheel: !prefersReducedMotion,
    lerp: prefersReducedMotion ? 1 : 0.06,
    duration: prefersReducedMotion ? 0 : 1.2,
  }}>
    <div
      ref={containerRef}
      className={`min-h-screen ${bgCanvas} text-foreground font-sans relative overflow-x-hidden transition-colors duration-350`}
    >
      {/* Cursor Decorativo */}
      {!prefersReducedMotion && <OrbCursor />}
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-5 focus:py-3 focus:text-foreground"
        >
          Pular para o conteúdo
        </a>

      {/* HEADER */}
        <header className={`fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-background/95 backdrop-blur-md transition-transform duration-300 focus-within:translate-y-0 ${scrolled && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
            <div className={`flex h-[72px] items-center justify-between gap-4`}>

              {/* Logo + wordmark */}
              <a href="#inicio" className="flex items-center gap-2.5 group" aria-label="Início">
                 <img
                  src="/images/logoportifolio.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="h-9 w-9 rounded-md object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                   {PERSONAL.name}
                </span>
              </a>

              {/* Nav — desktop */}
              <nav className="hidden lg:flex items-center gap-1 " aria-label="Navegação principal">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={activeSection === link.href.substring(1) ? 'location' : undefined}
                    className={`h-11 px-3 flex items-center rounded-lg text-nav-link font-medium transition-colors duration-200 ${activeSection === link.href.substring(1) ? 'bg-card text-foreground' : 'text-muted hover:bg-card/50 hover:text-foreground'}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Right cluster — desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="#contato"
                  className="h-11 px-6 rounded-lg bg-cta hover:opacity-90 text-button font-medium text-white transition-opacity duration-200 inline-flex items-center justify-center"
                >
                  Fale comigo
                </a>
              </div>

              {/* Mobile controls */}
              <div className="lg:hidden flex items-center gap-2">
                 <button
                  onClick={() => setMenuOpen((previous) => !previous)}
                  className="p-3 text-muted hover:text-foreground"
                  aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} 
                  ref={menuButtonRef}                 
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  type="button"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu drawer */}
          {menuOpen && (
            <nav
              id="mobile-navigation" 
              aria-label="Navegação móvel"
              className={`lg:hidden ${bgCanvas} border-b ${borderDim} px-5 pb-6 pt-3 shadow-xl shadow-black/10`}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={activeSection === link.href.substring(1) ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center py-4 text-title-sm font-medium text-muted hover:text-foreground border-b last:border-0 border-hairline dark:border-white/[0.07] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}
        </header>

        <main id="conteudo-principal" tabIndex={-1}>
          {/* ═════════
              HERO
          ═════════ */}
          <Hero
            borderDim={borderDim}
            matrixPaused={matrixPaused}
            onToggleMatrix={() => setMatrixPaused((paused) => !paused)}
            showMotionControl={!prefersReducedMotion}
          />

          <About />

          {/* ══════════════════════════════════════════════
              STACK TÉCNICO
          ══════════════════════════════════════════════ */}
          <Stack bgCanvas={bgCanvas} /> 

          {/* ══════════════════════════════════════════════
              PROJETOS
          ══════════════════════════════════════════════ */}
          <Section
            id="projetos"
            center={false}
            eyebrow="Projetos selecionados."
            title="Soluções que construí."
            subtitle="Aplicações e automações desenvolvidas para resolver problemas reais."
            bg={bgCanvas}
            className="gsap-reveal"
          >
            <div className="divide-y divide-white/10">
              {PROJECTS.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            {PROJECTS.length > 3 && (
              <>
                <div id="outros-projetos" hidden={!allProjectsVisible} className="divide-y divide-white/10 border-t border-white/10 pt-8">
                  {PROJECTS.slice(3).map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
                <div className="border-t border-white/10 py-6">
                  <button
                    ref={projectToggleRef}
                    type="button"
                    aria-expanded={allProjectsVisible}
                    aria-controls="outros-projetos"
                    onClick={() => {
                      restoreProjectToggleRef.current = allProjectsVisible;
                      setAllProjectsVisible((visible) => !visible);
                    }}
                    className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-brand/40 px-5 py-2 text-sm font-semibold text-highlight transition-colors hover:bg-brand/10"
                  >
                    {allProjectsVisible ? 'Mostrar apenas destaques' : `Ver todos os projetos (+${PROJECTS.length - 3})`}
                    <ArrowUpRight size={17} aria-hidden="true" className={allProjectsVisible ? '-rotate-90' : ''} />
                  </button>
                </div>
              </>
            )}
          </Section>
        </main>

          {/* ══════════════════════════════════════════════
              CONTATO
          ══════════════════════════════════════════════ */}
        <div className="contact-footer relative isolate overflow-hidden bg-background">
          <MatrixRain
            className="absolute inset-0 z-0 opacity-[0.35]"
            background="#0a0a0a"
            color="#ef3434"
            highlight="#ff9999"
            density={0.7}
            fontSize={18}
            glow={4}
            speed={0.55}
            trail={0.88}
            paused={matrixPaused}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/30 to-background/50" />
          <section
            id="contato"
            aria-labelledby="contact-title"
            className="relative z-10 border-t border-white/10 py-14 sm:py-16"
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

              <div className={`grid items-center gap-x-12 gap-y-5 text-left text-foreground lg:grid-cols-2`}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted lg:col-span-2">
                  <span className="block w-4 h-px bg-cta/60" />
                  Vamos conversar
                </span>

                <h2 id="contact-title" className="font-display font-semibold text-3xl sm:text-4xl tracking-[-0.02em] text-balance">
                  Vamos construir algo juntos?
                </h2>

                <p className="text-body-md text-muted max-w-xl leading-relaxed">
                  Aberto a novas oportunidades, colaborações e projetos desafiadores. Conte o que você tem em mente.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleCopyToClipboard(PERSONAL.email)}
                    type="button"
                    aria-label={`Copiar e-mail: ${PERSONAL.email}`}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-cta text-white text-button font-medium shadow-sm shadow-cta/20 hover:opacity-90 transition-opacity duration-200"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'E-mail copiado!' : PERSONAL.email}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-3 min-[380px]:grid-cols-2 lg:border-l lg:border-white/10 lg:pl-8">
                  {[
                    { href: PERSONAL.github,   icon: <FaGithub   size={20} />, label: 'GitHub de Cesar', detail: 'Cesare221'   },
                    { href: PERSONAL.linkedin,  icon: <FaLinkedin size={20} />, label: 'LinkedIn de Cesar', detail: 'cdelmondes'  },
                    { href: PERSONAL.whatsapp,  icon: <FaWhatsapp size={20} />, label: 'WhatsApp de Cesar', detail: 'Vamos conversar'  },
                  { href: `mailto:${PERSONAL.email}`, icon: <Mail size={20} />, label: 'E-mail de Cesar', detail: PERSONAL.email },
                  ].map(({ href, icon, label, detail }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex min-h-11 items-center justify-start gap-3 rounded-lg px-2 text-muted transition-colors duration-200 hover:bg-background hover:text-foreground"
                    >
                      {icon}<span className="min-w-0"><span className="block text-sm text-foreground">{label.replace(" de Cesar", "")}</span><span className="mt-1 block break-all text-xs text-muted">{detail}</span></span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </section>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer className="relative z-10 border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-content mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4 sm:pr-16">
            <span className="font-display font-normal text-[16px] text-muted tracking-[-0.01em]">
               {PERSONAL.name}
            </span>
            <p className="text-body-sm text-muted">
              © {new Date().getFullYear()} · Todos os direitos reservados.
            </p>
            {!prefersReducedMotion && (
              <button
                type="button"
                aria-pressed={matrixPaused}
                onClick={() => setMatrixPaused((paused) => !paused)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-background/70 px-3 text-xs text-muted transition-colors hover:text-foreground"
              >
                {matrixPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                {matrixPaused ? 'Retomar animações de fundo' : 'Pausar animações de fundo'}
              </button>
            )}
          </div>
        </footer>
        </div>

        {/* Back to Top Button */}
        <button
          type="button"
          onClick={() => scrollTo('#inicio')}
          className={`fixed bottom-6 right-6 hidden h-12 w-12 rounded-full bg-cta text-white sm:flex items-center justify-center shadow-lg transition-all duration-300 ${
            showBackToTop
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Voltar ao topo"
          tabIndex={showBackToTop ? 0 : -1}
          aria-hidden={!showBackToTop}
        >
          <ArrowUpRight size={20} className="-rotate-45" />
        </button>

      </div>
    </ReactLenis>
  );
}
