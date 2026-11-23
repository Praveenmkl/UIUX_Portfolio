/**
 * Category filter tabs rendered as pill buttons above the project showcase.
 */
export default function WorkFilters({ filters, activeFilter, onSelect }) {
  return (
    <div className="work-filters" role="tablist" aria-label="Work categories">
      {filters.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`work-filter-pill${
              isActive ? " work-filter-pill--active" : ""
            }`}
            onClick={() => onSelect(filter)}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

