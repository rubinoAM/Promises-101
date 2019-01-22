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