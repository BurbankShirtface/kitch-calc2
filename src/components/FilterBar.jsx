import "./FilterBar.css";

export default function FilterBar({
  filters,
  setFilters,
  sortConfig,
  setSortConfig,
}) {
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSortChange = (field) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="all">All Stages</option>
          <option value="Intake">Intake</option>
          <option value="Quote">Quote</option>
          <option value="Pre-Construction">Pre-Construction</option>
          <option value="Construction">Construction</option>
          <option value="Close-Out">Close-Out</option>
          <option value="Finished">Finished</option>
        </select>

        <select
          value={filters.projectType}
          onChange={(e) => handleFilterChange("projectType", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Renovation">Renovation</option>
          <option value="New Construction">New Construction</option>
        </select>

        <button
          className="sort-btn"
          onClick={() => handleSortChange("projectName")}
        >
          Name{" "}
          {sortConfig.field === "projectName" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
}
