import React from "react";
import "./technical.scss";

import {
  SiReact,
  SiPython,
  SiDocker,
  SiPandas,
  SiNumpy,
  SiJavascript,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiGooglecloud,
  SiHtml5,
  SiCss3,
  SiAndroid,
} from "react-icons/si";

import { FaGit } from "react-icons/fa";
import { DiNodejs } from "react-icons/di";

const skills = [
  { name: "React", Icon: SiReact },
  { name: "Python", Icon: SiPython },
  { name: "Docker", Icon: SiDocker },
  { name: "Pandas", Icon: SiPandas },
  { name: "NumPy", Icon: SiNumpy },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Node.js", Icon: DiNodejs },
  { name: "Django", Icon: SiDjango },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Git", Icon: FaGit },
  { name: "GCP", Icon: SiGooglecloud },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss3 },
  { name: "Android", Icon: SiAndroid },
];

const Technical: React.FC = () => {
  return (
    <section className="technical-section" id="technical">
      <h2 className="section-heading">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map(({ name, Icon }, index) => (
          <div className="skill-card" key={index}>
            <Icon className="skill-icon" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technical;
