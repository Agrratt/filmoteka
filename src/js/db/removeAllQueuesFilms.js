const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function removeAllQueuesFilms() {
  return fetch(`${BASE_URL}/queues.json`, {
    method: 'DELETE',
  });
}

export default removeAllQueuesFilms;
