
export function TechMarquee({ 
  items = [], 
  speed = 30, 
  paused = false,
}) {

  const doubled  = [...items, ...items];
  const duration = `${Math.round((items.length * 180) / speed)}s`;

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* fade esquerda */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      {/* fade direita */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]"
        style={{ 
          animationDuration: duration, 
          animationPlayState: paused ? 'paused' : undefined,

        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="mx-2.5 flex h-11 shrink-0 items-center gap-2.5 rounded-lg border border-white/10 bg-card px-4 text-body-sm font-medium text-muted transition-colors duration-200 hover:border-cta/30 hover:text-foreground"
          >
            <span className="flex shrink-0 items-center">{item.icon}</span>
            <span className="whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
