'use strict';
const axios = require('axios');
const cache = require('./cache');

function getMovies(req, res) {
  try {
    const { searchQuery } = req.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const key = searchQuery + 'Movies';

    // makes new request from server if it's been a month
    if (cache[key] && (Date.now() - cache[key].timestamp < 2629746000)) {
      console.log('cache hit'); // delete later
      console.log(cache); // delete later
      res.status(200).send(cache[key].data);
    } else {
      console.log('cache miss'); // delete later
      axios
        .get(url)
        .then(response => {
          let array = response.data.results.map(movie => new Movie(movie));
          cache[key] = {};
          cache[key].data = array;
          cache[key].timestamp = Date.now();
          res.status(200).send(array);
        })
        .catch(error => console.error(error));
    }
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(obj) {
    this.title = obj.original_title;
    this.overview = obj.overview;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;
  }
}

module.exports = getMovies;
