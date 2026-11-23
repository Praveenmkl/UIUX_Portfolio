import { useEffect, useRef } from "react";

/**
 * Accessible quick-view modal showing full details for a selected portfolio project.
 */
export default function WorkModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      className="work-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="work-modal-dialog">
        <button
          ref={closeButtonRef}
          type="button"
          className="work-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {project.thumbnail && (
          <div className="work-modal-media">
            <img
              src={project.thumbnail}
              alt={project.thumbnailAlt || project.title}
              className="work-modal-image"
            />
          </div>
        )}

        <div className="work-modal-content">
          <div className="work-modal-meta">
            <span className="work-modal-category">{project.category}</span>
            <span>{project.platform}</span>
            <span>{project.year}</span>
          </div>

          <h2 id="work-modal-title" className="work-modal-title">
            {project.title}
          </h2>
          <p className="work-modal-subtitle">{project.subtitle}</p>
          <p className="work-modal-overview">{project.overview}</p>

          {project.highlights?.length > 0 && (
            <div className="work-modal-block">
              <h3 className="work-modal-heading">Key Highlights</h3>
              <ul className="work-modal-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.deliverables?.length > 0 && (
            <div className="work-modal-block">
              <h3 className="work-modal-heading">Deliverables</h3>
              <div className="work-modal-tags">
                {project.deliverables.map((tag) => (
                  <span key={tag} className="work-modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
