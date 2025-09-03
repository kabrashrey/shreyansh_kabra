import { FaGithub } from "react-icons/fa";
// import { FiExternalLink } from "react-icons/fi";
import "./projects.scss";

import artsyWeb from "../../assets/artsy_web.png";
import portfolio from "../../assets/portfolio.png";
import artsyAndroid from "../../assets/artsy_android.png";
import trafficImg from "../../assets/traffic_analysis.png";
// import reactImg from "../..assets/react.png";
import tensorflowImg from "../../assets/TL.png";

const projectData = [
  {
    title: "Artist Search – Web App",
    image: artsyWeb,
    github: "https://github.com/kabrashrey/artsy-search",
    description:
      "Developed a full-stack web application using React.js and Node.js (Express) that integrates the Artsy API to explore over 100,000 artists and artworks. Implemented JWT-based authentication, structured MongoDB collections for users and catalog, and deployed on Google Cloud App Engine with perfect Lighthouse scores for mobile and desktop.",
  },
  {
    title: "Artist Search – Android App",
    image: artsyAndroid,
    github: "https://github.com/kabrashrey/artsy-mobile-app",
    description:
      "Created a native Android application using Kotlin and Android SDK with a Node.js backend to access Artsy’s database. Secured with token-based authentication and persisted data using MongoDB, offering mobile users a seamless search and discovery experience.",
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    github: "https://github.com/kabrashrey/shreyansh_kabra",
    description:
      "Designed and built a personal portfolio using React, TypeScript, and Vite. Includes dark/light mode toggle, responsive layout, modular components, and performance-optimized loading for smooth UX across devices.",
  },
  {
    title: "Image Classification – Transfer Learning",
    image: tensorflowImg,
    github:
      "https://github.com/kabrashrey/Image-Classification-Transfer-Learning",
    description:
      "Implemented an image classification model using transfer learning techniques with TensorFlow and Keras. Fine-tuned a pre-trained model on a custom dataset of artworks, achieving high accuracy and demonstrating the effectiveness of transfer learning in the art domain.",
  },
  {
    title: "Police Activity and Weather Data Analysis",
    image: trafficImg,
    github: "https://github.com/kabrashrey/police_weather_data_analysis",
    description:
      "Analyzed 86,536 Rhode Island traffic stops (2005-2015) combined with weather data to identify demographic biases, temporal patterns, and environmental impacts on law enforcement outcomes using Python, pandas, and statistical analysis.",
  },
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="section-heading">Personal Projects</h2>
      <div className="projects-grid">
        {projectData.map((proj, index) => (
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link"
            key={index}
          >
            <div className="project-card">
              <div className="project-img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
              </div>

              <div className="project-content">
                <h3>{proj.title}</h3>
                <p className="description">{proj.description}</p>
                <div className="project-icons">
                  <span title="GitHub Repo">
                    <FaGithub />
                  </span>
                  {/* {proj?.live && (
                    <a
                      href={proj?.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-site"
                      title="Live Site"
                    >
                      <FiExternalLink className="external-icon" />
                      Visit Site
                    </a>
                  )} */}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
