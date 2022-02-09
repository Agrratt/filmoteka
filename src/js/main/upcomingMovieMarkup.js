export default function htmlMarkupUpcomingMovie(
  id,
  poster,
  title,
  releaseYear,
  vote_average,
  movieGenre,
) {
  return `
    <div class='upcoming__item' data-id=${id}>
        <img data-id=${id} class="upcoming___image" style = "border-radius: 5px" src=${poster} alt='Обложка фильма' loading='lazy' width="100px" height="148px" />
        <div data-id=${id} class='upcoming__info'>
            <p data-id=${id} class='upcoming__info-title'>
            <b data-id=${id}>${title}</b>
            </p>
            <p><span data-id=${id} class='upcoming__info-genre'>${movieGenre}</span></p>
            <p data-id=${id} class='upcoming__info-date'>
            <span data-id=${id} class='upcoming__info-vote'>${vote_average}</span> | <span data-id=${id} class='upcoming__info-year'>${releaseYear}</span>
            </p>
        </div>
    </div>
    `;
}
