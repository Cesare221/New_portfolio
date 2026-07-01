import { useEffect, useRef, useState } from "react";

export function LightPullThemeSwitcher({ isDark, onToggle, compact = false }) {
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const startY = useRef(0);
  const draggedRef = useRef(false);
  const threshold = compact ? 34 : 52;

  const handlePointerDown = (event) => {
    setDragging(true);
    setTriggered(false);
    draggedRef.current = false;
    startY.current = event.clientY ?? event.touches?.[0]?.clientY;
  };

  useEffect(() => {
    if (!dragging) return undefined;

    const onMove = (event) => {
      const y = event.clientY ?? event.touches?.[0]?.clientY;
      const delta = Math.max(0, Math.min(y - startY.current, threshold + 20));
      if (delta > 4) draggedRef.current = true;
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
    window.addEventListener("pointerup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, onToggle, threshold, triggered]);

  const handleClick = () => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    onToggle();
  };

  const progress = Math.min(dragY / threshold, 1);
  const bulbScale = 1 + progress * 0.15;
  const glowOpacity = isDark ? 0.8 - progress * 0.4 : 0.2 + progress * 0.6;
  const compactDrag = compact ? dragY * 0.42 : dragY;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-col items-center select-none rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-background ${compact ? "h-8 w-8 justify-center" : ""}`}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
    >
      <div className="relative flex flex-col items-center">
        {!compact && (
          <div
            className="w-px bg-gradient-to-b from-transparent transition-all duration-75"
            style={{
              height: `${24 + dragY * 0.6}px`,
              backgroundColor: isDark ? "rgba(250,249,245,0.25)" : "rgba(20,20,19,0.2)",
            }}
          />
        )}

        <div
          onPointerDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="relative flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing transition-colors duration-300"
          style={{
            width: compact ? 30 : 32,
            height: compact ? 30 : 32,
            transform: `translateY(${compactDrag}px) scale(${bulbScale})`,
            transition: dragging ? "transform 0.05s" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            backgroundColor: isDark ? "rgba(250,249,245,0.08)" : "rgba(20,20,19,0.06)",
            border: isDark ? "1px solid rgba(250,249,245,0.15)" : "1px solid rgba(20,20,19,0.12)",
            boxShadow: isDark
              ? `0 0 ${12 + progress * 20}px ${4 + progress * 8}px rgba(204,120,92,${glowOpacity})`
              : `0 0 ${progress * 16}px ${progress * 6}px rgba(204,120,92,${glowOpacity})`,
          }}
        >
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
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </>
            )}
          </svg>
        </div>
      </div>

      {!compact && (
        <p
          className="mt-3 text-[11px] tracking-[0.12em] uppercase font-sans transition-all duration-300"
          style={{
            opacity: dragging ? 0 : 0.45,
            transform: `translateY(${dragY * 0.1}px)`,
            color: isDark ? "#a09d96" : "#6c6a64",
          }}
        >
          {triggered ? (isDark ? "Tema Claro" : "Tema Escuro") : "Puxe para mudar"}
        </p>
      )}
    </button>
  );
}
