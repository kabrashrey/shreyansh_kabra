import "./about.scss";
import profileImg from "../../assets/me.jpg";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

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
              src={profileImg}
              alt="Shreyansh Kabra"
              className="about-image"
            />
          </div>
          <div className="about-text animate-child">
            <p>
              I'm a software engineer pursuing my M.S. in Computer Science at
              USC, specializing in scalable backend systems and advanced AI/ML
              techniques.
            </p>

            <p>
              Most recently, I interned as an SDE at Amazon Web Services,
              designing a distributed caching layer for Amazon Connect's
              agent-routing service that cut redundant downstream traffic by 90%
              across a 591-host fleet.
            </p>

            <p>
              Before that, I spent 2+ years at Hewlett Packard Enterprise,
              engineering 100+ RESTful APIs for the GreenLake edge-to-cloud
              platform and architecting systems that improved operational
              efficiency by 80%.
            </p>

            <p>
              My work also spans NLP, Generative AI, and RAG systems — building
              with FAISS and LoRA to fine-tune Large Language Models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
