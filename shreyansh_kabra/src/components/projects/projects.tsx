import { FaGithub } from "react-icons/fa";
import "./projects.scss";

import artsyWeb from "../../assets/artsy_web.png";
import portfolio from "../../assets/react.svg";
import artsyAndroid from "../../assets/artsy_android.png";

const projectData = [
  {
    title: "Artist Search Web App",
    image: artsyWeb,
    github: "https://github.com/kabrashrey/artsy-search",
    description:
      "Built using Node.js and React.js, this app allows users to search for artists and view related metadata using GCP and MongoDB.",
  },
  {
    title: "Artist Search Android App",
    image: artsyAndroid,
    github: "https://github.com/kabrashrey/artsy-mobile-app",
    description:
      "Built using Kotlin and Node.js, this app allows users to search for artists and view related metadata using GCP and MongoDB.",
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    github: "https://github.com/kabrashrey/shreyansh_kabra",
    description:
      "Personal website developed using React, TypeScript, and Vite. Implements animations, dark mode, and full responsiveness.",
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
