import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from '../main/preloader';
import { startSpinner } from '../main/preloader';
import { stopSpinner } from '../main/preloader';
import { arrayGenres, renderGallery } from '../main/renderMain';
import { pagination } from '../main/renderMain';
import { eventPagination } from '../main/renderMain';
import { page } from '../main/renderMain';
import refs from '../ollRefs/refs';

refs.home.addEventListener('click', renderMarkupHome);

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

  if (!refs.home.classList.contains('active')) {
    refs.headerContainer.classList.add('header');
    refs.headerContainer.classList.remove('header__library');

    refs.library.classList.remove('active');
    refs.home.classList.add('active');

    refs.libraryButtonBox.classList.add('is-hidden');
    refs.searchForm.classList.remove('is-hidden');
  }
}
