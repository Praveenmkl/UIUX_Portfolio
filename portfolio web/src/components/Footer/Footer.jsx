import "./Footer.css";

const FOOTER_CONTENT = {
  copyright: "© 2026 Praveen Kalansooriya",
};

/**
 * Portfolio footer displaying copyright ownership.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-inner">{FOOTER_CONTENT.copyright}</div>
      </div>
    </footer>
  );
}
