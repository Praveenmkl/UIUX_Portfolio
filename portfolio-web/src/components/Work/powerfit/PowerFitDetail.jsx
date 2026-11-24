import { useEffect, useState } from "react";
import { APP_ROUTES } from "../../../utils/router.js";
import { POWERFIT_CASE_STUDY } from "./powerfitCaseStudy.js";
import "./PowerFitDetail.css";

const FIRST_IMPRESSION_STEPS = [
  {
    step: "01",
    title: "Brand Splash",
    note: "Pure black full-screen entry highlighting the geometric PowerFit mark.",
  },
  {
    step: "02",
    title: "Welcome to PowerFit",
    note: "Monochrome gym photography paired with bold display headlines.",
  },
  {
    step: "03",
    title: "Find Your Favorite Workout",
    note: "Highlights strength, cardio, and mobility exploration.",
  },
  {
    step: "04",
    title: "Your Goals. Your Training.",
    note: "Ends onboarding with a high-contrast Get started action.",
  },
];

/**
 * Renders a screen gallery stage adapted to its visual theme and exact count of loaded screens.
 */
function ScreenGalleryStage({ group, onSelectScreen }) {
  const validScreens = group.screens.filter((screen) => Boolean(screen.src));
  const isDark = group.id === "first-impression";
  const isPersonalisation = group.id === "personalisation";

  if (group.layout === "spotlight") {
    return (
      <div className="pf-showcase-stage pf-showcase-stage--spotlight">
        {validScreens.length > 0 ? (
          validScreens.map((screen) => (
            <div key={screen.id} className="pf-spotlight-layout">
              <figure className="pf-phone-figure pf-phone-figure--spotlight">
                <button
                  type="button"
                  className="pf-screen-button"
                  onClick={() => onSelectScreen(screen)}
                  aria-label={`Inspect ${screen.label}`}
                >
                  <div className="pf-screen-frame">
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      className="pf-screen-img"
                      loading="lazy"
                    />
                  </div>
                </button>
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
                    High-contrast percentage indicator pairs with a horizontal
                    progress bar for instant clarity.
                  </li>
                  <li>
                    Explains how profile, routine, and interests shape the
                    upcoming training plan.
                  </li>
                  <li>
                    Muted disabled button sets expectations without distracting
                    from preparation status.
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="pf-spotlight-layout">
            <div
              className="pf-plan-mockup"
              aria-label="PowerFit 45% plan preparation interface"
            >
              <span className="pf-plan-brand">POWERFIT</span>
              <strong className="pf-plan-title">A plan built around you.</strong>
              <p className="pf-plan-sub">
                We’re creating your training plan from your profile, routine, and
                interests.
              </p>
              <div className="pf-plan-percent">45%</div>
              <div className="pf-plan-track" aria-hidden="true">
                <span className="pf-plan-fill" />
              </div>
              <span className="pf-plan-status">Creating your training plan...</span>
              <span className="pf-plan-btn">Creating your plan...</span>
            </div>

            <div className="pf-spotlight-notes">
              <div className="pf-spotlight-stat">
                <span className="pf-spotlight-stat-num">45%</span>
                <span className="pf-spotlight-stat-label">
                  Live Plan Calibration
                </span>
              </div>
              <ul className="pf-spotlight-list">
                <li>
                  High-contrast percentage indicator pairs with a horizontal
                  progress bar for instant clarity.
                </li>
                <li>
                  Explains how profile, routine, and interests shape the
                  upcoming training plan.
                </li>
                <li>
                  Muted disabled button sets expectations without distracting
                  from preparation status.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Pair single-screen First Impression cleanly in a dark spotlight instead of empty columns.
  if (isDark && validScreens.length === 1) {
    const splashScreen = validScreens[0];
    return (
      <div className="pf-showcase-stage pf-showcase-stage--dark">
        <div className="pf-dark-spotlight">
          <figure className="pf-phone-figure pf-phone-figure--dark-hero">
            <button
              type="button"
              className="pf-screen-button"
              onClick={() => onSelectScreen(splashScreen)}
              aria-label={`Inspect ${splashScreen.label}`}
            >
              <div className="pf-screen-frame pf-screen-frame--dark">
                <img
                  src={splashScreen.src}
                  alt={splashScreen.alt}
                  className="pf-screen-img"
                  loading="lazy"
                />
              </div>
            </button>
            <figcaption className="pf-phone-caption pf-phone-caption--dark">
              {splashScreen.label}
            </figcaption>
          </figure>

          <div className="pf-dark-flow">
            <span className="pf-dark-flow-kicker">Onboarding Sequence</span>
            <ol className="pf-dark-steps">
              {FIRST_IMPRESSION_STEPS.map((item) => (
                <li key={item.step} className="pf-dark-step">
                  <span className="pf-dark-step-num">{item.step}</span>
                  <div>
                    <strong className="pf-dark-step-title">{item.title}</strong>
                    <p className="pf-dark-step-note">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const colCount = Math.max(1, Math.min(4, validScreens.length));

  return (
    <div
      className={`pf-showcase-stage${
        isDark ? " pf-showcase-stage--dark" : ""
      }${isPersonalisation ? " pf-showcase-stage--stepped" : ""}`}
    >
      {isPersonalisation && validScreens.length > 1 && (
        <div className="pf-flow-strip" aria-hidden="true">
          <span className="pf-flow-strip-label">Guided 5-Step Setup</span>
          <div className="pf-flow-strip-bar">
            <span className="pf-flow-strip-fill" />
          </div>
          <span className="pf-flow-strip-count">
            {validScreens.length} Featured Steps
          </span>
        </div>
      )}

      <div className={`pf-screens-grid pf-screens-grid--cols-${colCount}`}>
        {validScreens.map((screen, index) => (
          <figure key={screen.id} className="pf-phone-figure">
            <button
              type="button"
              className="pf-screen-button"
              onClick={() => onSelectScreen(screen)}
              aria-label={`Inspect ${screen.label}`}
            >
              <div
                className={`pf-screen-frame${
                  isDark ? " pf-screen-frame--dark" : ""
                }`}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="pf-screen-img"
                  loading="lazy"
                />
              </div>
            </button>
            <figcaption
              className={`pf-phone-caption${
                isDark ? " pf-phone-caption--dark" : ""
              }`}
            >
              <span className="pf-phone-step">
                {String(index + 1).padStart(2, "0")}
              </span>
              {screen.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/**
 * UI Design Showcase detail view for the 12-screen PowerFit mobile concept.
 */
export default function PowerFitDetail({ onRouteClick }) {
  const { intro, overview, designDirection, showcase, decisions, conclusion } =
    POWERFIT_CASE_STUDY;
  const [activeScreen, setActiveScreen] = useState(null);

  useEffect(() => {
    if (!activeScreen) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveScreen(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScreen]);

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
              <div
                className="pf-component-preview"
                aria-label="Monochromatic PowerFit UI component specimens"
              >
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
          <div className="pf-showcase-header-row">
            <div>
              <span className="pf-section-index">{showcase.index}</span>
              <h2 className="pf-heading" id="pf-showcase-heading">
                12-Screen App Flow
              </h2>
            </div>
            <span className="pf-showcase-hint">Click any screen to zoom</span>
          </div>

          <div className="pf-groups-stack">
            {showcase.groups.map((group) => (
              <section
                key={group.id}
                className="pf-group"
                aria-labelledby={`pf-group-${group.id}`}
              >
                <div className="pf-group-header">
                  <span className="pf-group-eyebrow">{group.eyebrow}</span>
                  <h3 className="pf-group-title" id={`pf-group-${group.id}`}>
                    {group.title}
                  </h3>
                  <p className="pf-body pf-group-copy">{group.description}</p>
                </div>

                <ScreenGalleryStage
                  group={group}
                  onSelectScreen={setActiveScreen}
                />
              </section>
            ))}
          </div>
        </section>

        {/* 05. Key Design Decisions */}
        <section className="pf-section" aria-labelledby="pf-decisions-heading">
          <span className="pf-section-index">{decisions.index}</span>
          <h2 className="pf-heading pf-decisions-title" id="pf-decisions-heading">
            {decisions.heading}
          </h2>

          <div
            className="pf-decisions-list"
            role="table"
            aria-label="Key design decisions"
          >
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
        <footer
          className="pf-section pf-conclusion"
          aria-labelledby="pf-conclusion-heading"
        >
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

      {activeScreen && (
        <div
          className="pf-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeScreen.label}
          onClick={() => setActiveScreen(null)}
        >
          <div
            className="pf-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pf-lightbox-bar">
              <span className="pf-lightbox-title">{activeScreen.label}</span>
              <button
                type="button"
                className="pf-lightbox-close"
                onClick={() => setActiveScreen(null)}
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
            <img
              src={activeScreen.src}
              alt={activeScreen.alt}
              className="pf-lightbox-image"
            />
          </div>
        </div>
      )}
    </article>
  );
}
