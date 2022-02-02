import refs from '../ollRefs/refs';
import arrayGenres from './arrayGenres';
import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import fetchSearchMovies from '../api/fetchSearchMovies';
import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from './preloader';
import Notiflix from 'notiflix';
import { pagination } from '../main/renderMain';
import { eventPagination } from '../main/renderMain';
import { page } from '../main/renderMain';
import { resetRenderGallery } from '../main/renderMain';

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
      <li class='list_film_item' id=${id}>
        <img class="list_film_image" style = "border-radius: 5px" src=${poster} alt='Обложка фильма' loading='lazy' />
        <div class='info'>
            <p class='info-title'>
              <b>${title}</b>
            </p>
            <p class='info-date'>
              <span>${checkGenres} | ${releaseYear}</span>
              <span class="info-average">${vote_average}</span>
            </p>
        </div>
      </li>
      `;
    })
    .join('');
}

function onFetchLibraryWatched(e) {
  e.preventDefault();
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
      return;
    }
    const movies = Object.values(data);
    preloader();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
    // pagination.reset(movies.length);
    // pagination.on('afterMove', eventWatchedPagination);
  });
}

function onFetchLibraryQueue(e) {
  e.preventDefault();
  // pagination.off('afterMove', eventWatchedPagination);
  // pagination.movePageTo(page);
  refs.btnWatched.classList.remove('button__active');
  refs.btnQueue.classList.add('button__active');
  getQueuesFilms().then(data => {
    if (!data) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.info('Library of queues films is empty');
      return;
    }
    const movies = Object.values(data);
    preloader();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
    // pagination.reset(movies.length);
    // pagination.on('afterMove', eventQueuePagination);
  });
}

// function eventWatchedPagination(event) {
//   getWatchesFilms(event.page).then(data => {
//     const movies = Object.values(data);
//     resetRenderGallery();
//     refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
//   });
// }

// function eventQueuePagination(event) {
//   getQueueFilms(event.page).then(data => {
//     const movies = Object.values(data);
//     resetRenderGallery();
//     refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
//   });
// }

refs.library.addEventListener('click', onFetchLibraryWatched);

refs.btnWatched.addEventListener('click', onFetchLibraryWatched);
refs.btnQueue.addEventListener('click', onFetchLibraryQueue);
