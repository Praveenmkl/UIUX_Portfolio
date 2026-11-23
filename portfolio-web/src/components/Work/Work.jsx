import { useState } from "react";
import { resolveAssetByKeyword } from "../../utils/assets.js";
import WorkCard from "./WorkCard.jsx";
import WorkFilters from "./WorkFilters.jsx";
import "./Work.css";

const WORK_FILTERS = ["All", "UI Designs", "UX Case Studies"];
const DEFAULT_WORK_FILTER = "UI Designs";

export const WORK_PROJECTS = [
  {
    id: "wadakaru-home-services",
    title: "WADAKARU – Home Services Booking App",
    subtitle: "Connecting homeowners with trusted local service professionals",
    category: "UI Designs",
    categories: ["UI Designs"],
    thumbnail: resolveAssetByKeyword("wadakaru"),
    thumbnailAlt:
      "WADAKARU mobile app interface showcase with onboarding, location-based service discovery, and technician profile screens",
  },
];

/**
 * Filterable Selected Work page view linking cards to dedicated full-page UI showcases.
 */
export default function Work({ onOpenProject }) {
  const [activeFilter, setActiveFilter] = useState(
    DEFAULT_WORK_FILTER || WORK_FILTERS[0] || "All"
  );

  const visibleProjects =
    activeFilter === "All"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((project) =>
          (project.categories || [project.category]).includes(activeFilter)
        );

  return (
    <section
      className="shell page-section work-section"
      aria-labelledby="work-heading"
    >
      <h1 id="work-heading" className="sr-only">
        Selected Work
      </h1>

      <div className="page-divider" aria-hidden="true" />

      <WorkFilters
        filters={WORK_FILTERS}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
      />

      {visibleProjects.length > 0 ? (
        <div className="work-grid">
          {visibleProjects.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      ) : (
        <div className="work-empty">
          <p className="work-empty-text">
            No projects published under {activeFilter} yet.
          </p>
          <button
            type="button"
            className="work-empty-reset"
            onClick={() => setActiveFilter("All")}
          >
            View All Projects
          </button>
        </div>
      )}
    </section>
  );
}
