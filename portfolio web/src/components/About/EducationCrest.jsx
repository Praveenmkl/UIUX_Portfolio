/**
 * Academic emblem badge for education entries with raster asset override and circular crest SVG fallback.
 */
export default function EducationCrest({ crest, institution }) {
  if (crest) {
    return (
      <div className="about-education-crest" aria-hidden="true">
        <img src={crest} alt={`${institution} crest`} className="about-education-image" />
      </div>
    );
  }

  return (
    <div className="about-education-crest" aria-hidden="true">
      <svg viewBox="0 0 68 68" width="68" height="68">
        <circle cx="34" cy="34" r="32" fill="#E3A018" />
        <circle
          cx="34"
          cy="34"
          r="27"
          fill="#6F1D1B"
          stroke="#F7D060"
          strokeWidth="1.5"
        />
        <circle
          cx="34"
          cy="34"
          r="21"
          fill="none"
          stroke="#E3A018"
          strokeWidth="1.4"
          strokeDasharray="2.5 2.5"
        />
        <circle cx="34" cy="34" r="14" fill="#E3A018" />
        <circle cx="34" cy="34" r="11" fill="#6F1D1B" />
        <g stroke="#F7D060" strokeWidth="1.6" strokeLinecap="round">
          <line x1="34" y1="22" x2="34" y2="46" />
          <line x1="22" y1="34" x2="46" y2="34" />
          <line x1="25.5" y1="25.5" x2="42.5" y2="42.5" />
          <line x1="42.5" y1="25.5" x2="25.5" y2="42.5" />
        </g>
        <circle cx="34" cy="34" r="4" fill="#F7D060" />
      </svg>
    </div>
  );
}
