'use strict';

function notFound(req, res) {
  console.log('route not found');
  res.status(404).send('Not found');
}

module.exports = notFound;
