import "./education.scss";
import { profile } from "../../data/profile";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const educationData = profile.education;

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="education-section" id="education">
      <h2 className="section-heading" data-index="04">
        Education
      </h2>
      <div
        ref={ref}
        className={`education-wrapper stagger-children ${isVisible ? "visible" : ""}`}
      >
        {educationData.map((edu, idx) => (
          <a
            href={edu.website}
            target="_blank"
            rel="noopener noreferrer"
            className="education-card-link animate-child"
            key={idx}
          >
            <div className="education-card" data-spotlight>
              <img src={edu.logo} alt={`${edu.college} logo`} loading="lazy" />
              <div className="education-details">
                <h3>{edu.college}</h3>
                <p className="degree">{edu.degree}</p>
                <p className="years">{edu.years}</p>
                <p className="coursework">
                  <span className="coursework-label">Key Courses:</span>{" "}
                  {edu.coursework}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Education;
