import React from "react";
import "./communication.scss";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Communication = () => {
  return (
    <section className="communication-section" id="contact">
      <h2 className="section-heading">Connect with Me</h2>
      <p className="subheading">
        I love sharing ideas, open-sourcing, and collaborating! Find me here:
      </p>

      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/shreyansh-kabra/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/kabrashrey"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a href="mailto:kabras@usc.edu" aria-label="Send Email">
          <FaEnvelope />
        </a>
      </div>
    </section>
  );
};

export default Communication;
