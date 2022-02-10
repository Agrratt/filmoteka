import fetchDetailsMovie from '../api/fetchDetailsMovie';
import refs from '../allRefs/refs';
import { addTrailerPlayer } from '../main/showMovieTrailer';
import { player } from '../main/showMovieTrailer';
import fetchDetailsMovieImages from '../api/fetchDetailsImages';
import SimpleLightbox from 'simplelightbox';
import fetchSimilarMovie from '../api/fetchSimilarMovie';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

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
refs.secondModalBtn.addEventListener('click', onSecondModalBtn);
refs.secondModBlockEl.addEventListener('click', secondModalClickItem);


function onSecondModalBtn() {
  refs.secondModBlockEl.classList.toggle('second__modal--hidden');
  refs.modal.scrollTo(0, 1200);
}

// cLEAR MODAL -------------------------------- CLEAR MODAL

  function clearModal() {
  refs.detailImg.src = '';
  refs.movieTitle.textContent = '';
  refs.vote_average.textContent = '';
  refs.vote_count.textContent = '';
  refs.popularity.textContent = '';
  refs.originalTitle.textContent = '';
  refs.overview.textContent = '';
  refs.imageGallery.innerHTML = ' ';
  refs.secondModBlockEl.innerHTML = '';

  clearGallery()
    
  refs.secondModBlockEl.classList.add('second__modal--hidden');
}

// cLEAR MODAL -------------------------------- CLEAR MODAL

// CLEAR GALLARY -------------------------------- CLEAR GALLARY

function clearGallery() {
  refs.imageGallery.innerHTML = ' ';
}

// CLEAR GALLARY -------------------------------- CLEAR GALLARY

// SECOND MODAL -------------------------------- SECOND MODAL -------------------------------- SECOND MODAL


// SECOND MODAL -------------------------------- SECOND MODAL -------------------------------- SECOND MODAL


// CARD CLICK -------------------------------- CARD CLICK -------------------------------- CARD CLICK

function onCardClick(e) {
  e.preventDefault();

  const cardItem = e.target.parentNode;
  const cardItemId = cardItem.id;

  if (
    !cardItem.classList.contains('list_film_link') &&
    !cardItem.classList.contains('list_film_item')
  ) {
    return;
  }

  renderModal(cardItemId);
  addTrailerPlayer(cardItemId);

  refs.backdrop.classList.remove('modal-is-hidden');

  refs.body.classList.add('body__fixed');
}

// CARD CLICK -------------------------------- CARD CLICK -------------------------------- CARD CLICK

// FIRE BASE FUNCTIONS -------------------------------- FIRE BASE FUNCTIONS

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

// FIRE BASE FUNCTIONS -------------------------------- FIRE BASE FUNCTIONS

// CLOSE BUTTON -------------------------------- CLOSE BUTTON

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
    } else if (
      refs.btnQueue.classList.contains('button__active') &&
      !refs.home.classList.contains('active')
    ) {
      updateQueueAfterClosingMore_info();
    }
  }
  
  refs.closeBtn.addEventListener('click', onCloseBtn);

  // CLOSE BUTTON -------------------------------- CLOSE BUTTON

  // CLOSE BACKDROP -------------------------------- CLOSE BACDROP

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
      } else if (
        refs.btnQueue.classList.contains('button__active') &&
        !refs.home.classList.contains('active')
      ) {
        updateQueueAfterClosingMore_info();
      }
    }
  }

  refs.backdrop.addEventListener('click', onCloseBackdrop);

  // CLOSE BACKDROP -------------------------------- CLOSE BACDROP
  
  // CLOSE ESCAPE -------------------------------- CLOSE ESCAPE

   function onEscapeBtn(event) {
    if (event.key === 'Escape') {
      refs.backdrop.classList.add('modal-is-hidden');
      refs.body.classList.remove('body__fixed');

      clearModal();
      player.stopVideo();
      removeListerer();

      refs.secondModBlockEl.classList.add('second__modal--hidden');

      if (
        refs.btnWatched.classList.contains('button__active') &&
        !refs.home.classList.contains('active')
      ) {
        updateWatchedAfterClosingMore_info();
      } else if (
        refs.btnQueue.classList.contains('button__active') &&
        !refs.home.classList.contains('active')
      ) {
        updateQueueAfterClosingMore_info();
      }
    }
  }


// CLOSE ESCAPE -------------------------------- CLOSE ESCAPE

// REMOVE LISTENERS -------------------------------- REMOVE LISTENERS

function removeListerer() {
    document.removeEventListener('keydown', onEscapeBtn);
}
  
// REMOVE LISTENERS -------------------------------- REMOVE LISTENERS

// SECOND MODAL CLICK ITEM -------------------------------- SECOND MODAL CLICK ITEM

function secondModalClickItem(e) {
  const secondModalItem = e.target.parentNode;
  if (!e.target.parentNode.classList.contains('similar__item')) {
    return;
  }

  player.stopVideo();
  clearModal()
  
  renderModal(secondModalItem.id);
  addTrailerPlayer(secondModalItem.id);
}

// RENDER FUNCTION -------------------------------- RENDER FUNCTION -------------------------------- RENDER FUNCTION

export function renderModal(cardItemId) {

  document.addEventListener('keydown', onEscapeBtn);
  
  refs.modal.scrollTo(0, 0);

  const iframeEl = document.querySelector('iframe');

  if (!window.screen.width > 1024) {
    iframeEl.width = 'auto';
  }

  iframeEl.width = 700;

  // Backdrop unhide
  refs.backdrop.classList.remove('modal-is-hidden');
  // baackdrop hide


  // IMAGES -------------------------------- IMAGES

  fetchDetailsMovieImages(cardItemId).then(result => {
    if (result.backdrops.length > 1) {
      const galleryItems = result.backdrops;

      const createImageMarkupList = createImageMarkup(galleryItems);

      refs.imageGallery.insertAdjacentHTML('beforeend', createImageMarkupList);

      function createImageMarkup(galleryItems) {
        return galleryItems
          .map(galleryItem => {
            const imageUrl = galleryItem.file_path;

            return `<li class = "imageGalleryCard">
          <a class = "imageGalleryCardLink" href="https://image.tmdb.org/t/p/w500${imageUrl}">
          <img src = "https://image.tmdb.org/t/p/w200${imageUrl}" class = "detail__image">
          </a>
          </li>`;
          })
          .join('');
      }

      let gallery = new SimpleLightbox('.detail__image__gallery a');
      gallery.on('show.simplelightbox', () => {
        captionDelay: 250;
      });
    }
  });

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

// FIRE BASE FUNCTIONS -------------------------------- FIRE BASE FUNCTIONS

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

// FIRE BASE FUNCTIONS -------------------------------- FIRE BASE FUNCTIONS
  
  closeArrow();

  function closeArrow() {
    const closeButton = document.querySelector('.back-to-top');
    if (closeButton) {
      closeButton.style = 'display: none';
    }
  }

  function htmlSimilarMovie(id, poster) {
    return `
    <div class='similar__item' id=${id}>
        <img class="similar___image tns-item tns-slide-active" style = "border-radius: 5px" src=${poster} alt='Обложка фильма' loading='lazy' width="100px" height="148px" />
    </div>`;
  }

  function renderSimilarMovies(movies) {
    return movies
      .map(({ id, poster_path }) => {
        const poster = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
        return htmlSimilarMovie(id, poster);
      })
      .join('');
  }

  fetchSimilarMovie(cardItemId).then(result => {
    const moviesSimilar = result.results.slice(0, 7);
    refs.secondModBlockEl.insertAdjacentHTML('beforeend', renderSimilarMovies(moviesSimilar));
  });
}
