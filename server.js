'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cityExplorerData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('hey your default route is working');
});

app.get('/weather', (req, res) => {
  try {
    const { lat, lon, searchQuery } = req.query;
    const cityData = cityExplorerData.find(city => city.city_name === searchQuery);
    if (cityData === undefined) {
      res.status(404).send('Error: City not found');
    } else {
      let array = cityData.data.map(day => new Forecast(day));
      res.status(200).send(array);
    }
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

// Catch all route
app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

// Catching all our errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
