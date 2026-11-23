import { useEffect, useRef, useState } from "react";
import { resolveResumeAsset } from "../../utils/assets.js";
import { APP_ROUTES, shouldInterceptLinkClick } from "../../utils/router.js";
import BrandMark from "../BrandMark/BrandMark.jsx";
import NavLinks from "./NavLinks.jsx";
import "./Navbar.css";

const BRAND_INFO = {
  name: "Praveen Kalansooriya",
  role: "UI/UX Designer",
};

const NAV_LINKS = [
  { label: "Home", href: APP_ROUTES.HOME },
  { label: "About", href: APP_ROUTES.ABOUT },
  { label: "Work", href: APP_ROUTES.WORK },
  { label: "Articles", href: APP_ROUTES.ARTICLES },
  { label: "Contact", href: APP_ROUTES.CONTACT },
];

const BUNDLED_RESUME = resolveResumeAsset();

const RESUME_CTA = {
  label: "Resume",
  href: BUNDLED_RESUME?.url ?? null,
  downloadName: BUNDLED_RESUME?.fileName ?? "Praveen_Kalansooriya_Resume.pdf",
};

/**
 * Floating pill navigation header with brand identity, route links, and resume CTA.
 */
export default function Navbar({ activeHref: controlledHref, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [internalHref, setInternalHref] = useState(APP_ROUTES.HOME);
  const activeHref = controlledHref ?? internalHref;
  const navRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handlePointerDown(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  function handleSelectLink(href) {
    setInternalHref(href);
    onNavigate?.(href);
    setIsMenuOpen(false);
  }

  function handleLinkClick(event, href) {
    if (shouldInterceptLinkClick(event)) {
      event.preventDefault();
      handleSelectLink(href);
    }
  }

  return (
    <header className="site-header">
      <div className="shell">
        <nav
          ref={navRef}
          className={`nav-pill${isMenuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <a
            className="brand-link"
            href={APP_ROUTES.HOME}
            aria-label={`${BRAND_INFO.name} — Home`}
            onClick={(event) => handleLinkClick(event, APP_ROUTES.HOME)}
          >
            <BrandMark className="nav-logo" decorative />
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-identity">
              <span className="brand-name">{BRAND_INFO.name}</span>
              <span className="brand-role">{BRAND_INFO.role}</span>
            </span>
          </a>

          <div className="nav-center">
            <NavLinks
              links={NAV_LINKS}
              activeHref={activeHref}
              onSelect={handleSelectLink}
            />
          </div>

          <div className="nav-actions">
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="navLinks"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="menu-toggle-lines" aria-hidden="true" />
            </button>

            {RESUME_CTA.href ? (
              <a
                className="btn-resume"
                href={RESUME_CTA.href}
                download={RESUME_CTA.downloadName}
                onClick={() => setIsMenuOpen(false)}
              >
                {RESUME_CTA.label}
              </a>
            ) : (
              <button
                className="btn-resume"
                type="button"
                disabled
                title="Add your resume file to src/assets/"
              >
                {RESUME_CTA.label}
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
