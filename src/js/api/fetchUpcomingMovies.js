const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '30b880cb8af36a78b014f41021bfb163';

async function fetchUpcomingMovies() {
    try {
          const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`);
        // const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=30b880cb8af36a78b014f41021bfb163&language=en-US&page=1');
      const movies = response.json();
      // console.log(movies);
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export default fetchUpcomingMovies;
