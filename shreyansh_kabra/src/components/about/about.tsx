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
            I'm Shreyansh Kabra, a passionate software engineer currently
            pursuing my M.S. in Computer Science at the University of Southern
            California, Los Angeles. I completed my B.Tech in Computer Science
            and Engineering in 2022 from JECRC University, Jaipur.
          </p>

          <p>
            I spent over 2.5 years at Hewlett Packard Enterprise (HPE) as a
            Cloud Engineer, where I built automation pipelines, developed REST
            APIs, and contributed extensively on both backend and frontend
            development using Python (Django), React.js, HTML5, CSS3, and
            managed databases via PgAdmin and psql. My role also involved
            mentoring junior developers and collaborating with international
            teams across the US and India.
          </p>

          <p>
            Prior to that, I interned at HPE as an R&D Intern, where I focused
            on developing Python-based automation scripts for switch and IAP
            troubleshooting using regex. I also worked with ServiceNow during
            this time and later earned the Certified ServiceNow System
            Administrator (CSA) certification.
          </p>

          <p>
            My interests span across Artificial Intelligence, Machine Learning,
            and Full-Stack Web Development, and I am driven by the challenge of
            solving real-world problems through innovative and efficient
            solutions.
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
