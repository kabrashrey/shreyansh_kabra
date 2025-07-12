import { FaGithub } from "react-icons/fa";
import "./projects.scss";

import projectImg1 from "../../assets/react.svg";
import projectImg2 from "../../assets/react.svg";
import projectImg3 from "../../assets/react.svg";

const projectData = [
  {
    title: "Artist Search App",
    image: projectImg1,
    github: "https://github.com/kabrashrey/artist-search",
    description:
      "Built using Kotlin and Node.js, this app allows users to search for music artists and view related metadata using GCP and MongoDB.",
  },
  {
    title: "Portfolio Website",
    image: projectImg2,
    github: "https://github.com/kabrashrey/portfolio",
    description:
      "Personal website developed using React, TypeScript, and Vite. Implements animations, dark mode, and full responsiveness.",
  },
  {
    title: "Cloud Automation Tool",
    image: projectImg3,
    github: "https://github.com/kabrashrey/cloud-tool",
    description:
      "Python-based CLI tool to automate GCP deployments using Terraform and service accounts. Used internally at HPE.",
  },
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="section-heading">Personal Projects</h2>
      <div className="projects-grid">
        {projectData.map((proj, index) => (
          <div className="project-card" key={index}>
            <div className="project-img">
              <img src={proj.image} alt={proj.title} loading="lazy" />
            </div>

            <div className="project-content">
              <h3>{proj.title}</h3>
              <p className="description">{proj.description}</p>
              <div className="project-icons">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repo"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
