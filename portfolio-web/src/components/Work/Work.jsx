import { useState } from "react";
import wadakaruThumbnail from "../../assets/wadakaru thumbail.webp";
import powerfitThumbnail from "../../assets/powerfit/PowerFit Onboarding App Mockup.webp";
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
    thumbnail: wadakaruThumbnail,
    thumbnailAlt:
      "WADAKARU mobile app interface showcase with location-based service discovery, technician profile, and onboarding screens",
    fallbackTitle: "WADAKARU.LK",
    fallbackAssetHint: "wadakaru thumbail.webp",
  },
  {
    id: "powerfit-fitness-app",
    title: "PowerFit – Fitness & Workout Mobile App",
    subtitle:
      "A modern fitness experience designed to simplify personal training and workout planning.",
    category: "UI Designs",
    categories: ["UI Designs"],
    thumbnail: powerfitThumbnail,
    thumbnailAlt:
      "PowerFit mobile app interface showcase featuring splash and onboarding screens",
    fallbackTitle: "POWERFIT",
    fallbackAssetHint: "powerfit thumbnail.webp",
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
