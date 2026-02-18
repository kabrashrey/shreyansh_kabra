import "./about.scss";
import profileImg from "../../assets/me.jpg";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="about-section" id="about">
      <div
        ref={ref}
        className={`about-wrapper animate-on-scroll ${isVisible ? "visible" : ""}`}
      >
        <img src={profileImg} alt="Shreyansh Kabra" className="about-image" />
        <div className="about-text">
          <h2 className="section-heading" style={{ textAlign: "left" }}>
            About Me
          </h2>
          <p>
            I'm a software engineer pursuing my{" "}
            <strong>M.S. in Computer Science at USC</strong>, specializing in
            scalable backend systems and advanced AI/ML techniques.
          </p>

          <p>
            Previously at <strong>Hewlett Packard Enterprise</strong> for 2+
            years, I engineered 100+ RESTful APIs for GreenLake edge-to-cloud
            platform and architected systems that improved operational
            efficiency by 80%.
          </p>

          <p>
            My current work spans <strong>NLP</strong>,{" "}
            <strong>Generative AI</strong>, and <strong>RAG systems</strong> —
            building with FAISS, and LoRA to fine-tune Large Language Models.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
