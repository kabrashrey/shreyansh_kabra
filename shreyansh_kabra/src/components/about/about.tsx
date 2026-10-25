import "./about.scss";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { profile } from "../../data/profile";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="section-heading" data-index="00">
          About Me
        </h2>
        <div
          ref={ref}
          className={`about-wrapper stagger-children ${isVisible ? "visible" : ""}`}
        >
          <div className="about-image-wrap animate-child">
            <img
              src={profile.photo}
              alt={profile.name}
              className="about-image"
            />
          </div>
          <div className="about-text animate-child">
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
