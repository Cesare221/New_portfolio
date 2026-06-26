import { useState, useRef, useEffect } from 'react';
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

import ProjectCard, { Section } from './components/ProjectCard.jsx';
import { TechMarquee }            from './components/ui/tech-marquee.jsx';
import { LightPullThemeSwitcher } from './components/ui/light-pull-theme-switcher.jsx';
import OrbCursor                  from './components/ui/OrbCursor.jsx';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────

const PERSONAL = {
  name:      'Cesar Delmondes',
  firstName: 'Cesar',
  role:      'Desenvolvedor Full-stack',
  bio:       'Transformo ideias em experiências web precisas e escaláveis — com foco em código limpo, performance real e interfaces que comunicam intenção.',
  email:     'cesar@exemplo.com',
  linkedin:  'https://linkedin.com/in/cdelmondes',
  github:    'https://github.com/cdelmondes',
  whatsapp:  'https://wa.me/5562982623408',
};

const TECH_STACK = [
  { name: 'JavaScript',   icon: <SiJavascript  size={18} color="#F7DF1E" /> },
  { name: 'TypeScript',   icon: <SiTypescript  size={18} color="#3178C6" /> },
  { name: 'React',        icon: <FaReact       size={18} color="#61DAFB" /> },
  { name: 'Next.js',      icon: <SiNextdotjs   size={18} color="#888"    /> },
  { name: 'Node.js',      icon: <FaNodeJs      size={18} color="#3C873A" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={18} color="#06B6D4" /> },
  { name: 'Python',       icon: <FaPython      size={18} color="#3776AB" /> },
  { name: 'PostgreSQL',   icon: <SiPostgresql  size={18} color="#4169E1" /> },
  { name: 'Prisma',       icon: <SiPrisma      size={18} color="#888"    /> },
  { name: 'Docker',       icon: <FaDocker      size={18} color="#2496ED" /> },
  { name: 'HTML5',        icon: <FaHtml5       size={18} color="#E34F26" /> },
  { name: 'CSS3',         icon: <FaCss3Alt     size={18} color="#1572B6" /> },
  { name: 'Git',          icon: <FaGitAlt      size={18} color="#F05032" /> },
];

const PROJECTS = [
  {
    id: 1,
    title:       'Sistema de Gestão Financeira',
    description: 'Aplicação completa para controle de finanças pessoais com dashboards interativos, relatórios mensais e integração com APIs bancárias.',
    image:       'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags:        ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    liveUrl:     '#',
    githubUrl:   '#',
  },
  {
    id: 2,
    title:       'E-commerce de Tecnologia',
    description: 'Plataforma de vendas online com carrinho, pagamentos Stripe e painel administrativo para gestão de produtos.',
    image:       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags:        ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    liveUrl:     '#',
    githubUrl:   '#',
  },
  {
    id: 3,
    title:       'App de Produtividade',
    description: 'Aplicativo web com método Pomodoro, gestão de tarefas, sincronização em tempo real e suporte offline.',
    image:       'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
    tags:        ['React', 'Firebase', 'PWA'],
    liveUrl:     '#',
    githubUrl:   '#',
  },
];

const NAV_LINKS = [
  { name: 'Início',      href: '#inicio'     },
  { name: 'Sobre',       href: '#sobre'       },
  { name: 'Stack',       href: '#stack'       },
  { name: 'Projetos',    href: '#projetos'    },
  { name: 'Contato',     href: '#contato'     },
];

// ─────────────────────────────────────────────────────────────────────
// THEME INIT
// ─────────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  if (isDark) document.documentElement.classList.add('dark');
  return isDark;
}

// ─────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => typeof window !== 'undefined' ? initTheme() : false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [copied, setCopied] = useState(false);

  const containerRef  = useRef(null);

  // Sync theme class + localStorage
  useEffect(() => {
    const html = document.documentElement;
    isDark ? html.classList.add('dark') : html.classList.remove('dark');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  // GSAP — scroll reveals + header + active section
  useGSAP(() => {
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

  }, { scope: containerRef });

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2 }}>
      <div
        ref={containerRef}
        className={`min-h-screen ${bgCanvas} text-foreground font-sans relative overflow-x-hidden transition-colors duration-350`}
      >
        {/* Canvas overlays */}
        <OrbCursor />
        <div className="fixed top-4 right-4 z-50">
          <LightPullThemeSwitcher isDark={isDark} onToggle={toggleTheme} />
        </div>

        {/* ══════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════ */}
        <header className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mt-4 flex items-center justify-between h-[64px] bg-background/60 border ${borderDim} backdrop-blur-lg rounded-xl px-6`}>

              {/* Logo + wordmark */}
              <a href="#inicio" className="flex items-center gap-2.5 group" aria-label="Início">
                 <img
                  src="/images/logoportifolio.jpeg"
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-sm object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-display text-[18px] font-medium tracking-[-0.01em]">
                   {PERSONAL.firstName}
                </span>
              </a>

              {/* Nav — desktop */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className={`h-9 px-4 flex items-center rounded-md text-nav-link font-medium transition-colors duration-200 ${activeSection === link.href.substring(1) ? 'bg-card text-foreground' : 'text-muted hover:bg-card/50 hover:text-foreground'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>

              {/* Right cluster — desktop */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scrollTo('#contato')}
                  className="h-10 px-5 rounded-md bg-cta hover:opacity-90 text-button font-medium text-white transition-opacity duration-200"
                >
                  Fale Comigo
                </button>
              </div>

              {/* Mobile controls */}
              <div className="md:hidden flex items-center gap-2">
                 <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 text-muted hover:text-foreground"
                  aria-label="Menu"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu drawer */}
          {menuOpen && (
            <div className={`md:hidden ${bgCanvas} border-b ${borderDim} px-4 pb-4 pt-1`}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="flex w-full items-center py-3.5 text-body-md font-medium text-muted hover:text-foreground border-b last:border-0 border-hairline dark:border-white/[0.07] transition-colors"
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

            <div className="relative max-w-3xl mx-auto w-full">
              {/* Eyebrow */}
              <div className="hero-sub mb-8">
                <span className="eyebrow justify-center">Disponível para novos projetos</span>
              </div>

              {/* Display headline */}
              <h1
                className="font-display font-bold tracking-[-0.04em] leading-[0.92]"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
              >
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block">{PERSONAL.role}</span>
                </span>
              </h1>

              {/* Bio */}
              <div className="mt-8 max-w-2xl mx-auto">
                <p className="hero-sub text-body-md leading-relaxed text-balance text-muted">
                  {PERSONAL.bio}
                </p>
              </div>

              {/* CTAs */}
              <div className="hero-sub flex flex-wrap gap-3 mt-10 justify-center">
                <button
                  onClick={() => scrollTo('#projetos')}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-cta hover:opacity-90 text-white text-button font-medium transition-opacity duration-200"
                >
                  Ver Projetos
                  <ArrowUpRight size={15} />
                </button>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center h-11 px-6 rounded-md border ${borderDim} bg-background/50 hover:bg-card text-foreground text-button font-medium transition-colors duration-200`}
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

            <TechMarquee items={TECH_STACK} speed={28} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-0">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </Section>

          {/* ══════════════════════════════════════════════
              CONTATO
          ══════════════════════════════════════════════ */}
          <section
            id="contato"
            className={`py-section ${bgCanvas} gsap-reveal`}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

              <div className="rounded-xl bg-cta px-xxl py-xxl md:px-16 md:py-16 text-center text-white">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 mb-6">
                  <span className="block w-4 h-px bg-white/50" />
                  Vamos conversar
                </span>

                <h2 className="font-display font-normal text-display-md sm:text-display-lg tracking-[-0.02em] text-balance">
                  Tem um projeto em mente?
                </h2>

                <p className="mt-5 text-body-md text-white/75 max-w-xl mx-auto leading-relaxed">
                  Aberto a novas oportunidades, colaborações e projetos desafiadores. Me fala o que você tem em mente.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                  <button
                    onClick={() => handleCopyToClipboard(PERSONAL.email)}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-white text-cta text-button font-medium hover:bg-background/80 transition-colors duration-200"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Email Copiado!' : PERSONAL.email}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20">
                  {[
                    { href: PERSONAL.github,   icon: <FaGithub   size={20} />, label: 'GitHub'   },
                    { href: PERSONAL.linkedin,  icon: <FaLinkedin size={20} />, label: 'LinkedIn'  },
                    { href: PERSONAL.whatsapp,  icon: <FaWhatsapp size={20} />, label: 'WhatsApp'  },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="text-white/60 hover:text-white transition-colors duration-200"
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
          className={`fixed bottom-6 right-6 h-12 w-12 rounded-full bg-cta text-white flex items-center justify-center shadow-lg transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          aria-label="Voltar ao topo"
        >
          <ArrowUpRight size={20} className="-rotate-45" />
        </button>

      </div>
    </ReactLenis>
  );
}
