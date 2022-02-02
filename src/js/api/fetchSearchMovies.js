const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '30b880cb8af36a78b014f41021bfb163';

async function fetchSearchMovies(searchValue, page) {
  if (!searchValue) {
    return;
  }
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${page}`,
    );
    const movies = response.json();
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export default fetchSearchMovies;
