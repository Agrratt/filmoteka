import refs from '../allRefs/refs';

refs.library.addEventListener('click', renderMarkupLibrary);

export default function renderMarkupLibrary(e) {
  e.preventDefault();
  if (!refs.library.classList.contains('active')) {
    refs.headerContainer.classList.remove('header');
    refs.headerContainer.classList.add('header__library');

    refs.library.classList.add('active');
    refs.home.classList.remove('active');

    refs.libraryButtonBox.classList.remove('is-hidden');
    refs.searchForm.classList.add('is-hidden');
  }
}
