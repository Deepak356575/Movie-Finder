import React from 'react';

function FilterDropdown({ onTypeChange, selectedType }) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300 cursor-pointer outline-none"
    >
      <option value="">All Types</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  );
}

export default FilterDropdown;
