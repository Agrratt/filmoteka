import fetchDetailsMovie from "../api/fetchDetailsMovie";
import fetchGenresMovies from "../api/fetchGenresMovies";

const refs = {
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



refs.gallary.addEventListener("click", onCardClick);

function onCardClick(e) {
    const cardItem = e.target.parentNode;
    const cardItemId = cardItem.id;
    
    // stoper ----------------------------
    if (!cardItem.classList.contains("list_film_item")) {
       return
    }
    // stoper ----------------------------

    // modal events ----------------------------
    // Backdrop unhide
    refs.backdrop.classList.remove("is-hidden");
    // baackdrop hide
    refs.closeBtn.addEventListener("click", () => {
        refs.backdrop.classList.add("is-hidden");
        refs.body.classList.remove("body__fixed");
    })
    refs.backdrop.addEventListener("click", (event) => {
        if (event.target.classList.contains("backdrop")) {
            refs.backdrop.classList.add("is-hidden");
            refs.body.classList.remove("body__fixed");
        }
    }
    )
    refs.body.classList.add("body__fixed");
    // modal events ----------------------------

    fetchDetailsMovie(cardItemId).then((result) => {
        refs.movieTitle.textContent = result.title;
        refs.detailImg.src = result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
        refs.vote_average.textContent = result.vote_average;
        refs.vote_count.textContent = result.vote_count;
        refs.popularity.textContent = result.popularity.toFixed(2);
        refs.originalTitle.textContent = result.original_title;
        refs.overview.textContent = result.overview;

        const genresNewMassive = result.genres ? result.genres : "Unknown";

        const genres = genresNewMassive.map(genre => genre.name);

        refs.genres.textContent = genres.join(", ");
    })
}











// 1. Отслеживать нажатие на контейнер
// 2. Получать айди по нажатию на контейнер
// 3. Фетчить полученый айди
// 4. сделать розметку с параметрами нужными в модалке
// 5. сверстать модалку