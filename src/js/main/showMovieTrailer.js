import YouTubePlayer from 'youtube-player';
import fetchMovieTrailer from "../api/fetchMovieTrailer";

// const videoPlay = document.querySelector('.trailer');

// // create yotube player in document
// let player;
// player = YouTubePlayer(videoPlay);


// console.log(videoPlay);

// fetchMovieTrailer(157336).then(r => {
//     let movies = r.results
//     // let trailer = undefined
//     const trailer = movies.find(movie => 
//         movie.name === 'Official Trailer' ||
//         movie.name === 'Teaser Trailer' ||
//         movie.type === 'Trailer' ||
//         movie.name === 'Official Teaser' ||
//         movie.official === true ||
//         movie.type === 'Clip' ||
//         movie.type === 'Teaser'
//     )
//     console.log(trailer);
//     // if (trailer === undefined) {
//     // const trailerNotOfficial = movies.find(movie => 
//     //         movie.type === 'Trailer'
//     //     )
//     //     trailer = trailerNotOfficial
//     // }
//     console.log(trailer);
//     console.log(movies);
//     const yotubeKey = trailer.key;
//     console.log(yotubeKey);
//     player.loadVideoById(yotubeKey);
// })



// 'loadVideoById' is queued until the player is ready to receive API calls.
// player.loadVideoById('CaimKeDcudo');
//  player.playVideo();

// 'stopVideo' is queued after 'playVideo'.
// player
//     .stopVideo()
//     .then(() => {
//         // Every function returns a promise that is resolved after the target function has been executed.
//     });