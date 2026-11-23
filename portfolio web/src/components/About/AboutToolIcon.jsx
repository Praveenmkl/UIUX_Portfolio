const TOOL_SVG_MAP = {
  figma: (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#111215" />
      <g transform="translate(20 14)">
        <path d="M6 0H12V12H6A6 6 0 0 1 6 0Z" fill="#F24E1E" />
        <path d="M12 0H18A6 6 0 0 1 18 12H12V0Z" fill="#FF7262" />
        <path d="M6 12H12V24H6A6 6 0 0 1 6 12Z" fill="#A259FF" />
        <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
        <path d="M6 24H12V30A6 6 0 1 1 6 24Z" fill="#0ACF83" />
      </g>
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#001E36" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="#31A8FF"
        fontFamily="Poppins, Inter, Arial, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        Ps
      </text>
    </svg>
  ),
  illustrator: (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#330000" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="#FF9A00"
        fontFamily="Poppins, Inter, Arial, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        Ai
      </text>
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#0B0B0D" />
      <path d="M20 14H44V26H32L20 14Z" fill="#FFFFFF" />
      <path d="M20 26H32L44 38H20V26Z" fill="#00AAFF" />
      <path d="M20 38H32V50L20 38Z" fill="#0055FF" />
    </svg>
  ),
  miro: (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#FFD02F" />
      <path
        d="M44 16H38L42 25L33 16H27L32 27L22 16H17L24 30L17 48H22L31 32L27 48H33L40 31L38 48H44L47 26L44 16Z"
        fill="#050038"
      />
    </svg>
  ),
};

/**
 * Uniform 64x64 rounded-square tool badge supporting local image overrides and vector fallbacks.
 */
export default function AboutToolIcon({ id, name, image }) {
  if (image) {
    return (
      <span className="about-tool-icon" aria-hidden="true">
        <img src={image} alt="" className="about-tool-image" />
      </span>
    );
  }

  return (
    <span className="about-tool-icon" aria-hidden="true">
      {TOOL_SVG_MAP[id] ?? (
        <span className="about-tool-monogram">{name.slice(0, 2)}</span>
      )}
    </span>
  );
}
