import "./experiences.scss";
import { profile } from "../../data/profile";
import { FiArrowUpRight } from "react-icons/fi";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";


const Experiences = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="experience-section" id="experiences">
      <div className="experience-container">
        <h2 className="section-heading" data-index="01">
          Experience
        </h2>
        <div
          ref={ref}
          className={`experience-list stagger-children ${isVisible ? "visible" : ""}`}
        >
          {profile.experiences.map((exp, index) => (
            <article className="exp-row animate-child" data-spotlight key={index}>
              <div className="exp-header">
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-company-link"
                  aria-label={`${exp.company} website`}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    loading="lazy"
                  />
                </a>

                <div className="exp-header-text">
                  <h3 className="exp-role">{exp.role}</h3>
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-company"
                  >
                    {exp.company}
                    <FiArrowUpRight />
                  </a>
                </div>

                <span className="exp-date">{exp.duration}</span>
              </div>

              <div className="exp-body">
                {exp.highlights.length > 0 && (
                  <ul className="exp-highlights">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {exp.techStack.length > 0 && (
                  <div className="exp-tags">
                    {exp.techStack.map((tech, i) => (
                      <span className="tag" key={i}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
