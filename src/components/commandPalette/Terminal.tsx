import { useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "../../context/themeContext";
import { profile, socialUrl } from "../../data/profile";
import { copyEmail, openProject } from "../../utils/ui";
import resume from "../../assets/Shreyansh_Kabra.pdf";

interface Props {
  /** Leave terminal mode and go back to the command list */
  onExit: () => void;
  /** Close the whole palette (used by commands that navigate away) */
  onClose: () => void;
}

interface Line {
  id: number;
  kind: "input" | "output" | "error";
  content: ReactNode;
}

const SECTIONS: Record<string, string> = {
  home: "#home",
  about: "#about",
  experience: "#experiences",
  projects: "#projects",
  skills: "#technical",
  education: "#education",
  contact: "#contact",
};

const COMMANDS: Record<string, string> = {
  help: "list available commands",
  whoami: "who is this?",
  ls: "ls [projects|experience|skills|education]",
  cat: "cat [about|resume|project <n>]",
  open: "open [github|linkedin|resume|project <n>]",
  goto: `goto [${Object.keys(SECTIONS).join("|")}]`,
  email: "copy my email address",
  theme: "theme [light|dark]",
  clear: "clear the screen",
  exit: "back to the command palette",
};

// Arguments offered by tab-completion after each command
const ARGS: Record<string, string[]> = {
  ls: ["projects", "experience", "skills", "education"],
  cat: ["about", "resume", "project"],
  open: ["github", "linkedin", "resume", "project"],
  goto: Object.keys(SECTIONS),
  theme: ["light", "dark"],
};

const projectAt = (arg?: string) => {
  const n = Number(arg);
  return Number.isInteger(n) ? profile.projects[n - 1] : undefined;
};

/**
 * A tiny shell inside the command palette, entered by typing ">".
 * Reads everything from the profile data, so it never drifts from the page.
 */
const Terminal = ({ onExit, onClose }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      kind: "output",
      content: (
        <>
          Welcome to {profile.name.split(" ")[0].toLowerCase()}-sh. Type{" "}
          <b>help</b> to get started, <b>exit</b> to leave.
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (kind: Line["kind"], content: ReactNode) =>
    setLines((prev) => [...prev, { id: nextId.current++, kind, content }]);

  const run = (raw: string): ReactNode | { error: string } | null => {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const arg = args[0]?.toLowerCase();

    switch (cmd.toLowerCase()) {
      case "":
        return null;
      case "help":
        return (
          <dl className="term-help">
            {Object.entries(COMMANDS).map(([name, desc]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        );
      case "whoami":
        return `${profile.name} — ${profile.headline}, ${profile.location}.\n${profile.tagline}`;
      case "ls":
        if (!arg || arg === "projects")
          return profile.projects
            .map((p, i) => `${String(i + 1).padStart(2)}  ${p.title}`)
            .join("\n");
        if (arg === "experience")
          return profile.experiences
            .map((e) => `${e.duration.padEnd(22)}${e.role} @ ${e.company}`)
            .join("\n");
        if (arg === "skills")
          return profile.skills
            .map((c) => `${c.category}: ${c.skills.join(", ")}`)
            .join("\n");
        if (arg === "education")
          return profile.education
            .map((e) => `${e.years.padEnd(26)}${e.degree}, ${e.college}`)
            .join("\n");
        return { error: `ls: ${arg}: no such directory` };
      case "cat":
        if (arg === "about") return profile.about.join("\n\n");
        if (arg === "resume")
          return "resume is a PDF — try `open resume` to download it.";
        if (arg === "project") {
          const p = projectAt(args[1]);
          if (!p)
            return { error: "usage: cat project <n>  (see `ls projects`)" };
          return `${p.title}\n${p.description}\nTech: ${p.techStack.join(", ")}\n${p.github}`;
        }
        return { error: "usage: cat [about|resume|project <n>]" };
      case "open":
        if (arg === "github" || arg === "linkedin") {
          window.open(
            socialUrl(arg === "github" ? "GitHub" : "LinkedIn"),
            "_blank",
            "noopener,noreferrer"
          );
          return `opening ${arg}…`;
        }
        if (arg === "resume") {
          const a = document.createElement("a");
          a.href = resume;
          a.download = "Shreyansh_Kabra_Resume.pdf";
          a.click();
          return "downloading résumé…";
        }
        if (arg === "project") {
          const p = projectAt(args[1]);
          if (!p)
            return { error: "usage: open project <n>  (see `ls projects`)" };
          onClose();
          openProject(p.title);
          return null;
        }
        return { error: "usage: open [github|linkedin|resume|project <n>]" };
      case "goto":
      case "cd":
        if (arg && SECTIONS[arg]) {
          onClose();
          document
            .querySelector(SECTIONS[arg])
            ?.scrollIntoView({ behavior: "smooth" });
          return null;
        }
        return { error: `usage: goto [${Object.keys(SECTIONS).join("|")}]` };
      case "email":
        copyEmail(profile.email);
        return `${profile.email} (copied)`;
      case "theme":
        if (arg && arg !== "light" && arg !== "dark")
          return { error: "usage: theme [light|dark]" };
        if (!arg || arg !== theme) toggleTheme();
        return `theme: ${arg ?? (theme === "dark" ? "light" : "dark")}`;
      case "clear":
        setLines([]);
        return null;
      case "exit":
        onExit();
        return null;
      case "sudo":
        return args.join(" ") === "hire-me"
          ? `[sudo] permission granted. Reach out at ${profile.email} ✦`
          : { error: "sudo: nice try." };
      default:
        return { error: `command not found: ${cmd}. Type \`help\`.` };
    }
  };

  const submit = () => {
    const raw = input;
    setInput("");
    setHistoryIndex(-1);
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50));
    print("input", raw);
    const result = run(raw);
    if (result === null || result === undefined) return;
    if (typeof result === "object" && "error" in result) {
      print("error", result.error);
    } else {
      print("output", result);
    }
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      const matches = Object.keys(COMMANDS).filter((c) =>
        c.startsWith(parts[0].toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) print("output", matches.join("  "));
    } else if (parts.length === 2) {
      const options = ARGS[parts[0].toLowerCase()] ?? [];
      const matches = options.filter((o) =>
        o.startsWith(parts[1].toLowerCase())
      );
      if (matches.length === 1) setInput(`${parts[0]} ${matches[0]} `);
      else if (matches.length > 1) print("output", matches.join("  "));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, history.length - 1);
      if (i >= 0) {
        setHistoryIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = historyIndex - 1;
      setHistoryIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Backspace" && input === "") {
      onExit();
    }
  };

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term-scroll" ref={scrollRef} aria-live="polite">
        {lines.map((line) => (
          <div key={line.id} className={`term-line term-${line.kind}`}>
            {line.kind === "input" && <span className="term-prompt">❯ </span>}
            {line.content}
          </div>
        ))}
      </div>
      <div className="term-input-row">
        <span className="term-prompt" aria-hidden="true">
          ❯
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default Terminal;
