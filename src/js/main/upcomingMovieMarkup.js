export default function htmlMarkupUpcomingMovie(id, poster, title, releaseYear, vote_average, movieGenre) {
return`
    <div class='upcoming__item' id=${id}>
        <img id=${id} class="upcoming___image" style = "border-radius: 5px" src=${poster} alt='Обложка фильма' loading='lazy' width="100px" height="148px" />
        <div id=${id} class='upcoming__info'>
            <p id=${id} class='upcoming__info-title'>
            <b id=${id}>${title}</b>
            </p>
            <p><span id=${id} class='upcoming__info-genre'>${movieGenre}</span></p>
            <p id=${id} class='upcoming__info-date'>
            <span id=${id} class='upcoming__info-vote'>${vote_average}</span> | <span id=${id} class='upcoming__info-year'>${releaseYear}</span>
            </p>
        </div>
    </div>
    `
};