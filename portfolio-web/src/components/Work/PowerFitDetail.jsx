import { APP_ROUTES } from "../../utils/router.js";
import { POWERFIT_CASE_STUDY } from "./powerfitCaseStudy.js";
import "./PowerFitDetail.css";

/**
 * UI Design Showcase detail view for the 12-screen PowerFit mobile concept.
 */
export default function PowerFitDetail({ onRouteClick }) {
  const { intro, overview, designDirection, showcase, decisions, conclusion } =
    POWERFIT_CASE_STUDY;

  return (
    <article
      className="shell page-section pf-detail"
      aria-labelledby="project-detail-heading"
    >
      <div className="pf-container">
        <div className="page-divider" aria-hidden="true" />

        <div className="work-detail-topbar">
          <a
            href={APP_ROUTES.WORK}
            className="work-detail-back"
            onClick={(event) => onRouteClick(event, APP_ROUTES.WORK)}
          >
            <span className="work-detail-back-arrow" aria-hidden="true">
              &larr;
            </span>
            Back to Work
          </a>
        </div>

        {/* 01. Project Introduction */}
        <header className="pf-section pf-intro">
          <div className="pf-intro-meta">
            <span className="pf-section-index">{intro.index}</span>
            <ul className="pf-tag-list" aria-label="Project details">
              {intro.tags.map((tag) => (
                <li key={tag} className="pf-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="pf-intro-grid">
            <div className="pf-intro-copy">
              <h1 className="pf-title" id="project-detail-heading">
                {intro.title}
              </h1>
              <p className="pf-subtitle">{intro.subtitle}</p>
              <p className="pf-lead">{intro.lead}</p>
              <p className="pf-body">{intro.summary}</p>
            </div>

            <dl className="pf-meta-grid">
              {intro.specs.map((spec) => (
                <div key={spec.label} className="pf-meta-item">
                  <dt className="pf-meta-label">{spec.label}</dt>
                  <dd className="pf-meta-value">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pf-hero-media">
            <img
              src={intro.heroThumbnail}
              alt={intro.heroThumbnailAlt}
              className="pf-hero-image"
            />
          </div>
        </header>

        {/* 02. Project Overview */}
        <section className="pf-section" aria-labelledby="pf-overview-heading">
          <span className="pf-section-index">{overview.index}</span>
          <div className="pf-overview-wrap">
            <h2 className="pf-heading" id="pf-overview-heading">
              {overview.heading}
            </h2>
            <p className="pf-body pf-overview-copy">{overview.copy}</p>
          </div>
        </section>

        {/* 03. Design Direction */}
        <section className="pf-section" aria-labelledby="pf-direction-heading">
          <span className="pf-section-index">{designDirection.index}</span>
          <div className="pf-direction-header">
            <h2 className="pf-heading" id="pf-direction-heading">
              {designDirection.heading}
            </h2>
            <p className="pf-body">{designDirection.description}</p>
          </div>

          <ul className="pf-token-grid" aria-label="PowerFit color tokens">
            {designDirection.tokens.map((token) => (
              <li key={token.hex} className="pf-token-card">
                <span
                  className={`pf-token-swatch ${token.swatchClass}`}
                  aria-hidden="true"
                />
                <div className="pf-token-meta">
                  <span className="pf-token-hex">{token.hex}</span>
                  <span className="pf-token-label">{token.label}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="pf-system-grid">
            <div className="pf-system-card">
              <span className="pf-system-eyebrow">Typography direction</span>
              <div className="pf-type-specimen" aria-hidden="true">
                {designDirection.typography.specimen}
              </div>
              <p className="pf-type-sample">
                {designDirection.typography.sampleHeadline}
              </p>
              <p className="pf-system-copy">
                {designDirection.typography.description}
              </p>
            </div>

            <div className="pf-system-card">
              <span className="pf-system-eyebrow">UI components</span>
              <div className="pf-component-preview" aria-label="Monochromatic PowerFit UI component specimens">
                <div className="pf-preview-progress">
                  <div className="pf-preview-progress-row">
                    <span>{designDirection.components.stepLabel}</span>
                    <strong>{designDirection.components.progressLabel}</strong>
                  </div>
                  <div className="pf-preview-track" aria-hidden="true">
                    <span className="pf-preview-fill pf-preview-fill--60" />
                  </div>
                </div>

                <div className="pf-preview-input">
                  {designDirection.components.inputPlaceholder}
                </div>

                <div className="pf-preview-options">
                  {designDirection.components.options.map((opt) => (
                    <div
                      key={opt.label}
                      className={`pf-preview-option${
                        opt.selected ? " is-selected" : ""
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="pf-preview-radio" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                <div className="pf-preview-cta">
                  {designDirection.components.ctaLabel}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. UI Screen Showcase */}
        <section className="pf-section" aria-labelledby="pf-showcase-heading">
          <span className="pf-section-index">{showcase.index}</span>
          <h2 className="pf-heading pf-showcase-title" id="pf-showcase-heading">
            12-Screen App Flow
          </h2>

          <div className="pf-groups-stack">
            {showcase.groups.map((group) => {
              const validScreens = group.screens.filter((s) => Boolean(s.src));

              return (
                <section
                  key={group.id}
                  className="pf-group"
                  aria-labelledby={`pf-group-${group.id}`}
                >
                  <div className="pf-group-header">
                    <span className="pf-group-eyebrow">{group.eyebrow}</span>
                    <h3
                      className="pf-group-title"
                      id={`pf-group-${group.id}`}
                    >
                      {group.title}
                    </h3>
                    <p className="pf-body pf-group-copy">
                      {group.description}
                    </p>
                  </div>

                  {group.layout === "spotlight" ? (
                    <div className="pf-showcase-stage pf-showcase-stage--spotlight">
                      {validScreens.map((screen) => (
                        <div key={screen.id} className="pf-spotlight-layout">
                          <figure className="pf-phone-figure pf-phone-figure--spotlight">
                            <div className="pf-screen-frame">
                              <img
                                src={screen.src}
                                alt={screen.alt}
                                className="pf-screen-img"
                                loading="lazy"
                              />
                            </div>
                            <figcaption className="pf-phone-caption">
                              {screen.label}
                            </figcaption>
                          </figure>

                          <div className="pf-spotlight-notes">
                            <div className="pf-spotlight-stat">
                              <span className="pf-spotlight-stat-num">45%</span>
                              <span className="pf-spotlight-stat-label">
                                Live Plan Calibration
                              </span>
                            </div>
                            <ul className="pf-spotlight-list">
                              <li>
                                High-contrast percentage indicator pairs with a
                                horizontal progress bar for instant clarity.
                              </li>
                              <li>
                                Explains how profile, routine, and interests
                                shape the upcoming training plan.
                              </li>
                              <li>
                                Muted disabled button sets expectations without
                                distracting from preparation status.
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pf-showcase-stage">
                      <div
                        className={`pf-screens-grid pf-screens-grid--${group.layout}`}
                      >
                        {validScreens.map((screen) => (
                          <figure key={screen.id} className="pf-phone-figure">
                            <div className="pf-screen-frame">
                              <img
                                src={screen.src}
                                alt={screen.alt}
                                className="pf-screen-img"
                                loading="lazy"
                              />
                            </div>
                            <figcaption className="pf-phone-caption">
                              {screen.label}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </section>

        {/* 05. Key Design Decisions */}
        <section className="pf-section" aria-labelledby="pf-decisions-heading">
          <span className="pf-section-index">{decisions.index}</span>
          <h2 className="pf-heading pf-decisions-title" id="pf-decisions-heading">
            {decisions.heading}
          </h2>

          <div className="pf-decisions-list" role="table" aria-label="Key design decisions">
            <div className="pf-decision-row pf-decision-row--head" role="row">
              <span role="columnheader">Design decision</span>
              <span role="columnheader">Purpose</span>
            </div>
            {decisions.items.map((row) => (
              <div key={row.decision} className="pf-decision-row" role="row">
                <strong className="pf-decision-name" role="cell">
                  {row.decision}
                </strong>
                <span className="pf-decision-purpose" role="cell">
                  {row.purpose}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 06. Project Conclusion */}
        <footer className="pf-section pf-conclusion" aria-labelledby="pf-conclusion-heading">
          <span className="pf-section-index">{conclusion.index}</span>
          <div className="pf-conclusion-card">
            <div className="pf-conclusion-copy">
              <h2 className="pf-heading" id="pf-conclusion-heading">
                {conclusion.heading}
              </h2>
              <p className="pf-body">{conclusion.copy}</p>
            </div>

            <div className="pf-conclusion-actions">
              <a
                href={APP_ROUTES.CONTACT}
                className="btn-pill pf-conclusion-cta"
                onClick={(event) => onRouteClick(event, APP_ROUTES.CONTACT)}
              >
                Let’s Talk
              </a>
              <a
                href={APP_ROUTES.WORK}
                className="work-detail-back"
                onClick={(event) => onRouteClick(event, APP_ROUTES.WORK)}
              >
                <span className="work-detail-back-arrow" aria-hidden="true">
                  &larr;
                </span>
                Back to Work
              </a>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
