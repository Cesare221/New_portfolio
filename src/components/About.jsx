import { MapPin, BriefcaseBusiness, Coffee, Quote } from 'lucide-react';
import { PERSONAL } from '../data/portfolio.js';
export default function About() {
 return (
 <section id="sobre" className="border-b border-white/10 bg-background py-14 sm:py-16 gsap-reveal">
 <div className="mx-auto grid max-w-content items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
 <div className="lg:col-start-2 lg:row-start-1">
              <div className="mb-6 max-w-xl text-left">
                <span className="eyebrow">
                  Sobre mim</span>
                <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl tracking-[-0.02em] text-balance">
                  Desenvolvedor com foco em{' '}
                  <em className="not-italic text-highlight">resultado</em>
                </h2>
              </div>

                {/* Texto */}
                <div className="space-y-4 max-w-2xl">
                  <p className="font-sans font-medium text-body-md leading-snug tracking-[-0.01em]">
                    Sou {PERSONAL.firstName}, estudante de Engenharia de Software,
                    e desenvolvo aplicações web com foco em resolver problemas reais.
                  </p>
                  <p className="text-body-md text-muted leading-relaxed">
                    Com base sólida em <strong className="font-medium text-foreground">JavaScript, React e Node.js</strong>, busco as melhores práticas para construir aplicações robustas, rápidas e bem estruturadas — do backend à interface.
                  </p>
                  <p className="text-body-md text-muted leading-relaxed">
                    Acredito que um bom código é aquele que outra pessoa consegue ler, manter e aprimorar com confiança. Gosto de colaborar, compartilhar contexto e enfrentar problemas que exigem mais do que apenas digitar.
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                  <li className="inline-flex items-center gap-2"><MapPin size={18} aria-hidden="true" />Brasil</li>
                  <li className="inline-flex items-center gap-2"><BriefcaseBusiness size={18} aria-hidden="true" />Disponível para novos projetos</li>
                  <li className="inline-flex items-center gap-2"><Coffee size={18} aria-hidden="true" />Movido a café e boas ideias</li>
                </ul>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <p className="self-center font-serif text-2xl italic leading-relaxed text-foreground/90">Construindo soluções reais através da tecnologia.</p>
                  <blockquote className="border-l-2 border-brand bg-white/[0.02] px-5 py-4">
                    <Quote size={22} aria-hidden="true" className="mb-2 text-brand" />
                    <p className="text-sm leading-relaxed text-muted">Disciplina transforma ideias em resultados.</p>
                  </blockquote>
                </div>

 </div>
                {/* Foto */}
                <div className="mx-auto w-full max-w-[320px] lg:col-start-1 lg:row-start-1 lg:ml-0 lg:max-w-[360px]">
                  <div className="relative aspect-[1000/1092] rounded-sm overflow-hidden bg-background">
                    <img
                      src={PERSONAL.aboutPortrait.src}
                      width={PERSONAL.aboutPortrait.width}
                      height={PERSONAL.aboutPortrait.height}
                      loading="lazy"
                      decoding="async"
                      alt={`Retrato de ${PERSONAL.name} sorrindo`}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>


 </div>
 </section>
 );
}
