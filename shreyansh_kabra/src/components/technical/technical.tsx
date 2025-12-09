import React from "react";
import "./technical.scss";

import {
  SiReact,
  SiPython,
  SiCplusplus,
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
  SiTensorflow,
  SiKeras,
  SiHuggingface,
  SiPostman,
  SiGit
} from "react-icons/si";

// import { FaGit } from "react-icons/fa";
import { DiNodejs } from "react-icons/di";
import { GiBrain } from "react-icons/gi"; 

const skills = [
  // Language
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "C++", Icon: SiCplusplus },
  // Web & Backend
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: DiNodejs },
  { name: "Django", Icon: SiDjango },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss3 },
  // Databases
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  // AI / ML / Data Science
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Keras", Icon: SiKeras },
  { name: "Hugging Face", Icon: SiHuggingface },
  { name: "NLP", Icon: GiBrain },
  { name: "Pandas", Icon: SiPandas },
  { name: "NumPy", Icon: SiNumpy },
  // Tools & Cloud
  { name: "GCP", Icon: SiGooglecloud },
  { name: "Git", Icon: SiGit },
  { name: "Postman", Icon: SiPostman },
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
