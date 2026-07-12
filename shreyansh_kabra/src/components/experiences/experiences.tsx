import "./experiences.scss";
import hpeLogo from "../../assets/hpe.jpeg";
import amazonLogo from "../../assets/aws.png";
import { FiArrowUpRight } from "react-icons/fi";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const experiences = [
  {
    company: "Amazon Web Services",
    role: "SDE Intern (Summer)",
    duration: "May 2026 - August 2026",
    logo: amazonLogo,
    website: "https://www.amazon.com/",
    highlights: [
      "Designed a distributed L2 cache layer (ElastiCache Serverless Redis) beneath a per-host in-memory L1 (Caffeine) cache for Amazon Connect's agent-routing service, cutting redundant downstream traffic by 90% (118K to 12K fetches per cycle) across a 591-host fleet.",
      "Implemented a read-through client (Lettuce) with a 100ms command timeout, TTL-based freshness write-back, and empty-result guard, sustaining single-digit-millisecond p99 latency and graceful fallback when the cache is unavailable.",
      "Gated the launch behind a DynamoDB-backed dynamic feature flag with CloudWatch hit/miss/stale observability, enabling an instant kill switch and sub-60s rollback.",
      "Validated the rollout with unit and integration tests, enabling a zero-downtime, controlled release."
    ],
    techStack: [
      "Java",
      "Lettuce",
      "Redis",
      "DynamoDB",
      "CloudWatch",
      "ElastiCache",
    ],
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "Cloud Developer 1",
    duration: "Aug 2022 – Dec 2024",
    logo: hpeLogo,
    website: "https://www.hpe.com/",
    highlights: [
      "Engineered 100+ RESTful APIs using Python, Django, and DRF for the GreenLake edge-to-cloud platform",
      "Architected async email notification system — improved operational efficiency by 80% and reduced request latency",
      "Enabled high-volume data sync between PostgreSQL and ServiceNow",
      "Optimized cross-module integrations for Service Insights Portal — reduced submission errors by 50%",
    ],
    techStack: [
      "Python",
      "Django",
      "DRF",
      "PostgreSQL",
      "ServiceNow",
      "REST APIs",
      "React",
    ],
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "R&D Intern, NaaS Team",
    duration: "Jan 2022 – Aug 2022",
    logo: hpeLogo,
    website: "https://www.hpe.com/",
    highlights: [
      "Built async Python package to automate network device calibration — eliminated 90%+ manual work",
      "Streamlined troubleshooting report generation — reduced task completion time by 50%",
      "Reduced overall manual effort by 70% through async execution patterns",
    ],
    techStack: ["Python", "Async", "REST APIs", "ServiceNow", "Automation"],
  },
];

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
          {experiences.map((exp, index) => (
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
