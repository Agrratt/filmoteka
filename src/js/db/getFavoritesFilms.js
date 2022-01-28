const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function getFavoritesFilms() {
  return fetch(`${BASE_URL}/favorites.json`).then(r => r.json());
}

export default getFavoritesFilms;
