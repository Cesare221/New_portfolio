import { ArrowUpRight, Pause, Play } from "lucide-react";
import { PERSONAL } from "../data/portfolio.js";
import MatrixRain from "./ui/matrix-rain.jsx";

export default function Hero({ borderDim, matrixPaused, onToggleMatrix, showMotionControl }) {
  return (
    <section
      id="inicio"
      className="relative isolate border-b border-white/10 bg-background"
    >
      <div aria-hidden="true" className="hero-matrix-backdrop">
        {['left', 'right'].map((side) => (
          <MatrixRain
            key={side}
            className={`hero-matrix hero-matrix--${side}`}
            background="#0a0a0a"
            color="#ef3434"
            highlight="#ff7777"
            fontSize={16}
            density={0.5}
            speed={0.3}
            glow={2}
            trail={0.86}
            paused={matrixPaused}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto grid max-w-content grid-cols-1 items-center gap-6 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:px-8 lg:pb-12 lg:pt-28">
        {/* Apresentação */}
        <div className="relative z-10 min-w-0">
          <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-muted">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-brand"
            />
            <span className="sr-only">
              Desenvolvedor de software
            </span>
            <span aria-hidden="true">
              {"Desenvolvedor de software".split("").map((letter, index) => (
                <span key={index} className="hero-letter">
                  {letter}
                </span>
              ))}
            </span>
          </p>

          <h1
            aria-label={PERSONAL.name}
            className="font-display text-[clamp(2.5rem,6vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]"
          >
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-foreground">
                {PERSONAL.firstName}
              </span>
            </span>

            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-brand">
                {PERSONAL.lastname}
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-body-md font-medium leading-relaxed text-foreground">
            {PERSONAL.role}
          </p>

          <p className="hero-sub mt-4 max-w-lg text-body-md leading-relaxed text-muted [text-wrap:pretty]">
            Desenvolvo aplicações web, automações e integrações para resolver problemas reais.
          </p>

          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Ver projetos
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <a
              href="#contato"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border ${borderDim} px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card`}
            >
              Entrar em contato
            </a>
          </div>

          <div className="hero-sub mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-relaxed text-muted">
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
            />
            Disponível para novos projetos
          </p>
          {showMotionControl && (
            <button
              type="button"
              aria-pressed={matrixPaused}
              aria-label={matrixPaused ? 'Retomar animações de fundo' : 'Pausar animações de fundo'}
              onClick={onToggleMatrix}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 transition-colors hover:text-foreground"
            >
              {matrixPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
              {matrixPaused ? 'Retomar animação' : 'Pausar animação'}
            </button>
          )}
          </div>
        </div>

        {/* Foto no ambiente de trabalho */}
        <div className="relative isolate aspect-[4/3] w-full min-w-0 overflow-hidden">
          <img
            src={PERSONAL.heroPortrait.src}
            width={PERSONAL.heroPortrait.width}
            height={PERSONAL.heroPortrait.height}
            alt={`${PERSONAL.name} em seu ambiente de trabalho`}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[15%] bg-gradient-to-r from-background to-transparent lg:block"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-background to-transparent" />
          <p className="absolute bottom-5 right-4 border-l-2 border-brand pl-3 text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-foreground sm:right-6">
            Tecnologia<br />Automação<br />Produtividade<br />Resultados
          </p>
        </div>
      </div>
    </section>
  );
}
