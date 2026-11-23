import { useCallback } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Work, { WORK_PROJECTS } from "./components/Work/Work.jsx";
import WorkDetail from "./components/Work/WorkDetail.jsx";
import Articles from "./components/Articles/Articles.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import {
  APP_ROUTES,
  extractWorkProjectId,
  useAppRoute,
} from "./utils/router.js";

const ROUTE_TITLES = {
  [APP_ROUTES.HOME]: "Praveen Kalansooriya-UI/UX Designer",
  [APP_ROUTES.ABOUT]: "About-Praveen Kalansooriya",
  [APP_ROUTES.WORK]: "Work-Praveen Kalansooriya",
  [APP_ROUTES.ARTICLES]: "Articles-Praveen Kalansooriya",
  [APP_ROUTES.CONTACT]: "Contact-Praveen Kalansooriya",
};

/**
 * Root portfolio shell switching page views across all top-level and project showcase routes.
 */
export default function App() {
  const resolveRouteTitle = useCallback((path) => {
    const projectId = extractWorkProjectId(path);
    if (!projectId) {
      return null;
    }

    const project = WORK_PROJECTS.find((item) => item.id === projectId);
    return project
      ? `${project.title} — Praveen Kalansooriya`
      : ROUTE_TITLES[APP_ROUTES.WORK];
  }, []);

  const { activePath, navigate } = useAppRoute(ROUTE_TITLES, resolveRouteTitle);
  const projectId = extractWorkProjectId(activePath);
  const activeProject = projectId
    ? WORK_PROJECTS.find((item) => item.id === projectId) ?? null
    : null;

  const navActiveHref = activeProject ? APP_ROUTES.WORK : activePath;

  const workListView = <Work onOpenProject={navigate} />;

  const routeViews = {
    [APP_ROUTES.HOME]: <Hero onNavigate={navigate} />,
    [APP_ROUTES.ABOUT]: <About />,
    [APP_ROUTES.WORK]: workListView,
    [APP_ROUTES.ARTICLES]: <Articles />,
    [APP_ROUTES.CONTACT]: <Contact />,
  };

  const activeView = activeProject ? (
    <WorkDetail project={activeProject} onNavigate={navigate} />
  ) : (
    routeViews[activePath] ?? (projectId ? workListView : routeViews[APP_ROUTES.HOME])
  );

  return (
    <div className="app-layout">
      <Navbar activeHref={navActiveHref} onNavigate={navigate} />
      <main className="app-main">{activeView}</main>
      <Footer />
    </div>
  );
}
