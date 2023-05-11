'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const cityExplorerData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('hey your default route is working');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

function getWeather(req, res) {
  try {
    const { lat, lon, searchQuery } = req.query;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&days=4`;
    axios
      .get(url)
      .then(response => {
        let array = response.data.data.map(day => new Forecast(day));
        res.status(200).send(array);
      })
      .catch(error => console.error(error));
  } catch (error) {
    next(error);
  }
}

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

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
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

// Catch all route (user) errors
app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

// Catching all our errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
