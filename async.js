//async is promises made easy
//Added in ES8 (around 2017)

const request = require('request');
const apiKey = require('./config.js');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

function getNowPlaying(){
    return new Promise((resolve,reject)=>{
        request.get(nowPlayingUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        });
    })
}

function getCast(movieId){
    return new Promise((resolve,reject)=>{
        const castUrl = `${apiBaseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;
        request.get(castUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        });
    })
}

function getPerson(personId){
    return new Promise((resolve,reject)=>{
        const personUrl = `${apiBaseUrl}/person/${personId}?api_key=${apiKey}`;
        request.get(personUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        });
    })
}

async function run(){   //async in front of "function" means "await" is coming
    const movieData = await getNowPlaying();
    //console.log(movieData); Waits until the line before is finished before running this
    const castData = await getCast(movieData.results[0].id);
    const personData = await getPerson(castData.cast[0].id);
    console.log(personData);
}

run();