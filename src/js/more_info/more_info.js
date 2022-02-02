import fetchDetailsMovie from '../api/fetchDetailsMovie';
import fetchGenresMovies from '../api/fetchGenresMovies';

import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import setWatchedFilm from '../db/setWatchedFilm';
import setQueueFilm from '../db/setQueueFilm';
import removeWatchedFilm from '../db/removeWatchedFilm';
import removeQueueFilm from '../db/removeQueueFilm';
import Notiflix from 'notiflix';

const refs = {
  gallary: document.querySelector('.list_film'),
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('.close__button'),
  body: document.querySelector('body'),
  movieTitle: document.querySelector('.detail__film__title'),
  detailImg: document.querySelector('.detail__img'),
  vote_average: document.querySelector('.detail__item__info__value__rating'),
  vote_count: document.querySelector('.detail__item__info__value__votes'),
  popularity: document.querySelector('.popularity'),
  originalTitle: document.querySelector('.original__title'),
  overview: document.querySelector('.detail__about__text'),
  genres: document.querySelector('.genres'),

  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  spanWatched: document.querySelector('.span-watched'),
  spanQueue: document.querySelector('.span-queue'),
  spanWatchedAdd: document.querySelector('.span-watched_add'),
  spanQueueAdd: document.querySelector('.span-queue_add'),
  buttonBlock: document.querySelector('.detail__buttons_block'),
};

refs.gallary.addEventListener('click', onCardClick);
refs.btnWatched.addEventListener('click', onSetWatched);
refs.btnQueue.addEventListener('click', onSetQueue);

export function onCardClick(e) {
  const cardItem = e.target.parentNode;
  const cardItemId = cardItem.id;

  // stoper ----------------------------
  if (!cardItem.classList.contains('list_film_item')) {
    return;
  }
  // stoper ----------------------------

  // modal events ----------------------------
  // Backdrop unhide
  refs.backdrop.classList.remove('modal-is-hidden');
  // baackdrop hide

  refs.closeBtn.addEventListener('click', () => {
    refs.backdrop.classList.add('modal-is-hidden');
    refs.body.classList.remove('body__fixed');
    clearModal()
  });

  refs.backdrop.addEventListener('click', event => {
    if (event.target.classList.contains('backdrop')) {
      refs.backdrop.classList.add('modal-is-hidden');
      refs.body.classList.remove('body__fixed');
    clearModal()
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

function clearModal() {
  refs.detailImg.src = "";
  refs.movieTitle.textContent = "";
  refs.vote_average.textContent = "";
  refs.vote_count.textContent = "";
  refs.popularity.textContent = "";
  refs.originalTitle.textContent = "";
  refs.overview.textContent = "";
}


  // Buttons ---------------------------------
  getWatchesFilms().then(dataDb => {
    if (dataDb) {
      const keys = Object.keys(dataDb);
      for (const key of keys) {
        if (dataDb[key].id === Number(cardItemId)) {
          refs.spanWatched.textContent = 'REMOVE';
          refs.spanWatchedAdd.textContent = 'FROM';
          refs.btnWatched.classList.add('detail__button--active');
          refs.btnWatched.classList.remove('detail__button--disable');
          return;
        }
      }
      refs.spanWatched.textContent = 'ADD';
      refs.spanWatchedAdd.textContent = 'TO';
      refs.btnWatched.classList.remove('detail__button--active');
      refs.btnWatched.classList.add('detail__button--disable');
    } else {
      refs.spanWatched.textContent = 'ADD';
      refs.spanWatchedAdd.textContent = 'TO';
      refs.btnWatched.classList.remove('detail__button--active');
      refs.btnWatched.classList.add('detail__button--disable');
    }
  });
  getQueuesFilms().then(dataDb => {
    if (dataDb) {
      const keys = Object.keys(dataDb);
      for (const key of keys) {
        if (dataDb[key].id === Number(cardItemId)) {
          refs.spanQueue.textContent = 'REMOVE';
          refs.spanQueueAdd.textContent = 'FROM';
          refs.btnQueue.classList.add('detail__button--active');
          refs.btnQueue.classList.remove('detail__button--disable');
          return;
        }
      }
      refs.spanQueue.textContent = 'ADD';
      refs.spanQueueAdd.textContent = 'TO';
      refs.btnQueue.classList.remove('detail__button--active');
      refs.btnQueue.classList.add('detail__button--disable');
    } else {
      refs.spanQueue.textContent = 'ADD';
      refs.spanQueueAdd.textContent = 'TO';
      refs.btnQueue.classList.remove('detail__button--active');
      refs.btnQueue.classList.add('detail__button--disable');
    }
  });
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
            refs.btnWatched.classList.remove('detail__button--active');
            refs.btnWatched.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${dataDb[key].title} remove from watched films`);
            return;
          }
        }
        setWatchedFilm(data);
        refs.spanWatched.textContent = 'REMOVE';
        refs.spanWatchedAdd.textContent = 'FROM';
        refs.btnWatched.classList.add('detail__button--active');
        refs.btnWatched.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to watched films`);
      } else {
        setWatchedFilm(data);
        refs.spanWatched.textContent = 'REMOVE';
        refs.spanWatchedAdd.textContent = 'FROM';
        refs.btnWatched.classList.add('detail__button--active');
        refs.btnWatched.classList.remove('detail__button--disable');
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
            refs.btnQueue.classList.remove('detail__button--active');
            refs.btnQueue.classList.add('detail__button--disable');
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
            refs.btnQueue.classList.remove('detail__button--active');
            refs.btnQueue.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${dataDb[key].title} remove from queue films`);
            return;
          }
        }
        setQueueFilm(data);
        refs.spanQueue.textContent = 'REMOVE';
        refs.spanQueueAdd.textContent = 'FROM';
        refs.btnQueue.classList.add('detail__button--active');
        refs.btnQueue.classList.remove('detail__button--disable');
        Notiflix.Notify.success(`${data.title} add to queue films`);
      } else {
        setQueueFilm(data);
        refs.spanQueue.textContent = 'REMOVE';
        refs.spanQueueAdd.textContent = 'FROM';
        refs.btnQueue.classList.add('detail__button--active');
        refs.btnQueue.classList.remove('detail__button--disable');
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
            refs.btnWatched.classList.remove('detail__button--active');
            refs.btnWatched.classList.add('detail__button--disable');
            Notiflix.Notify.failure(`${r[key].title} remove from watched films`);
          }
        }
      }
    });
  });
}
