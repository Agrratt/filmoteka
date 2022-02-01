// ================== make imports ==================
import debounce from 'lodash.debounce';
import refs from '../ollRefs/refs';
import preloader from '../main/preloader';
import fetchSearchMovies from '../api/fetchSearchMovies';
import fetchDetailsMovie from '../api/fetchDetailsMovie';
import { htmlMarkupFilmsSerchHelper } from '../main/searchFilmsHelperMarkup';
import arrayGenres from './arrayGenres';
import { renderGallery } from '../main/renderMain';
import {onCardClick} from '../more_info/more_info'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
messageColor:'#ff6b01',
});
// ================== add listeners ============
refs.searchForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.searchForm.addEventListener('submit', onSubmit);
refs.searchHelper.addEventListener('click', onSearchLine);

// ================== search helper ============
function onInput(e) {
    e.preventDefault();
    refs.searchHelper.innerHTML = ''
    
    refs.searchHelper.insertAdjacentHTML('beforeend', preloader());
    const spinnerRef = document.querySelector('.refreshing-loader-wrapper');
    spinnerRef.style.display = "flex"
    const searchValue = e.target.value.trim();

    document.addEventListener('click', onDocumement);
    function onDocumement() {
        // console.log(e);
        refs.searchHelper.innerHTML = ''
        document.removeEventListener('click', onDocumement)
    }

    if (!searchValue) {
        Notify.info('Start typing the movie name');
        spinnerRef.style.display = "none"
        return
    }
    
    let searchHelper = [];

    fetchSearchMovies(searchValue).then(r => {
        const serchResults = r.results;
        // console.log(serchResults);
        const sortByVoteResults = serchResults.sort(
            (firsrtFilm, secondFilm) => secondFilm.vote_average - firsrtFilm.vote_average 
        )
        searchHelper = sortByVoteResults.slice(0, 5);

        if (serchResults.length === 0) {
            spinnerRef.style.display = "none";
            Notify.failure("oops, we didn't find anything...");
        }
        // console.log(searchHelper)
        searchHelper.map(({ id, poster_path, title, release_date, vote_average }) =>{
            const releaseYear = release_date ? release_date.split('-')[0] : 'Unknown';
            const poster = poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
            
            refs.searchHelper.insertAdjacentHTML(
                'beforeend', htmlMarkupFilmsSerchHelper(id, poster, title, releaseYear, vote_average))
            spinnerRef.style.display = "none"
        })
    })
    
};

// ==================  search submit ==================
function onSubmit(e) {
    e.preventDefault();
    const searchValue = e.currentTarget.elements[0].value.trim();
    
    if (!searchValue) {
        Notify.info('Start typing the movie name');
        return
    };
    fetchSearchMovies(searchValue).then(r => {
        if (r.results.length === 0) {
            Notify.failure("Sorry, there are no movies matching your search. Please try again.");
            return
        } else {
            refs.gallery.innerHTML = ''
            refs.searchHelper.innerHTML = ''
            refs.gallery.insertAdjacentHTML('beforeend', renderGallery(r.results));
        };
        
    })
};

// ================== make modal ==================
const modalRefs = {
    gallary: document.querySelector(".list_film"),
    backdrop: document.querySelector(".backdrop"),
    closeBtn: document.querySelector(".close__button"),
    body: document.querySelector("body"),
    movieTitle: document.querySelector(".detail__film__title"),
    detailImg: document.querySelector(".detail__img"),
    vote_average: document.querySelector(".detail__item__info__value__rating"),
    vote_count: document.querySelector(".detail__item__info__value__votes"),
    popularity: document.querySelector(".popularity"),
    originalTitle: document.querySelector(".original__title"),
    overview: document.querySelector(".detail__about__text"),
    genres: document.querySelector(".genres")
};

// ==================  open film with helper ==================
function onSearchLine(e) {
    const cardItemId = e.target.id
    
    if (e.target.nodeName === 'UL') {return}
    if (e.target.nodeName === 'DIV') { return }
    
    modalRefs.backdrop.classList.remove("is-hidden");

    modalRefs.closeBtn.addEventListener("click", () => {
        modalRefs.backdrop.classList.add("is-hidden");
        modalRefs.body.classList.remove("body__fixed");
    })

    modalRefs.backdrop.addEventListener("click", (event) => {
        if (event.target.classList.contains("backdrop")) {
            modalRefs.backdrop.classList.add("is-hidden");
            modalRefs.body.classList.remove("body__fixed");
        }
    }
    )
    modalRefs.body.classList.add("body__fixed");


    fetchDetailsMovie(cardItemId).then((result) => {
        modalRefs.movieTitle.textContent = result.title;
        modalRefs.detailImg.src = result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
        modalRefs.vote_average.textContent = result.vote_average;
        modalRefs.vote_count.textContent = result.vote_count;
        modalRefs.popularity.textContent = result.popularity.toFixed(2);
        modalRefs.originalTitle.textContent = result.original_title;
        modalRefs.overview.textContent = result.overview;
        const genresNewMassive = result.genres ? result.genres : "Unknown";
        const genres = genresNewMassive.map(genre => genre.name);
        modalRefs.genres.textContent = genres.join(", ");
    })

    refs.searchHelper.innerHTML = ''
};

