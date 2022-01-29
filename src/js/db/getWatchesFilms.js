const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function getWatchesFilms() {
  return fetch(`${BASE_URL}/watches.json`).then(r => r.json());
}

export default getWatchesFilms;
