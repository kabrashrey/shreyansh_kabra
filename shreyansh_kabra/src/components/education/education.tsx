import "./education.scss";
import uscLogo from "../../assets/USC_logo.png";
import jecrcLogo from "../../assets/ju.png";

const educationData = [
  {
    logo: uscLogo,
    college: "University of Southern California",
    degree: "M.S. in Computer Science",
    branch: "Computer Science",
    years: "2025 - 2026 (Expected)",
    website: "https://www.usc.edu/",
  },
  {
    logo: jecrcLogo,
    college: "JECRC University",
    degree: "B.Tech in Computer Science and Engineering",
    branch: "Computer Science and Engineering",
    years: "2018 - 2022",
    website: "https://www.jecrcuniversity.edu.in/",
  },
];

const Education = () => {
  return (
    <section className="education-section" id="education">
      <h2 className="section-heading">Education</h2>
      <div className="education-wrapper">
        {educationData.map((edu, idx) => (
          <a
            href={edu.website}
            target="_blank"
            rel="noopener noreferrer"
            className="education-card-link"
            key={idx}
          >
            <div className="education-card">
              <img src={edu.logo} alt={`${edu.college} logo`} loading="lazy" />
              <div className="education-details">
                <h3>{edu.college}</h3>
                <p className="degree">{edu.degree}</p>
                <p className="branch">{edu.branch}</p>
                <p className="years">{edu.years}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Education;
