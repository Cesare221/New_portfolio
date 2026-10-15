import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

// ProjectCard
export default function ProjectCard({
  title,
  description,
  problem,
  solution,
  impact,
  image,
  imageFit = "contain",
  tags = [],
  githubUrl = "",
  liveUrl = "",
  demoAvailable = true,
}) {
  const isContainedImage = imageFit === "contain";
  const hasGithubUrl = Boolean(githubUrl);
  const hasLiveUrl = Boolean(liveUrl && liveUrl !== "#");

  return (
    <article
      className="grid min-w-0 grid-cols-1 gap-6 py-8 first:pt-0 lg:grid-cols-5 lg:items-center lg:gap-10 lg:py-9">
      <div className="relative aspect-video min-w-0 overflow-hidden rounded-lg border border-white/10 bg-card lg:col-span-3">
        <img
          src={image}
          alt={`Visão geral do projeto ${title}`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${isContainedImage ? "object-contain p-3" : "object-cover"}`}
        />
        {!isContainedImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        )}
      </div>

      <div className="min-w-0 lg:col-span-2">
        <h3 className="mb-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h3>

        <p className="mb-5 text-body-md leading-relaxed text-muted">
          {description}
        </p>
        
        <details className="mb-6">
          <summary aria-label={`Detalhes do projeto ${title}`} className="cursor-pointer py-2 text-body-sm font-medium text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Detalhes do projeto
          </summary>

        <dl className="mt-3 space-y-3">
          {[
            ["Problema", problem],
            ["Solução", solution],
            ["Impacto", impact],
          ]
            .filter(([, value]) => Boolean(value?.trim()))
            .map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-highlight">
                {label}
              </dt>
              <dd className="mt-1 text-body-sm leading-relaxed text-muted">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        </details>

        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-pill border border-white/10 bg-background px-2.5 py-1 text-caption font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {hasGithubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código do projeto ${title}`}
              className="inline-flex min-h-11 items-center gap-2 text-body-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <FaGithub size={15} />
              Código
            </a>
          )}
          {demoAvailable && hasLiveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Acessar projeto ${title}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cta px-5 py-2 text-body-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
              <ArrowUpRight size={15} />
              Acessar
          </a>
        ) : (
          <span className="text-body-sm text-muted">
            {demoAvailable
              ? "Demonstração não disponível"
              : "Demo temporariamente indisponível"}
          </span>
        )}
        </div>
      </div>
    </article>
  );
}

// SectionHeader
export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-9 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-foreground sm:text-4xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-body-md text-balance text-muted ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Section
export function Section({ id, eyebrow, title, subtitle, children, className = "", bg = "", center = true, }) {
  return (
    <section id={id} className={`py-14 sm:py-16 gsap-reveal ${bg} ${className}`}>
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            center={center}
          />
        )}
        {children}
      </div>
    </section>
  );
}
