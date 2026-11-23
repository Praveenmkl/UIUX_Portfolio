import { useCallback, useEffect, useState } from "react";

export const APP_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  WORK: "/work",
  ARTICLES: "/articles",
  CONTACT: "/contact",
};

const VALID_ROUTES = new Set(Object.values(APP_ROUTES));
const WORK_DETAIL_PREFIX = `${APP_ROUTES.WORK}/`;

const HASH_ALIAS_MAP = {
  home: APP_ROUTES.HOME,
  about: APP_ROUTES.ABOUT,
  work: APP_ROUTES.WORK,
  articles: APP_ROUTES.ARTICLES,
  contact: APP_ROUTES.CONTACT,
};

/**
 * Extract project ID slug from a /work/<projectId> route, or null otherwise.
 */
export function extractWorkProjectId(routePath) {
  if (!routePath?.startsWith(WORK_DETAIL_PREFIX)) {
    return null;
  }

  const slug = routePath.slice(WORK_DETAIL_PREFIX.length);
  return slug && !slug.includes("/") ? slug : null;
}

/**
 * Normalize a pathname, hash, or route string to one of the application's supported routes.
 */
export function normalizeRoute(rawTarget) {
  if (!rawTarget || rawTarget === "/") {
    return APP_ROUTES.HOME;
  }

  const trimmed = rawTarget.trim();

  if (trimmed.startsWith("#")) {
    const hashTarget = trimmed.replace(/^#\/?/, "").toLowerCase();
    if (hashTarget.startsWith("work/")) {
      const slug = hashTarget.slice("work/".length);
      return slug ? `${WORK_DETAIL_PREFIX}${slug}` : APP_ROUTES.WORK;
    }
    return HASH_ALIAS_MAP[hashTarget] ?? APP_ROUTES.HOME;
  }

  const normalizedPath = trimmed.replace(/\/+$/, "").toLowerCase() || "/";

  if (extractWorkProjectId(normalizedPath)) {
    return normalizedPath;
  }

  return VALID_ROUTES.has(normalizedPath) ? normalizedPath : APP_ROUTES.HOME;
}

/**
 * Read initial route from pathname or fallback hash fragment when loaded directly.
 */
export function readInitialRoute() {
  if (typeof window === "undefined") {
    return APP_ROUTES.HOME;
  }

  if (window.location.hash) {
    return normalizeRoute(window.location.hash);
  }

  return normalizeRoute(window.location.pathname);
}

/**
 * Return true for unmodified left-clicks suitable for client-side SPA route interception.
 */
export function shouldInterceptLinkClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

/**
 * Synchronize active route state with browser history and resolved document title.
 */
export function useAppRoute(routeTitles, resolveTitle) {
  const [activePath, setActivePath] = useState(readInitialRoute);

  const navigate = useCallback((href) => {
    const targetPath = normalizeRoute(href);

    if (typeof window !== "undefined") {
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState(null, "", targetPath);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    setActivePath(targetPath);
  }, []);

  useEffect(() => {
    function handleHistoryChange() {
      setActivePath(readInitialRoute());
    }

    window.addEventListener("popstate", handleHistoryChange);
    window.addEventListener("hashchange", handleHistoryChange);
    return () => {
      window.removeEventListener("popstate", handleHistoryChange);
      window.removeEventListener("hashchange", handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    const customTitle = resolveTitle?.(activePath);
    const nextTitle = customTitle ?? routeTitles?.[activePath];
    if (nextTitle) {
      document.title = nextTitle;
    }
  }, [activePath, routeTitles, resolveTitle]);

  return { activePath, navigate };
}
