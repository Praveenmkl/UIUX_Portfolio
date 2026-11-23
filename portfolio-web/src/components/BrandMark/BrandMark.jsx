import brandMarkImg from "../../assets/logo2.webp";
import "./BrandMark.css";

/**
 * Portfolio brand mark rendered from the asset image.
 */
export default function BrandMark({
  className = "",
  decorative = false,
  label = "Praveen Kalansooriya brand mark",
}) {
  const classes = ["brand-mark", className].filter(Boolean).join(" ");

  return (
    <img
      className={classes}
      src={brandMarkImg}
      alt={decorative ? "" : label}
      aria-hidden={decorative ? "true" : undefined}
      draggable="false"
    />
  );
}
