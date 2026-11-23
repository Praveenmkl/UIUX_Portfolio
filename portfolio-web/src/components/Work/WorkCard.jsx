import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";

/**
 * Interactive portfolio showcase card linking to the full-page project showcase route.
 */
export default function WorkCard({ project, onOpenProject }) {
  const projectHref = `${APP_ROUTES.WORK}/${project.id}`;

  function handleClick(event) {
    if (onOpenProject && shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onOpenProject(projectHref);
    }
  }

  return (
    <article className="work-card">
      <div className="work-card-media">
        {project.previewScreens?.length ? (
          <div className="work-card-showcase" aria-label={project.thumbnailAlt || project.title}>
            {project.previewScreens.map((screen, index) => (
              <div
                key={screen.src}
                className={`work-card-phone${
                  index === 1 ? " work-card-phone--featured" : ""
                }`}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="work-card-phone-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt || project.title}
            className="work-card-image"
            loading="lazy"
          />
        ) : (
          <div className="work-card-fallback">
            <span className="work-card-fallback-badge">{project.category}</span>
            <strong className="work-card-fallback-title">WADAKARU.LK</strong>
            <p className="work-card-fallback-note">
              Add <code>wadakaru thambnail.webp</code> to{" "}
              <code>src/assets/</code> to display the full mockup preview.
            </p>
          </div>
        )}
      </div>

      <div className="work-card-body">
        <h2 className="work-card-title">
          <a
            href={projectHref}
            className="work-card-trigger"
            onClick={handleClick}
          >
            {project.title}
          </a>
        </h2>
        <p className="work-card-subtitle">{project.subtitle}</p>
      </div>
    </article>
  );
}
