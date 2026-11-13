import "./communication.scss";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { FiCopy } from "react-icons/fi";
import { profile } from "../../data/profile";
import { copyEmail } from "../../utils/ui";

// Presentation per social; URLs come from the profile
const socialStyle = {
  LinkedIn: { icon: FaLinkedin, color: "#0077B5" },
  GitHub: { icon: FaGithub, color: "#333" },
  Email: { icon: FaEnvelope, color: "#EA4335" },
};

const socialLinks = profile.socials.map((s) => ({
  ...s,
  ...socialStyle[s.name],
}));

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
          collaboration. Reach out!
        </p>

        <div className="social-links">
          {socialLinks.map((link, idx) => (
            <a
              href={link.url}
              {...(link.url.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
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

        <button
          type="button"
          className="copy-email"
          onClick={() => copyEmail(profile.email)}
          aria-label={`Copy email address ${profile.email}`}
        >
          {profile.email}
          <FiCopy />
        </button>
      </div>
    </section>
  );
};

export default Communication;
