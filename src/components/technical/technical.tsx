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
  SiCss,
  SiAndroid,
  SiTensorflow,
  SiKeras,
  SiHuggingface,
  SiPostman,
  SiGit,
  SiRedis,
  SiTypescript,
  SiClaude,
  SiOllama,
} from "react-icons/si";

import { DiNodejs } from "react-icons/di";
import { FaAws, FaDatabase } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import type { IconType } from "react-icons";
import { profile } from "../../data/profile";

// Display icon per skill name; skills without an entry render as text only
const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  React: SiReact,
  "Node.js": DiNodejs,
  Django: SiDjango,
  HTML5: SiHtml5,
  CSS3: SiCss,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  DynamoDB: FaDatabase,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  "Hugging Face": SiHuggingface,
  NLP: GiBrain,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  AWS: FaAws,
  GCP: SiGooglecloud,
  Git: SiGit,
  Postman: SiPostman,
  Android: SiAndroid,
  "Claude Code": SiClaude,
  "AWS Kiro": FaAws,
  Ollama: SiOllama,
};

const Technical: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="technical-section" id="technical">
      <h2 className="section-heading" data-index="03">
        Technical Skills
      </h2>
      <div
        ref={ref}
        className={`skills-container stagger-children ${isVisible ? "visible" : ""}`}
      >
        {profile.skills.map((cat, idx) => (
          <div className="skill-category animate-child" data-spotlight key={idx}>
            <h3 className="category-label">{cat.category}</h3>
            <div className="skills-row">
              {cat.skills.map((name, i) => {
                const Icon = skillIcons[name];
                return (
                  <div className="skill-card" key={i}>
                    {Icon && <Icon className="skill-icon" />}
                    <span>{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technical;
