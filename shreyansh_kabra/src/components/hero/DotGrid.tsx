import { useEffect, useRef } from "react";

/**
 * Signature interaction: a canvas dot-grid that reacts to the cursor.
 * Dots near the pointer brighten, scale up, and gently push away, creating
 * a subtle "field" effect. Fully theme-aware (reads the current accent from
 * CSS custom properties) and disabled for users who prefer reduced motion.
 *
 * The animation loop only runs while the pointer is near the hero and the
 * hero is on screen; otherwise a single static frame is drawn.
 */
const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GAP = 34; // px between dots
    const BASE_RADIUS = 1.4;
    const INFLUENCE = 140; // px radius of cursor influence
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number }[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let visible = true;

    const hexToRgb = (hex: string) => {
      const h = hex.replace("#", "");
      const full =
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h;
      const int = parseInt(full, 16);
      return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
    };

    // Resolve theme colors from CSS variables once (re-read on theme change).
    const readColors = () => {
      const styles = getComputedStyle(document.body);
      return {
        base: hexToRgb(
          styles.getPropertyValue("--gray-dark").trim() || "#6b6459"
        ),
        accent: hexToRgb(
          styles.getPropertyValue("--primary").trim() || "#c2551f"
        ),
      };
    };
    let colors = readColors();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      dots = [];
      const cols = Math.floor(width / GAP);
      const rows = Math.floor(height / GAP);
      const offsetX = (width - (cols - 1) * GAP) / 2;
      const offsetY = (height - (rows - 1) * GAP) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offsetX + c * GAP, y: offsetY + r * GAP });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const b = colors.base;
      const a = colors.accent;

      for (const dot of dots) {
        let radius = BASE_RADIUS;
        let alpha = 0.28;
        let rgb = b;

        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            const t = 1 - dist / INFLUENCE; // 0..1, strongest at cursor
            radius = BASE_RADIUS + t * 2.6;
            alpha = 0.28 + t * 0.6;
            // Blend base -> accent by proximity.
            rgb = {
              r: Math.round(b.r + (a.r - b.r) * t),
              g: Math.round(b.g + (a.g - b.g) * t),
              b: Math.round(b.b + (a.b - b.b) * t),
            };
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.fill();
      }
    };

    // Draw one frame per pointer update; once the pointer leaves, the final
    // frame renders the static grid and the loop goes idle.
    const frame = () => {
      rafId = 0;
      draw();
    };
    const schedule = () => {
      if (!rafId && visible) rafId = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const wasActive = pointer.active;
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      // Only "active" when close enough to affect any dot.
      pointer.active =
        pointer.x > -INFLUENCE &&
        pointer.x < width + INFLUENCE &&
        pointer.y > -INFLUENCE &&
        pointer.y < height + INFLUENCE;
      if (pointer.active || wasActive) schedule();
    };
    const onPointerLeaveWindow = () => {
      if (!pointer.active) return;
      pointer.active = false;
      schedule();
    };
    const onResize = () => {
      build();
      draw();
    };
    const onThemeChange = () => {
      colors = readColors();
      draw();
    };

    build();
    draw();

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      document.documentElement.addEventListener(
        "pointerleave",
        onPointerLeaveWindow
      );
    }

    // Skip work entirely while the hero is scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        schedule(); // catch up on any frame skipped while hidden
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });
    visibilityObserver.observe(canvas);

    window.addEventListener("resize", onResize);
    // Redraw colors when the theme toggles (dark-mode class on body).
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeaveWindow
      );
      window.removeEventListener("resize", onResize);
      visibilityObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-dotgrid" aria-hidden="true" />;
};

export default DotGrid;
