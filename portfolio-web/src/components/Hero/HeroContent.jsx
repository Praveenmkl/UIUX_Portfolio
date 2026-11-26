import { shouldInterceptLinkClick } from "../../utils/router.js";

/**
 * Left hero text column: headline, role, bio, and primary/secondary actions.
 */
export default function HeroContent({
  greeting,
  name,
  role,
  roleFlag,
  bio,
  primaryCta,
  secondaryCta,
  onNavigate,
}) {
  function handleCtaClick(event, href) {
    if (onNavigate && shouldInterceptLinkClick(event)) {
      event.preventDefault();
      onNavigate(href);
    }
  }

  const nameMatch = name.match(/^(I[’']m\s+)(.+)$/);
  const nameIntro = nameMatch ? nameMatch[1] : "";
  const nameMain = nameMatch ? nameMatch[2] : name;

  return (
    <div className="hero-copy">
      <h1 className="hero-title" id="hero-heading">
        <span className="hero-greeting">{greeting}</span>
        <br />
        <span className="hero-name">
          {nameIntro}
          <span className="hero-name-full">{nameMain}</span>
        </span>
      </h1>
      <p className="hero-role">
        <span>{role}</span>
        {roleFlag && (
          <img
            src={roleFlag}
            alt=""
            aria-hidden="true"
            className="hero-role-flag"
          />
        )}
      </p>
      <p className="hero-bio">{bio}</p>

      <div className="hero-cta">
        <a
          className="btn-pill btn-explore"
          href={primaryCta.href}
          onClick={(event) => handleCtaClick(event, primaryCta.href)}
        >
          {primaryCta.label}
        </a>
        <a
          className="btn-talk"
          href={secondaryCta.href}
          onClick={(event) => handleCtaClick(event, secondaryCta.href)}
        >
          {secondaryCta.label}{" "}
          <span className="arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
