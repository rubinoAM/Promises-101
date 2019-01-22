//JS is an asynchronous language.

//This code block renders as such: 1 \n 3 \n 2
/*console.log(1);
setTimeout(()=>{console.log(2)},0);
console.log(3);*/

const request = require('request');
const apiKey = require('./config.js');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

// GET: Now playing movies
    // GET: From the movie data, get cast data
        // GET: From cast data, an individual actor
            // GET: From actor, highest grossing movie

let movieData = '';
const moviePromise = new Promise(()=>{
    request.get(nowPlayingUrl,(err,response,body)=>{
        const parsedBody = JSON.parse(body);
        // console.log(parsedBody);
        movieData = parsedBody;
    });
});

const castUrl = `${apiBaseUrl}/${movieData.results[0].id}/credits?api_key=${apiKey}`;
request.get(castUrl,(err,response,body)=>{

});