import { useState, useEffect } from "react";
import "./hero.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import resume from "../../assets/Shreyansh_Kabra.pdf";
import { FaDownload } from "react-icons/fa";
import DotGrid from "./DotGrid";

const titles = [
  "Software Engineer",
  "Backend Developer",
  "AI/ML Enthusiast",
  "Cloud Developer",
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentTitle) {
      // Pause at full text
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next title
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayText((prev) => prev.slice(0, -1)),
        40
      );
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentTitle.slice(0, displayText.length + 1)),
        80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="hero-section" id="home">
      {/* Signature interaction: cursor-reactive dot-grid field */}
      <DotGrid />

      <div className="hero-inner">
        <div className="hero-main">
          <h1 className="hero-name">
            <span className="hero-name-line">
              <span className="hero-name-inner">Shreyansh Kabra</span>
            </span>
          </h1>

          <div className="hero-title-wrapper">
            <span className="hero-title">{displayText}</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-tagline">
            Backend &amp; cloud engineer building scalable, observable systems —
            from edge-to-cloud platforms and distributed caching to LLM &amp;
            RAG applications.
          </p>

          <div className="hero-cta">
            <a
              href={resume}
              download="Shreyansh_Kabra_Resume.pdf"
              className="btn btn-fancy hero-btn"
            >
              <FaDownload className="btn-icon" />
              Resume
            </a>
            <a
              href="https://github.com/kabrashrey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero-btn"
            >
              <FaGithub className="btn-icon" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shreyansh-kabra/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero-btn"
            >
              <FaLinkedin className="btn-icon" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll down">
        <FiArrowDown />
      </a>
    </section>
  );
};

export default Hero;
