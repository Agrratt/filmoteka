import YouTubePlayer from 'youtube-player';
import fetchMovieTrailer from "../api/fetchMovieTrailer";

// const videoPlay = document.querySelector('.trailer');

// // create yotube player in document
// let player;
// player = YouTubePlayer(videoPlay);

// // console.log(videoPlay);

// fetchMovieTrailer(634649).then(r => {
//     const movies = r.results
//     let movieTrailers = [];

//     movies.map(movie => {
//         if (movie.name === 'Official Trailer') {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.name === 'Teaser Trailer') {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.type === 'Trailer') {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.name === 'Official Teaser') {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.official === true ) {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.type === 'Teaser') {
//             movieTrailers.push(movie)
//         }
//     })
//     movies.map(movie => {
//         if (movie.type === 'Clip' ) {
//             movieTrailers.push(movie)
//         }
//     })

//     const trailer = movieTrailers .find(movie => 
//         movie.name === 'Official Trailer' ||
//         movie.name === 'Teaser Trailer' ||
//         movie.type === 'Trailer' ||
//         movie.name === 'Official Teaser' ||
//         movie.official === true ||
//         movie.type === 'Clip' ||
//         movie.type === 'Teaser'
//     )
    
//     console.log(movieTrailers);

//     console.log(trailer);
//     // if (trailer === undefined) {
//     // const trailerNotOfficial = movies.find(movie => 
//     //         movie.type === 'Trailer'
//     //     )
//     //     trailer = trailerNotOfficial
//     // }
//     // console.log(movies);
//     const yotubeKey = trailer.key;
//     // console.log(yotubeKey);
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