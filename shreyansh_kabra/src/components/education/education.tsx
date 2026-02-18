import "./education.scss";
import uscLogo from "../../assets/USC_logo.png";
import jecrcLogo from "../../assets/ju.png";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const educationData = [
  {
    logo: uscLogo,
    college: "University of Southern California",
    degree: "M.S. in Computer Science",
    years: "2025 – 2026 (Expected)",
    coursework: "Analysis of Algorithms, NLP, Deep Learning, Web Technologies",
    website: "https://www.usc.edu/",
  },
  {
    logo: jecrcLogo,
    college: "JECRC University",
    degree: "B.Tech in Computer Science & Engineering",
    years: "2018 – 2022",
    coursework:
      "Data Structures, OS, DBMS, Machine Learning, Computer Networks",
    website: "https://www.jecrcuniversity.edu.in/",
  },
];

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="education-section" id="education">
      <h2 className="section-heading">Education</h2>
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
            <div className="education-card">
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
