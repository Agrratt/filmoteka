const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeFavoriteFilm(id) {
  return fetch(`${BASE_URL}/favorites/${id}.json`, {
    method: 'DELETE',
  });
}

export default removeFavoriteFilm;
