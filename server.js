'use strict';

// ---------- REQUIRES ---------
const express = require('express');
require('dotenv').config();
const cors = require('cors');
let data = require(./data/weather.json);

let data = require('./data/weather.json');

// ------------- USE ------------
const app = express();
app.use(cors());
// Define PORT and validate that my env is working
const PORT = process.env.PORT || 3002;

//------------- ROUTES --------------
app.get('/', (request, response) => {
  response.send('Hello');
});


// ------- weather API ENDPOINT ------

// ------- DEMO. putting here for reference rn -----

// app.get('/pet', (request, response) => {
//   try {
//     let speciesFromRequest = request.query.species;
//     console.log(speciesFromRequest);
//     let dataToGroom = data.find(pet => pet.species === speciesFromRequest);
//     let dataToSend = new Pet(dataToGroom);
//     response.send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });

app.get('/weather', (request, response) => {
  try {
    let city = request.query.searchQuery;
    let forecastObj = data.find(weather => weather.city_name.toLowerCase() === city.toLowerCase());
    let lat = request.query.lat;
    let lon = request.query.lon;
    // no idea what i'm doing! need major help
    let objArray = forecastObj = data.map(day => new Forecast(day))
    response.send(objArray);
  } catch(error) {
    next(error);
  }
})

// ------------ CLASSES ---------
class Forecast {
  constructor(forecastObj) {
    this.date = forecastObj.datetime;
    this.description = forecastObj.description;
  }
}

// ----------- HANDLE ERRORS ----------
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// star method - catch-all for invalid requests
app.get('*', (request, response) => {
  response.send('The thing you are looking for does not exist.');
});

// ------------ LISTENING ----------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

