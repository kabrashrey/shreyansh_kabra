import "./about.scss";
import profileImg from "../../assets/me.jpg";
import resume from "../../assets/Shreyansh_Kabra.pdf";
import { FaDownload } from "react-icons/fa";

const About = () => {
  return (
    <section className="about-section" id="about">
      <h2 className="section-heading">About Me</h2>
      <div className="about-wrapper">
        <img src={profileImg} alt="Shreyansh Kabra" className="about-image" />
        <div className="about-text">
          <p>
            I'm Shreyansh Kabra, a software engineer currently pursuing my M.S.
            in Computer Science at the University of Southern California (USC).
            I specialize in building scalable backend systems and applying
            advanced AI/ML techniques to solve complex data problems.
          </p>

          <p>
            Previously, I served as a Cloud Developer at Hewlett Packard
            Enterprise (HPE) for over 2 years. There, I engineered 100+ RESTful
            APIs for the GreenLake edge-to-cloud platform and architected
            asynchronous notification systems that improved throughput by 80%.
            My role involved microservices
            architecture, and high-volume data synchronization between
            PostgreSQL and ServiceNow.
          </p>

          <p>
            Beyond traditional software engineering, I am deeply invested in
            Natural Language Processing and Generative AI. My recent work
            includes developing hierarchical NLP frameworks and
            Retrieval-Augmented Generation (RAG) systems using tools like
            LangChain, FAISS, and LoRA to fine-tune Large Language Models.
          </p>

          <p>
            I am driven by the challenge of bridging the gap between robust
            distributed systems and intelligent AI solutions.
          </p>
          <a
            href={resume}
            download="Shreyansh_Kabra_Resume.pdf"
            className="btn btn-fancy"
          >
            <FaDownload className="btn-icon" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
