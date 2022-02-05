import fetchDetailsMovie from '../api/fetchDetailsMovie';
import fetchGenresMovies from '../api/fetchGenresMovies';
import refs from '../allRefs/refs';
import { addTrailerPlayer } from '../main/showMovieTrailer';
import { player } from '../main/showMovieTrailer';
import fetchDetailsMovieImages from '../api/fetchDetailsImages';

import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import setWatchedFilm from '../db/setWatchedFilm';
import setQueueFilm from '../db/setQueueFilm';
import removeWatchedFilm from '../db/removeWatchedFilm';
import removeQueueFilm from '../db/removeQueueFilm';
import Notiflix from 'notiflix';

import {
  updateWatchedAfterClosingMore_info,
  updateQueueAfterClosingMore_info,
} from '../main/updateAfterClosingMore_info';

refs.gallery.addEventListener('click', onCardClick);
refs.btnWatchedModal.addEventListener('click', onSetWatched);
refs.btnQueueModal.addEventListener('click', onSetQueue);

function clearModal() {
  refs.detailImg.src = '';
  refs.movieTitle.textContent = '';
  refs.vote_average.textContent = '';
  refs.vote_count.textContent = '';
  refs.popularity.textContent = '';
  refs.originalTitle.textContent = '';
  refs.overview.textContent = '';
}

function onCardClick(e) {
  const cardItem = e.target.parentNode;
  const cardItemId = cardItem.id;

  // stoper ----------------------------
  if (!cardItem.classList.contains('list_film_item')) {
    return;
  }
  // stoper ----------------------------

  renderModal(cardItemId);
  addTrailerPlayer(cardItemId);

  refs.backdrop.classList.remove('modal-is-hidden');

  refs.closeBtn.addEventListener('click', () => {
    refs.backdrop.classList.add('modal-is-hidden');
    refs.body.classList.remove('body__fixed');
    clearModal();
    player.stopVideo();
    refs.imageGallery.innerHTML = " "
  });

  refs.backdrop.addEventListener('click', event => {
    if (event.target.classList.contains('backdrop')) {
      refs.backdrop.classList.add('modal-is-hidden');
      refs.body.classList.remove('body__fixed');
      clearModal();
      player.stopVideo();
      refs.imageGallery.innerHTML = " "
    }
  });
  refs.body.classList.add('body__fixed');
}


function onSetWatched(e) {
  if (!e.currentTarget.classList.contains('watched')) {
    return;
  }
  const id = e.currentTarget.parentNode.id;
  fetchDetailsMovie(id).then(data => {
    getWatchesFilms().then(dataDb => {
      if (dataDb) {
        const keys = Object.keys(dataDb);
        for (const key of keys) {
          if (dataDb[key].id === Number(id)) {
            removeWatchedFilm(key);
            refs.spanWatched.textContent = 'ADD';
            refs.spanWatchedAdd.textContent = 'TO';
            refs.btnWatchedModal.classList.remove('detail__button--active');
            refs.btnWatchedModal.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${dataDb[key].title} remove from watched films`);
            return;
          }
        }
        setWatchedFilm(data);
        refs.spanWatched.textContent = 'REMOVE';
        refs.spanWatchedAdd.textContent = 'FROM';
        refs.btnWatchedModal.classList.add('detail__button--active');
        refs.btnWatchedModal.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to watched films`);
      } else {
        setWatchedFilm(data);
        refs.spanWatched.textContent = 'REMOVE';
        refs.spanWatchedAdd.textContent = 'FROM';
        refs.btnWatchedModal.classList.add('detail__button--active');
        refs.btnWatchedModal.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to watched films`);
      }
    });
    getQueuesFilms().then(r => {
      if (!r) {
        return;
      } else {
        const keys = Object.keys(r);
        for (const key of keys) {
          if (r[key].id === Number(id)) {
            removeQueueFilm(key);
            refs.spanQueue.textContent = 'ADD';
            refs.spanQueueAdd.textContent = 'TO';
            refs.btnQueueModal.classList.remove('detail__button--active');
            refs.btnQueueModal.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${r[key].title} remove from queue films`);
          }
        }
      }
    });
  });
}

function onSetQueue(e) {
  if (!e.currentTarget.classList.contains('queue')) {
    return;
  }
  const id = e.currentTarget.parentNode.id;
  fetchDetailsMovie(id).then(data => {
    getQueuesFilms().then(dataDb => {
      if (dataDb) {
        const keys = Object.keys(dataDb);
        for (const key of keys) {
          if (dataDb[key].id === Number(id)) {
            removeQueueFilm(key);
            refs.spanQueue.textContent = 'ADD';
            refs.spanQueueAdd.textContent = 'TO';
            refs.btnQueueModal.classList.remove('detail__button--active');
            refs.btnQueueModal.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${dataDb[key].title} remove from queue films`);
            return;
          }
        }
        setQueueFilm(data);
        refs.spanQueue.textContent = 'REMOVE';
        refs.spanQueueAdd.textContent = 'FROM';
        refs.btnQueueModal.classList.add('detail__button--active');
        refs.btnQueueModal.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to queue films`);
      } else {
        setQueueFilm(data);
        refs.spanQueue.textContent = 'REMOVE';
        refs.spanQueueAdd.textContent = 'FROM';
        refs.btnQueueModal.classList.add('detail__button--active');
        refs.btnQueueModal.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to queue films`);
      }
    });

    getWatchesFilms().then(r => {
      if (!r) {
        return;
      } else {
        const keys = Object.keys(r);
        for (const key of keys) {
          if (r[key].id === Number(id)) {
            removeWatchedFilm(key);
            refs.spanWatched.textContent = 'ADD';
            refs.spanWatchedAdd.textContent = 'TO';
            refs.btnWatchedModal.classList.remove('detail__button--active');
            refs.btnWatchedModal.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${r[key].title} remove from watched films`);
          }
        }
      }
    });
  });
}

export function renderModal(cardItemId) {
  // modal events ----------------------------
  // Backdrop unhide
  refs.backdrop.classList.remove('modal-is-hidden');
  // baackdrop hide

  function onEscapeBtn(event) {
    if (event.key === 'Escape') {
      refs.backdrop.classList.add('modal-is-hidden');
      refs.body.classList.remove('body__fixed');
      clearModal();
      removeListerer();

      if (
        refs.btnWatched.classList.contains('button__active') &&
        !refs.home.classList.contains('active')
      ) {
        updateWatchedAfterClosingMore_info();
      } else if (refs.btnQueue.classList.contains('button__active')) {
        updateQueueAfterClosingMore_info();
      }
    }
  }

  function removeListerer() {
    document.removeEventListener('keydown', onEscapeBtn);
    refs.closeBtn.removeEventListener('click', onCloseBtn);
    refs.backdrop.removeEventListener('click', onCloseBackdrop);
  }

  function onCloseBtn() {
    refs.backdrop.classList.add('modal-is-hidden');
    refs.body.classList.remove('body__fixed');
    clearModal();
    removeListerer();

    player.stopVideo();

    if (
      refs.btnWatched.classList.contains('button__active') &&
      !refs.home.classList.contains('active')
    ) {
      updateWatchedAfterClosingMore_info();
    } else if (refs.btnQueue.classList.contains('button__active')) {
      updateQueueAfterClosingMore_info();
    }
  }

  refs.closeBtn.addEventListener('click', onCloseBtn);

  function onCloseBackdrop(event) {
    if (event.target.classList.contains('backdrop')) {
      refs.backdrop.classList.add('modal-is-hidden');
      refs.body.classList.remove('body__fixed');
      clearModal();

      removeListerer();

      player.stopVideo();

      if (
        refs.btnWatched.classList.contains('button__active') &&
        !refs.home.classList.contains('active')
      ) {
        updateWatchedAfterClosingMore_info();
      } else if (refs.btnQueue.classList.contains('button__active')) {
        updateQueueAfterClosingMore_info();
      }
    }
  }

  refs.backdrop.addEventListener('click', onCloseBackdrop);

  document.addEventListener('keydown', onEscapeBtn);

  // Images ---------

  fetchDetailsMovieImages(cardItemId).then(result => {
    if (result.backdrops.length > 4) {
      refs.imageGallery.insertAdjacentHTML('beforeend', `<div class = "imageGalleryCard"><img src = "https://image.tmdb.org/t/p/w500${result.backdrops[4].file_path}" class = "detail__image"></div><div class = "imageGalleryCard"><img src = "https://image.tmdb.org/t/p/w500${result.backdrops[3].file_path}" class = "detail__image"></div>`); 
    }
    
  })

  refs.body.classList.add('body__fixed');
  // modal events ----------------------------

  fetchDetailsMovie(cardItemId).then(result => {
    refs.movieTitle.textContent = result.title;
    refs.detailImg.src = result.poster_path
      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
      : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
    refs.vote_average.textContent = result.vote_average;
    refs.vote_count.textContent = result.vote_count;
    refs.popularity.textContent = result.popularity.toFixed(2);
    refs.originalTitle.textContent = result.original_title;
    refs.overview.textContent = result.overview;
    refs.buttonBlock.id = cardItemId;

    const genresNewMassive = result.genres ? result.genres : 'Unknown';

    const genres = genresNewMassive.map(genre => genre.name);

    refs.genres.textContent = genres.join(', ');
  });

  function clearModal() {
    refs.detailImg.src = '';
    refs.movieTitle.textContent = '';
    refs.vote_average.textContent = '';
    refs.vote_count.textContent = '';
    refs.popularity.textContent = '';
    refs.originalTitle.textContent = '';
    refs.overview.textContent = '';
  }

  // Buttons ---------------------------------
  getWatchesFilms().then(dataDb => {
    if (dataDb) {
      const keys = Object.keys(dataDb);
      for (const key of keys) {
        if (dataDb[key].id === Number(cardItemId)) {
          refs.spanWatched.textContent = 'REMOVE';
          refs.spanWatchedAdd.textContent = 'FROM';
          refs.btnWatchedModal.classList.add('detail__button--active');
          refs.btnWatchedModal.classList.remove('detail__button--disable');
          return;
        }
      }
      refs.spanWatched.textContent = 'ADD';
      refs.spanWatchedAdd.textContent = 'TO';
      refs.btnWatchedModal.classList.remove('detail__button--active');
      refs.btnWatchedModal.classList.add('detail__button--disable');
    } else {
      refs.spanWatched.textContent = 'ADD';
      refs.spanWatchedAdd.textContent = 'TO';
      refs.btnWatchedModal.classList.remove('detail__button--active');
      refs.btnWatchedModal.classList.add('detail__button--disable');
    }
  });
  getQueuesFilms().then(dataDb => {
    if (dataDb) {
      const keys = Object.keys(dataDb);
      for (const key of keys) {
        if (dataDb[key].id === Number(cardItemId)) {
          refs.spanQueue.textContent = 'REMOVE';
          refs.spanQueueAdd.textContent = 'FROM';
          refs.btnQueueModal.classList.add('detail__button--active');
          refs.btnQueueModal.classList.remove('detail__button--disable');
          return;
        }
      }
      refs.spanQueue.textContent = 'ADD';
      refs.spanQueueAdd.textContent = 'TO';
      refs.btnQueueModal.classList.remove('detail__button--active');
      refs.btnQueueModal.classList.add('detail__button--disable');
    } else {
      refs.spanQueue.textContent = 'ADD';
      refs.spanQueueAdd.textContent = 'TO';
      refs.btnQueueModal.classList.remove('detail__button--active');
      refs.btnQueueModal.classList.add('detail__button--disable');
    }
  });
}
