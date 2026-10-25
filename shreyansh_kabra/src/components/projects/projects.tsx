import { useCallback, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import "./projects.scss";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import ProjectModal from "./ProjectModal";
import { profile, type Project } from "../../data/profile";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<Project | null>(null);
  // Stable identity so the modal's open/close effect doesn't re-run each render
  const closeModal = useCallback(() => setActive(null), []);

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-heading" data-index="02">
        Projects
      </h2>
      <div
        ref={ref}
        className={`projects-grid stagger-children ${isVisible ? "visible" : ""}`}
      >
        {profile.projects.map((proj, index) => (
          <button
            type="button"
            className="project-card-link animate-child"
            key={index}
            onClick={() => setActive(proj)}
            aria-label={`View details for ${proj.title}`}
          >
            <div className="project-card" data-spotlight>
              <div className="project-img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <div className="img-overlay">
                  <span className="overlay-text">
                    <FiExternalLink /> View Details
                  </span>
                </div>
              </div>

              <div className="project-content">
                <h3>{proj.title}</h3>
                <p className="description">{proj.description}</p>
                <div className="project-tags">
                  {proj.techStack.map((tech, i) => (
                    <span className="tag" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal project={active} onClose={closeModal} />
    </section>
  );
};

export default Projects;
