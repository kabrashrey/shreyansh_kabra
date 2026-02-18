import "./communication.scss";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shreyansh-kabra/",
    icon: FaLinkedin,
    color: "#0077B5",
  },
  {
    name: "GitHub",
    url: "https://github.com/kabrashrey",
    icon: FaGithub,
    color: "#333",
  },
  {
    name: "Email",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=kabras@usc.edu",
    icon: FaEnvelope,
    color: "#EA4335",
  },
];

const Communication = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="communication-section" id="contact">
      <div
        ref={ref}
        className={`contact-inner animate-on-scroll ${isVisible ? "visible" : ""}`}
      >
        <h2 className="section-heading">Let's Connect</h2>
        <p className="subheading">
          I'm always open to discussing new opportunities, tech ideas, or
          collaboration.
          <br />
          Reach out!
        </p>
        {/* <p className="email-display">kabras@usc.edu</p> */}

        <div className="social-links">
          {socialLinks.map((link, idx) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="social-link-item"
              key={idx}
              style={{ "--hover-color": link.color } as React.CSSProperties}
            >
              <link.icon />
              <span className="link-label">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communication;
