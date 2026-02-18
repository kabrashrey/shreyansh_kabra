import React from "react";
import "./technical.scss";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

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
  SiGit,
} from "react-icons/si";

import { DiNodejs } from "react-icons/di";
import { GiBrain } from "react-icons/gi";

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "Python", Icon: SiPython },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "C++", Icon: SiCplusplus },
    ],
  },
  {
    category: "Web & Backend",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "Node.js", Icon: DiNodejs },
      { name: "Django", Icon: SiDjango },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss3 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "TensorFlow", Icon: SiTensorflow },
      { name: "Keras", Icon: SiKeras },
      { name: "Hugging Face", Icon: SiHuggingface },
      { name: "NLP", Icon: GiBrain },
      { name: "Pandas", Icon: SiPandas },
      { name: "NumPy", Icon: SiNumpy },
    ],
  },
  {
    category: "Tools & Cloud",
    skills: [
      { name: "GCP", Icon: SiGooglecloud },
      { name: "Git", Icon: SiGit },
      { name: "Postman", Icon: SiPostman },
      { name: "Android", Icon: SiAndroid },
    ],
  },
];

const Technical: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="technical-section" id="technical">
      <h2 className="section-heading">Technical Skills</h2>
      <div
        ref={ref}
        className={`skills-container stagger-children ${isVisible ? "visible" : ""}`}
      >
        {skillCategories.map((cat, idx) => (
          <div className="skill-category animate-child" key={idx}>
            <h3 className="category-label">{cat.category}</h3>
            <div className="skills-row">
              {cat.skills.map(({ name, Icon }, i) => (
                <div className="skill-card" key={i}>
                  <Icon className="skill-icon" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technical;
