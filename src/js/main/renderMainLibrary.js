import refs from '../allRefs/refs';
import arrayGenres from './arrayGenres';
import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import fetchSearchMovies from '../api/fetchSearchMovies';
import renderMarkupHome from '../header/renderMarkupHome';
import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from './preloader';
import { startSpinner } from '../main/preloader';
import { stopSpinner } from '../main/preloader';
import Notiflix from 'notiflix';
import { pagination } from '../main/renderMain';
import { eventPagination } from '../main/renderMain';
import { page } from '../main/renderMain';
import { resetRenderGallery } from '../main/renderMain';
export { renderGalleryLibrary };

function getGenres(arrayId) {
  const arr = [];
  for (const value of arrayGenres) {
    if (arrayId.includes(value.id)) {
      arr.push(value.name);
    }
  }
  if (arrayId.length > 2) {
    arr.splice(2, arr.length - 2, 'Other');
  }

  return arr.join(', ');
}

function renderGalleryLibrary(movies) {
  return movies
    .map(({ id, poster_path, title, release_date, genres, vote_average }) => {
      let arrayId = [];
      let checkGenres = 'Unknown';
      if (genres) {
        for (const value of genres) {
          arrayId.push(value.id);
        }
        checkGenres = getGenres(arrayId);
      }
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://db4films.com/assets/img/cover.jpg';
      const releaseYear = release_date ? release_date.split('-')[0] : 'Unknown';
      return `
      <li class='list_film_item' id=${id}><a href="" class='list_film_link link' id=${id}>
        <img class="list_film_image" src=${poster} alt='Обложка фильма' loading='lazy' />
        <div class='info'>
            <p class='info-title'>
              <b>${title}</b>
            </p>
            <p class='info-date'>
              <span>${checkGenres} | ${releaseYear}</span>
              <span class="info-average">${vote_average}</span>
            </p>
        </div></a>
      </li>
      `;
    })
    .join('');
}
refs.library.addEventListener('click', onFetchLibraryWatched, { once: true });

export default function onFetchLibraryWatched(e) {
  e.preventDefault();
  refs.home.addEventListener('click', renderMarkupHome, { once: true });
  refs.btnQueue.addEventListener('click', onFetchLibraryQueue, { once: true });
  startSpinner();
  // pagination.off('afterMove', event => {
  //   fetchSearchMovies(searchValue, event.page).then(r => {
  //     refs.gallery.innerHTML = '';
  //     refs.gallery.insertAdjacentHTML('beforeend', renderGallery(r.results));
  //   });
  // });
  // pagination.movePageTo(page);

  refs.tuiContainer.classList.add('visually-hidden');
  refs.upcomingMovies.classList.add('visually-hidden');
  refs.upcomingTitle.classList.add('visually-hidden');
  // pagination.off('afterMove', event => {
  //   fetchSearchMovies(searchValue, event.page).then(r => {
  //     refs.gallery.innerHTML = '';
  //     refs.gallery.insertAdjacentHTML('beforeend', renderGallery(r.results));
  //   });
  // });
  // pagination.movePageTo(page);

  refs.btnWatched.classList.add('button__active');
  refs.btnQueue.classList.remove('button__active');

  getWatchesFilms().then(data => {
    if (!data) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.info('Library of watched films is empty');
      stopSpinner();
      return;
    }
    const movies = Object.values(data);
    stopSpinner();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
  });
}

function onFetchLibraryQueue(e) {
  e.preventDefault();
  refs.btnWatched.addEventListener('click', onFetchLibraryWatched, { once: true });

  startSpinner();
  // pagination.off('afterMove', eventWatchedPagination);
  // pagination.movePageTo(page);

  refs.btnWatched.classList.remove('button__active');
  refs.btnQueue.classList.add('button__active');
  getQueuesFilms().then(data => {
    if (!data) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.info('Library of queues films is empty');
      stopSpinner();
      return;
    }
    const movies = Object.values(data);
    stopSpinner();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
  });
}

refs.btnQueue.addEventListener('click', onFetchLibraryQueue, { once: true });
