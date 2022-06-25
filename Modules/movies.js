'use strict';

const axios = require('axios');

async function getMovies (request, response) {
  try {
    let location = request.query.location;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

    let movieApiResults = await axios.get(url);

    let groomedData = movieApiResults.data.data.map(movieObj => new Movies(movieObj));

    response.status(200).send(groomedData);
  } catch (error) {
    response.status(500).send(`Oops, an error occurred: ${error.status}`);
  }
}

class Movies {
  constructor(movieObj) {
    this.title = movieObj.original_title;
  }
}

module.exports = getMovies;
