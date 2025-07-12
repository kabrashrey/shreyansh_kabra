import React from "react";
import "./experiences.scss";
import hpeLogo from "../../assets/hpe.jpeg";

const experiences = [
  {
    company: "Hewlett Packard Enterprise",
    role: "Cloud Developer",
    duration: "Aug 2022 – Dec 2024",
    logo: hpeLogo,
    description:
      "Worked on cloud automation, infrastructure-as-code, and GCP integrations for enterprise clients.",
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "Cloud Developer Intern",
    duration: "Jan 2022 – Aug 2022",
    logo: hpeLogo,
    description:
      "Interned in the same team, focused on monitoring systems and backend tooling for cloud services.",
  },
];

const Experiences = () => {
  return (
    <section className="experience-section" id="experiences">
      <h2 className="section-heading">Experience</h2>
      <div className="experience-wrapper">
        {experiences.map((exp, index) => (
          <div className="experience-card" key={index}>
            <img src={exp.logo} alt={`${exp.company} logo`} loading="lazy" />
            <div className="experience-details">
              <h3>{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p className="duration">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
