// ================== make imports ==================
import debounce from 'lodash.debounce';
import refs from '../ollRefs/refs';
import fetchSearchMovies from '../api/fetchSearchMovies';
import fetchDetailsMovie from '../api/fetchDetailsMovie';
import { htmlMarkupFilmsSerchHelper } from '../main/searchFilmsHelperMarkup';
import arrayGenres from './arrayGenres';
import { renderGallery } from '../main/renderMain'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ================== debouce ==================
const DEBOUNCE_DELAY = 300;

// ================== add listeners ==================
refs.searchForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.searchForm.addEventListener('submit', onSubmit);
refs.searchHelper.addEventListener('click', onSearchLine);

// ================== search helper ==================
function onInput(e) {
    e.preventDefault();
    refs.searchHelper.innerHTML = ''
    const searchValue = e.target.value.trim();

    if (!searchValue) {
        Notify.info('Start typing the movie name');
        return
    }
    let searchHelper = [];

    fetchSearchMovies(searchValue).then(r => {
        const serchResults = r.results;
        console.log(serchResults);
        const sortByVoteResults = serchResults.sort(
            (firsrtFilm, secondFilm) => secondFilm.vote_average - firsrtFilm.vote_average 
        )
        searchHelper = sortByVoteResults.slice(0,5)
        // console.log(searchHelper)
        searchHelper.map(({ id, poster_path, title, release_date, vote_average }) =>{
            const releaseYear = release_date.split('-')[0];
            refs.searchHelper.insertAdjacentHTML(
            'beforeend', htmlMarkupFilmsSerchHelper(id, poster_path, title, releaseYear, vote_average)) 
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

// ==================  open film with helper ==================
function onSearchLine(e) {
    console.log(e.target.id);
    const currentId = e.target.id
    fetchDetailsMovie(currentId).then(r => {
        console.log(r);
    })
};