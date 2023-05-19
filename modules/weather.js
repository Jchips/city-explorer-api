'use strict';
const axios = require('axios');
const cache = require('./cache');

function getWeather(req, res) {
  try {
    const { lat, lon, searchQuery } = req.query;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&days=4`;
    const key = searchQuery + 'Weather';

    // makes new request from server if it's been a week
    if (cache[key] && (Date.now() - cache[key].timestamp < 604800000)) {
      res.status(200).send(cache[key].data);
    } else { // makes new request to API
      axios
        .get(url)
        .then(response => {
          let array = response.data.data.map(day => new Forecast(day));
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
    
  //   axios
  //     .get(url)
  //     .then(response => {
  //       let array = response.data.data.map(day => new Forecast(day));
  //       res.status(200).send(array);
  //     })
  //     .catch(error => console.error(error));
  // } catch (error) {
  //   next(error);
  // }
}

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

module.exports = getWeather;
