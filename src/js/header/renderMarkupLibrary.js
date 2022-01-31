const refs = {
    libraryLink: document.querySelector('.library'),
    libraryContainer: document.querySelector('.header'),
    homeContainer: document.querySelector('.home'),
    libraryButtonBox: document.querySelector('.library__button-box'),
    formSearch: document.querySelector('.form__search')
};



refs.libraryLink.onclick = function markupLibrary(e) {
    e.preventDefault();
    refs.libraryContainer.classList.remove('header')
    refs.libraryContainer.classList.toggle('header__library');
    refs.homeContainer.classList.remove('active');
    refs.libraryLink.classList.toggle('active');
    
    refs.libraryButtonBox.classList.remove('is-hidden');
    refs.formSearch.classList.toggle('is-hidden');
};



