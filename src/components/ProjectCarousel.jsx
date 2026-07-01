import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ProjectCard from './ProjectCard.jsx';

export default function ProjectCarousel({ projects = [] }) {
  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanScrollPrev(node.scrollLeft > 8);
    setCanScrollNext(node.scrollLeft < maxScrollLeft - 8);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    updateScrollState();
    node.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [projects.length, updateScrollState]);

  const scroll = (direction) => {
    const node = scrollRef.current;
    if (!node) return;

    const scrollAmount = Math.min(node.clientWidth * 0.86, 920);
    node.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="project-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pr-4"
        aria-label="Carrossel de projetos em destaque"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex min-w-[min(88vw,360px)] snap-start md:min-w-[calc((100%_-_20px)/2)] lg:min-w-[calc((100%_-_40px)/3)]"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-background/80 text-muted shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
          aria-label="Ver projetos anteriores"
        >
          <ChevronLeft size={19} />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-background/80 text-muted shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
          aria-label="Ver próximos projetos"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}
