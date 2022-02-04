// ================== make imports ==================
// import { onCardClick } from '../more_info/more_info';
import arrayGenres from './arrayGenres';
import debounce from 'lodash.debounce';
import refs from '../allRefs/refs';
import { preloader } from '../main/preloader';
import { startSpinner } from '../main/preloader';
import fetchSearchMovies from '../api/fetchSearchMovies';
import fetchDetailsMovie from '../api/fetchDetailsMovie';
import { htmlMarkupFilmsSerchHelper } from '../main/searchFilmsHelperMarkup';
import { renderGallery } from '../main/renderMain';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pagination } from '../main/renderMain';
import { eventPagination } from '../main/renderMain';
import { page } from '../main/renderMain';
import { renderModal } from '../more_info/more_info';
import { addTrailerPlayer } from '../main/showMovieTrailer';
import {player} from '../main/showMovieTrailer';


// ================== db imports ==================
import getWatchesFilms from '../db/getWatchesFilms';
import getQueuesFilms from '../db/getQueuesFilms';
import setWatchedFilm from '../db/setWatchedFilm';
import setQueueFilm from '../db/setQueueFilm';
import removeWatchedFilm from '../db/removeWatchedFilm';
import removeQueueFilm from '../db/removeQueueFilm';
// import Notiflix from 'notiflix';
// ================== debouce ==================
const DEBOUNCE_DELAY = 500;

// ================== Notiflix  init ==================
Notify.init({
  width: '200px',
  position: 'center-top',
  closeButton: false,
  distance: '145px',
  opacity: 0.95,
  borderRadius: '5px',
  rtl: false,
  timeout: 1000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.9)',
  plainText: true,
  showOnlyTheLastOne: true,
  clickToClose: true,
  pauseOnHover: true,
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '16px',
  cssAnimationStyle: 'zoom',
  cssAnimationDuration: '500',
  useIcon: 'false',
  messageColor: '#ff6b01',
});
// ================== add listeners ============
refs.searchForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.searchForm.addEventListener('submit', onSubmit);
refs.searchHelper.addEventListener('click', onSearchLine);

// ================== search helper ============
function onInput(e) {
  e.preventDefault();
  refs.searchHelper.innerHTML = '';
  const searchValue = e.target.value.trim();
  // ================== add spinner ============
  refs.searchHelper.insertAdjacentHTML('beforeend', preloader());
  const spinnerRef = document.querySelector('.refreshing-loader-wrapper');
  spinnerRef.style.display = 'flex';
  // ================== close helper ============
  document.addEventListener('click', onDocumement);
  function onDocumement() {
    // console.log(e);
    refs.searchHelper.innerHTML = '';
    document.removeEventListener('click', onDocumement);
  }
  // ================== check input ============
  if (!searchValue) {
    Notify.info('Start typing the movie name');
    spinnerRef.style.display = 'none';
    return;
  }
  // ================== data helper ============
  let searchHelper = [];
  fetchSearchMovies(searchValue).then(r => {
    const serchResults = r.results;
    // console.log(serchResults);
    const sortByVoteResults = serchResults.sort(
      (firsrtFilm, secondFilm) => secondFilm.vote_average - firsrtFilm.vote_average,
    );
    searchHelper = sortByVoteResults.slice(0, 5);
    searchHelper.map(movie => {
      // console.log(movie.title.length);
      let title = movie.title;
      if (title.length > 48) {
        title = title.slice(0, 40);
        title = title.padEnd(43, '...');
        movie.title = title;
      }
    });

    if (serchResults.length === 0) {
      spinnerRef.style.display = 'none';
      Notify.failure("oops, we didn't find anything...");
    }
    // console.log(searchHelper)
    searchHelper.map(({ id, poster_path, title, release_date, vote_average }) => {
      const releaseYear = release_date ? release_date.split('-')[0] : 'No';
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';

      refs.searchHelper.insertAdjacentHTML(
        'beforeend',
        htmlMarkupFilmsSerchHelper(id, poster, title, releaseYear, vote_average),
      );
      // ================== close spinner ============
      spinnerRef.style.display = 'none';
    });
  });
}

// ==================  search submit ==================
function onSubmit(e) {
  e.preventDefault();
  refs.tuiContainer.classList.remove('visually-hidden');
  pagination.off('afterMove', eventPagination);
  const searchValue = e.currentTarget.elements[0].value.trim();
  pagination.movePageTo(page);
  if (!searchValue) {
    Notify.info('Start typing the movie name');
    return;
  }
  fetchSearchMovies(searchValue, page).then(r => {
    if (r.results.length === 0) {
      Notify.failure('Sorry, there are no movies matching your search. Please try again.');
      return;
    } else {
      refs.gallery.innerHTML = '';
      refs.searchHelper.innerHTML = '';
      refs.gallery.insertAdjacentHTML('beforeend', renderGallery(r.results));
      pagination.reset(r.total_results);
      pagination.on('afterMove', event => {
        fetchSearchMovies(searchValue, event.page).then(r => {
          refs.gallery.innerHTML = '';
          refs.gallery.insertAdjacentHTML('beforeend', renderGallery(r.results));
        });
      });
    }
  });
}

// ================== make modal refs ==================
const modalRefs = {
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

  btnWatchedModal: document.querySelector('.watched'),
  btnQueueModal: document.querySelector('.queue'),
  spanWatched: document.querySelector('.span-watched'),
  spanQueue: document.querySelector('.span-queue'),
  spanWatchedAdd: document.querySelector('.span-watched_add'),
  spanQueueAdd: document.querySelector('.span-queue_add'),
  buttonBlock: document.querySelector('.detail__buttons_block'),
};

// ==================  open film with helper ==================

function onSearchLine(e) {
  const cardItemId = e.target.id;

  if (e.target.nodeName === 'UL') {
    return;
  }
  if (e.target.nodeName === 'DIV') {
    return;
  }

  renderModal(cardItemId);
  addTrailerPlayer(cardItemId)

getWatchesFilms().then(dataDb => {
  if (dataDb) {
    const keys = Object.keys(dataDb);
    for (const key of keys) {
      if (dataDb[key].id === Number(cardItemId)) {
        modalRefs.spanWatched.textContent = 'REMOVE';
        modalRefs.spanWatchedAdd.textContent = 'FROM';
        modalRefs.btnWatchedModal.classList.add('detail__button--active');
        modalRefs.btnWatchedModal.classList.remove('detail__button--disable');
        return;
      }
    }
    modalRefs.spanWatched.textContent = 'ADD';
    modalRefs.spanWatchedAdd.textContent = 'TO';
    modalRefs.btnWatchedModal.classList.remove('detail__button--active');
    modalRefs.btnWatchedModal.classList.add('detail__button--disable');
  } else {
    modalRefs.spanWatched.textContent = 'ADD';
    modalRefs.spanWatchedAdd.textContent = 'TO';
    modalRefs.btnWatchedModal.classList.remove('detail__button--active');
    modalRefs.btnWatchedModal.classList.add('detail__button--disable');
  }
});
getQueuesFilms().then(dataDb => {
  if (dataDb) {
    const keys = Object.keys(dataDb);
    for (const key of keys) {
      if (dataDb[key].id === Number(cardItemId)) {
        modalRefs.spanQueue.textContent = 'REMOVE';
        modalRefs.spanQueueAdd.textContent = 'FROM';
        modalRefs.btnQueueModal.classList.add('detail__button--active');
        modalRefs.btnQueueModal.classList.remove('detail__button--disable');
        return;
      }
    }
    modalRefs.spanQueue.textContent = 'ADD';
    modalRefs.spanQueueAdd.textContent = 'TO';
    modalRefs.btnQueueModal.classList.remove('detail__button--active');
    modalRefs.btnQueueModal.classList.add('detail__button--disable');
  } else {
    modalRefs.spanQueue.textContent = 'ADD';
    modalRefs.spanQueueAdd.textContent = 'TO';
    modalRefs.btnQueueModal.classList.remove('detail__button--active');
    modalRefs.btnQueueModal.classList.add('detail__button--disable');
  }
});
}



// modalRefs.gallary.addEventListener('click', onCardClick);
// modalRefs.btnWatched.addEventListener('click', onSetWatched);
// modalRefs.btnQueue.addEventListener('click', onSetQueue);


//   modalRefs.backdrop.classList.remove('is-hidden');

//   modalRefs.closeBtn.addEventListener('click', () => {
//     modalRefs.backdrop.classList.add('is-hidden');
//     modalRefs.body.classList.remove('body__fixed');
//   });

//   modalRefs.backdrop.addEventListener('click', event => {
//     if (event.target.classList.contains('backdrop')) {
//       modalRefs.backdrop.classList.add('is-hidden');
//       modalRefs.body.classList.remove('body__fixed');
//     }
//   });
//   modalRefs.body.classList.add('body__fixed');

//   fetchDetailsMovie(cardItemId).then(result => {
//     modalRefs.movieTitle.textContent = result.title;
//     modalRefs.detailImg.src = result.poster_path
//       ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
//       : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
//     modalRefs.vote_average.textContent = result.vote_average;
//     modalRefs.vote_count.textContent = result.vote_count;
//     modalRefs.popularity.textContent = result.popularity.toFixed(2);
//     modalRefs.originalTitle.textContent = result.original_title;
//     modalRefs.overview.textContent = result.overview;
//     modalRefs.buttonBlock.id = cardItemId;

//     const genresNewMassive = result.genres ? result.genres : 'Unknown';
//     const genres = genresNewMassive.map(genre => genre.name);
//     modalRefs.genres.textContent = genres.join(', ');

//     refs.searchHelper.innerHTML = '';
//   });

//   getWatchesFilms().then(dataDb => {
//     if (dataDb) {
//       const keys = Object.keys(dataDb);
//       for (const key of keys) {
//         if (dataDb[key].id === Number(cardItemId)) {
//           modalRefs.spanWatched.textContent = 'REMOVE';
//           modalRefs.spanWatchedAdd.textContent = 'FROM';
//           modalRefs.btnWatched.classList.add('detail__button--active');
//           modalRefs.btnWatched.classList.remove('detail__button--disable');
//           return;
//         }
//       }
//       modalRefs.spanWatched.textContent = 'ADD';
//       modalRefs.spanWatchedAdd.textContent = 'TO';
//       modalRefs.btnWatched.classList.remove('detail__button--active');
//       modalRefs.btnWatched.classList.add('detail__button--disable');
//     } else {
//       modalRefs.spanWatched.textContent = 'ADD';
//       modalRefs.spanWatchedAdd.textContent = 'TO';
//       modalRefs.btnWatched.classList.remove('detail__button--active');
//       modalRefs.btnWatched.classList.add('detail__button--disable');
//     }
//   });
//   getQueuesFilms().then(dataDb => {
//     if (dataDb) {
//       const keys = Object.keys(dataDb);
//       for (const key of keys) {
//         if (dataDb[key].id === Number(cardItemId)) {
//           modalRefs.spanQueue.textContent = 'REMOVE';
//           modalRefs.spanQueueAdd.textContent = 'FROM';
//           modalRefs.btnQueue.classList.add('detail__button--active');
//           modalRefs.btnQueue.classList.remove('detail__button--disable');
//           return;
//         }
//       }
//       modalRefs.spanQueue.textContent = 'ADD';
//       modalRefs.spanQueueAdd.textContent = 'TO';
//       modalRefs.btnQueue.classList.remove('detail__button--active');
//       modalRefs.btnQueue.classList.add('detail__button--disable');
//     } else {
//       modalRefs.spanQueue.textContent = 'ADD';
//       modalRefs.spanQueueAdd.textContent = 'TO';
//       modalRefs.btnQueue.classList.remove('detail__button--active');
//       modalRefs.btnQueue.classList.add('detail__button--disable');
//     }
//   });
// }


// function onSetWatched(e) {
//     if (!e.currentTarget.classList.contains('watched')) {
//     return;
//     }

//     const id = e.currentTarget.parentNode.id;
//     console.log(e.currentTarget.parentNode);
//     console.log(id);

//     fetchDetailsMovie(id).then(data => {
//     getWatchesFilms().then(dataDb => {
//         if (dataDb) {
//         const keys = Object.keys(dataDb);
//         for (const key of keys) {
//             if (dataDb[key].id === Number(id)) {
//             removeWatchedFilm(key);
//             modalRefs.spanWatched.textContent = 'ADD';
//             modalRefs.spanWatchedAdd.textContent = 'TO';
//             modalRefs.btnWatched.classList.remove('detail__button--active');
//             modalRefs.btnWatched.classList.add('detail__button--disable');
//             Notiflix.Notify.failure(`${dataDb[key].title} remove from watched films`);
//             return;
//             }
//         }
//         setWatchedFilm(data);
//         modalRefs.spanWatched.textContent = 'REMOVE';
//         modalRefs.spanWatchedAdd.textContent = 'FROM';
//         modalRefs.btnWatched.classList.add('detail__button--active');
//         modalRefs.btnWatched.classList.remove('detail__button--disable');
//         Notiflix.Notify.success(`${data.title} add to watched films`);
//         } else {
//         setWatchedFilm(data);
//         modalRefs.spanWatched.textContent = 'REMOVE';
//         modalRefs.spanWatchedAdd.textContent = 'FROM';
//         modalRefs.btnWatched.classList.add('detail__button--active');
//         modalRefs.btnWatched.classList.remove('detail__button--disable');
//         Notiflix.Notify.success(`${data.title} add to watched films`);
//       }
//     });
//     getQueuesFilms().then(r => {
//       if (!r) {
//         return;
//       } else {
//         const keys = Object.keys(r);
//         for (const key of keys) {
//           if (r[key].id === Number(id)) {
//             removeQueueFilm(key);
//             modalRefs.spanQueue.textContent = 'ADD';
//             modalRefs.spanQueueAdd.textContent = 'TO';
//             modalRefs.btnQueue.classList.remove('detail__button--active');
//             modalRefs.btnQueue.classList.add('detail__button--disable');
//             Notiflix.Notify.failure(`${r[key].title} remove from queue films`);
//           }
//         }
//       }
//     });
//   });
// }

// function onSetQueue(e) {
//     if (!e.currentTarget.classList.contains('queue')) {
//     return;
//     }
//     const id = e.currentTarget.parentNode.id;
//     fetchDetailsMovie(id).then(data => {
//     getQueuesFilms().then(dataDb => {
//         if (dataDb) {
//         const keys = Object.keys(dataDb);
//         for (const key of keys) {
//         if (dataDb[key].id === Number(id)) {
//             removeQueueFilm(key);
//             modalRefs.spanQueue.textContent = 'ADD';
//             modalRefs.spanQueueAdd.textContent = 'TO';
//             modalRefs.btnQueue.classList.remove('detail__button--active');
//             modalRefs.btnQueue.classList.add('detail__button--disable');
//             Notiflix.Notify.failure(`${dataDb[key].title} remove from queue films`);
//             return;
//         }
//         }
//         setQueueFilm(data);
//         modalRefs.spanQueue.textContent = 'REMOVE';
//         modalRefs.spanQueueAdd.textContent = 'FROM';
//         modalRefs.btnQueue.classList.add('detail__button--active');
//         modalRefs.btnQueue.classList.remove('detail__button--disable');
//         Notiflix.Notify.success(`${data.title} add to queue films`);
//     } else {
//         setQueueFilm(data);
//         modalRefs.spanQueue.textContent = 'REMOVE';
//         modalRefs.spanQueueAdd.textContent = 'FROM';
//         modalRefs.btnQueue.classList.add('detail__button--active');
//         modalRefs.btnQueue.classList.remove('detail__button--disable');
//         Notiflix.Notify.success(`${data.title} add to queue films`);
//     }
//     });

//     getWatchesFilms().then(r => {
//     if (!r) {
//         return;
//     } else {
//         const keys = Object.keys(r);
//         for (const key of keys) {
//         if (r[key].id === Number(id)) {
//             removeWatchedFilm(key);
//             modalRefs.spanWatched.textContent = 'ADD';
//             modalRefs.spanWatchedAdd.textContent = 'TO';
//             modalRefs.btnWatched.classList.remove('detail__button--active');
//             modalRefs.btnWatched.classList.add('detail__button--disable');
//             Notiflix.Notify.failure(`${r[key].title} remove from watched films`);
//         }
//         }
//     }
//     });
//         });

//     refs.searchHelper.innerHTML = ''
// };
