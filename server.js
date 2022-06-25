'use strict';

// ---------- REQUIRES ---------
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');


// ------------- USE ------------
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//------------- ROUTES --------------
app.get('/', (request, response) => {
  response.send('Hello from the server.');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);


// ----------- HANDLE ERRORS ----------
app.get('*', (request, response) => {
  response.status(404).send('Hmm. Looks like you\'re trying to go somewhere that doesn\'t exist.');
});

// ------------ LISTENING ----------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



// -------- MOVIE ---------

// app.get('/movies', async (request, response) => {
//   try {
//     let location = request.query.location;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

//     let movieApiResults = await axios.get(url);
//     let groomedData = movieApiResults.data.data.map(movieObj => new Movies(movieObj));

//     response.status(200).send(groomedData);
//   } catch (error) {
//     response.status(500).send(`Oops, an error occurred: ${error.status}`);
//   }
// });

// ------- WEATHER ------

// app.get('/weather', async (request, response) => {
//   try {

//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;

//     let weatherApiResults = await axios.get(url);

//     let weatherArr = weatherApiResults.data.data.map(weatherObj => new Forecast(weatherObj));

//     response.status(200).send(weatherArr);
//   } catch (error) {
//     response.status(500).send(`Oops, an error occurred: ${error.status}`);
//   }
// });

// ------------ CLASSES ---------
// class Forecast {
//   constructor(weatherObj) {
//     this.datetime = weatherObj.datetime;
//     this.description = weatherObj.weather.description;
//   }
// }

// class Movies {
//   constructor(movieObj) {
//     this.title = movieObj.original_title;
//   }
// }

