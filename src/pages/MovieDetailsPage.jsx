import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-600 border-t-transparent"></div>
          <p className="mt-2 text-violet-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-400 mb-4">{error}</p>
          <Link to="/" className="text-violet-600 hover:text-violet-500">
          <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
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
      

        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-image.jpg'}
              alt={movie.Title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-violet-600 mb-4">{movie.Title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-violet-500 rounded-full text-sm">
                {movie.Year}</span>
              
              <span className="px-3 py-1 bg-violet-500 rounded-full text-sm">
                {movie.Rated}</span>
              
              <span className="px-3 py-1 bg-violet-500 rounded-full text-sm">
                {movie.Runtime}</span>
              
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-violet-600 mb-2">Plot</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-violet-600 mb-2">Details</h2>
                <ul className="space-y-2 text-gray-300">
                  <li><span className="font-semibold">Director: {movie.Director}</span></li>
                  <li><span className="font-semibold">Writers: {movie.Writer}</span></li>
                  <li><span className="font-semibold">Stars: {movie.Actors}</span></li>
                  <li><span className="font-semibold">Genre: {movie.Genre}</span></li>
                  <li><span className="font-semibold">Released: {movie.Released}</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-violet-600 mb-2">Ratings</h2>
                <ul className="space-y-2 text-gray-300">
                  {movie.Ratings?.map((rating, index) => (
                    <li key={index}>
                      <span className="font-semibold">{rating.Source}: {rating.Value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
