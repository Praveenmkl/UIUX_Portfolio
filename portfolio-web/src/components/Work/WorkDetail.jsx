import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";
import { WADAKARU_CASE_STUDY } from "./wadakaruCaseStudy.js";
import "./WorkDetail.css";

/**
 * Full-page project showcase presenting introduction, overview, UI screens, layout specs, visual language, and reflection.
 */
export default function WorkDetail({ project, onNavigate }) {
  function handleRouteClick(event, targetHref) {
    if (onNavigate && shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onNavigate(targetHref);
    }
  }

  const isWadakaru = project?.id === "wadakaru-home-services";

  if (!isWadakaru) {
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

  const { intro, overview, showcase, visualDesign, closing } = WADAKARU_CASE_STUDY;

  return (
    <article
      className="shell page-section work-detail"
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

      {/* 01 — Project Introduction */}
      <header className="wd-section wd-intro">
        <div className="wd-intro-meta">
          <span className="wd-section-index">{intro.index}</span>
          <ul className="wd-tag-list" aria-label="Project categories">
            {intro.tags.map((tag) => (
              <li key={tag} className="wd-tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="wd-intro-copy">
          <h1 className="wd-title" id="project-detail-heading">
            {intro.title}
          </h1>
          <p className="wd-subtitle">{intro.subtitle}</p>
          <p className="wd-lead">{intro.lead}</p>
        </div>

        <div className="wd-hero-stage">
          <div className="wd-hero-phones">
            {intro.heroScreens.map((screen) => (
              <figure
                key={screen.id}
                className={`wd-hero-phone${
                  screen.featured ? " wd-hero-phone--featured" : ""
                }`}
              >
                <div className="wd-device-frame">
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="wd-device-screen"
                  />
                </div>
                <figcaption className="wd-hero-caption">
                  {screen.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </header>

      {/* 02 — Project Overview */}
      <section className="wd-section" aria-labelledby="wd-overview-heading">
        <span className="wd-section-index">{overview.index}</span>
        <div className="wd-overview-layout">
          <div className="wd-overview-copy">
            <h2 className="wd-heading" id="wd-overview-heading">
              {overview.heading}
            </h2>
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="wd-body">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="wd-spec-grid">
            {overview.specs.map((spec) => (
              <div key={spec.label} className="wd-spec-item">
                <dt className="wd-spec-label">{spec.label}</dt>
                <dd className="wd-spec-value">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 03 — UI Screen Showcase */}
      <section className="wd-section" aria-labelledby="wd-showcase-heading">
        <span className="wd-section-index">{showcase.index}</span>
        <h2 className="wd-heading wd-showcase-heading" id="wd-showcase-heading">
          {showcase.heading}
        </h2>

        <div className="wd-screen-list">
          {showcase.screens.map((screen, index) => (
            <article
              key={screen.id}
              className={`wd-screen-row${
                index % 2 === 1 ? " wd-screen-row--reverse" : ""
              }`}
            >
              <div className="wd-screen-copy">
                <span className="wd-screen-eyebrow">{screen.eyebrow}</span>
                <h3 className="wd-screen-title">{screen.title}</h3>
                <p className="wd-body">{screen.description}</p>
                <ul className="wd-bullet-list">
                  {screen.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="wd-screen-visual">
                <div className="wd-device-frame wd-device-frame--showcase">
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="wd-device-screen"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Annotated Layout & UI Specifications */}
        <div className="wd-design-detail">
          <div className="wd-design-detail-header">
            <div>
              <span className="wd-screen-eyebrow">
                {showcase.designDetail.eyebrow}
              </span>
              <h3 className="wd-screen-title">
                {showcase.designDetail.title}
              </h3>
              <p className="wd-body">{showcase.designDetail.description}</p>
            </div>

            <ul className="wd-spec-chips" aria-label="Measured interface specifications">
              {showcase.designDetail.specs.map((item) => (
                <li key={item} className="wd-spec-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="wd-annotated-grid">
            {showcase.designDetail.annotatedScreens.map((item) => (
              <figure key={item.id} className="wd-annotated-card">
                <div className="wd-device-frame wd-device-frame--spec">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="wd-device-screen"
                    loading="lazy"
                  />
                </div>
                <figcaption className="wd-annotated-caption">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Visual Design Details */}
      <section className="wd-section" aria-labelledby="wd-visual-heading">
        <span className="wd-section-index">{visualDesign.index}</span>
        <div className="wd-visual-header">
          <h2 className="wd-heading" id="wd-visual-heading">
            {visualDesign.heading}
          </h2>
          <p className="wd-body wd-visual-lead">{visualDesign.description}</p>
        </div>

        <ul className="wd-palette-grid" aria-label="WADAKARU color palette">
          {visualDesign.palette.map((swatch) => (
            <li key={swatch.id} className="wd-palette-card">
              <span
                className={`wd-swatch-chip ${swatch.tokenClass}`}
                aria-hidden="true"
              />
              <div className="wd-swatch-meta">
                <span className="wd-swatch-name">{swatch.name}</span>
                <span className="wd-swatch-role">{swatch.role}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="wd-pillars-grid">
          {visualDesign.pillars.map((pillar) => (
            <article key={pillar.title} className="wd-pillar-card">
              <h3 className="wd-pillar-title">{pillar.title}</h3>
              <p className="wd-pillar-copy">{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 05 — Project Closing */}
      <footer className="wd-section wd-closing" aria-labelledby="wd-closing-heading">
        <span className="wd-section-index">{closing.index}</span>
        <div className="wd-closing-card">
          <div className="wd-closing-copy">
            <h2 className="wd-heading" id="wd-closing-heading">
              {closing.heading}
            </h2>
            <p className="wd-body">{closing.copy}</p>
          </div>

          <div className="wd-closing-actions">
            <a
              href={APP_ROUTES.CONTACT}
              className="btn-pill wd-closing-cta"
              onClick={(event) => handleRouteClick(event, APP_ROUTES.CONTACT)}
            >
              Let’s Talk
            </a>
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
        </div>
      </footer>
    </article>
  );
}
