/* eslint-disable no-console */
const express = require('express'); // Loading in Express functionality
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api');
// Loading in our custom index.js from /api (it will automatically look for index.js)
const app = express(); // Creating an Express instance

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('*', function logGetRequests(req, res, next) {
    console.log(`someone made a request with ${req.method} method`);
    res.sendFile(path.join(__dirname, '..', 'client', 'build'));
    next();
});

app.use('/api', apiRouter);

app.get('/', function(req, res) {
    res.send('index page, triggered by GET /');
});

module.exports = app;
