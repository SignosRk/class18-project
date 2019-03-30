const express = require('express'); // Loading in Express functionality
const path = require('path');
const apiRouter = require('./api'); // Loading in our custom index.js from /api (it will automatically look for index.js)
const app = express(); // Creating an Express instance

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function logGetRequests(req, res, next) {
  console.log('someone made a request with GET method');
  next();
});

app.get('/api', apiRouter);

app.get('/', function(req, res) {
  res.send('index page, triggered by GET /');
});

module.exports = app;
