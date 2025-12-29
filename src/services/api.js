const BASE_URL = import.meta.env.VITE_MOVIE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

console.log(BASE_URL)
console.log(API_KEY)

export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results;
};
