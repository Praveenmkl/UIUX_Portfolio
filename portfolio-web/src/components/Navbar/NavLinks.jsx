import { shouldInterceptLinkClick } from "../../utils/router.js";

/**
 * Navigation link list with active underline indicator.
 */
export default function NavLinks({ links, activeHref, onSelect }) {
  return (
    <ul className="nav-links" id="navLinks">
      {links.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <li key={item.label}>
            <a
              href={item.href}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => {
                if (shouldInterceptLinkClick(event)) {
                  event.preventDefault();
                  onSelect(item.href);
                }
              }}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
