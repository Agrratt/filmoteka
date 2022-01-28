const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function setFavoriteFilm(obj) {
  return fetch(`${BASE_URL}/favorites.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  }).then(r => r.json());
}

export default setFavoriteFilm;
