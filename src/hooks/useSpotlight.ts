import { useEffect } from "react";

/**
 * Global spotlight: on pointer move, any element carrying the
 * `data-spotlight` attribute gets `--mx` / `--my` custom properties set to
 * the cursor's position within it (in %). CSS uses these to paint a soft
 * radial glow that follows the mouse. One delegated listener for the whole page.
 */
export function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}
