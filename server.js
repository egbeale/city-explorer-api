'use strict';

// ---------- REQUIRES ---------
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const weatherData = require('./data/weather.json');
const axios = require('axios');

// ------------- USE ------------
const app = express();
app.use(cors());
// Define PORT and validate that my env is working
const PORT = process.env.PORT || 3002;

//------------- ROUTES --------------
app.get('/', (request, response) => {
  response.send('Hello from the server.');
});

// -------- movies ---------
// app.get('/movies', (request, response) => {

// });

// ------- WEATHER ------

app.get('/weather', async (request, response) => {
  try {
    // const searchQuery = request.query.searchQuery;

    // const searchCity = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
    // console.log(searchCity);

    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    let apiResult = await axios.get(url);

    let result = apiResult.data.data.map(dayObj => new Forecast(dayObj));

    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(`Oops, an error occurred: ${error.status}`);
  }
});

// ------------ CLASSES ---------
class Forecast {
  constructor(weatherObj) {
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}


// ----------- HANDLE ERRORS ----------

// star method - catch-all for invalid requests
app.get('*', (request, response) => {
  response.status(404).send('Hmm. Looks like you\'re trying to go somewhere that doesn\'t exist.');
});

// ------------ LISTENING ----------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

