import YouTubePlayer from 'youtube-player';
import fetchMovieTrailer from "../api/fetchMovieTrailer";
import refs from '../allRefs/refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

// console.log(refs.movieTrailer);

Loading.init({
  width: '400px',
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
  fontSize: '40px',
  cssAnimationStyle: 'zoom',
  cssAnimationDuration: '500',
  useIcon: 'false',
  messageColor: '#ff6b01',
  svgSize: '200px',
  svgColor: '#ff6b01',
  messageFontSize: '30px',
  messageColor:'#5f93c4',
});
// const videoPlay = document.querySelector('.trailer');
const videoPlay = refs.movieTrailer

// create yotube player in document
export let player;
player = YouTubePlayer(videoPlay);

// console.log(videoPlay);

export function addTrailerPlayer(id) {
    return fetchMovieTrailer(id).then(r => {
    const movies = r.results
    let movieTrailers = [];

    movies.map(movie => {
        if (movie.name === 'Official Trailer') {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.name === 'Teaser Trailer') {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.type === 'Trailer') {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.name === 'Official Teaser') {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.official === true ) {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.type === 'Teaser') {
            movieTrailers.push(movie)
        }
    })
    movies.map(movie => {
        if (movie.type === 'Clip' ) {
            movieTrailers.push(movie)
        }
    })

    const trailer = movieTrailers .find(movie => 
        movie.name === 'Official Trailer' ||
        movie.name === 'Teaser Trailer' ||
        movie.type === 'Trailer' ||
        movie.name === 'Official Teaser' ||
        movie.official === true ||
        movie.type === 'Clip' ||
        movie.type === 'Teaser'
    )
    
    // console.log(movieTrailers);

    // console.log(trailer);
    // if (trailer === undefined) {
    // const trailerNotOfficial = movies.find(movie => 
    //         movie.type === 'Trailer'
    //     )
    //     trailer = trailerNotOfficial
    // }
    // console.log(movies);
        if (movieTrailers.length === 0) {
            player.loadVideoById(1);
            Loading.pulse('Sorry, we did not find a trailer for this movie.');
            Loading.remove(1923);
            // console.log('Sorry, we did not find a trailer.');
            return
        }
    const yotubeKey = trailer.key;
    // console.log(yotubeKey);
        player.loadVideoById(yotubeKey);
        player.stopVideo()
})
}

// addTrailerPlayer(524434)



// 'loadVideoById' is queued until the player is ready to receive API calls.
// player.loadVideoById('CaimKeDcudo');
//  player.playVideo();

// 'stopVideo' is queued after 'playVideo'.
// player
//     .stopVideo()
//     .then(() => {
//         // Every function returns a promise that is resolved after the target function has been executed.
//     });