const refs = {
    homeLink: document.querySelector('.page__home'),
    libraryLink: document.querySelector('.page__library'),
    headerContainer: document.querySelector('.header'),
    libraryButtonBox: document.querySelector('.library__button-box'),
    formSearch: document.querySelector('.form__search')
};

refs.homeLink.addEventListener('click', renderMarkupHome);

export default function renderMarkupHome(e) {
    e.preventDefault();
    if (!refs.homeLink.classList.contains('active')) {
        
        refs.headerContainer.classList.add('header')
        refs.headerContainer.classList.remove('header__library');

        refs.libraryLink.classList.remove('active');
        refs.homeLink.classList.add('active');

        refs.libraryButtonBox.classList.add('is-hidden');
        refs.formSearch.classList.remove('is-hidden');
    }
}

