import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../services/api";
import FilterDropdown from '../components/FilterDropdown';
import MovieGrid from '../components/MovieGrid';

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = async (term, page = 1) => {
    if (!term.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSearchTerm(term);

      const data = await searchMovies(term, page, selectedType);
      
      if (data.Response === 'False') {
        setError(data.Error || 'No results found');
        setMovies([]);
        setTotalResults(0);
      } else {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults) || 0);
        setCurrentPage(page);
      }
    } catch (err) {
      setError('An error occurred while searching');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (searchTerm) {
      handleSearch(searchTerm, 1);
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(searchTerm, newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute top-20 left-20 text-white">
        <h2 className="text-2xl text-violet-600 font-bold tracking-wider">Ozbourne"</h2>
        <p className="text-sm text-gray-300">Your Ultimate Movie Guide</p>
      </div>

      <div className="absolute top-10 right-2 md:top-20 md:right-20   ">
        <Link 
          to="/favorites" 
          className="text-white bg-violet-800 rounded-lg p-2 hover:bg-violet-700 font-thin md:font-normal "
        >
          My Favorites
        </Link>
      </div>

      {!searchTerm && !loading && movies.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl font-bold text-center mb-8 text-violet-700 drop-shadow-lg">
            Movie Search
          </h1>
          <div className="w-full max-w-2xl backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <SearchBar 
                  onSearch={handleSearch} 
                  initialSearchTerm={searchTerm}
                />
              </div>
              <div className=" w-48 mx-auto">
                <FilterDropdown
                  onTypeChange={handleTypeChange}
                  selectedType={selectedType}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-3xl font-bold text-center mb-8 md:text-violet-700">Movie Search</h1>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-full max-w-2xl backdrop-blur-sm bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-4"> 
                <div className="w-full">
                  <SearchBar 
                    onSearch={handleSearch} 
                    initialSearchTerm={searchTerm}
                  />
                </div>
                <div className="w-full"> 
                  <FilterDropdown 
                    onTypeChange={handleTypeChange}
                    selectedType={selectedType}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4 p-2 bg-red-50/90 backdrop-blur-sm rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-500 border-t-transparent"></div>
              <p className="mt-2 text-violet-600">Loading...</p>
            </div>
          ) : (
            movies.length > 0 && (
              <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg">
               <MovieGrid
                 movies={movies}
                 currentPage={currentPage}
                 totalResults={totalResults}
                 onPageChange={handlePageChange}
               />
              </div>
            )
          )}

          {!loading && !error && movies.length === 0 && searchTerm && (
            <div className="text-center py-8 text-white">
              No movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
