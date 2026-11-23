import { resolveAssetByKeyword } from "../../utils/assets.js";
import AboutToolIcon from "./AboutToolIcon.jsx";
import EducationCrest from "./EducationCrest.jsx";
import "./About.css";

const ABOUT_CONTENT = {
  overview: [
    "I am a Bachelor of Information and Communication Technology (BICT) undergraduate with a strong passion for UI/UX design. I focus on creating clean, intuitive, and user-centered digital experiences that balance aesthetics with functionality.",
    "With a background in full-stack development and graphic design, I bring both creative thinking and technical understanding to my design process. I am continuously improving my skills in user research, interface design, and prototyping to create meaningful digital experiences.",
  ],
  skills: [
    "Mobile App UI",
    "Web Product Design",
    "Design Systems",
    "Interactive Prototyping",
    "UX Research & Flows",
    "Wireframing",
  ],
  tools: [
    {
      id: "figma",
      name: "Figma",
      icon: resolveAssetByKeyword("figma"),
    },
    {
      id: "photoshop",
      name: "Adobe Photoshop",
      icon: resolveAssetByKeyword("photoshop"),
    },
    {
      id: "illustrator",
      name: "Adobe Illustrator",
      icon: resolveAssetByKeyword("illustrator"),
    },
    {
      id: "framer",
      name: "Framer",
      icon: resolveAssetByKeyword("framer"),
    },
  ],
  education: [
    {
      degree: "Bachelor of Information and Communication Technology",
      institution: "University of Kelaniya, Faculty of Computing & Technology",
      period: "2022 – Present",
      crest:
        resolveAssetByKeyword("kelaniya") || resolveAssetByKeyword("uok"),
    },
  ],
};

/**
 * Dedicated About route page structured into Overview, Skills, Tools, and Education.
 */
export default function About() {
  return (
    <section
      className="shell page-section about-section"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="sr-only">
        About
      </h1>

      <div className="page-divider" aria-hidden="true" />

      <div className="about-stack">
        <section className="about-block" aria-labelledby="about-overview-title">
          <h2 id="about-overview-title" className="about-heading">
            Overview
          </h2>
          <div className="about-overview-copy">
            {ABOUT_CONTENT.overview.map((paragraph) => (
              <p key={paragraph} className="about-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="about-block" aria-labelledby="about-skills-title">
          <h2 id="about-skills-title" className="about-heading">
            Skills
          </h2>
          <ul className="about-skills-list">
            {ABOUT_CONTENT.skills.map((skill) => (
              <li key={skill} className="about-skill-pill">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="about-block" aria-labelledby="about-tools-title">
          <h2 id="about-tools-title" className="about-heading">
            Tools
          </h2>
          <ul className="about-tools-row">
            {ABOUT_CONTENT.tools.map((tool) => (
              <li key={tool.id} className="about-tool-item">
                <AboutToolIcon
                  id={tool.id}
                  name={tool.name}
                  image={tool.icon}
                />
                <span className="about-tool-label">{tool.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="about-block"
          aria-labelledby="about-education-title"
        >
          <h2 id="about-education-title" className="about-heading">
            Education
          </h2>
          <div className="about-education-list">
            {ABOUT_CONTENT.education.map((entry) => (
              <article key={entry.degree} className="about-education-item">
                <EducationCrest
                  crest={entry.crest}
                  institution={entry.institution}
                />
                <div className="about-education-meta">
                  <h3 className="about-education-degree">{entry.degree}</h3>
                  <p className="about-education-school">{entry.institution}</p>
                  <p className="about-education-dates">{entry.period}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
