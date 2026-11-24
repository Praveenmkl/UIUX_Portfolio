import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";
import PowerFitDetail from "./powerfit/PowerFitDetail.jsx";
import WadakaruDetail from "./wadakaru/WadakaruDetail.jsx";
import "./WorkDetail.css";

const PROJECT_DETAIL_COMPONENTS = {
  "wadakaru-home-services": WadakaruDetail,
  "powerfit-fitness-app": PowerFitDetail,
};

/**
 * Project detail route dispatcher rendering each project's dedicated folder view or a coming-soon state.
 */
export default function WorkDetail({ project, onNavigate }) {
  function handleRouteClick(event, targetHref) {
    if (onNavigate && shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onNavigate(targetHref);
    }
  }

  const ProjectDetailView = PROJECT_DETAIL_COMPONENTS[project?.id];
  if (ProjectDetailView) {
    return <ProjectDetailView onRouteClick={handleRouteClick} />;
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
          onClick={(event) => handleRouteClick(event, APP_ROUTES.WORK)}
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
