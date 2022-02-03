//======= DB Firebase =======
import getWatchesFilms from './js/db/getWatchesFilms';
import getQueuesFilms from './js/db/getQueuesFilms';
import removeAllWatchesFilms from './js/db/removeAllWatchesFilms';
import removeAllQueuesFilms from './js/db/removeAllQueuesFilms';
import removeWatchedFilm from './js/db/removeWatchedFilm';
import removeQueueFilm from './js/db/removeQueueFilm';
import setWatchedFilm from './js/db/setWatchedFilm';
import setQueueFilm from './js/db/setQueueFilm';

//======= API Service =======
import fetchSearchMovies from './js/api/fetchSearchMovies';
import fetchFavoritesMovies from './js/api/fetchFavoritesMovies';
import fetchDetailsMovie from './js/api/fetchDetailsMovie';
import fetchGenresMovies from './js/api/fetchGenresMovies';

//======= Styles =======
import './sass/main.scss';

//======= Main =======
import renderMain from './js/main/renderMain';

//========= Header ============
import renderMarkupLibrary from './js/header/renderMarkupLibrary';
import renderMarkupHome from './js/header/renderMarkupHome';
// More info
import more_info from './js/more_info/more_info';

const refs = {
  container: document.querySelector('.container'),
};

// fetchSearchMovies('marvel').then(data => {
//   refs.container.insertAdjacentHTML('beforeend', renderGallery(data.results));
// });

function renderGallery(movies) {
  return movies
    .map(({ id, poster_path, title, release_date }) => {
      const releaseYear = release_date.split('-')[0];
      return `
      <div class='photo-card' id=${id}>
        <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt='{{tags}}' loading='lazy' />
        <div class='info'>
            <p class='info-item'>
              <b>${title}</b>
            </p>
            <p class='info-item'>
              <span>${releaseYear}</span>
            </p>
        </div>
      </div>
      `;
    })
    .join('');
}

import renderMainLibrary from './js/main/renderMainLibrary';
import searchFilms from './js/main/searchFilms';
import showMovieTrailer from './js/main/showMovieTrailer'