import { useCallback, useRef } from 'react';

const GLOW_COLORS = {
  blue: { base: 221, spread: 32 },
  purple: { base: 265, spread: 36 },
  green: { base: 150, spread: 28 },
  orange: { base: 34, spread: 26 },
  red: { base: 0, spread: 0},
};

export function SpotlightCard({
  as: Component = 'div',
  children,
  className = '',
  glowColor = 'blue',
  ...props
}) {
  const cardRef = useRef(null);
  const { base, spread } = GLOW_COLORS[glowColor] ?? GLOW_COLORS.blue;

  const handlePointerMove = useCallback((event) => {
    const node = cardRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xp = rect.width > 0 ? x / rect.width : 0.5;

    node.style.setProperty('--spotlight-x', `${x}px`);
    node.style.setProperty('--spotlight-y', `${y}px`);
    node.style.setProperty('--spotlight-hue', `${base + xp * spread}`);
  }, [base, spread]);

  return (
    <Component
      ref={cardRef}
      data-spotlight-card
      onPointerMove={handlePointerMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
