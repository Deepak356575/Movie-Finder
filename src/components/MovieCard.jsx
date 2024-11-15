function MovieCard({ movie }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-[400px] flex flex-col">
          <div className="h-[300px] relative">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
              alt={movie.Title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/placeholder.png';
              }}
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">
              {movie.Title}
            </h3>
            <p className="text-gray-600 mt-auto">{movie.Year}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  