import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from './preloader'

const refs = {
  gallery: document.querySelector('.list_film'),
};

function renderGallery(movies) {
  return movies
    .map(({ id, poster_path, title, release_date }) => {
      const releaseYear = release_date.split('-')[0];
      return `
      <li class='list_film_item' id=${id}>
        <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt='{{tags}}' loading='lazy' />
        <div class='info'>
            <p class='info-item'>
              <b>${title}</b>
            </p>
            <p class='info-item'>
              <span>${releaseYear}</span>
            </p>
        </div>
      </li>
      `;
    })
    .join('');
}

fetchFavoritesMovies().then(data => {
  preloader();
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
});
