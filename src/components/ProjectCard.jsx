import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

import { SpotlightCard } from "./ui/spotlight-card.jsx";

// ── ProjectCard ─────────────────────────────────────────────────────
export default function ProjectCard({
  title,
  description,
  problem,
  solution,
  impact,
  image,
  imageFit = "cover",
  tags = [],
  githubUrl = "#",
  liveUrl = "#",
}) {
  const isContainedImage = imageFit === "contain";

  return (
    <SpotlightCard
      as="article"
      glowColor="blue"
      className="group flex h-full w-full flex-col rounded-xl bg-[hsl(var(--card)/0.98)] dark:bg-[hsl(var(--card)/0.96)] border border-hairline dark:border-white/12 overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm transition-all duration-300 hover:border-cta/35 hover:shadow-[0_18px_58px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_22px_70px_rgba(0,0,0,0.5)] hover:-translate-y-1"
    >

      {/* Imagem */}
      <div className={`relative h-56 overflow-hidden ${isContainedImage ? "bg-[#071017]" : "bg-background"}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${isContainedImage ? "object-contain p-3" : "object-cover"}`}
        />
        {!isContainedImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        )}
      </div>

      {/* Corpo */}
      <div className="flex flex-col flex-grow p-xl">
        <h3 className="font-display font-medium text-[20px] leading-snug tracking-[-0.01em] text-foreground mb-3 group-hover:text-cta transition-colors duration-200">
          {title}
        </h3>

        <p className="text-body-sm text-muted leading-relaxed mb-5">
          {description}
        </p>

        <dl className="space-y-3 mb-6 flex-grow">
          {[
            ["Problema", problem],
            ["Solução", solution],
            ["Impacto", impact],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cta">
                {label}
              </dt>
              <dd className="mt-1 text-body-sm text-muted leading-relaxed">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-pill text-caption font-medium bg-background text-muted border border-hairline"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 pt-4 border-t border-hairline">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver código do projeto ${title}`}
            className="flex items-center gap-1.5 text-body-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
          >
            <FaGithub size={15} />
            Código
          </a>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Acessar projeto ${title}`}
            className="flex items-center gap-1.5 text-body-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
          >
            <ArrowUpRight size={15} />
            Acessar
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

// ── SectionHeader ───────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-4 font-display font-normal text-display-md sm:text-display-lg text-foreground text-balance">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-body-md text-muted max-w-2xl mx-auto text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────
export function Section({ id, eyebrow, title, subtitle, children, className = "", bg = "" }) {
  return (
    <section id={id} className={`py-section gsap-reveal ${bg} ${className}`}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        {children}
      </div>
    </section>
  );
}
