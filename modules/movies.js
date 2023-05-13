'use strict';
const axios = require('axios');

function getMovies(req, res) {
  try {
    const { searchQuery } = req.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    axios
      .get(url)
      .then(response => {
        let array = response.data.results.map(movie => new Movie(movie));
        res.status(200).send(array);
      })
      .catch(error => console.error(error));
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
