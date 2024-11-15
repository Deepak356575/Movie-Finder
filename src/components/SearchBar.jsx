import { useState, useEffect } from 'react';

function SearchBar({ onSearch, initialSearchTerm = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-violet-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 focus:outline-none focus:bg-violet-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
