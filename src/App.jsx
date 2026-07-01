import { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaGitAlt, FaPython, FaGithub, FaLinkedin,
  FaWhatsapp, FaDocker,
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss,
  SiNextdotjs, SiPostgresql, SiPrisma,
} from 'react-icons/si';
import { Menu, X, ArrowUpRight, Copy, Check } from 'lucide-react';

import { Section } from './components/ProjectCard.jsx';
import ProjectCarousel from './components/ProjectCarousel.jsx';
import { TechMarquee }            from './components/ui/tech-marquee.jsx';
import { LightPullThemeSwitcher } from './components/ui/light-pull-theme-switcher.jsx';
import OrbCursor                  from './components/ui/OrbCursor.jsx';
import { NAV_LINKS, PERSONAL, PROJECTS, TECH_STACK } from './data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

const AntigravityBackground = lazy(() => import('./components/ui/AntigravityBackground.jsx'));

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────

const TECH_ICONS = {
  javascript: <SiJavascript size={18} color="#F7DF1E" />,
  typescript: <SiTypescript size={18} color="#3178C6" />,
  react: <FaReact size={18} color="#61DAFB" />,
  nextjs: <SiNextdotjs size={18} color="#888" />,
  nodejs: <FaNodeJs size={18} color="#3C873A" />,
  tailwind: <SiTailwindcss size={18} color="#06B6D4" />,
  python: <FaPython size={18} color="#3776AB" />,
  postgresql: <SiPostgresql size={18} color="#4169E1" />,
  prisma: <SiPrisma size={18} color="#888" />,
  docker: <FaDocker size={18} color="#2496ED" />,
  html5: <FaHtml5 size={18} color="#E34F26" />,
  css3: <FaCss3Alt size={18} color="#1572B6" />,
  git: <FaGitAlt size={18} color="#F05032" />,
};

const techStackWithIcons = TECH_STACK.map((item) => ({
  ...item,
  icon: TECH_ICONS[item.icon],
}));

// ─────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  if (isDark) document.documentElement.classList.add('dark');
  return isDark;
}

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
  const [isDark, setIsDark] = useState(() => typeof window !== 'undefined' ? initTheme() : false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef  = useRef(null);

  // Sync theme class + localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const toggleTheme = () => setIsDark((v) => !v);

  // GSAP — scroll reveals + header + active section
  useGSAP(() => {
    if (prefersReducedMotion) return undefined;

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
    gsap.from('.hero-sub', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.18, delay: 0.65 });

    // Header scroll
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        setScrolled(self.direction === 1 && self.progress > 0);
      }
    });
    
    // Active section highlighting
    gsap.utils.toArray('section[id]').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center+=20%',
        end: 'bottom center-=20%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(section.id);
          }
        },
      });
    });

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

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
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // ── Background helpers ───────────────────────────────────────────
  const bgCanvas  = 'bg-background';
  const bgCard    = 'bg-card';
  const borderDim = 'border-hairline dark:border-white/[0.07]';

  return (
    <ReactLenis root options={{ lerp: prefersReducedMotion ? 1 : 0.06, duration: prefersReducedMotion ? 0 : 1.2 }}>
      <div
        ref={containerRef}
        className={`min-h-screen ${bgCanvas} text-foreground font-sans relative overflow-x-hidden transition-colors duration-350`}
      >
        {/* Canvas overlays */}
        {!prefersReducedMotion && (
          <>
            <OrbCursor />
            <Suspense fallback={null}>
              <AntigravityBackground
                theme={isDark ? 'dark' : 'light'}
                density={95}
                opacity={isDark ? 0.42 : 0.28}
                particlesScale={0.42}
                ringWidth={0.1}
                ringWidth2={0.035}
                ringDisplacement={0.08}
              />
            </Suspense>
          </>
        )}
        {/* ══════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════ */}
        <header className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="mx-auto w-full px-3 sm:px-5 lg:px-8 xl:px-12">
            <div className={`mt-5 flex items-center justify-between h-[76px] bg-background/65 border ${borderDim} backdrop-blur-lg rounded-2xl px-5 sm:px-7 shadow-sm shadow-black/5 dark:shadow-black/20`}>

              {/* Logo + wordmark */}
              <a href="#inicio" className="flex items-center gap-2.5 group" aria-label="Início">
                 <img
                  src="/images/logoportifolio.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-lg object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">
                   {PERSONAL.firstName}
                </span>
              </a>

              {/* Nav — desktop */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className={`h-10 px-5 flex items-center rounded-lg text-nav-link font-medium transition-colors duration-200 ${activeSection === link.href.substring(1) ? 'bg-card text-foreground' : 'text-muted hover:bg-card/50 hover:text-foreground'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>

              {/* Right cluster — desktop */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scrollTo('#contato')}
                  className="h-11 px-6 rounded-lg bg-cta hover:opacity-90 text-button font-medium text-white transition-opacity duration-200"
                >
                  Fale Comigo
                </button>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${borderDim} bg-card/45 backdrop-blur-md`}>
                  <LightPullThemeSwitcher compact isDark={isDark} onToggle={toggleTheme} />
                </div>
              </div>

              {/* Mobile controls */}
              <div className="md:hidden flex items-center gap-2">
                 <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${borderDim} bg-card/45 backdrop-blur-md`}>
                  <LightPullThemeSwitcher compact isDark={isDark} onToggle={toggleTheme} />
                </div>
                 <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-3 text-muted hover:text-foreground"
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu drawer */}
          {menuOpen && (
            <div
              id="mobile-navigation"
              className={`md:hidden ${bgCanvas} border-b ${borderDim} px-5 pb-6 pt-3 shadow-xl shadow-black/10`}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="flex w-full items-center py-4 text-title-sm font-medium text-muted hover:text-foreground border-b last:border-0 border-hairline dark:border-white/[0.07] transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </header>

        <main>
          {/* ══════════════════════════════════════════════
              HERO
          ══════════════════════════════════════════════ */}
          <section
            id="inicio"
            className="relative flex flex-col justify-center items-center text-center min-h-[calc(100dvh-64px)] pt-32 pb-section px-4"
          >
            {/* Decoração sutil de fundo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -top-24 right-1/4 w-[640px] h-[640px] rounded-full bg-cta/[0.04] dark:bg-cta/[0.06] blur-3xl" />
              <div className="absolute bottom-0 -left-32 w-[480px] h-[480px] rounded-full bg-accent-amber/[0.03] dark:bg-accent-amber/[0.04] blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto w-full">
              {/* Eyebrow - Glassmorphic Capsule Badge com Pulsing Dot */}
              <div className="hero-sub mb-8 text-center flex justify-center">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-[11px] font-bold uppercase tracking-[0.14em] bg-card/70 dark:bg-white/[0.02] border ${borderDim} text-muted/95 backdrop-blur-md`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Disponível para novos projetos
                </span>
              </div>

              {/* Display headline - Space Grotesk premium typography */}
              <h1
                aria-label={PERSONAL.name}
                className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-balance"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 6.2rem)' }}
              >
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block text-foreground">Cesar</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-cta to-indigo-500 dark:from-cta dark:to-cyan-400">
                    Delmondes
                  </span>
                </span>
              </h1>

              {/* Role + Bio - High readability & spacing */}
              <div className="mt-8 max-w-2xl mx-auto space-y-4">
                <p className="hero-sub font-display text-sm font-semibold tracking-[0.16em] uppercase text-cta">
                  {PERSONAL.role}
                </p>
                <p className="hero-sub text-body-md sm:text-title-sm leading-relaxed text-muted mt-4 max-w-xl mx-auto">
                  {PERSONAL.bio}
                </p>
              </div>

              {/* CTAs - Hover lift, Glow shadow, cursor:pointer */}
              <div className="hero-sub flex flex-wrap gap-4 mt-12 justify-center">
                <button
                  onClick={() => scrollTo('#projetos')}
                  className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-lg bg-cta text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Ver Projetos
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center h-12 px-7 rounded-lg border ${borderDim} bg-white/[0.02] dark:bg-white/[0.01] hover:bg-card/90 text-foreground text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-sm`}
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SOBRE
          ══════════════════════════════════════════════ */}
          <section
            id="sobre"
            className={`py-section ${bgCard} gsap-reveal`}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

              <div className="mb-14 text-center">
                <span className="eyebrow justify-center">Quem sou eu</span>
                <h2 className="mt-4 font-display font-normal text-display-md sm:text-display-lg tracking-[-0.02em] text-balance">
                  Desenvolvedor com foco em{' '}
                  <em className="not-italic text-cta">resultado</em>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                {/* Foto */}
                <div className="md:col-span-2">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-background">
                    <img
                      src="/images/aboutphoto.jpeg"
                      alt="Cesar Delmondes"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Texto */}
                <div className="md:col-span-3 space-y-5">
                  <p className="font-display font-normal text-display-sm leading-snug tracking-[-0.01em]">
                    Minha missão é criar soluções digitais que funcionam bem <em className="not-italic text-cta">e</em> comunicam com clareza.
                  </p>
                  <p className="text-body-md text-muted leading-relaxed">
                    Com base sólida em <strong className="font-medium text-foreground">JavaScript, React e Node.js</strong>, busco as melhores práticas para construir aplicações robustas, rápidas e bem estruturadas — do backend à interface.
                  </p>
                  <p className="text-body-md text-muted leading-relaxed">
                    Acredito que bom código é aquele que outra pessoa consegue ler, manter e evoluir com confiança. Gosto de colaborar, trocar contexto e enfrentar problemas que exigem mais do que apenas digitar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              STACK — apenas o marquee
          ══════════════════════════════════════════════ */}
          <section
            id="stack"
            className={`py-section ${bgCanvas} gsap-reveal`}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
              <span className="eyebrow justify-center">Stack técnico</span>
              <h2 className="mt-4 font-display font-normal text-display-md sm:text-display-lg tracking-[-0.02em]">
                Tecnologias que uso
              </h2>
            </div>

            <TechMarquee items={techStackWithIcons} speed={28} />
          </section>

          {/* ══════════════════════════════════════════════
              PROJETOS
          ══════════════════════════════════════════════ */}
          <Section
            id="projetos"
            eyebrow="Portfólio"
            title="Projetos em destaque"
            subtitle="Trabalhos recentes com foco em engenharia sólida e experiência do usuário bem pensada."
            bg={`${bgCard}`}
            className="gsap-reveal"
          >
            <ProjectCarousel projects={PROJECTS} />
          </Section>

          {/* ══════════════════════════════════════════════
              CONTATO
          ══════════════════════════════════════════════ */}
          <section
            id="contato"
            className={`py-section ${bgCanvas} gsap-reveal`}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

              <div className={`rounded-xl bg-[hsl(var(--card)/0.98)] dark:bg-[hsl(var(--card)/0.96)] border ${borderDim} px-xxl py-xxl md:px-16 md:py-16 text-center text-foreground shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_22px_80px_rgba(0,0,0,0.36)] backdrop-blur-md`}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted mb-6">
                  <span className="block w-4 h-px bg-cta/60" />
                  Vamos conversar
                </span>

                <h2 className="font-display font-normal text-display-md sm:text-display-lg tracking-[-0.02em] text-balance">
                  Tem um projeto em mente?
                </h2>

                <p className="mt-5 text-body-md text-muted max-w-xl mx-auto leading-relaxed">
                  Aberto a novas oportunidades, colaborações e projetos desafiadores. Me fala o que você tem em mente.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                  <button
                    onClick={() => handleCopyToClipboard(PERSONAL.email)}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-cta text-white text-button font-medium shadow-sm shadow-cta/20 hover:opacity-90 transition-opacity duration-200"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Email Copiado!' : PERSONAL.email}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-hairline dark:border-white/10">
                  {[
                    { href: PERSONAL.github,   icon: <FaGithub   size={20} />, label: 'GitHub de Cesar'   },
                    { href: PERSONAL.linkedin,  icon: <FaLinkedin size={20} />, label: 'LinkedIn de Cesar'  },
                    { href: PERSONAL.whatsapp,  icon: <FaWhatsapp size={20} />, label: 'WhatsApp de Cesar'  },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted hover:text-foreground transition-colors duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer className={`bg-card py-10 px-4`}>
          <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-display font-normal text-[16px] text-muted tracking-[-0.01em]">
               {PERSONAL.name}
            </span>
            <p className="text-body-sm text-muted">
              © {new Date().getFullYear()} · Todos os direitos reservados.
            </p>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button
          onClick={() => scrollTo('#inicio')}
          className={`fixed bottom-6 right-6 hidden h-12 w-12 rounded-full bg-cta text-white sm:flex items-center justify-center shadow-lg transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          aria-label="Voltar ao topo"
        >
          <ArrowUpRight size={20} className="-rotate-45" />
        </button>

      </div>
    </ReactLenis>
  );
}
