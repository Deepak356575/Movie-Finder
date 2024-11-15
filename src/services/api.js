const API_KEY = 'f82205f7'; 
const BASE_URL = 'https://www.omdbapi.com/';


export const searchMovies = async (searchTerm, page = 1, type = '') => {
  try {
    const typeParam = type ? `&type=${type}` : '';
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}${typeParam}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Failed to fetch movie details');
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
