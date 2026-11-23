import logo4 from "../../assets/logo2.webp";
import "./BrandMark.css";

/**
 * Portfolio brand mark rendered from the asset image.
 * Supports static navbar usage and animated hero reveal.
 */
export default function BrandMark({
  className = "",
  animated = false,
  decorative = false,
  label = "Praveen Kalansooriya brand mark",
}) {
  const classes = [
    "brand-mark",
    animated ? "brand-mark--animated" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      className={classes}
      src={logo4}
      alt={decorative ? "" : label}
      aria-hidden={decorative ? "true" : undefined}
      draggable="false"
    />
  );
}
