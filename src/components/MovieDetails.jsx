import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center py-8 text-violet-600">Loading...</div>;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <div className='bg-black '>
    <div className="container  text-white mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-violet-600 rounded-md flex gap-2 text-center hover:bg-violet-500"
      >
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
         Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
            alt={movie.Title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-violet-600">{movie.Title}</h1>
          <div className="space-y-4">
            <p className="text-xl">{movie.Plot}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-violet-600">Year</h3>
                <p>{movie.Year}</p>
              </div>
              <div>
                <h3 className="font-bold text-violet-600">Genre</h3>
                <p>{movie.Genre}</p>
              </div>
              <div>
                <h3 className="font-bold text-violet-600">Director</h3>
                <p>{movie.Director}</p>
              </div>
              <div>
                <h3 className="font-bold text-violet-600">Runtime</h3>
                <p>{movie.Runtime}</p>
              </div>
            </div>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div>
                <h3 className="font-bold mb-2 text-violet-600">Ratings</h3>
                <div className="space-y-2">
                  {movie.Ratings.map((rating) => (
                    <div key={rating.Source}>
                      <span className="font-medium">{rating.Source}:{' '}
                      {rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MovieDetailsPage;
