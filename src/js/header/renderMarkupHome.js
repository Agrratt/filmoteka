import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from '../main/preloader';
import { startSpinner } from '../main/preloader';
import { stopSpinner } from '../main/preloader';
import { arrayGenres, renderGallery } from '../main/renderMain';
import { pagination } from '../main/renderMain';
import { eventPagination } from '../main/renderMain';
import { page } from '../main/renderMain';

const refs = {
  gallery: document.querySelector('.list_film'),
  homeLink: document.querySelector('.page__home'),
  libraryLink: document.querySelector('.page__library'),
  headerContainer: document.querySelector('.header'),
  libraryButtonBox: document.querySelector('.library__button-box'),
  formSearch: document.querySelector('.form__search'),
};

refs.homeLink.addEventListener('click', renderMarkupHome);

export default function renderMarkupHome(e) {
  refs.tuiContainer.classList.remove('visually-hidden');
  e.preventDefault();
  startSpinner()
  pagination.off('afterMove', eventPagination);
  pagination.movePageTo(page);
  fetchFavoritesMovies(page).then(data => {
    

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
    pagination.reset(data.total_results);
    pagination.on('afterMove', eventPagination);
  });

  if (!refs.homeLink.classList.contains('active')) {
    refs.headerContainer.classList.add('header');
    refs.headerContainer.classList.remove('header__library');

    refs.libraryLink.classList.remove('active');
    refs.homeLink.classList.add('active');

    refs.libraryButtonBox.classList.add('is-hidden');
    refs.formSearch.classList.remove('is-hidden');
  }
}
