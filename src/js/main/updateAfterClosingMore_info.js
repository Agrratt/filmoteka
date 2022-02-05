export { updateWatchedAfterClosingMore_info, updateQueueAfterClosingMore_info };
import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import { renderGalleryLibrary } from '../main/renderMainLibrary';
import { startSpinner } from './preloader';
import { stopSpinner } from './preloader';
import refs from '../allRefs/refs';
import Notiflix from 'notiflix';

function updateWatchedAfterClosingMore_info() {
  startSpinner();

  getWatchesFilms().then(data => {
    if (!data) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.info('Library of watched films is empty');
      stopSpinner();
      return;
    }
    const movies = Object.values(data);
    stopSpinner();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
  });
}

function updateQueueAfterClosingMore_info() {
  startSpinner();

  getQueuesFilms().then(data => {
    if (!data) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.info('Library of queues films is empty');
      stopSpinner();
      return;
    }
    const movies = Object.values(data);
    stopSpinner();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryLibrary(movies));
  });
}
