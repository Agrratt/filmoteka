const refs = {
    libraryLink: document.querySelector('.page__library'),
    homeLink: document.querySelector('.page__home'),
    headerContainer: document.querySelector('.header'),
    libraryButtonBox: document.querySelector('.library__button-box'),
    formSearch: document.querySelector('.form__search')
};


refs.libraryLink.addEventListener('click', renderMarkupLibrary);

export default function renderMarkupLibrary(e) {
    e.preventDefault();
    if (!refs.libraryLink.classList.contains('active')) {
        refs.headerContainer.classList.remove('header')
        refs.headerContainer.classList.add('header__library');

        refs.libraryLink.classList.add('active');
        refs.homeLink.classList.remove('active');

        refs.libraryButtonBox.classList.remove('is-hidden');
        refs.formSearch.classList.add('is-hidden');
    }
}

