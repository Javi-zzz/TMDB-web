import React from "react";

export default function Controls({ query, setQuery, sort, setSort, setPage }) {
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="controls-bar">
      <div className="controls">
        <label className="search-wrap">
          <input
            type="search"
            placeholder="Search for a movie…"
            value={query}
            onChange={handleSearch}
          />
        </label>

        <label className="sort-wrap">
          <span className="sort-label">Sort by:</span>
          <select value={sort} onChange={handleSort}>
            <option value="" disabled hidden>
              Sort By
            </option>
            <option value="release_desc">Release date (newest)</option>
            <option value="release_asc">Release date (oldest)</option>
            <option value="rating_desc">Average rating (highest)</option>
            <option value="rating_asc">Average rating (lowest)</option>
          </select>
        </label>
      </div>
    </div>
  );
}
