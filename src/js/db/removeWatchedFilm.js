const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeWatchedFilm(id) {
  return fetch(`${BASE_URL}/watches/${id}.json`, {
    method: 'DELETE',
  });
}

export default removeWatchedFilm;
