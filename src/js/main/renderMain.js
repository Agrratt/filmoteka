import fetchFavoritesMovies from '../api/fetchFavoritesMovies';

const refs = {
  gallery: document.querySelector('.list_film'),
};

function renderGallery(movies) {
  return movies
    .map(({ id, poster_path, title, release_date }) => {
      const releaseYear = release_date.split('-')[0];
      return `
      <li class='list_film_item' id=${id}>
        <img style = "border-radius: 5px" src='https://image.tmdb.org/t/p/w500${poster_path}' alt='Обложка фильма' loading='lazy' />
        <div class='info'>
            <p class='info-title'>
              <b>${title}</b>
            </p>
            <p class='info-date'>
              <span>${releaseYear}</span>
            </p>
        </div>
      </li>
      `;
    })
    .join('');
}

fetchFavoritesMovies().then(data => {
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
});
