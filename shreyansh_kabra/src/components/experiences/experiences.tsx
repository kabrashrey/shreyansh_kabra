import "./experiences.scss";
import hpeLogo from "../../assets/hpe.jpeg";

const experiences = [
  {
    company: "Hewlett Packard Enterprise",
    role: "Cloud Developer 1",
    duration: "Aug 2022 – Dec 2024",
    logo: hpeLogo,
    website: "https://www.hpe.com/",
    description:
      "Engineered over 100 RESTful APIs using Python, Django, and DRF for the GreenLake edge-to-cloud platform, facilitating high-volume data synchronization between PostgreSQL and ServiceNow. Architected an asynchronous email notification system that improved throughput by 80% and reduced request latency. Additionally, optimized cross-module integrations for the Service Insights Portal and reduced submission errors by 50% through enhanced validation logic.",
    // "At HPE, I worked as a Cloud Developer, building APIs using Python, Django, and DRF for invoice management and contracts onboarding portals that integrated PostgreSQL and ServiceNow. I automated data workflows with Apache Airflow, built end-to-end API and UI components for a web-based notification system that improved communication efficiency by 80%, and contributed to the HPE GreenLake NaaS platform with cross-module REST API integrations. I also developed dynamic ITSM forms, reducing submission errors by over 50%, led mentoring sessions for junior developers, and collaborated with over 10 international cross-functional teams to ensure timely project delivery.",
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "R&D Intern, NaaS Team",
    duration: "Jan 2022 – Aug 2022",
    logo: hpeLogo,
    website: "https://www.hpe.com/",
    description:
      "Developed an asynchronous Python package to automate network device calibration, eliminating over 90% of manual work and boosting system reliability at scale. Streamlined troubleshooting report generation and execution workflows, which reduced task completion time by 50% and overall manual effort by 70%.",
    // "During my internship at HPE in the NaaS team, I developed a Python package with async capabilities to automate switch and IAP configuration, eliminating 90% of manual setup time. I enhanced the troubleshooting workflow by reducing manual effort by 70% and improved execution speed through asynchronous patterns. I also created REST APIs to integrate ServiceNow with internal tooling, improving data exchange and operational efficiency by over 50%.",
  },
];

const Experiences = () => {
  return (
    <section className="experience-section" id="experiences">
      <h2 className="section-heading">Experience</h2>
      <div className="experience-wrapper">
        {experiences.map((exp, index) => (
          <a
            href={exp.website}
            target="_blank"
            rel="noopener noreferrer"
            className="experience-card-link"
            key={index}
          >
            <div className="experience-card">
              <img src={exp.logo} alt={`${exp.company} logo`} loading="lazy" />
              <div className="experience-details">
                <h3>{exp.role}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
