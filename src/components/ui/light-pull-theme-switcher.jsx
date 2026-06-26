import { useRef, useState, useEffect } from "react";

/**
 * LightPullThemeSwitcher
 * Fiel ao comportamento do componente oldkong88/light-pull-theme-switcher do 21st.dev:
 * - Uma lâmpada/puxador que o usuário arrasta pra baixo para mudar o tema
 * - Drag ≥ threshold → toggle; release → volta à posição
 * - Visual de cordão animado
 */
export function LightPullThemeSwitcher({ isDark, onToggle }) {
  const [dragY, setDragY]         = useState(0);
  const [dragging, setDragging]   = useState(false);
  const [triggered, setTriggered] = useState(false);
  const startY   = useRef(0);
  const threshold = 52;

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setTriggered(false);
    startY.current = e.clientY ?? e.touches?.[0]?.clientY;
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      const delta = Math.max(0, Math.min(y - startY.current, threshold + 20));
      setDragY(delta);
      if (delta >= threshold && !triggered) {
        setTriggered(true);
      }
    };

    const onUp = () => {
      if (triggered) onToggle();
      setDragging(false);
      setTriggered(false);
      setDragY(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
    window.addEventListener("touchmove",   onMove, { passive: true });
    window.addEventListener("touchend",    onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   onUp);
      window.removeEventListener("touchmove",   onMove);
      window.removeEventListener("touchend",    onUp);
    };
  }, [dragging, triggered, onToggle]);

  const progress  = Math.min(dragY / threshold, 1);
  const bulbScale = 1 + progress * 0.15;
  const glowOpacity = isDark ? 0.8 - progress * 0.4 : 0.2 + progress * 0.6;

  return (
    <div className="flex flex-col items-center select-none" aria-label="Theme switcher — pull to toggle">
      {/* Cordão */}
      <div className="relative flex flex-col items-center">
        {/* Fio */}
        <div
          className="w-px bg-gradient-to-b from-transparent transition-all duration-75"
          style={{
            height: `${24 + dragY * 0.6}px`,
            backgroundColor: isDark ? "rgba(250,249,245,0.25)" : "rgba(20,20,19,0.2)",
          }}
        />

        {/* Puxador / lâmpada */}
        <div
          onPointerDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="relative flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing transition-colors duration-300"
          style={{
            width:  32,
            height: 32,
            transform: `translateY(${dragY}px) scale(${bulbScale})`,
            transition: dragging ? "transform 0.05s" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            backgroundColor: isDark ? "rgba(250,249,245,0.08)" : "rgba(20,20,19,0.06)",
            border: isDark ? "1px solid rgba(250,249,245,0.15)" : "1px solid rgba(20,20,19,0.12)",
            boxShadow: isDark
              ? `0 0 ${12 + progress * 20}px ${4 + progress * 8}px rgba(204,120,92,${glowOpacity})`
              : `0 0 ${progress * 16}px ${progress * 6}px rgba(204,120,92,${glowOpacity})`,
          }}
        >
          {/* Ícone lâmpada SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${isDark ? "text-on-dark" : "text-ink"}`}
          >
            {isDark ? (
              /* Lua */
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            ) : (
              /* Sol */
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1"  x2="12" y2="3"  />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1"  y1="12" x2="3"  y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Label */}
      <p
        className="mt-3 text-[11px] tracking-[0.12em] uppercase font-sans transition-all duration-300"
        style={{
          opacity: dragging ? 0 : 0.45,
          transform: `translateY(${dragY * 0.1}px)`,
          color: isDark ? "#a09d96" : "#6c6a64",
        }}
      >
        {triggered ? (isDark ? "Tema Claro ↑" : "Tema Escuro ↑") : "Puxe para mudar"}
      </p>
    </div>
  );
}
