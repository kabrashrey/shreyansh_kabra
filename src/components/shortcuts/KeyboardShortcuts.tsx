import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import "./shortcuts.scss";
import { ThemeContext } from "../../context/themeContext";
import { isTypingOrModal } from "../../utils/ui";

// "g" followed by one of these jumps to that section
const SECTION_KEYS: Record<string, { hash: string; label: string }> = {
  h: { hash: "#home", label: "Home" },
  a: { hash: "#about", label: "About" },
  e: { hash: "#experiences", label: "Experience" },
  p: { hash: "#projects", label: "Projects" },
  s: { hash: "#technical", label: "Skills" },
  d: { hash: "#education", label: "Education" },
  c: { hash: "#contact", label: "Contact" },
};

const OTHER_SHORTCUTS: [string[], string][] = [
  [["⌘", "K"], "Command palette"],
  [["/"], "Command palette"],
  [[">"], "Terminal (inside the palette)"],
  [["t"], "Toggle light / dark"],
  [["?"], "Show this help"],
];

/**
 * Global keyboard navigation: "g" + key jumps to a section, "t" toggles the
 * theme, "/" opens the palette and "?" shows a help dialog. Ignored while
 * typing in a field or when another dialog is open.
 */
const KeyboardShortcuts = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const { toggleTheme } = useContext(ThemeContext);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let pendingG = false;
    let gTimer: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingOrModal(e.target)) return;

      const key = e.key.toLowerCase();
      if (pendingG) {
        pendingG = false;
        clearTimeout(gTimer);
        const section = SECTION_KEYS[key];
        if (section) {
          e.preventDefault();
          document
            .querySelector(section.hash)
            ?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      if (key === "g") {
        pendingG = true;
        gTimer = setTimeout(() => (pendingG = false), 1000);
      } else if (e.key === "?") {
        e.preventDefault();
        setHelpOpen(true);
      } else if (e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new Event("open-command-palette"));
      } else if (key === "t") {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(gTimer);
    };
  }, [toggleTheme]);

  useEffect(() => {
    if (!helpOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "?") setHelpOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [helpOpen]);

  if (!helpOpen) return null;

  return createPortal(
    <div className="kbd-overlay" onClick={() => setHelpOpen(false)}>
      <div
        className="kbd-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kbd-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kbd-header">
          <h2 id="kbd-title">Keyboard shortcuts</h2>
          <button
            ref={closeRef}
            type="button"
            className="kbd-close"
            onClick={() => setHelpOpen(false)}
            aria-label="Close keyboard shortcuts"
          >
            <FiX />
          </button>
        </div>

        <dl className="kbd-list">
          {Object.entries(SECTION_KEYS).map(([key, { label }]) => (
            <div className="kbd-row" key={key}>
              <dt>
                <kbd>g</kbd> <kbd>{key}</kbd>
              </dt>
              <dd>Go to {label}</dd>
            </div>
          ))}
          {OTHER_SHORTCUTS.map(([keys, label]) => (
            <div className="kbd-row" key={label + keys.join()}>
              <dt>
                {keys.map((k) => (
                  <kbd key={k}>{k}</kbd>
                ))}
              </dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>,
    document.body
  );
};

export default KeyboardShortcuts;
