import { ArrowUpRight } from "lucide-react";
import { PERSONAL } from "../data/portfolio.js";

export default function Hero({ borderDim, scrollTo}){
    return (
        <section
            id="inicio"
            className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 pb-20 pt-36 lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12"
          >
            <div className="relative min-w-0 w-full text-left lg:col-start-2 lg:row-start-1 lg:text-right">
            
              {/* Eyebrow - Glassmorphic Capsule Badge com Pulsing Dot */}
              <div className="hero-sub mb-8 flex justify-start lg:justify-end">
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
                style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)' }}
              >
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block text-foreground">Cesar</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block text-brand">
                    Delmondes
                  </span>
                </span>
              </h1>

              {/* Role + Bio - High readability & spacing */}
              <div className="mt-8 max-w-2xl mx-auto space-y-4">
                <p className="hero-sub font-display text-sm font-semibold tracking-[0.16em] uppercase text-highlight">
                  {PERSONAL.role}
                </p>
                <p className="hero-sub text-body-md sm:text-title-sm leading-relaxed text-muted mt-4 max-w-xl mx-auto">
                  {PERSONAL.bio}
                </p>
              </div>

              {/* CTAs - Hover lift, Glow shadow, cursor:pointer */}
              <div className="hero-sub flex flex-wrap gap-4 mt-12 justify-start lg:justify-end">
                <button
                  onClick={() => scrollTo('#projetos')}
                  className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-lg bg-cta text-white text-sm font-semibold transition-all duration-300 hover:bg-cta/90 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                <p className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-7xl">
                    Desenvolvedor 
                    <br/>
                    de Software
                </p>

                <p className="mt-5 text-sm text-muted">
                    Aplicações web • Automações • Integrações • APIs
                </p>
            <div className="mt-8 aspect-[4/3] overflow-hidden rounded-lg">
                <img
                    src="/images/aboutphoto.jpeg"
                    alt="Cesar Delmondes"
                    className="h-full w-full object-cover object-[center_35%]"
                />
            </div>
        </div>
    </section>
    );
}

