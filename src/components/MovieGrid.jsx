import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

function MovieGrid({ movies, currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative group">
            <Link 
              to={`/movie/${movie.imdbID}`}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[2/3]">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-image.jpg'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 bg-violet-900">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {movie.Title}
                  </h3>
                  <p className="text-violet-200 text-sm mt-1">
                    {movie.Year}
                  </p>
                </div>
              </div>
            </Link>
            <div className="absolute top-2 right-2 z-10">
              <FavoriteButton movie={movie} />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4 items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            } transition-colors duration-300`}
          >
            Previous
          </button>
          
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            } transition-colors duration-300`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieGrid;
