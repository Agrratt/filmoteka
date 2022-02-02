const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '30b880cb8af36a78b014f41021bfb163';

async function fetchFavoritesMovies(page) {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`);
    const movies = response.json();
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export default fetchFavoritesMovies;
