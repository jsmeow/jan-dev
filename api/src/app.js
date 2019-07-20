const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tetrisRoutes = require('./routes/tetrisRoutes');

// The express application object.
const app = express();

// Enable cross-origin requests.
app.use(cors());

// Enable json and url encoded request parsing.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get index.html from the client build directory.
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'build'));
});

// Mongo db runs on port 27017.
mongoose.connect('mongodb://127.0.0.1:27017/jan-dev', {
  useNewUrlParser: true
});

// Connect and log mongo db connection status.
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);
mongoose.connection.once('open', function() {
  console.log('mongoDb database connection established successfully');
});

// Routes.
app.use(tetrisRoutes);

module.exports = app;
