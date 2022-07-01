'use strict';

const axios = require('axios');

async function getMovies (request, response, next) {
  try {
    // console.log(request.query);
    let location = request.query.location;
    let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&langeuage=en-US&page=1&query=${location}`;


    let movieApiResults = await axios.get(url);
    console.log(movieApiResults.data.results);
    let groomedData = movieApiResults.data.results.map(movieObj => new Movies(movieObj));

    response.status(200).send(groomedData);
  } catch (error) {
    next(error);
    // response.status(500).send(`Oops, an error occurred: ${error.status}`);
  }
}

class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image = movieObj.poster_path;
  }
}

module.exports = getMovies;
