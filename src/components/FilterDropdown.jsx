import React from 'react';

function FilterDropdown({ onTypeChange, selectedType }) {
  return (
    <div className="w-full mt-4">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 
                   focus:outline-none focus:border-violet-500 bg-teal-500
                   text-black cursor-pointer"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
    </div>
  );
}

export default FilterDropdown;
