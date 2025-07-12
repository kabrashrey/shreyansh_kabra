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
            I'm Shreyansh Kabra, a software engineer with a passion for
            full-stack development, cloud solutions, and scalable systems. I
            love building elegant, performant products that solve real-world
            problems. Currently pursuing my M.S. in Computer Science at USC, and
            previously a Cloud Developer at HPE. I'm Shreyansh Kabra, a software
            engineer with a passion for full-stack development, cloud solutions,
            and scalable systems. I love building elegant, performant products
            that solve real-world problems. Currently pursuing my M.S. in
            Computer Science at USC, and previously a Cloud Developer at HPE.
            I'm Shreyansh Kabra, a software engineer with a passion for
            full-stack development, cloud solutions, and scalable systems. I
            love building elegant, performant products that solve real-world
            problems. Currently pursuing my M.S. in Computer Science at USC, and
            previously a Cloud Developer at HPE. I'm Shreyansh Kabra, a software
            engineer with a passion for full-stack development, cloud solutions,
            and scalable systems. I love building elegant, performant products
            that solve real-world problems. Currently pursuing my M.S. in
            Computer Science at USC, and previously a Cloud Developer at HPE.
            I'm Shreyansh Kabra, a software engineer with a passion for
            full-stack development, cloud solutions, and scalable systems. I
            love building elegant, performant products that solve real-world
            problems. Currently pursuing my M.S. in Computer Science at USC, and
            previously a Cloud Developer at HPE.
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
