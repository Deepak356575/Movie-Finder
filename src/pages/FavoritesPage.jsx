import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('movieFavorites');
        console.log('Stored favorites:', storedFavorites); 
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = (imdbID) => {
    try {
      const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
      setFavorites(updatedFavorites);
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  console.log('Current favorites:', favorites); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="container mx-auto py-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-violet-500 hover:text-violet-400 transition-colors mb-6"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Search
        </Link>
      </div>

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-violet-600">My Favorite Movies</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No favorite movies yet.</p>
            <Link 
              to="/" 
              className="text-violet-500 hover:text-violet-400 mt-4 inline-block"
            >
              Go search for movies to add to your favorites!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(movie => (
              <div 
                key={movie.imdbID} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-image.jpg'}
                    alt={movie.Title}
                    className="w-full h-96 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                  <p className="text-gray-400 mb-4">{movie.Year}</p>
                  <button
                    onClick={() => removeFromFavorites(movie.imdbID)}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold py-2 px-4 rounded transition-colors"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
