import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiCode,
  FiBookOpen,
  FiMail,
  FiDownload,
  FiSun,
  FiMoon,
  FiSearch,
  FiCornerDownLeft,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";
import "./commandPalette.scss";
import { ThemeContext } from "../../context/themeContext";
import resume from "../../assets/Shreyansh_Kabra.pdf";

interface Command {
  id: string;
  label: string;
  hint?: string;
  Icon: IconType;
  keywords?: string;
  run: () => void;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const go = (hash: string) => () => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };
  const openUrl = (url: string) => () =>
    window.open(url, "_blank", "noopener,noreferrer");

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", Icon: FiHome, run: go("#home") },
      { id: "about", label: "Go to About", Icon: FiUser, run: go("#about") },
      {
        id: "experience",
        label: "Go to Experience",
        Icon: FiBriefcase,
        keywords: "work jobs career",
        run: go("#experiences"),
      },
      {
        id: "projects",
        label: "Go to Projects",
        Icon: FiFolder,
        keywords: "work portfolio",
        run: go("#projects"),
      },
      {
        id: "skills",
        label: "Go to Skills",
        Icon: FiCode,
        keywords: "technical tech stack",
        run: go("#technical"),
      },
      {
        id: "education",
        label: "Go to Education",
        Icon: FiBookOpen,
        keywords: "usc degree school",
        run: go("#education"),
      },
      {
        id: "contact",
        label: "Go to Contact",
        Icon: FiMail,
        keywords: "email connect reach",
        run: go("#contact"),
      },
      {
        id: "resume",
        label: "Download Résumé",
        hint: "PDF",
        Icon: FiDownload,
        keywords: "cv",
        run: () => {
          const a = document.createElement("a");
          a.href = resume;
          a.download = "Shreyansh_Kabra_Resume.pdf";
          a.click();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        Icon: FaGithub,
        run: openUrl("https://github.com/kabrashrey"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        Icon: FaLinkedin,
        run: openUrl("https://www.linkedin.com/in/shreyansh-kabra/"),
      },
      {
        id: "theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        Icon: theme === "dark" ? FiSun : FiMoon,
        keywords: "theme toggle appearance",
        run: toggleTheme,
      },
    ],
    [theme, toggleTheme]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Global open/close shortcut (Cmd/Ctrl+K) + button-triggered open event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  // On open: reset, lock scroll, focus input
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  // Keep highlighted item in range as results change
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results.length]);

  if (!open) return null;

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    cmd.run();
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(index);
    }
  };

  return createPortal(
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmdk-search">
          <FiSearch className="cmdk-search-icon" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section or action…"
            aria-label="Search commands"
          />
          <kbd className="cmdk-esc">ESC</kbd>
        </div>

        <div className="cmdk-list" ref={listRef}>
          {results.length === 0 && (
            <div className="cmdk-empty">No results</div>
          )}
          {results.map((cmd, i) => (
            <button
              key={cmd.id}
              type="button"
              className={`cmdk-item ${i === index ? "is-active" : ""}`}
              onMouseEnter={() => setIndex(i)}
              onClick={() => runAt(i)}
            >
              <cmd.Icon className="cmdk-item-icon" />
              <span className="cmdk-item-label">{cmd.label}</span>
              {cmd.hint && <span className="cmdk-item-hint">{cmd.hint}</span>}
              {i === index && <FiCornerDownLeft className="cmdk-item-enter" />}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;
