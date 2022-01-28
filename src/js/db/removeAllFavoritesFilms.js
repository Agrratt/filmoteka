const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeAllFavoritesFilms() {
  return fetch(`${BASE_URL}/favorites.json`, {
    method: 'DELETE',
  });
}

export default removeAllFavoritesFilms;
