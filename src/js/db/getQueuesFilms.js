const BASE_URL = 'https://filmoteka-f211d-default-rtdb.europe-west1.firebasedatabase.app';

function getQueuesFilms() {
  return fetch(`${BASE_URL}/queues.json`).then(r => r.json());
}

export default getQueuesFilms;
