'use strict';

const axios = require('axios');

async function getWeather (request, response) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    let weatherApiResults = await axios.get(url);

    let weatherArr = weatherApiResults.data.data.map(weatherObj => new Forecast(weatherObj));

    response.status(200).send(weatherArr);
  } catch (error) {
    response.status(500).send(`Oops, an error occurred: ${error.status}`);
  }
}

class Forecast {
  constructor(weatherObj) {
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

module.exports = getWeather;
