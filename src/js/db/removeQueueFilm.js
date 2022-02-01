const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeQueueFilm(id) {
  return fetch(`${BASE_URL}/queues/${id}.json`, {
    method: 'DELETE',
  });
}

export default removeQueueFilm;
