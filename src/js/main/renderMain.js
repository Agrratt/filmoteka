import fetchFavoritesMovies from '../api/fetchFavoritesMovies';

import refs from '../allRefs/refs';

import arrayGenres from './arrayGenres';

import preloader from './preloader';
import { startSpinner } from '../main/preloader';
import { stopSpinner } from '../main/preloader';

import Pagination from 'tui-pagination';

// ================== add spinner ============
startSpinner();
// ========Pagination====== //

let pagination = new Pagination(refs.tuiContainer, {
  totalItems: 0,
  itemsPerPage: 20,
  page: 1,
});

const page = pagination.getCurrentPage();
// =====================================================

export function getGenres(arrayId) {
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

function renderGallery(movies) {
  stopSpinner();
  return movies
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://db4films.com/assets/img/cover.jpg';
      const releaseYear = release_date ? release_date.split('-')[0] : 'Unknown';
      const checkGenres = genre_ids ? getGenres(genre_ids) : 'Unknown';
      return `
      <li class='list_film_item' ><a href="" class='list_film_link link' id=${id}>
        <img class="list_film_image" src=${poster} alt='Обложка фильма' loading='lazy' />
        <div class='info'>
            <p class='info-title'>
              <b>${title}</b>
            </p>
            <p class='info-date'>
              <span>${checkGenres} | ${releaseYear}</span>
            </p>
        </div></a>
      </li>
      `;
    })
    .join('');
}

fetchFavoritesMovies(page).then(data => {
  refs.tuiContainer.classList.remove('visually-hidden');
  refs.upcomingMovies.classList.remove('visually-hidden');
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
  stopSpinner();
  pagination.reset(data.total_results);
});

pagination.on('afterMove', eventPagination);

function eventPagination(event) {
  fetchFavoritesMovies(event.page).then(data => {
    resetRenderGallery();
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
  });
}

function resetRenderGallery() {
  refs.gallery.innerHTML = '';
}

export { arrayGenres, renderGallery, pagination, eventPagination, page, resetRenderGallery };
