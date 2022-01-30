import refs from '../ollRefs/refs';
import arrayGenres from './arrayGenres';
import fetchSearchMovies from '../api/fetchSearchMovies';
import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from './preloader';

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
    .map(({ id, poster_path, title, release_date, genre_ids, vote_average }) => {
      const releaseYear = release_date.split('-')[0];
      return `
      <li class='list_film_item' id=${id}>
        <img class="list_film_image" style = "border-radius: 5px" src='https://image.tmdb.org/t/p/w500${poster_path}' alt='Обложка фильма' loading='lazy' />
        <div class='info'>
            <p class='info-title'>
              <b>${title}</b>
            </p>
            <p class='info-date'>
              <span>${getGenres(genre_ids)} | ${releaseYear}</span>
              <span class="info-average">${vote_average}</span>
            </p>
        </div>
      </li>
      `;
    })
    .join('');
}

function onFatchLibarty(e) {
  e.preventDefault();

  if (refs.library.classList.contains('active')) {
    return;
  }

  refs.home.classList.remove('active');
  refs.library.classList.add('active');

  fetchSearchMovies('cars').then(data => {
    preloader();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(data.results));
  });
}

refs.library.addEventListener('click', onFatchLibarty);
