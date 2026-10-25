/**
 * Small cross-component UI helpers. Components talk through window events
 * (like the existing "open-command-palette") so they stay decoupled.
 */

export const TOAST_EVENT = "show-toast";
export const OPEN_PROJECT_EVENT = "open-project";

/** Show a short status message via the global <Toast />. */
export const showToast = (message: string) =>
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));

/** Ask the Projects section to open a project's modal by title. */
export const openProject = (title: string) => {
  // Instant jump: the modal's scroll lock would cut a smooth scroll short
  document.querySelector("#projects")?.scrollIntoView();
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: title }));
};

/** Copy text to the clipboard, falling back to a hidden textarea. */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
};

export const copyEmail = async (email: string) => {
  const ok = await copyText(email);
  showToast(ok ? `Copied ${email}` : "Couldn't copy — email is " + email);
};

// ── Recently viewed projects (per-visitor convenience, localStorage) ──
const RECENT_KEY = "recentProjects";
const RECENT_MAX = 3;

export const getRecentProjects = (): string[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((t) => typeof t === "string") : [];
  } catch {
    return [];
  }
};

export const addRecentProject = (title: string) => {
  try {
    const next = [title, ...getRecentProjects().filter((t) => t !== title)];
    localStorage.setItem(RECENT_KEY, JSON.stringify(next.slice(0, RECENT_MAX)));
  } catch {
    // Storage unavailable — recents are a nice-to-have
  }
};

/** True while the user is typing somewhere or a dialog is open. */
export const isTypingOrModal = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (
    el &&
    (el.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
  ) {
    return true;
  }
  return document.querySelector('[aria-modal="true"]') !== null;
};
