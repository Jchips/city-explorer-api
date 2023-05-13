'use strict';
const axios = require('axios');

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

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

module.exports = getWeather;
