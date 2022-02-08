const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '30b880cb8af36a78b014f41021bfb163';

async function fetchSimilarMovie(id) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    const movies = response.json();
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export default fetchSimilarMovie;
