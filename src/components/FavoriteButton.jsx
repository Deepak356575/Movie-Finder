import { useState, useEffect } from 'react';

function FavoriteButton({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    const favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
    
    if (isFavorite) {
     
      const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
    } else {
      
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/20"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill={isFavorite ? "#ff0000" : "none"}
        viewBox="0 0 24 24" 
        stroke={isFavorite ? "#ff0000" : "white"}
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}

export default FavoriteButton;
