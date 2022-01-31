const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeAllWatchesFilms() {
  return fetch(`${BASE_URL}/watches.json`, {
    method: 'DELETE',
  });
}

export default removeAllWatchesFilms;
