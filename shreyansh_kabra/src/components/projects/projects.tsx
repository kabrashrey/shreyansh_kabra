import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./projects.scss";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

import artsyWeb from "../../assets/artsy_web.png";
import portfolio from "../../assets/portfolio.png";
import artsyAndroid from "../../assets/artsy_android.png";
import trafficImg from "../../assets/traffic_analysis.png";
import tensorflowImg from "../../assets/TL.png";
import nlpImg from "../../assets/nlp.png";

const projectData = [
  {
    title: "Artist Search – Web App",
    image: artsyWeb,
    github: "https://github.com/kabrashrey/artsy-search",
    description:
      "Full-stack app integrating Artsy API to explore 100K+ artists. JWT auth, MongoDB, deployed on GCP with perfect Lighthouse scores.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "GCP"],
  },
  {
    title: "Artist Search – Android App",
    image: artsyAndroid,
    github: "https://github.com/kabrashrey/artsy-mobile-app",
    description:
      "Native Android app with Kotlin and Node.js backend for Artsy's database. Token-based auth and MongoDB persistence.",
    techStack: ["Kotlin", "Android SDK", "Node.js", "MongoDB"],
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    github: "https://github.com/kabrashrey/shreyansh_kabra",
    description:
      "Personal portfolio built with React, TypeScript, and Vite. Dark/light mode, responsive layout, and optimized loading.",
    techStack: ["React", "TypeScript", "SCSS"],
  },
  {
    title: "Image Classification – Transfer Learning",
    image: tensorflowImg,
    github:
      "https://github.com/kabrashrey/Image-Classification-Transfer-Learning",
    description:
      "Image classification using transfer learning with TensorFlow/Keras. Fine-tuned pre-trained model on custom artwork dataset.",
    techStack: ["Python", "TensorFlow", "Keras", "Transfer Learning"],
  },
  {
    title: "Police Activity & Weather Analysis",
    image: trafficImg,
    github: "https://github.com/kabrashrey/police_weather_data_analysis",
    description:
      "Analyzed 86K+ RI traffic stops with weather data to identify biases and temporal patterns using statistical analysis.",
    techStack: ["Python", "Pandas", "NumPy", "Data Analysis"],
  },
  {
    title: "Mental Health Signal Detector",
    image: nlpImg,
    github: "https://github.com/kabrashrey/",
    description:
      "Real-time NLP system classifying support group posts by intent and concern level, with a lightweight RAG module for suggestions.",
    techStack: ["Python", "NLP", "RAG", "Transformers"],
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-heading">Projects</h2>
      <div
        ref={ref}
        className={`projects-grid stagger-children ${isVisible ? "visible" : ""}`}
      >
        {projectData.map((proj, index) => (
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link animate-child"
            key={index}
          >
            <div className="project-card">
              <div className="project-img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <div className="img-overlay">
                  <span className="overlay-text">
                    <FiExternalLink /> View Project
                  </span>
                </div>
              </div>

              <div className="project-content">
                <h3>{proj.title}</h3>
                <p className="description">{proj.description}</p>
                <div className="project-tags">
                  {proj.techStack.map((tech, i) => (
                    <span className="tag" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-link">
                  <FaGithub />
                  <span>View Code</span>
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
