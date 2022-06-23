'use strict';

// ---------- REQUIRES ---------
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');

// ------------- USE ------------
const app = express();
app.use(cors());
// Define PORT and validate that my env is working
const PORT = process.env.PORT || 3002;

//------------- ROUTES --------------
app.get('/', (request, response) => {
  response.send('Hello from the server.');
});

// ------------ CLASSES ---------
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

// ------- weather API ENDPOINT ------

app.get('/weather', (request, response) => {
  try {
    const searchQuery = request.query.searchQuery;
    // defining my endpoint - telling it to be looking for a specific key in the url called searchQuery.
    // console.log(searchQuery);
    // when I get the searchQuery, I'm going to run through my weather Data, and find any object where that matches. 
    const searchCity = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
    console.log(searchCity);
    // and then because that's another object (with array nested inside), I have to go to that array(.data), since it's an array just map thru it. And for every dayObj, I'm gonna run that thru my Forecast class.

    // let lat = request.query.lat;
    // let lon = request.query.lon;
    const result = searchCity.data.map(dayObj => new Forecast(dayObj));
    console.log(result);


    response.send(result);
    console.log(result);
  } catch (error) {
    next(error);
  }
});


// ----------- HANDLE ERRORS ----------
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// star method - catch-all for invalid requests
app.get('*', (request, response) => {
  response.send('Hmm. Looks like you\'re trying to go somewhere that doesn\'t exist.');
});

// ------------ LISTENING ----------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

