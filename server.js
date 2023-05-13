'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const notFound = require('./modules/notFound');
// const cityExplorerData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('hey your default route is working');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', notFound);

// Catching all our errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
