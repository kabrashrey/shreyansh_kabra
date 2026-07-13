import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import "./projectModal.scss";

export interface Project {
  title: string;
  image: string;
  github: string;
  description: string;
  techStack: string[];
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Simple focus trap within the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="pm-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="pm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="pm-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <FiX />
        </button>

        <div className="pm-media">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="pm-body">
          <h3 id="pm-title" className="pm-title">
            {project.title}
          </h3>

          <p className="pm-description">{project.description}</p>

          <div className="pm-section">
            <span className="pm-label">Tech Stack</span>
            <div className="pm-tags">
              {project.techStack.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pm-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-fancy pm-btn"
            >
              <FaGithub /> View Code
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
