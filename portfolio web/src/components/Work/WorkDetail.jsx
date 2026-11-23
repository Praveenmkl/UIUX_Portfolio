import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";
import "./WorkDetail.css";

/**
 * Full-page project detail route preserved as a minimal coming-soon placeholder ready for step-by-step updates.
 */
export default function WorkDetail({ project, onNavigate }) {
  function handleBackClick(event) {
    if (onNavigate && shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onNavigate(APP_ROUTES.WORK);
    }
  }

  return (
    <section
      className="shell page-section page-section--empty work-detail"
      aria-labelledby="project-detail-heading"
    >
      <div className="page-divider" aria-hidden="true" />

      <div className="work-detail-topbar">
        <a
          href={APP_ROUTES.WORK}
          className="work-detail-back"
          onClick={handleBackClick}
        >
          <span className="work-detail-back-arrow" aria-hidden="true">
            &larr;
          </span>
          Back to Work
        </a>
      </div>

      <div className="page-empty-wrap">
        <div className="page-empty">
          <p className="page-empty-eyebrow">{project.title}</p>
          <h1 className="page-empty-title" id="project-detail-heading">
            Coming soon.
          </h1>
          <p className="page-empty-copy">
            UI showcase screens and full project details will be shared here
            soon.
          </p>
        </div>
      </div>
    </section>
  );
}
