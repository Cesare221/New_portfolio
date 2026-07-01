import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

import { SpotlightCard } from "./ui/spotlight-card.jsx";

// ProjectCard
export default function ProjectCard({
  title,
  description,
  problem,
  solution,
  impact,
  image,
  imageFit = "cover",
  tags = [],
  githubUrl = "",
  liveUrl = "#",
}) {
  const isContainedImage = imageFit === "contain";
  const hasGithubUrl = Boolean(githubUrl);

  return (
    <SpotlightCard
      as="article"
      glowColor="blue"
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-hairline bg-[hsl(var(--card)/0.98)] shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cta/35 hover:shadow-[0_18px_58px_rgba(15,23,42,0.14)] dark:border-white/12 dark:bg-[hsl(var(--card)/0.96)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.38)] dark:hover:shadow-[0_22px_70px_rgba(0,0,0,0.5)]"
    >
      <div className={`relative h-56 overflow-hidden ${isContainedImage ? "bg-[#071017]" : "bg-background"}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${isContainedImage ? "object-contain p-3" : "object-cover"}`}
        />
        {!isContainedImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        )}
      </div>

      <div className="flex flex-grow flex-col p-xl">
        <h3 className="mb-3 font-display text-[20px] font-medium leading-snug tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-cta">
          {title}
        </h3>

        <p className="mb-5 text-body-sm leading-relaxed text-muted">
          {description}
        </p>

        <dl className="mb-6 flex-grow space-y-3">
          {[
            ["Problema", problem],
            ["Solução", solution],
            ["Impacto", impact],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cta">
                {label}
              </dt>
              <dd className="mt-1 text-body-sm leading-relaxed text-muted">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-pill border border-hairline bg-background px-2.5 py-1 text-caption font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t border-hairline pt-4">
          {hasGithubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código do projeto ${title}`}
              className="flex items-center gap-1.5 text-body-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              <FaGithub size={15} />
              Código
            </a>
          )}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Acessar projeto ${title}`}
            className="flex items-center gap-1.5 text-body-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
          >
            <ArrowUpRight size={15} />
            Acessar
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

// SectionHeader
export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-4 font-display text-display-md font-normal text-balance text-foreground sm:text-display-lg">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-body-md text-balance text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Section
export function Section({ id, eyebrow, title, subtitle, children, className = "", bg = "" }) {
  return (
    <section id={id} className={`py-section gsap-reveal ${bg} ${className}`}>
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        {children}
      </div>
    </section>
  );
}
