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

/* A promise is a constructor/class
    Takes 1 arg: a callback
    Callback takes 2 args: resolve, reject*/
const moviePromise = new Promise((resolve,reject)=>{
    request.get(nowPlayingUrl,(err,response,body)=>{
        if(err){
            reject(err);
        }
        const parsedBody = JSON.parse(body);
        //When we call resolve, the outside world knows the promise is done
        //When we call reject, the outside world knows the promise has failed
        resolve(parsedBody);
    });
});

moviePromise.then((resolveData)=>{
    return new Promise((resolve,reject)=>{
        const id = resolveData.results[0].id;
        const castUrl = `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
        request.get(castUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        });
    });
}).then((actorData)=>{
    console.log(actorData);
}).catch((rejectData)=>{
    console.log("ERROR");
    console.log(rejectData);
});