import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";
import "./Resume.css";

/**
 * Dedicated Resume route page accessible from the navbar Resume CTA button.
 */
export default function Resume({ content, onNavigate }) {
  function handleContactClick(event) {
    if (shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onNavigate?.(APP_ROUTES.CONTACT);
    }
  }

  return (
    <section className="shell page-section" aria-labelledby="resume-heading">
      <div className="page-divider" aria-hidden="true" />

      <header className="resume-top">
        <div>
          <p className="page-eyebrow">{content.eyebrow}</p>
          <h1 className="page-title" id="resume-heading">
            {content.title}
          </h1>
          <p className="resume-role">{content.role}</p>
          <p className="page-lead">{content.summary}</p>
        </div>

        <div className="resume-actions">
          <button
            type="button"
            className="btn-dark-pill"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
          <a
            href={APP_ROUTES.CONTACT}
            className="btn-pill btn-explore"
            onClick={handleContactClick}
          >
            Contact
          </a>
        </div>
      </header>

      <div className="resume-sections">
        {content.sections.map((section) => (
          <div key={section.heading} className="resume-section">
            <h2 className="resume-section-heading">{section.heading}</h2>
            <div className="resume-items">
              {section.items.map((item) => (
                <article key={item.title} className="resume-card">
                  <div className="resume-card-head">
                    <h3 className="resume-card-title">{item.title}</h3>
                    <span className="resume-card-meta">{item.meta}</span>
                  </div>
                  <p className="resume-card-detail">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        ))}

        <div className="resume-section">
          <h2 className="resume-section-heading">Skills &amp; Craft</h2>
          <ul className="resume-skills">
            {content.skills.map((skill) => (
              <li key={skill} className="resume-skill-pill">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
