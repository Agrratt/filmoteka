
export function htmlMarkupFilmsSerchHelper(id, poster_path, title, releaseYear, vote_average) {
    return `
    <li class='helper__item' id=${id}>
        <img class="helper__image" id=${id} src='https://image.tmdb.org/t/p/w500${poster_path || []}' alt='poster' width="18px" height="22px" />
            <p class='helper__title' id=${id}>
            <b id=${id}>${title}</b>
            </p>
            <p class='helper__date' id=${id}>
            <span class='helper__year' id=${id}>(${releaseYear})</span>
            <span class='helper__vote' id=${id}><b id=${id}>${vote_average}</b></span>
            </p>
    </li>
`
};
